"use client";  

import React, { useState, useEffect } from "react"; 
import Link from "next/link";

type Subject = {
  id: number;
  subject_id: string;
  sched_code: string;
  subject_specification: string;
  subject_name: string;
  subject_year_section: string;
  teacher_id: string;
  class_time: string;
  subject_day: string;
  room: string;
  status: string;
};

interface SubjectModalProps {
  isOpen: boolean;
  subject: Subject | null;
  onClose: () => void;
  onSave: (subject: Subject) => void;
}

function SubjectModal({ isOpen, subject, onClose, onSave }: SubjectModalProps) {
  if (!isOpen) return null;
  const modalKey = subject ? `edit-${subject.id}` : "add-new";
  return (
    <SubjectModalContent
      key={modalKey}
      subject={subject}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function SubjectModalContent({
  subject,
  onClose,
  onSave,
}: {
  subject: Subject | null;
  onClose: () => void;
  onSave: (subject: Subject) => void;
}) {
  const isEditMode = !!subject;

  // 🚀 Added local state to hold array values fetched dynamically from MongoDB
  const [dbSpecification, setDbSpecification] = useState<string[]>([]);
  const [dbSubjectday, setDbSubjectDay]           = useState<string[]>([]);
  const [dbSubjectstatus, setDbSubjectstatus]         = useState<string[]>([]);

  const [formData, setFormData] = useState<Subject>(() => {
    if (subject) {
      return { ...subject };
    }
    return {
      id: Date.now(),
      subject_id: "",
      sched_code: "",
      subject_specification: "",
      subject_name: "",
      subject_year_section: "",
      teacher_id: "",
      class_time: "",
      subject_day: "",
      room: "",
      status: "Active", // Defaulting to Active status
    };
  });

  useEffect(() => {
      const loadDropdownConfigs = async () => {
        try {
          const res = await fetch("/api/portal/admin?table=configuration");
          if (res.ok) {
            const configDoc = await res.json();
            if (configDoc && Array.isArray(configDoc.specification)) {
              setDbSpecification(configDoc.specification);
              if (!isEditMode && configDoc.specification.length > 0) {
                setFormData((prev) => ({ ...prev, specification: "" }));
              }
            }
            if (configDoc && Array.isArray(configDoc.subject_day)) {
              setDbSubjectDay(configDoc.subject_day);
              if (!isEditMode && configDoc.subject_day.length > 0) {
                setFormData((prev) => ({ ...prev, subject_day: "" }));
              }
            }
            if (configDoc && Array.isArray(configDoc.subject_status)) {
              setDbSubjectstatus(configDoc.subject_status);
              if (!isEditMode && configDoc.subject_status.length > 0) {
                setFormData((prev) => ({ ...prev, subject_status: "" }));
              }
            }
          }
        } catch (err) {
          console.error("Failed loading dynamic layout selectors:", err);
        }
      };
  
      loadDropdownConfigs();
    }, [isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-800">
            {isEditMode ? "Edit Subject Details" : "Add New Subject"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isEditMode && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Subject ID</label>
              <input
                type="text"
                value={formData.subject_id}
                disabled
                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sched Code</label>
            <input
              type="text"
              required
              value={formData.sched_code}
              onChange={(e) => setFormData({ ...formData, sched_code: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Specification</label>
            <select
              value={formData.subject_specification}
              onChange={(e) => setFormData({ ...formData, subject_specification: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="">-- Select Specification --</option>
              {dbSpecification.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Subject Name</label>
            <input
              type="text"
              required
              value={formData.subject_name}
              onChange={(e) => setFormData({ ...formData, subject_name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Year & Section</label>
            <input
              type="text"
              required
              value={formData.subject_year_section}
              onChange={(e) => setFormData({ ...formData, subject_year_section: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Teacher</label>
            <input
              type="text"
              required
              value={formData.teacher_id}
              onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Class Time</label>
            <input
              type="text"
              required
              placeholder="Class Time (e.g. 8:00 AM - 10:00 AM)"
              value={formData.class_time}
              onChange={(e) => setFormData({ ...formData, class_time: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Subject Day</label>
            <select
              value={formData.subject_day}
              onChange={(e) => setFormData({ ...formData, subject_day: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="">-- Select Subject Day --</option>
              {dbSubjectday.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Room</label>
            <input
              type="text"
              required
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="">-- Select Status --</option>
              {dbSubjectstatus.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {isEditMode ? "Save Changes" : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Sorting
  const [sortField, setSortField] = useState<keyof Subject | "composite_subject">("subject_id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/portal/admin?table=subjects");
      if (res.ok) {
        const data = await res.json();
        setSubjects(data);
      } else {
        console.error("Failed to load subjects from backend database.");
      }
    } catch (err) {
      console.error("Network connectivity issue:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSort = (field: keyof Subject | "composite_subject") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortArrow = (field: keyof Subject | "composite_subject") => {
    if (sortField !== field) return <span className="text-gray-300 ml-1">↕</span>;
    return sortDirection === "asc" ? <span className="text-blue-600 ml-1">▲</span> : <span className="text-blue-600 ml-1">▼</span>;
  };

  const filteredSubjects = subjects.filter(
    (s) =>
      s.sched_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subject_name?.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    let aValue = "";
    let bValue = "";

    if (sortField === "composite_subject") {
      aValue = `${a.sched_code} ${a.subject_name}`.toLowerCase();
      bValue = `${b.sched_code} ${b.subject_name}`.toLowerCase();
    } else {
      aValue = String(a[sortField] || "").toLowerCase();
      bValue = String(b[sortField] || "").toLowerCase();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleAddClick = () => {
    setSelectedSubject(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubject(null);
  };

  const handleSaveSubject = async (savedSubject: Subject) => {
    const isEditMode = subjects.some((t) => t.id === savedSubject.id);
    const url = "/api/portal/admin?table=subjects";
    const method = isEditMode ? "PUT" : "POST";

    const payload = { ...savedSubject };
    if (!isEditMode) {
      delete (payload as any).id;
    }

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchSubjects();
        setIsModalOpen(false);
        setSelectedSubject(null);
      } else {
        const errData = await res.json();
        alert(errData.message || "Could not commit subject record changes.");
      }
    } catch (error) {
      console.error("Transaction save error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="p-4 bg-white flex flex-col md:flex-row justify-between items-center shadow rounded-t-xl border-b border-gray-100 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <h2 className="text-xl font-bold text-gray-800">Subject Management</h2>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full md:w-auto"
        >
          Add Subject
        </button>
      </div>

      <div className="bg-white p-6 shadow rounded-b-xl overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-10 font-medium text-gray-500 animate-pulse">
            Loading Subject records...
          </div>
        ) : (
          <>
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="text-gray-500 uppercase text-xs border-b select-none">
                  {/* 🛠️ CLICKABLE HEADERS ELEMENT CONFIGURATIONS */}
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("subject_id")}>
                    Subject ID {renderSortArrow("subject_id")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("composite_subject")}>
                    Subject {renderSortArrow("composite_subject")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("subject_year_section")}>
                    Year & Section {renderSortArrow("subject_year_section")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("teacher_id")}>
                    Teacher {renderSortArrow("teacher_id")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("status")}>
                    Status {renderSortArrow("status")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("class_time")}>
                    Class Time {renderSortArrow("class_time")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("subject_day")}>
                    Day {renderSortArrow("subject_day")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("room")}>
                    Room {renderSortArrow("room")}
                  </th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead> 

              <tbody className="divide-y">
                {/* 🛠️ ITERATE USING THE SORTED ARRAY */}
                {sortedSubjects.map((subject) => (
                  <tr key={subject.subject_id} className="hover:bg-gray-50">
                    <td className="py-4 font-mono text-gray-600">{subject.subject_id}</td>
                    <td className="py-4">
                      <div className="font-semibold">
                        {subject.sched_code} {subject.subject_name} 
                      </div>
                      <div className="text-xs text-gray-500">{subject.subject_specification}</div>
                    </td>
                    <td className="py-4">{subject.subject_year_section}</td>
                    <td className="py-4">{subject.teacher_id}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          subject.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : subject.status === "Inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {subject.status}
                      </span>
                    </td>
                    <td className="py-4 font-semibold">{subject.class_time}</td>
                    <td className="py-4 font-semibold">{subject.subject_day}</td>
                    <td className="py-4 font-semibold">{subject.room}</td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleEditClick(subject)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {sortedSubjects.length === 0 && (
              <div className="text-center py-10 text-gray-500 italic">
                No subjects match your search.
              </div>
            )}
          </>
        )}
      </div>

      <SubjectModal
        isOpen={isModalOpen}
        subject={selectedSubject}
        onClose={handleCloseModal}
        onSave={handleSaveSubject}
      />
    </div>
  );
}