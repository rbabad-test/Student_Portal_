"use client"; // This must be the very first line

import React, { useState } from 'react';

export default function ClassSchedule() {
  // Define your sections
  const sections = ["ICT-101", "ICT-102", "ICT-201", "HRM-101","HRM-102","HRM-201",];
  
  // State to track the selected section
  const [selectedSection, setSelectedSection] = useState(sections[0]);

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold italic text-gray-800">Academic Timetable</h2>
          
          {/* Section Selection Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="section-select" className="text-sm font-medium text-gray-600">
              Select Section:
            </label>
            <select 
              id="section-select"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
            >
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center font-bold bg-gray-100 p-2 uppercase text-[10px] tracking-widest text-gray-700 rounded">
              {day}
            </div>
          ))}
        </div>

        {/* Schedule Content Area */}
        <div className="mt-4 border-2 border-dashed border-gray-100 rounded-lg h-64 flex flex-col items-center justify-center bg-gray-50">
          <p className="text-gray-500 text-sm">
            Displaying classes for <span className="font-bold text-blue-600">{selectedSection}</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">No classes scheduled yet for this section.</p>
        </div>
      </div>
    </div>
  );
}