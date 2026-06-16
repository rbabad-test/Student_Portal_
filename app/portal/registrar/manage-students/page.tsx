"use client";

import React, { useState } from 'react';

// Sample student data
const studentsData = [
  {
    id: 1,
    firstName: "Jb",
    lastName: "Ramirez",
    email: "jb.ramirez@gmail.com",
    phone: "+63996752389",
    studentId: "2024001",
    program: "Information and Communication Technology",
    applicationStatus: "Enrolled",
    dateOfBirth: "2002-05-15",
    gender: "Male",
    nationality: "Filipino",
    address: "123 Wakas st. Kawit, Cavite",
    highSchool: "Emiliano Tria Tirona Memorial National Integrated High School",
    graduationYear: "2020",
    gpa: "ICT-101",
    emergencyContact: "Sarah Ramirez - +639456897210",
    applicationDate: "2024-01-15",
    preferredStartDate: "2024-09-01",
    specialNeeds: "None",
  },
];

export default function ManageStudents() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter students by name or ID
  const filteredStudents = studentsData.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="p-4 bg-white flex flex-col md:flex-row justify-between items-center shadow rounded-t-xl border-b border-gray-100 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">Manage Students</h2>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm w-full md:w-auto">
          Add Student
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 shadow rounded-b-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="text-gray-500 uppercase text-xs tracking-wider border-b">
              <th className="pb-4 font-semibold">Student ID</th>
              <th className="pb-4 font-semibold">Student Name</th>
              <th className="pb-4 font-semibold">Strand</th>
              <th className="pb-4 font-semibold">Status</th>
              <th className="pb-4 font-semibold">Year & Section</th>
              <th className="pb-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                <td className="py-4 text-sm font-mono text-gray-600">
                  {student.studentId}
                </td>
                <td className="py-4">
                  <div className="font-semibold text-gray-900">
                    {student.firstName} {student.lastName}
                  </div>
                  <div className="text-xs text-gray-500">{student.email}</div>
                </td>
                <td className="py-4 text-sm text-gray-700">
                  {student.program}
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${student.applicationStatus === 'Enrolled' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'}`}>
                    {student.applicationStatus}
                  </span>
                </td>
                <td className="py-4 text-sm font-semibold text-gray-800">
                  {student.gpa}
                </td>
                <td className="py-4 text-right">
                  <a 
  href="/portal/registrar/manage-students/information" 
  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
>
  View Details
</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 italic">No students found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}