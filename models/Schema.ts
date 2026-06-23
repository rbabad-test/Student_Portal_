// models/Audit.ts
import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema(
  {
    username:   { type: String, required: true },
    user_type:  { type: String, required: true },
    activity:   { type: String, required: true },
    createdAt:  { type: Date, default: Date.now }
  },
  { collection: "audit_log_activity" }
);
export const Audit = mongoose.models.Audit || mongoose.model("Audit", AuditSchema);

const TeacherSchema = new mongoose.Schema(
  {
    id:             { type: Number, required: true, unique: true },
    teacher_id:     { type: String, required: true, unique: true },
    prefix:         { type: String, required: true },
    first_name:     { type: String, required: true },
    middle_name:    { type: String, required: true },
    last_name:      { type: String, required: true },
    email_address:  { type: String, required: true },
    contact_number: { type: String, required: true },
    department_id:  { type: String, required: true },
    status:         { type: String, required: true },
    role_id:        { type: String, required: true },
  },
  { collection: "teachers" }
);
export const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);

const SubjectSchema = new mongoose.Schema(
  {
    id:                     { type: Number, required: true, unique: true },
    subject_id:             { type: String, required: true, unique: true },
    sched_code:             { type: String, required: true },
    subject_specification:  { type: String, required: true },
    subject_name:           { type: String, required: true },
    subject_year_section:   { type: String, required: true },
    teacher_id:             { type: String, required: true },
    class_time:             { type: String, required: true },
    subject_day:            { type: String, required: true },
    room:                   { type: String, required: true },
    status:                 { type: String, required: true },
  },
  { collection: "subjects" }
);
export const Subject = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);

const StudentSchema = new mongoose.Schema(
  {
    id:                       { type: Number, required: true, unique: true },
    student_id:               { type: String, required: true, unique: true },
    first_name:               { type: String, required: true },
    middle_name:              { type: String, required: true },
    last_name:                { type: String, required: true },
    status:                   { type: String, required: true },
    email_address:            { type: String, required: true },
    contact_number:           { type: String, required: true },
    date_of_birth:            { type: String, required: true },
    gender:                   { type: String, required: true },
    nationality:              { type: String, required: true },
    secondary_school:         { type: String, required: true },
    graduation_year:          { type: String, required: true },
    gpa:                      { type: String, required: true },
    residential_address:      { type: String, required: true },
    emergency_contact_person: { type: String, required: true },
    emergency_contact_number: { type: String, required: true },
  },
  { collection: "students" }
);
export const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

const AttachmentSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer, // 🚀 This handles your binary Base64 subType data maps automatically
});

const AdmissionSchema = new mongoose.Schema({
  applicant_id: { type: String, unique: true },
  status: String,
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  phone: String,
  dob: String,
  gender: String,
  nationality: String,
  track: String,
  enrollmentType: String,
  gradeLevel: String,
  lrn: String,
  lastSchool: String,
  street: String,
  city: String,
  province: String,
  zip: String,
  country: String,
  personalStatement: String,
  attachments: [AttachmentSchema],
  submittedAt: { type: Date, default: Date.now },
  },
  { collection: "admissions_applications" }
);
export const Admission = mongoose.models.Admission || mongoose.model("Admission", AdmissionSchema, "admissions_applications");

const ConfigSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g., "dropdown_options"
    section:          [{ type: String }],
    room:             [{ type: String }],
    employee_status:  [{ type: String }],
    employee_role:    [{ type: String }],
    prefix:           [{ type: String }],
    specification:    [{ type: String }],
  },
  { collection: "configuration" }
);
export const Config = mongoose.models.Config || mongoose.model("Config", ConfigSchema);