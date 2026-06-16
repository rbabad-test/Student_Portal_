"use client";

import { useState, useEffect } from "react";

interface SubjectGradeRecord {
  subjectCode: string;
  subjectName: string;
  prelim: number | null;
  midterm: number | null;
  preFinals: number | null;
  finals: number | null;
  finalGrade: number | null;
  remarks: "Passed" | "Failed" | "Incomplete" | "—";
}

interface AcademicYearRecord {
  firstSem: SubjectGradeRecord[];
  secondSem: SubjectGradeRecord[];
}

interface StudentMasterGradeRecord {
  id: string;
  studentNumber: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  programStrand: "ICT" | "HRM";
  grade11: AcademicYearRecord;
  grade12: AcademicYearRecord;
}

export default function GradesManagementPage() {
  const [students, setStudents] = useState<StudentMasterGradeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [strandFilter, setStrandFilter] = useState("All Strands");
  const [activeGradeLevel, setActiveGradeLevel] = useState<"grade11" | "grade12">("grade11");
  const [activeSemester, setActiveSemester] = useState<"firstSem" | "secondSem">("firstSem");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentMasterGradeRecord | null>(null);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>("");
  const [expandedStudents, setExpandedStudents] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents([
        {
          id: "1",
          studentNumber: "STU2026001",
          lastName: "Ramirez",
          firstName: "Jb",
          middleName: "",
          programStrand: "ICT",
          grade11: {
            firstSem: [
              { subjectCode: "20250001", subjectName: "Oral Communication", prelim: 88, midterm: 90, preFinals: 92, finals: 90, finalGrade: 90, remarks: "Passed" },
              { subjectCode: "20250002", subjectName: "General Mathematics", prelim: 84, midterm: 86, preFinals: 88, finals: 90, finalGrade: 87, remarks: "Passed" },
              { subjectCode: "20250003", subjectName: "Introduction to Computing", prelim: 90, midterm: 91, preFinals: 92, finals: 91, finalGrade: 91, remarks: "Passed" }
            ],
            secondSem: [
              { subjectCode: "20250004", subjectName: "Practical Research 1", prelim: 89, midterm: 91, preFinals: 92, finals: 92, finalGrade: 91, remarks: "Passed" },
              { subjectCode: "20250005", subjectName: "Komunikasyon at Pananaliksik", prelim: 87, midterm: 89, preFinals: 90, finals: 90, finalGrade: 89, remarks: "Passed" }
            ],
          },
          grade12: {
            firstSem: [
              { subjectCode: "G12-CAP1", subjectName: "Capstone Project 1", prelim: 92, midterm: 93, preFinals: 94, finals: 93, finalGrade: 93, remarks: "Passed" },
              { subjectCode: "G12-PROG1", subjectName: "Advanced Programming", prelim: 90, midterm: 91, preFinals: 92, finals: 91, finalGrade: 91, remarks: "Passed" }
            ],
            secondSem: [
              { subjectCode: "G12-CAP2", subjectName: "Capstone Project 2", prelim: null, midterm: null, preFinals: null, finals: null, finalGrade: null, remarks: "—" },
              { subjectCode: "G12-ENTR", subjectName: "Entrepreneurship", prelim: null, midterm: null, preFinals: null, finals: null, finalGrade: null, remarks: "—" }
            ],
          }
        },
        {
          id: "2",
          studentNumber: "STU2026002",
          lastName: "Santos",
          firstName: "Maria",
          middleName: "Cruz",
          programStrand: "HRM",
          grade11: {
            firstSem: [
              { subjectCode: "202510001", subjectName: "Food and Beverage Services", prelim: 75, midterm: 75, preFinals: 75, finals: 75, finalGrade: 75, remarks: "Passed" },
              { subjectCode: "202510002", subjectName: "Introduction to Hospitality", prelim: 72, midterm: 73, preFinals: 74, finals: 73, finalGrade: 73, remarks: "Failed" },
              { subjectCode: "202510003", subjectName: "General Mathematics", prelim: 78, midterm: 79, preFinals: 80, finals: 79, finalGrade: 79, remarks: "Passed" }
            ],
            secondSem: [
              { subjectCode: "202510004", subjectName: "Practical Research 1", prelim: 78, midterm: 80, preFinals: 82, finals: 80, finalGrade: 80, remarks: "Passed" },
              { subjectCode: "202510005", subjectName: "Komunikasyon at Pananaliksik", prelim: 80, midterm: 81, preFinals: 82, finals: 81, finalGrade: 81, remarks: "Passed" }
            ],
          },
          grade12: {
            firstSem: [
              { subjectCode: "G12-COK1", subjectName: "Commercial Cooking", prelim: 74, midterm: 75, preFinals: 76, finals: 75, finalGrade: 75, remarks: "Passed" },
              { subjectCode: "G12-BKM1", subjectName: "Bar Management", prelim: 70, midterm: 71, preFinals: 72, finals: 71, finalGrade: 71, remarks: "Failed" }
            ],
            secondSem: [
              { subjectCode: "G12-FO1", subjectName: "Front Office Operations", prelim: null, midterm: null, preFinals: null, finals: null, finalGrade: null, remarks: "—" },
              { subjectCode: "G12-ENTR", subjectName: "Entrepreneurship", prelim: null, midterm: null, preFinals: null, finals: null, finalGrade: null, remarks: "—" }
            ],
          }
        }
      ]);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const calculateFinalGrade = (p: number | null, m: number | null, pf: number | null, f: number | null): { final: number | null; rem: SubjectGradeRecord["remarks"] } => {
    if (p === null || m === null || pf === null || f === null) return { final: null, rem: "—" };
    const avg = Math.round((p + m + pf + f) / 4);
    const evaluation = avg >= 75 ? "Passed" : "Failed";
    return { final: avg, rem: evaluation };
  };

  const handleOpenGradeModal = (student: StudentMasterGradeRecord, subjectCode: string) => {
    setSelectedStudent(JSON.parse(JSON.stringify(student)));
    setSelectedSubjectCode(subjectCode);
    setIsEditModalOpen(true);
  };

  const handleGradeInputChange = (key: "prelim" | "midterm" | "preFinals" | "finals", value: string) => {
    if (!selectedStudent) return;
    
    const numericVal = value === "" ? null : Number(value);
    const subjectsList = selectedStudent[activeGradeLevel][activeSemester];
    const subjectIndex = subjectsList.findIndex(s => s.subjectCode === selectedSubjectCode);
    
    if (subjectIndex === -1) return;

    const targetSubject = subjectsList[subjectIndex];
    const updatedPrelim = key === "prelim" ? numericVal : targetSubject.prelim;
    const updatedMidterm = key === "midterm" ? numericVal : targetSubject.midterm;
    const updatedPreFinals = key === "preFinals" ? numericVal : targetSubject.preFinals;
    const updatedFinals = key === "finals" ? numericVal : targetSubject.finals;
    
    const calc = calculateFinalGrade(updatedPrelim, updatedMidterm, updatedPreFinals, updatedFinals);

    setSelectedStudent((prev) => {
      if (!prev) return null;
      const updatedSubjects = [...prev[activeGradeLevel][activeSemester]];
      updatedSubjects[subjectIndex] = {
        ...updatedSubjects[subjectIndex],
        prelim: updatedPrelim,
        midterm: updatedMidterm,
        preFinals: updatedPreFinals,
        finals: updatedFinals,
        finalGrade: calc.final,
        remarks: calc.rem,
      };

      return {
        ...prev,
        [activeGradeLevel]: {
          ...prev[activeGradeLevel],
          [activeSemester]: updatedSubjects,
        },
      };
    });
  };

  const handleSaveGrades = () => {
    if (!selectedStudent) return;
    setStudents(students.map(s => s.id === selectedStudent.id ? selectedStudent : s));
    setIsEditModalOpen(false);
  };

  const toggleExpandStudent = (studentId: string) => {
    setExpandedStudents(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const filteredStudents = students.filter((stu) => {
    const fullName = `${stu.firstName} ${stu.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) || 
      stu.studentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStrand = strandFilter === "All Strands" || stu.programStrand === strandFilter;

    return matchesSearch && matchesStrand;
  });

  const getEditingSubject = () => {
    if (!selectedStudent) return null;
    return selectedStudent[activeGradeLevel][activeSemester].find(s => s.subjectCode === selectedSubjectCode);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-gray-500">
        Loading Historical Student Ledger Matrix...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Grades Management Module</h1>
            <p className="text-xs text-gray-500">Comprehensive academic transcript ledger crossing multi-year grade levels, semesters, and individual terms.</p>
          </div>
          
          <div className="flex bg-gray-200/70 p-1 rounded-xl border border-gray-200">
            <button 
              onClick={() => setActiveGradeLevel("grade11")}
              className={`text-xs px-3 py-1.5 font-bold rounded-lg transition-all ${activeGradeLevel === "grade11" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
            >
              Grade 11
            </button>
            <button 
              onClick={() => setActiveGradeLevel("grade12")}
              className={`text-xs px-3 py-1.5 font-bold rounded-lg transition-all ${activeGradeLevel === "grade12" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
            >
              Grade 12
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-xl">
            <input
              type="text"
              placeholder="Search by student number or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2 bg-gray-50/50 outline-none focus:border-indigo-400 font-medium text-gray-800"
            />
            <select
              value={strandFilter}
              onChange={(e) => setStrandFilter(e.target.value)}
              className="w-full sm:w-48 text-xs font-semibold border border-gray-200 rounded-lg px-3 py-2 bg-gray-50/50 outline-none focus:border-indigo-400 text-gray-700 h-[38px]"
            >
              <option value="All Strands">All Strands</option>
              <option value="ICT">ICT</option>
              <option value="HRM">HRM</option>
            </select>
          </div>

          <div className="flex border-b border-gray-100 w-full md:w-auto justify-start md:justify-end gap-4">
            <button
              onClick={() => setActiveSemester("firstSem")}
              className={`text-xs pb-2 font-bold tracking-wide transition-all border-b-2 ${
                activeSemester === "firstSem" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              1st Semester
            </button>
            <button
              onClick={() => setActiveSemester("secondSem")}
              className={`text-xs pb-2 font-bold tracking-wide transition-all border-b-2 ${
                activeSemester === "secondSem" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              2nd Semester
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="p-4 w-1/4">Student Details</th>
                  <th className="p-4 w-1/4">Subject / Course</th>
                  <th className="p-4 text-center">Strand</th>
                  <th className="p-4 text-center bg-indigo-50/20 text-indigo-950">Prelim</th>
                  <th className="p-4 text-center bg-indigo-50/20 text-indigo-950">Midterm</th>
                  <th className="p-4 text-center bg-indigo-50/20 text-indigo-950">Pre-Finals</th>
                  <th className="p-4 text-center bg-indigo-50/20 text-indigo-950">Finals</th>
                  <th className="p-4 text-center font-extrabold text-indigo-600 bg-indigo-50/40">Gen Avg</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => {
                    const activeSubjects = student[activeGradeLevel][activeSemester];
                    const hasSubjects = activeSubjects && activeSubjects.length > 0;
                    const isExpanded = !!expandedStudents[student.id];
                    
                    const displayedSubjects = !hasSubjects 
                      ? [] 
                      : isExpanded 
                        ? activeSubjects 
                        : [activeSubjects[0]];

                    return displayedSubjects.map((subject, sIdx) => (
                      <tr key={`${student.id}-${subject.subjectCode}`} className="hover:bg-gray-50/40 transition-colors group">
                        {sIdx === 0 && (
                          <td className="p-4 align-top border-r border-gray-100/70" rowSpan={displayedSubjects.length}>
                            <p className="font-bold text-gray-800">{student.lastName}, {student.firstName} {student.middleName ? `${student.middleName.charAt(0)}.` : ""}</p>
                            <p className="text-[11px] text-gray-400 font-medium mb-2">{student.studentNumber}</p>
                            {hasSubjects && activeSubjects.length > 1 && (
                              <button
                                onClick={() => toggleExpandStudent(student.id)}
                                className="text-[11px] flex items-center gap-1 font-bold text-slate-500 hover:text-indigo-600 transition-colors bg-slate-100 px-2 py-1 rounded"
                              >
                                {isExpanded ? "▲ Hide Subjects" : `▼ See All (${activeSubjects.length})`}
                              </button>
                            )}
                          </td>
                        )}
                        <td className="p-4 font-medium text-gray-700">
                          <p className="text-xs font-bold text-slate-900">{subject.subjectName}</p>
                          <p className="text-[10px] text-gray-400 font-mono uppercase">{subject.subjectCode}</p>
                        </td>
                        <td className="p-4 text-center font-bold text-indigo-700 text-xs">
                          <span className="bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md">
                            {student.programStrand}
                          </span>
                        </td>
                        <td className="p-4 text-center font-medium text-gray-800 bg-indigo-50/10">
                          {subject.prelim !== null ? subject.prelim : "—"}
                        </td>
                        <td className="p-4 text-center font-medium text-gray-800 bg-indigo-50/10">
                          {subject.midterm !== null ? subject.midterm : "—"}
                        </td>
                        <td className="p-4 text-center font-medium text-gray-800 bg-indigo-50/10">
                          {subject.preFinals !== null ? subject.preFinals : "—"}
                        </td>
                        <td className="p-4 text-center font-medium text-gray-800 bg-indigo-50/10">
                          {subject.finals !== null ? subject.finals : "—"}
                        </td>
                        <td className="p-4 text-center font-black text-indigo-700 bg-indigo-50/20">
                          {subject.finalGrade !== null ? subject.finalGrade : "—"}
                        </td>
                        <td className="p-4 text-center">
                          <span className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md ${
                            subject.remarks === "Passed" ? "bg-green-100 text-green-700" :
                            subject.remarks === "Failed" ? "bg-red-100 text-red-700" :
                            subject.remarks === "Incomplete" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-400"
                          }`}>
                            {subject.remarks}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleOpenGradeModal(student, subject.subjectCode)}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/0 group-hover:bg-indigo-50 px-2.5 py-1 rounded transition-colors"
                          >
                            Modify Grades
                          </button>
                        </td>
                      </tr>
                    ));
                  })
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center p-8 text-gray-400 text-xs italic">
                      No matching historical subject records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {isEditModalOpen && selectedStudent && getEditingSubject() && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 max-w-md w-full overflow-hidden space-y-4">
            
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-4 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold">Modify Performance Grades</h2>
                  <p className="text-xs opacity-90 font-light">
                    {selectedStudent.firstName} {selectedStudent.lastName} ({selectedStudent.studentNumber})
                  </p>
                  <p className="text-xs font-bold mt-1 text-yellow-200">
                    Subject: {getEditingSubject()?.subjectName}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest bg-white/20 px-2 py-0.5 rounded-md">
                  {selectedStudent.programStrand} | {activeGradeLevel === "grade11" ? "G11" : "G12"}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Prelim</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={getEditingSubject()?.prelim ?? ""}
                    onChange={(e) => handleGradeInputChange("prelim", e.target.value)}
                    className="w-full font-semibold text-gray-800 text-sm border border-gray-200 rounded px-2 py-1.5 bg-gray-50/50 outline-none focus:border-indigo-400"
                    placeholder="0-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Midterm</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={getEditingSubject()?.midterm ?? ""}
                    onChange={(e) => handleGradeInputChange("midterm", e.target.value)}
                    className="w-full font-semibold text-gray-800 text-sm border border-gray-200 rounded px-2 py-1.5 bg-gray-50/50 outline-none focus:border-indigo-400"
                    placeholder="0-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Pre-Finals</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={getEditingSubject()?.preFinals ?? ""}
                    onChange={(e) => handleGradeInputChange("preFinals", e.target.value)}
                    className="w-full font-semibold text-gray-800 text-sm border border-gray-200 rounded px-2 py-1.5 bg-gray-50/50 outline-none focus:border-indigo-400"
                    placeholder="0-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Finals</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={getEditingSubject()?.finals ?? ""}
                    onChange={(e) => handleGradeInputChange("finals", e.target.value)}
                    className="w-full font-semibold text-gray-800 text-sm border border-gray-200 rounded px-2 py-1.5 bg-gray-50/50 outline-none focus:border-indigo-400"
                    placeholder="0-100"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 grid grid-cols-2 gap-2 text-center">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Calculated Final</p>
                  <p className="text-lg font-black text-indigo-700">
                    {getEditingSubject()?.finalGrade ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Status Outcome</p>
                  <p className={`text-sm font-black uppercase tracking-wide mt-0.5 ${
                    getEditingSubject()?.remarks === "Passed" ? "text-green-600" :
                    getEditingSubject()?.remarks === "Failed" ? "text-red-600" : "text-gray-400"
                  }`}>
                    {getEditingSubject()?.remarks}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-2 border-t border-gray-100">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-200 text-gray-700 py-1.5 px-4 rounded-lg hover:bg-gray-300 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGrades}
                className="bg-indigo-600 text-white py-1.5 px-4 rounded-lg hover:bg-indigo-700 text-sm font-semibold transition-colors shadow-sm"
              >
                Save Grades
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}