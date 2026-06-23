"use client";

import React, { useState, useEffect } from "react";

interface AdmissionRequest {
  _id: string;
  applicant_id?: string; 
  firstName?: string;
  lastName?: string;
  track?: string;
  enrollmentType?: string;
  status?: string;
}

// 🚀 STEP 1: Define explicit type limits for the properties we want to allow sorting by
type SortableKeys = "applicant_id" | "studentName" | "track" | "status";

export default function EnrollmentPage() {
  const [admissions, setAdmissions] = useState<AdmissionRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 🚀 STEP 2: Initialize sorting states
  const [sortKey, setSortKey] = useState<SortableKeys>("applicant_id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const fetchAdmissions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admission?table=admissions_applications");
      if (res.ok) {
        const jsonResponse = await res.json();
        setAdmissions(jsonResponse.data || []);
      }
    } catch (err) {
      console.error("Error loading admission requests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // 🚀 STEP 3: Handle toggling sort state rules on header click
  const handleSort = (key: SortableKeys) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  // 🚀 STEP 4: Process inline client sorting before building layout arrays
  const sortedAdmissions = [...admissions].sort((a, b) => {
    let valueA = "";
    let valueB = "";

    // Special derived rule for combined fields like Full Name
    if (sortKey === "studentName") {
      valueA = `${a.firstName || ""} ${a.lastName || ""}`.trim().toLowerCase();
      valueB = `${b.firstName || ""} ${b.lastName || ""}`.trim().toLowerCase();
    } else {
      valueA = (a[sortKey] || "").toString().toLowerCase();
      valueB = (b[sortKey] || "").toString().toLowerCase();
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Small UI decorator function to display modern dynamic caret layouts next to text
  const renderSortIcon = (key: SortableKeys) => {
    if (sortKey !== key) return <span className="text-gray-300 ml-1 text-[10px]">↕</span>;
    return sortDirection === "asc" ? <span className="text-blue-600 ml-1 text-[10px]">▲</span> : <span className="text-blue-600 ml-1 text-[10px]">▼</span>;
  };

  const getStatusStyle = (status = "Pending") => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {/* Table Header Section */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Admission Requests</h3>
          <button 
            onClick={fetchAdmissions}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Refresh
          </button>
        </div>

        {/* Records Table View */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* 🚀 STEP 5: Hook up sorting triggers and visual labels to relevant columns */}
              <th 
                onClick={() => handleSort("applicant_id")} 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100/70 transition-colors"
              >
                Applicant ID {renderSortIcon("applicant_id")}
              </th>
              <th 
                onClick={() => handleSort("studentName")} 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100/70 transition-colors"
              >
                Student {renderSortIcon("studentName")}
              </th>
              <th 
                onClick={() => handleSort("track")} 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100/70 transition-colors"
              >
                Strand / Track {renderSortIcon("track")}
              </th>
              <th 
                onClick={() => handleSort("status")} 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100/70 transition-colors"
              >
                Status {renderSortIcon("status")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400 animate-pulse">
                  Loading registration requests...
                </td>
              </tr>
            ) : sortedAdmissions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400 italic">
                  No admission records found.
                </td>
              </tr>
            ) : (
              // 🚀 STEP 6: Loop through sortedAdmissions rather than raw admissions state
              sortedAdmissions.map((record) => (
                <tr key={record._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-600">
                    {record.applicant_id || `ID-${record._id.slice(-6).toUpperCase()}`}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {record.firstName || record.lastName 
                      ? `${record.firstName || ""} ${record.lastName || ""}`.trim() 
                      : "Unnamed Applicant"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">
                    {record.track || "Unassigned"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusStyle(record.status)}`}>
                      {record.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-medium">
                    <a 
                      href={`/portal/registrar/admission/information?id=${record.applicant_id}`} 
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}