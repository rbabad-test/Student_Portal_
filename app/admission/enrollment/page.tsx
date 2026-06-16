"use client";

import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  readOnly,
  value,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
      {label}
    </label>

    <input
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      value={value}
      className={`w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm ${
        readOnly
          ? "bg-slate-100 cursor-not-allowed text-slate-500 font-bold"
          : ""
      }`}
/>
  </div>
);

export default function EnrollmentForm() {
  const [isApproved] = useState(true);
  const [agree, setAgree] = useState(false);

  const student = {
    studentId: "20260001",
    fullName: "Sean Khryzz Santiago",
    track: "TVL-Information and Communication Technology",
    yearLevel: "Grade 11",
    status: "Approved",
  };

  if (!isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-400">
          Enrollment Locked
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-[#1E293B] p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-[#166534]">
              SGCST Enrollment
            </h1>
            <p className="text-slate-500 font-medium italic">
              Final Enrollment Confirmation
            </p>
          </div>

          <a
            href="/admission/registration"
            className="text-sm font-bold text-slate-400 hover:text-red-600 transition-colors"
          >
            Back
          </a>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl space-y-10">
          <div className="pb-6 border-b border-slate-100">
            <h3 className="text-2xl font-black text-[#166534]">
              Student Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InputField label="Student ID" value={student.studentId} readOnly />
              <InputField label="Full Name" value={student.fullName} readOnly />
              <InputField label="Track" value={student.track} readOnly />
              <InputField label="Year Level" value={student.yearLevel} readOnly />
              <InputField label="Admission Status" value={student.status} readOnly />
            </div>
          </div>

          <div className="pb-6 border-b border-slate-100">
            <h3 className="text-2xl font-black text-[#166534]">
              Account Setup
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InputField label="Password *" type="password" />
              <InputField label="Confirm Password *" type="password" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-amber-600 uppercase tracking-widest mb-6">
              Emergency Contact
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="Contact Person *" placeholder="Full Name" />
              <InputField label="Relationship *" placeholder="Guardian" />
              <InputField label="Contact Number *" placeholder="+63 9xx xxx xxxx" />
            </div>
          </div>

          <div className="flex items-start gap-3 pt-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
              className="mt-1"
            />

            <label className="text-sm leading-snug text-slate-600">
              I hereby confirm my enrollment for the upcoming academic term and agree to comply with all university policies, fees, and requirements.
            </label>
          </div>

          <button
            type="submit"
            disabled={!agree}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all ${
              agree
                ? "bg-[#166534] hover:bg-[#14532d] text-white"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            Confirm Enrollment
          </button>
        </div>
      </div>
    </div>
  );
}