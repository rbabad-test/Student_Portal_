"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ApplicantData {
  id: number;
  applicantId: string;
  applicationStatus: string;
  applicationDate: string;
  preferredStartDate: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  desiredProgram: string;
  applicantType: string;
  gradeLevel?: string; 
  lrn: string;
  lastSchoolName: string;
  lastSchoolType?: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  zipCode: string;
  country: string;
  personalStatement: string;
}

export default function AdminApplicantDetailsPage() {
  const router = useRouter();

  const [applicant, setApplicant] = useState<ApplicantData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setApplicant({
        id: 1,
        applicantId: "APP2026001",
        applicationStatus: "Pending",
        applicationDate: "2026-01-15",
        preferredStartDate: "2026-09-01",
        firstName: "Jb",
        middleName: "",
        lastName: "Ramirez",
        email: "jb.ramirez@gmail.com",
        phone: "+63996752389",
        dateOfBirth: "2002-05-15",
        gender: "Male",
        nationality: "Filipino",
        desiredProgram: "Information and Communication Technology",
        applicantType: "Transferee",
        gradeLevel: "Grade 11",
        lrn: "123456789012",
        lastSchoolName: "Emiliano Tria Tirona Memorial National Integrated High School",
        lastSchoolType: "Public High School",
        streetAddress: "123 Wakas st.",
        city: "Kawit",
        stateProvince: "Cavite",
        zipCode: "4104",
        country: "Philippines",
        personalStatement: "I am passionate about learning software architecture and systems design at SGCST.",
      });
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !applicant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Application...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex justify-between items-center">
          <button onClick={() => router.back()} className="text-gray-600 transition-colors hover:text-gray-900 font-medium">
            ← Back to Applicants
          </button>

          <div className="flex gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${
              applicant.applicationStatus === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}>
              {applicant.applicationStatus}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold">
            {applicant.firstName} {applicant.middleName ? `${applicant.middleName} ` : ""}{applicant.lastName}
          </h1>
          <p className="mt-1 font-light">{applicant.desiredProgram}</p>
          <p className="text-xs mt-2 opacity-80">System Admission ID: {applicant.applicantId}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            <Card title="Personal Information">
              <Grid>
                <Field label="First Name" value={applicant.firstName} />
                <Field label="Middle Name" value={applicant.middleName || ""} />
                <Field label="Last Name" value={applicant.lastName} />
                <Field label="Email Address" value={applicant.email} />
                <Field label="Phone Number" value={applicant.phone} />
                <Field label="Date of Birth" value={applicant.dateOfBirth} />
                <Field label="Gender" value={applicant.gender} />
                <Field label="Nationality" value={applicant.nationality} />
              </Grid>
            </Card>

            <Card title="Academic History & Intake Goals">
              <Grid>
                <Field label="Desired Program/Strand" value={applicant.desiredProgram} />
                <Field label="Enrollment Type" value={applicant.applicantType} />
                {applicant.applicantType === "Transferee" && (
                  <Field label="Grade Level" value={applicant.gradeLevel || ""} />
                )}
                <Field label="Learner Reference Number (LRN)" value={applicant.lrn} />
                <Field label="Last School Attended" value={applicant.lastSchoolName} />
                <Field label="Last School Attended Type " value={applicant.lastSchoolType || ""} />
              </Grid>
            </Card>

            <Card title="Address Details">
              <Grid>
                <div className="md:col-span-2">
                  <Field label="Street Address" value={applicant.streetAddress} />
                </div>
                <Field label="City / Municipality" value={applicant.city} />
                <Field label="State / Province" value={applicant.stateProvince} />
                <Field label="Zip / Postal Code" value={applicant.zipCode} />
                <Field label="Country" value={applicant.country} />
              </Grid>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Admission Tracking Context">
              <div className="space-y-3">
                <Field label="Submission Review State" value={applicant.applicationStatus} />
                <Field label="Form Submission Date" value={applicant.applicationDate} />
                <Field label="Target Intake Term" value={applicant.preferredStartDate} />
              </div>
            </Card>

            <Card title="Personal Statement Insights">
              <div className="text-xs text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100 italic leading-relaxed">
                {applicant.personalStatement}
              </div>
            </Card>

            <Card title="Admission Files Verification">
              <div className="space-y-2">
                <FileItem name="Report Card / Transcript" status="Uploaded" />
                <FileItem name="PSA Birth Certificate" status="Uploaded" />
                <FileItem name="Good Moral Certificate" status="Pending" />
              </div>
            </Card>

            <Card title="Application Assessment Review">
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-green-100 text-green-700 py-2.5 px-4 rounded-lg hover:bg-green-200 text-sm font-semibold transition-colors">
                  Approve Application
                </button>
                <button className="bg-red-100 text-red-700 py-2.5 px-4 rounded-lg hover:bg-red-200 text-sm font-semibold transition-colors">
                  Reject Application
                </button>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <h2 className="font-bold text-base text-gray-800 border-b pb-2 tracking-wide uppercase text-xs text-slate-400">{title}</h2>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, value }: { label?: string; value: string }) {
  return (
    <div>
      {label && <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">{label}</label>}
      <p className="font-semibold text-gray-800 text-sm min-h-[20px]">{value || "—"}</p>
    </div>
  );
}

function FileItem({ name, status }: { name: string; status: string }) {
  return (
    <div className="flex justify-between items-center border border-gray-100 p-3 rounded-lg bg-gray-50/40">
      <span className="text-xs font-medium text-gray-700">{name}</span>
      <span className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md ${
        status === "Uploaded" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
      }`}>
        {status}
      </span>
    </div>
  );
}