"use client";

import React, { useState } from "react";
import Link from "next/link"; // Imported Next.js Link for optimized navigation

interface Subject {
  id: string;
  scheduleCode: string;
  name: string;
  section: string;
  department: string;
  status: string;
}

export default function MasterListPage() {
  const [subjects] = useState<Subject[]>([
    {
      id: "1",
      scheduleCode: "20260001",
      name: "Programming 1",
      section: "ICT-1",
      department: "ICT",
      status: "Active",
    },
    {
      id: "2",
      scheduleCode: "20260002",
      name: "Introduction to Computer Concepts & Office Application",
      section: "ICT-1",
      department: "ICT",
      status: "Active",
    },
    {
      id: "3",
      scheduleCode: "20260003",
      name: "Practical Research 1",
      section: "ICT-1",
      department: "ICT",
      status: "Inactive",
    },
    {
      id: "4",
      scheduleCode: "20260004",
      name: "Programming 3",
      section: "ICT-2",
      department: "ICT",
      status: "Active",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleDownload = (subjectName: string) => {
    console.log(`Downloading list for: ${subjectName}`);
    alert(`Generating download for ${subjectName}...`);
  };

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.scheduleCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="p-4 bg-white flex flex-col md:flex-row justify-between items-center shadow-sm rounded-t-xl border border-gray-200 border-b-gray-100 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Master List</h2>
            <p className="text-xs text-gray-500 hidden md:block">
              Overview of all subjects and sections currently managed.
            </p>
          </div>

          <div className="relative w-full md:w-64 md:ml-auto">
            <input
              type="text"
              placeholder="Search by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 shadow-sm rounded-b-xl border border-t-0 border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="text-gray-500 uppercase text-xs border-b border-gray-200 bg-gray-50/50">
              <th className="p-4 font-semibold text-gray-700">Schedule Code</th>
              <th className="p-4 font-semibold text-gray-700">Subject Name</th>
              <th className="p-4 font-semibold text-gray-700">Section</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredSubjects.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/80 transition">
                <td className="p-4 text-gray-500 font-mono text-sm">
                  {item.scheduleCode}
                </td>

                <td className="p-4 font-medium text-gray-800">
                  {item.name}
                </td>

                <td className="p-4 text-gray-600">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-bold text-slate-600 border border-slate-200">
                    {item.section}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex items-center justify-center gap-3">
                    {/* Fixed: Capitalized Link component from Next.js */}
                    <Link
                      href="/portal/teachers/masterlist/view"
                      className="text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors"
                    >
                      View
                    </Link>

                    <span className="text-gray-300">|</span>

                    <button
                      onClick={() => handleDownload(item.name)}
                      className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-800 font-bold text-sm transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-10 text-gray-500 italic">
            No subjects match your search.
          </div>
        )}
      </div>
    </div>
  );
}