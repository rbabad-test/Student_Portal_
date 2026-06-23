import { NextRequest, NextResponse } from "next/server"; 
import { cookies } from "next/headers";  
import mongoose from "mongoose";
import { Audit, Student, Admission } from "@/models/Schema"; // Direct imports

// Connect to MongoDB database
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

// Tables mapping using direct model references to avoid timing/hydration issues
const ALLOWED_TABLES: Record<string, { model: mongoose.Model<any>; idKey: string }> = {
  students:                 { model: Student, idKey: "student_id" },
  admissions_applications:  { model: Admission, idKey: "applicant_id" },
};

// Request to get the table records
export async function GET(request: NextRequest) {
  try {
    if (mongoose.connection.readyState >= 1) {
      // Connect to your database instance cleanly
      await mongoose.connect(process.env.MONGODB_URI!);
    }       
    
    const { searchParams } = request.nextUrl;

    // 1. Core routing parameters
    const tableName = searchParams.get("table"); 
    const targetId = searchParams.get("id");
    const shouldCount = searchParams.get("count") === "true";

    // 2. File extraction parameters
    const applicantId = searchParams.get("applicantId");
    const fileId = searchParams.get("fileId");

    // =========================================================
    // 🚀 PIPELINE 1: FILE DOWNLOAD INTERCEPTOR
    // Triggered instantly if both download parameters are passed
    // =========================================================
    if (applicantId && fileId) {
      const applicant = await Admission.findOne(
        { applicant_id: applicantId, "attachments._id": fileId },
        { "attachments.$": 1 } 
      );

      if (!applicant || !applicant.attachments || applicant.attachments.length === 0) {
        return NextResponse.json({ message: "Requested document profile attachment not found." }, { status: 404 });
      }

      const file = applicant.attachments[0];
      
      // 🚨 FIXED FOR YOUR MONGODB SCHEMA: 
      // Mongoose unpacks the "$binary" wrapper into a sub-property named .buffer
      let targetData = file.data;
      if (file.data && typeof file.data === "object") {
        targetData = file.data.buffer || file.data.data || file.data;
      }

      if (!targetData) {
        return NextResponse.json({ message: "The database file content is empty." }, { status: 422 });
      }

      // Safely translate the memory chunk into a raw Node Buffer
      const finalDownloadBuffer = Buffer.from(targetData);
      const safeFilename = file.filename || "downloaded-file";

      return new NextResponse(finalDownloadBuffer as any, {
        status: 200,
        headers: {
          "Content-Type": file.contentType || "application/octet-stream",
          "Content-Disposition": `attachment; filename="${encodeURIComponent(safeFilename)}"`,
          "Content-Length": finalDownloadBuffer.length.toString(),
        },
      });
    }

    // =========================================================
    // 🚀 PIPELINE 2: DYNAMIC DATABASE DATA QUERIES
    // Requires a validated 'table' query param from here downward
    // =========================================================
    if (!tableName || !ALLOWED_TABLES[tableName]) {
      return NextResponse.json(
        { message: `Access denied or invalid table choice: '${tableName}'` },
        { status: 400 }
      );
    }

    const { model: TargetModel, idKey } = ALLOWED_TABLES[tableName];

    // Scenario A: Fast dashboard layout count updates
    if (shouldCount) {
      const totalCount = await TargetModel.countDocuments({}); 
      return NextResponse.json({ count: totalCount }, { status: 200 });
    }

    // Scenario B: Load a single record profile detail view matching your key string
    if (targetId) {
      const record = await TargetModel.findOne({ [idKey]: targetId });
      if (!record) {
        return NextResponse.json({ message: "Document profile not found." }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: record }, { status: 200 });
    } 
    
    // Scenario C: Default collection read dump array view
    const records = await TargetModel.find({}).sort({ _id: -1 });
    return NextResponse.json({ success: true, data: records }, { status: 200 });

  } catch (err: any) {
    console.error("Unified dynamic GET data route processing crash:", err);
    return NextResponse.json({ message: "Failed to fulfill incoming data action request pipeline." }, { status: 500 });
  }
}

// Audit trail logging helper
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