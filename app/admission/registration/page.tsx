"use client";

import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
}

interface SelectFieldProps {
  label: string;
  options: string[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-yellow-400 text-sm"
    />
  </div>
);

const SelectField: React.FC<SelectFieldProps> = ({ label, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
      {label}
    </label>
    <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-yellow-400 text-sm">
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default function AdmissionForm() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-[#1E293B]">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-[#451a03]">
              SGCST Admission
            </h1>

            <p className="text-slate-500 font-medium italic">
              Saint Gregory College of Science and Technology
            </p>

            <a
              href="/admission/verification"
              className="text-slate-400 font-medium italic hover:text-slate-800 transition-colors"
            >
              already submitted an application?
            </a>
          </div>

          <a
            href="/Home"
            className="text-sm font-bold text-slate-400 hover:text-red-600 transition-colors"
          >
            Back
          </a>
        </div>


        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl space-y-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="First Name *" placeholder="Juan" />
            <InputField label="Middle Name" placeholder="Protacio" />
            <InputField label="Last Name *" placeholder="Dela Cruz" />
            <InputField label="Email Address *" type="email" placeholder="juan@example.com" />
            <InputField label="Phone Number *" placeholder="+63 9xx xxx xxxx" />
            <InputField label="Date of Birth *" type="date" />
            <SelectField label="Gender *" options={["Male", "Female", "Other"]} />
            <InputField label="Nationality *" placeholder="Filipino" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Desired Track/Strand *"
              options={[
                "Information and Communication Technology",
                "Hotel and Restaurant Management",
              ]}
            />

            <SelectField
              label="Enrollment Type *"
              options={["New Student", "Transferee"]}
            />

            <SelectField
              label="Grade Level *"
              options={["Grade 11", "Grade 12"]}
            />

            <InputField label="LRN" placeholder="12-digit LRN" />
            <InputField label="Last School Attended *" placeholder="School Name" />
          </div>

 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Street Address *" placeholder="Unit/House No, Street" />
            <InputField label="City / Municipality *" placeholder="Manila" />
            <InputField label="State / Province *" placeholder="Metro Manila" />
            <InputField label="Zip / Postal Code *" placeholder="1000" />
            <InputField label="Country *" placeholder="Philippines" />
          </div>


          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                Personal Statement *
              </label>
              <textarea
                rows={4}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-yellow-400 text-sm"
                placeholder="Why do you want to join SGCST?"
              />
            </div>

            <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center">
              <p className="text-sm font-bold text-slate-600">
                Upload Required Documents *
              </p>
              <p className="text-xs text-slate-400 mb-4">
                Report Card & Birth Certificate
              </p>
              <button className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-xs font-black uppercase">
                Browse Files
              </button>
            </div>

            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 accent-yellow-500" />
              <span className="text-xs text-slate-500">
                I certify that all information provided is true and correct.
              </span>
            </label>
          </div>

          <button className="w-full py-5 bg-[#451a03] text-white rounded-2xl font-black uppercase tracking-widest">
            Submit Application
          </button>

        </div>
      </div>
    </div>
  );
}