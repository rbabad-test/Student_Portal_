import { NextRequest, NextResponse } from "next/server"; 
import { cookies } from "next/headers";  
import mongoose from "mongoose";
import { Audit }        from "@/models/Schema"; 
import { Teacher }      from "@/models/Schema"; 
import { Subject }      from "@/models/Schema"; 
import { Student }      from "@/models/Schema"; 
import { Config }       from "@/models/Schema"; 

//connect to mongodb database
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

//tables to be access should be added here
const ALLOWED_TABLES: Record<string, { model: mongoose.Model<any>; idKey: string }> = {
  teachers:       { model: mongoose.models.Teacher, idKey: "teacher_id" },
  students:       { model: mongoose.models.Student, idKey: "student_id" },
  subjects:       { model: mongoose.models.Subject, idKey: "subject_id" },
  configuration:  { model: mongoose.models.Config,  idKey: "_id" },
};

const CONFIG_DOC_ID = "6a3805c56bb871d76758fe12";

//request to get the table records
export async function GET(request: NextRequest) {
    try {
        await connectDB();        
        const { searchParams } = request.nextUrl;

        const tableName = searchParams.get("table"); 
        const targetId = searchParams.get("id");
        const shouldCount = searchParams.get("count") === "true";

        if (!tableName || !ALLOWED_TABLES[tableName]) {
            return NextResponse.json(
                { message: `Access denied or invalid table choice: '${tableName}'` },
                { status: 400 }
            );
        }

        const { model: TargetModel, idKey } = ALLOWED_TABLES[tableName];

        if (shouldCount) {
        const totalCount = await TargetModel.countDocuments({}); 
        return NextResponse.json({ count: totalCount }, { status: 200 });
        }

        // SPECIAL SEEDING RULE: If they request the configuration table, seed it if empty
        if (tableName === "configuration") {
          let config = await Config.findById(CONFIG_DOC_ID);
          if (!config) {
            config = await Config.create({
              _id: new mongoose.Types.ObjectId(CONFIG_DOC_ID),
              section: ["ICT-1A", "ICT-1B", "ICT-2A", "ICT-2B", "HRM-1A", "HRM-2A"],
              room: ["Computer Lab 1", "Computer Lab 2", "Room 101", "Room 102"],
              employee_status: ["Active", "Inactive", "Leave"],
              employee_role: ["Teacher", "Department Head", "Coordinator", "Network Instructor"],
              prefix: ["Mr."],
              specification: ["Core"],
            });
          }
          return NextResponse.json(config, { status: 200 });
        }

        if (targetId) {
            const record = await TargetModel.findOne({ [idKey]: targetId });
            if (!record) {
                return NextResponse.json({ message: "Document not found." }, { status: 404 });
            }
            return NextResponse.json(record, { status: 200 });
        } else {
            const records = await TargetModel.find({}).sort({ id: -1 });
            return NextResponse.json(records, { status: 200 });
        }

    } catch (err) {
    console.error("Dynamic collection fetch error:", err);
    return NextResponse.json({ message: "Failed to pull collection data." }, { status: 500 });
  }
}

//new records
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;
    const tableName = searchParams.get("table");

    if (!tableName || !ALLOWED_TABLES[tableName]) {
      return NextResponse.json({ message: "Invalid or missing table parameter." }, { status: 400 });
    }

    const { model: TargetModel } = ALLOWED_TABLES[tableName];
    let bodyData = await request.json();

    if (tableName === "configuration") {
      const { action, field, value } = bodyData; // action: "add" | "remove"

      const validFields = ["section", "room", "employee_status", "employee_role", "prefix", "specification",];
      if (!validFields.includes(field)) {
        return NextResponse.json({ message: "Invalid target configuration field." }, { status: 400 });
      }

      let updateQuery = {};
      if (action === "add") {
        updateQuery = { $addToSet: { [field]: value } }; // Automatically guards against duplicates
      } else if (action === "remove") {
        updateQuery = { $pull: { [field]: value } }; // Removes array elements easily
      }

      const updatedConfig = await TargetModel.findByIdAndUpdate(
        CONFIG_DOC_ID, // Use your hardcoded ID "6a3805c56bb871d76758fe12"
        updateQuery,
        { new: true, upsert: true }
      );

      // --- AUDIT TRAIL FOR CONFIGURATION CHANGES ---
      const cookieStore = request.cookies;
      const auditUserCookie = cookieStore.get("audit_user");
      const currentOperator = auditUserCookie ? decodeURIComponent(auditUserCookie.value) : "SYSTEM";
      const activityDescription = `${action === "add" ? "Added" : "Removed"} configuration value '${value}' in [${field}]`;
      
      await createAuditLog(currentOperator, activityDescription);

      return NextResponse.json({ message: "Configuration updated successfully.", data: updatedConfig }, { status: 200 });
    }

    if (tableName === "teachers") {
      const currentYear = new Date().getFullYear();
      const idPrefix = `TCH-${currentYear}-`;

      const totalYearCount = await TargetModel.countDocuments({
        teacher_id: new RegExp(`^${idPrefix}`)
      });

      const paddedIndex = (totalYearCount + 1).toString().padStart(4, "0");
      const structuralId = `${idPrefix}${paddedIndex}`;

      // Inject the generated ID into the document payload data
      bodyData = {
        ...bodyData,
        teacher_id: structuralId
      };
    }

    if (tableName === "subjects") {
      const idPrefix = `ICT-`;

      const totalYearCount = await TargetModel.countDocuments({
        subject_id: new RegExp(`^${idPrefix}`)
      });

      const paddedIndex = (totalYearCount + 1).toString().padStart(4, "0");
      const structuralId = `${idPrefix}${paddedIndex}`;

      // Inject the generated ID into the document payload data
      bodyData = {
        ...bodyData,
        subject_id: structuralId
      };
    }

    const newRecord = new TargetModel(bodyData);
    await newRecord.save();

    const cookieStore = request.cookies;
    const auditUserCookie = cookieStore.get("audit_user");
    const currentOperator = auditUserCookie ? decodeURIComponent(auditUserCookie.value) : "SYSTEM";

    let recordLabel = tableName === "subjects" 
      ? bodyData.subject_name 
      : `${bodyData.first_name || ""} ${bodyData.last_name || ""}`.trim();

    const singularType = tableName.endsWith("s") ? tableName.slice(0, -1) : tableName;
    const activityDescription = `Created new ${singularType}: (${recordLabel || "Unknown"})`;

    // 🚀 4. WRITE TO AUDIT TRAIL LOG ENTRY
    await createAuditLog(currentOperator, activityDescription);

    return NextResponse.json({ message: "Record created successfully.", data: newRecord }, { status: 201 });

  } catch (err: any) {
    console.error("Dynamic POST execution error:", err);
    return NextResponse.json({ message: err.message || "Failed to create record." }, { status: 500 });
  }
}

//update records
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;
    const tableName = searchParams.get("table");

    if (!tableName || !ALLOWED_TABLES[tableName]) {
      return NextResponse.json({ message: "Invalid or missing table parameter." }, { status: 400 });
    }

    const { model: TargetModel, idKey } = ALLOWED_TABLES[tableName];
    
    // 1. Get the payload data
    const bodyData = await request.json();

    // 2. Identify the record using your schema's key (e.g., teacher_id)
    const recordIdentifier = bodyData[idKey];

    if (!recordIdentifier) {
      return NextResponse.json(
        { message: `Missing record custom identifier field: ${idKey}` }, 
        { status: 400 }
      );
    }

    // 3. Set up the lookup query filter using your custom key structure
    const filter = { [idKey]: recordIdentifier };

    // 🛠️ FIX: Clone the data and delete identity fields so MongoDB doesn't try to change them
    const updatePayload = { ...bodyData };
    delete updatePayload._id; 
    delete updatePayload.id; 

    // 4. Find and update the document with the clean updatePayload
    const updatedRecord = await TargetModel.findOneAndUpdate(
      filter,
      { $set: updatePayload }, 
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return NextResponse.json({ message: "Record not found to update." }, { status: 404 });
    }

    // 5. Extract cookie for audit logging
    const cookieStore = request.cookies;
    const auditUserCookie = cookieStore.get("audit_user");
    const activeUser = auditUserCookie ? decodeURIComponent(auditUserCookie.value) : "SYSTEM";

    await createAuditLog(activeUser, `Updated details for ${tableName} matching ID ${recordIdentifier}.`);

    return NextResponse.json({ message: "Record updated successfully.", data: updatedRecord }, { status: 200 });

  } catch (err: any) {
    console.error("Dynamic PUT execution error:", err);
    return NextResponse.json({ message: err.message || "Failed to update record." }, { status: 500 });
  }
}

//this is for the audit_log
async function createAuditLog(username: string, activityDescription: string) {
  let detectedUserType = "student";
  const upperUsername = username.toUpperCase();

  if (upperUsername.startsWith("ADM")) {
    detectedUserType = "admin";
  } else if (upperUsername.startsWith("TCH")) {
    detectedUserType = "teacher";
  }

  const logEntry = new Audit({
    username: username,
    user_type: detectedUserType,
    activity: activityDescription,
  });

  await logEntry.save();
}