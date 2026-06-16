"use client";

import { useState, useEffect } from "react";

// 1. Define the structure (Crucial for TypeScript builds)
interface Enrollee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  applicantId: string;
  program: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  address: string;
  highSchool: string;
  graduationYear: string;
  gpa: string;
  emergencyContact: string;
}

export default function EnrolleeDetailsPage() {
  // Initialize with the interface or null
  const [enrollee, setEnrollee] = useState<Enrollee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API Fetch
    const timer = setTimeout(() => {
      setEnrollee({
        firstName: "Jb",
        lastName: "Ramirez",
        email: "jb.ramirez@gmail.com",
        phone: "+63996752389",
        applicantId: "APP2024001",
        program: "Information and Communication Technology",
        dateOfBirth: "2002-05-15",
        gender: "Male",
        nationality: "Filipino",
        address: "123 Wakas st. Kawit, Cavite",
        highSchool: "Emiliano Tria Tirona Memorial National Integrated High School",
        graduationYear: "2020",
        gpa: "1.66",
        emergencyContact: "Sarah Ramirez - +639456897210",
      });
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // 2. Guard Clause: If loading OR enrollee hasn't populated yet
  if (loading || !enrollee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400 font-medium animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* COMPACT PROFILE HEADER */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-100">
            {enrollee.firstName[0]}{enrollee.lastName[0]}
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              {enrollee.firstName} {enrollee.lastName}
            </h1>
            <p className="text-indigo-600 font-bold text-sm uppercase tracking-wide">{enrollee.program}</p>
            <p className="text-gray-400 text-xs mt-1 font-mono uppercase">Reference: {enrollee.applicantId}</p>
          </div>
        </div>

        {/* INFORMATION SECTIONS */}
        <div className="grid grid-cols-1 gap-6">
          
          <Card title="Personal Details">
            <Grid>
              <Field label="Email Address" value={enrollee.email} />
              <Field label="Contact Number" value={enrollee.phone} />
              <Field label="Birth Date" value={enrollee.dateOfBirth} />
              <Field label="Gender" value={enrollee.gender} />
              <Field label="Nationality" value={enrollee.nationality} />
            </Grid>
          </Card>

          <Card title="Academic History">
            <Grid>
              <Field label="Secondary School" value={enrollee.highSchool} />
              <Field label="Graduation Year" value={enrollee.graduationYear} />
              <Field label="Grade Point Average" value={enrollee.gpa} />
              <Field label="Course / Program" value={enrollee.program} />
            </Grid>
          </Card>

          <Card title="Contact & Emergency">
            <Grid>
              <div className="md:col-span-2">
                <Field label="Residential Address" value={enrollee.address} />
              </div>
              <div className="md:col-span-2 mt-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 text-center md:text-left">
                  In Case of Emergency
                </label>
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                  <span className="text-sm font-bold text-gray-800">
                    {enrollee.emergencyContact?.split(' - ')[0]}
                  </span>
                  <span className="text-sm font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                    {enrollee.emergencyContact?.split(' - ')[1]}
                  </span>
                </div>
              </div>
            </Grid>
          </Card>

        </div>
      </div>
    </div>
  );
}

/* REUSABLE UI COMPONENTS */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 border-b border-gray-50 pb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">{children}</div>;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
        {label}
      </label>
      <p className="text-sm font-semibold text-gray-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}