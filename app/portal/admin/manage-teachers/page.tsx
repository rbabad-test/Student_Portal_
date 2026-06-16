"use client";

import React, { useState } from "react";

interface Teacher {
  id: number;
  teacherId: string;
  name: string;
  role: string;
  department: string;
  email: string;
  contact: string;
  status: string;
}

interface FacultyModalProps {
  isOpen: boolean;
  teacher: Teacher | null; // null means "Add Mode"
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

  // We wrap the dynamic generator in a lazy initializer function.
  // React will only run this expression once during the initial mount.
  const [formData, setFormData] = useState<Teacher>(() => {
    if (teacher) {
      return { ...teacher };
    }

    return {
      id: Date.now(),
      teacherId: `T-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      name: "",
      role: "Teacher",
      department: "ICT",
      email: "",
      contact: "",
      status: "Active",
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-800">
            {isEditMode ? "Edit Faculty Details" : "Add New Faculty"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Teacher ID
            </label>
            <input
              type="text"
              value={formData.teacherId}
              disabled
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Faculty Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Department
            </label>
            <select
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="ICT">ICT</option>
              <option value="HRM">HRM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              required
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="Teacher">Teacher</option>
                <option value="Department Head">Department Head</option>
                <option value="Network Instructor">Network Instructor</option>
                <option value="Coordinator">Coordinator</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
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
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      teacherId: "T-2024-001",
      name: "Mr. Sean Santiago",
      role: "Department Head",
      department: "ICT",
      email: "sean.santiago@sgcst.edu",
      contact: "0917-123-4567",
      status: "Active",
    },
    {
      id: 2,
      teacherId: "T-2024-003",
      name: "Mr. Edmund Gonsay",
      role: "Network Instructor",
      department: "ICT",
      email: "edmund.gonsay@sgcst.edu",
      contact: "0998-555-2211",
      status: "On Leave",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.teacherId.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleSaveTeacher = (savedTeacher: Teacher) => {
    setTeachers((prev) => {
      const exists = prev.some((t) => t.id === savedTeacher.id);
      if (exists) {
        return prev.map((t) => (t.id === savedTeacher.id ? savedTeacher : t));
      } else {
        return [savedTeacher, ...prev];
      }
    });
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  return (
    <div className="p-6">
      <div className="p-4 bg-white flex flex-col md:flex-row justify-between items-center shadow rounded-t-xl border-b border-gray-100 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <h2 className="text-xl font-bold text-gray-800">
            Faculty Management
          </h2>

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
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="text-gray-500 uppercase text-xs border-b">
              <th className="pb-4">Teacher ID</th>
              <th className="pb-4">Faculty Name</th>
              <th className="pb-4">Dept.</th>
              <th className="pb-4">Contact</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Role</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="py-4 font-mono text-gray-600">
                  {teacher.teacherId}
                </td>

                <td className="py-4">
                  <div className="font-semibold">{teacher.name}</div>
                  <div className="text-xs text-gray-500">{teacher.email}</div>
                </td>

                <td className="py-4">{teacher.department}</td>
                <td className="py-4">{teacher.contact}</td>

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

                <td className="py-4 font-semibold">{teacher.role}</td>

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

        {filteredTeachers.length === 0 && (
          <div className="text-center py-10 text-gray-500 italic">
            No faculty members match your search.
          </div>
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