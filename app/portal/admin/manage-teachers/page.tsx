"use client";

import React, { useState, useEffect } from "react"; 
import Link from "next/link";

interface Teacher {
  id: number;
  teacher_id: string;      
  prefix: string;          
  first_name: string;      
  middle_name: string;     
  last_name: string;       
  email_address: string;   
  contact_number: string;  
  department_id: string;   
  status: string;
  role_id: string;         
}

interface FacultyModalProps {
  isOpen: boolean;
  teacher: Teacher | null;
  onClose: () => void;
  onSave: (teacher: Teacher) => void;
}

function FacultyModal({ isOpen, teacher, onClose, onSave }: FacultyModalProps) {
  if (!isOpen) return null;
  const modalKey = teacher ? `edit-${teacher.id}` : "add-new";
  return (
    <FacultyModalContent
      key={modalKey}
      teacher={teacher}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function FacultyModalContent({
  teacher,
  onClose,
  onSave,
}: {
  teacher: Teacher | null;
  onClose: () => void;
  onSave: (teacher: Teacher) => void;
}) {
  const isEditMode = !!teacher;

  // 🚀 Added local state to hold array values fetched dynamically from MongoDB
  const [dbPrefixes, setDbPrefixes]     = useState<string[]>([]);
  const [dbRoles, setDbRoles]           = useState<string[]>([]);
  const [dbStatus, setDbStatus]         = useState<string[]>([]);
  const [dbDepartment, setDbDepartment] = useState<string[]>([]);

  const [formData, setFormData] = useState<Teacher>(() => {
    if (teacher) {
      return { ...teacher };
    }
    return {
      id: "" as unknown as number, 
      teacher_id: "",
      prefix: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      email_address: "",
      contact_number: "",
      department_id: "",
      status: "",
      role_id: "",
    };
  });

  // 🚀 Fetch current dropdown configurations from database when modal mounts
  useEffect(() => {
    const loadDropdownConfigs = async () => {
      try {
        const res = await fetch("/api/portal/admin?table=configuration");
        if (res.ok) {
          const configDoc = await res.json();
          // Extract prefix array safely or fallback to empty array
          if (configDoc && Array.isArray(configDoc.prefix)) {
            setDbPrefixes(configDoc.prefix);
            
            // If adding a new teacher, optionally auto-select the first prefix item available
            if (!isEditMode && configDoc.prefix.length > 0) {
              setFormData((prev) => ({ ...prev, prefix: "" })); // Keep empty or set configDoc.prefix[0]
            }
          }
          if (configDoc && Array.isArray(configDoc.employee_role)) {
            setDbRoles(configDoc.employee_role);
            
            // If adding a new teacher, optionally auto-select the first prefix item available
            if (!isEditMode && configDoc.employee_role.length > 0) {
              setFormData((prev) => ({ ...prev, role: "" })); // Keep empty or set configDoc.prefix[0]
            }
          }
          if (configDoc && Array.isArray(configDoc.employee_status)) {
            setDbStatus(configDoc.employee_status);
            
            // If adding a new teacher, optionally auto-select the first prefix item available
            if (!isEditMode && configDoc.employee_status.length > 0) {
              setFormData((prev) => ({ ...prev, status: "" })); // Keep empty or set configDoc.prefix[0]
            }
          }
          if (configDoc && Array.isArray(configDoc.department)) {
            setDbDepartment(configDoc.department);
            
            // If adding a new teacher, optionally auto-select the first prefix item available
            if (!isEditMode && configDoc.department.length > 0) {
              setFormData((prev) => ({ ...prev, status: "" })); // Keep empty or set configDoc.prefix[0]
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
            {isEditMode ? "Edit Faculty Details" : "Add New Faculty"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isEditMode && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Teacher ID</label>
              <input
                type="text"
                value={formData.teacher_id}
                disabled
                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>
          )}

          {/* 🚀 UPDATED: Dynamic Database Options Dropdown Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Prefix</label>
            <select
              required
              value={formData.prefix}
              onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="">-- Select Prefix --</option>
              {dbPrefixes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              required
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Middle Name</label>
            <input
              type="text"
              required
              value={formData.middle_name}
              onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              required
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email_address}
              onChange={(e) => setFormData({ ...formData, email_address: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
            <select
              value={formData.department_id}
              onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="">-- Select Department --</option>
                  {dbDepartment.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
            <input
              type="text"
              required
              value={formData.contact_number}
              onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
              <select
                required
                value={formData.role_id}
                onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="">-- Select Role --</option>
                  {dbRoles.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="">-- Select Status --</option>
                  {dbStatus.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2">
            <span className="text-[11px] text-gray-400 italic">
              * Don't see your configuration choice selection listed above? Navigate to Global Settings page layouts panel dashboard to populate values.
            </span>
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
              {isEditMode ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Sorting
  const [sortField, setSortField] = useState<keyof Teacher | "faculty_name">("teacher_id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/portal/admin?table=teachers");
      if (res.ok) {
        const data = await res.json();
        setTeachers(data); 
      } else {
        console.error("Failed to load teachers from backend database.");
      }
    } catch (err) {
      console.error("Network connectivity issue:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSort = (field: keyof Teacher | "faculty_name") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortArrow = (field: keyof Teacher | "faculty_name") => {
    if (sortField !== field) return <span className="text-gray-300 ml-1">↕</span>;
    return sortDirection === "asc" ? <span className="text-blue-600 ml-1">▲</span> : <span className="text-blue-600 ml-1">▼</span>;
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.prefix?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.teacher_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    let aValue = "";
    let bValue = "";

    if (sortField === "faculty_name") {
      aValue = `${a.last_name} ${a.first_name}`.toLowerCase();
      bValue = `${b.last_name} ${b.first_name}`.toLowerCase();
    } else {
      aValue = String(a[sortField] || "").toLowerCase();
      bValue = String(b[sortField] || "").toLowerCase();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleAddClick = () => {
    setSelectedTeacher(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleSaveTeacher = async (savedTeacher: Teacher) => {
    const isEditMode = savedTeacher.id ? teachers.some((t) => t.id === savedTeacher.id) : false;
    const url = "/api/portal/admin?table=teachers";
    const method = isEditMode ? "PUT" : "POST";

    const payload = { ...savedTeacher };
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
        await fetchTeachers();
        setIsModalOpen(false);
        setSelectedTeacher(null);
      } else {
        const errData = await res.json();
        alert(errData.message || "Could not commit teacher record changes.");
      }
    } catch (error) {
      console.error("Transaction save error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="p-4 bg-white flex flex-col md:flex-row justify-between items-center shadow rounded-t-xl border-b border-gray-100 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <h2 className="text-xl font-bold text-gray-800">Faculty Management</h2>
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
          Add Faculty
        </button>
      </div>

      <div className="bg-white p-6 shadow rounded-b-xl overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-10 font-medium text-gray-500 animate-pulse">
            Loading Faculty Directory records...
          </div>
        ) : (
          <>
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="text-gray-500 uppercase text-xs border-b select-none">
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("teacher_id")}>
                    Teacher ID {renderSortArrow("teacher_id")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("faculty_name")}>
                    Faculty Name {renderSortArrow("faculty_name")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("department_id")}>
                    Dept. {renderSortArrow("department_id")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("contact_number")}>
                    Contact {renderSortArrow("contact_number")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("status")}>
                    Status {renderSortArrow("status")}
                  </th>
                  <th className="pb-4 cursor-pointer hover:text-blue-600 transition" onClick={() => handleSort("role_id")}>
                    Role {renderSortArrow("role_id")}
                  </th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead> 

              <tbody className="divide-y">
                {sortedTeachers.map((teacher) => (
                  <tr key={teacher.teacher_id} className="hover:bg-gray-50">
                    <td className="py-4 font-mono text-gray-600">{teacher.teacher_id}</td>
                    <td className="py-4">
                      <div className="font-semibold">
                        {teacher.prefix} {teacher.first_name} {teacher.last_name}
                      </div>
                      <div className="text-xs text-gray-500">{teacher.email_address}</div>
                    </td>
                    <td className="py-4">{teacher.department_id}</td>
                    <td className="py-4">{teacher.contact_number}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          teacher.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : teacher.status === "Inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </td>
                    <td className="py-4 font-semibold">{teacher.role_id}</td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleEditClick(teacher)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {sortedTeachers.length === 0 && (
              <div className="text-center py-10 text-gray-500 italic">
                No faculty members match your search.
              </div>
            )}
          </>
        )}
      </div>

      <FacultyModal
        isOpen={isModalOpen}
        teacher={selectedTeacher}
        onClose={handleCloseModal}
        onSave={handleSaveTeacher}
      />
    </div>
  );
}