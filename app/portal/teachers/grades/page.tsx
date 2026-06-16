"use client";
import React, { useState } from 'react';

const GradingSheet = () => {
  const [selectedCode, setSelectedCode] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [grades, setGrades] = useState<{ [key: string]: number[] }>({});

  const schedules = [
    { code: "202500001", subject: "Mathematics", students: ["Dela Cruz, Juan", "Rizal, Jose", "Bonifacio, Andres"] },
    { code: "202500002", subject: "World History", students: ["Luna, Antonio", "Silang, Gabriela"] }
  ];

  const activeClass = schedules.find(s => s.code === selectedCode);

  const updateGradeState = (studentName: string, colIndex: number, val: number) => {
    setGrades(prev => {
      const studentGrades = prev[studentName] || [60, 60, 60, 60];
      const newGrades = [...studentGrades];
      newGrades[colIndex] = val;
      return { ...prev, [studentName]: newGrades };
    });
  };

  const handleGradeChange = (studentName: string, colIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const finalValue = value > 100 ? 100 : isNaN(value) ? 0 : value;
    updateGradeState(studentName, colIndex, finalValue);
  };

  const validateMin = (studentName: string, colIndex: number, e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value < 60 || isNaN(value)) {
      updateGradeState(studentName, colIndex, 60);
    }
  };

  const handleSubmit = () => {
    alert(`Grades for Schedule Code ${selectedCode} submitted successfully!`);
    console.log("Submitted Grades Data:", grades);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <div className="bg-white border-t-4 border-[#FFD700] p-6 rounded-xl shadow-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#856404] tracking-tight">Grading Management</h1>
            <p className="text-gray-500 font-medium italic">School Year 2026-2027</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={selectedCode} 
              onChange={(e) => setSelectedCode(e.target.value)}
              className="bg-gray-50 border-2 border-[#FFD700] text-gray-700 text-sm rounded-lg focus:ring-[#FFD700] block p-2.5 outline-none font-bold"
            >
              <option value="">Choose Schedule Code</option>
              {schedules.map(s => <option key={s.code} value={s.code}>{s.code}</option>)}
            </select>

            {activeClass && (
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2.5 rounded-lg font-bold text-white transition-all shadow-md transform active:scale-95 ${
                  isEditing ? "bg-[#28a745] hover:bg-[#218838]" : "bg-[#FFD700] hover:bg-[#e6c200] text-[#856404]"
                }`}
              >
                {isEditing ? "✓ Save Changes" : "✎ Edit Grades"}
              </button>
            )}
          </div>
        </div>

        {activeClass ? (
          <div className="space-y-6">
            
            <div className="bg-[#FFF9C4] p-5 rounded-xl border border-[#FBC02D] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div>
                  <h3 className="font-bold text-[#856404]">Grading Sheet Record</h3>
                </div>
              </div>
              <input 
                type="file" 
                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#28a745] file:text-white hover:file:bg-[#218838] cursor-pointer"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-[#28a745] p-4 flex justify-between items-center">
                <h2 className="text-white font-bold text-lg">
                  {activeClass.subject} — {activeClass.code}
                </h2>
                <span className="bg-white text-[#28a745] text-xs font-black px-3 py-1 rounded-full uppercase">
                  {activeClass.students.length} Enrolled
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-[#FFFDE7] text-[#856404] uppercase text-xs font-black border-b border-[#FFD700]">
                      <th className="px-6 py-5">Student Name</th>
                      <th className="px-6 py-5 text-center">Prelim</th>
                      <th className="px-6 py-5 text-center">Midterm</th>
                      <th className="px-6 py-5 text-center">Pre-Final</th>
                      <th className="px-6 py-5 text-center">Final</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {activeClass.students.map((name, sIndex) => {
                      const studentGrades = grades[name] || [60, 60, 60, 60];
                      return (
                        <tr key={sIndex} className="hover:bg-[#FFFDE7]/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-700">{name}</td>
                          {studentGrades.map((gradeValue, colIndex) => (
                            <td key={colIndex} className="px-6 py-4 text-center">
                              {isEditing ? (
                                <input 
                                  type="number" 
                                  value={gradeValue}
                                  onChange={(e) => handleGradeChange(name, colIndex, e)}
                                  onBlur={(e) => validateMin(name, colIndex, e)}
                                  className="w-20 bg-white border-2 border-[#FFD700] text-gray-900 text-center text-sm rounded-lg focus:ring-2 focus:ring-[#28a745] p-2 outline-none font-bold" 
                                />
                              ) : (
                                <span className={`inline-block min-w-[40px] py-1 px-2 rounded-md font-black ${
                                  gradeValue >= 85 ? "text-[#155724] bg-[#d4edda]" : 
                                  gradeValue >= 75 ? "text-[#856404] bg-[#fff3cd]" : 
                                  "text-[#721c24] bg-[#f8d7da]"
                                }`}>
                                  {gradeValue}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#e9ecef] p-3 rounded-lg text-center">
              <p className="text-[#6c757d] text-[11px] font-bold uppercase tracking-widest">
                Automatic Constraint: Min 60 | Max 100
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSubmit}
                disabled={isEditing}
                className={`w-full md:w-auto px-10 py-3.5 rounded-xl font-black text-white tracking-wide shadow-lg transition-all transform active:scale-95 ${
                  isEditing
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                    : "bg-[#856404] hover:bg-[#6c5103]"
                }`}
              >
                Submit Final Grades
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border-4 border-double border-[#FFD700] rounded-2xl py-32 text-center shadow-inner">
            <div className="text-[#FFD700] text-7xl mb-4 opacity-50">🎓</div>
            <p className="text-[#856404] font-black text-xl">Please select a schedule code to display the roster.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradingSheet;