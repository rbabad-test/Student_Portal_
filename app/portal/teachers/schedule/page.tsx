"use client";

import { useState } from "react";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 p-2 md:p-10 font-sans">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform scale-[0.98] lg:scale-100">
        
        {/* Reduced Black Header */}
        <div className="bg-black text-white text-center py-4 md:py-6 border-b border-gray-800">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em]">First Semester</h1>
          <p className="text-[9px] font-bold op acity-50 mt-1 uppercase tracking-[0.4em]">Class Schedule</p>
        </div>

        {/* Table Container */}
        <div className="p-4 md:p-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[800px]">
            <thead>
              <tr>
                {['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <th key={day} className="bg-black text-white p-3 text-center font-black border border-gray-800 uppercase tracking-widest text-[9px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 12:00 - 1:00 PM */}
              <tr>
                <td className={timeClass}>12:00 - 1:00</td>
                <Cell color="green" subject="Physics" teacher="Mr. Santos" room="Lab 1" />
                <Cell color="blue" subject="Algebra" teacher="Ms. Garcia" room="Room 101" />
                <Cell color="orange" subject="Grammar" teacher="Ms. Rodriguez" room="Room 103" />
                <Cell color="pink" subject="Philippine History" teacher="Mr. Lopez" room="Room 104" />
                <Cell color="purple" subject="Health" teacher="Mr. dela Cruz" room="Room 105" />
              </tr>

              {/* 1:00 - 2:00 PM */}
              <tr>
                <td className={timeClass}>1:00 - 2:00</td>
                <Cell color="teal" subject="ICT" teacher="Ms. Torres" room="Computer Lab" />
                <Cell color="green" subject="Biology" teacher="Ms. Tan" room="Lab 3" />
                <Cell color="teal" subject="ICT" teacher="Ms. Torres" room="Computer Lab" />
                <Cell color="orange" subject="Creative Writing" teacher="Ms. Rodriguez" room="Room 103" />
                <Cell color="blue" subject="Trigonometry" teacher="Ms. Garcia" room="Room 101" />
              </tr>

              {/* 2:00 - 3:00 PM - LUNCH BREAK */}
              <tr>
                <td className={timeClass}>2:00 - 3:00</td>
                <td colSpan={5} className="bg-yellow-50/50 text-center p-4 border border-yellow-100">
                   <div className="text-yellow-700 font-black uppercase tracking-[0.4em] text-[10px] italic">Lunch Break</div>
                </td>
              </tr>

              {/* 3:00 - 4:00 PM */}
              <tr>
                <td className={timeClass}>3:00 - 4:00</td>
                <Cell color="orange" subject="Literature" teacher="Ms. Rodriguez" room="Room 103" />
                <Cell color="pink" subject="World History" teacher="Mr. Lopez" room="Room 104" />
                <Cell color="blue" subject="Statistics" teacher="Ms. Garcia" room="Room 101" />
                <Cell color="green" subject="Physics" teacher="Mr. Santos" room="Lab 1" />
                <Cell color="teal" subject="Art" teacher="Ms. Chen" room="Art Room" />
              </tr>

              {/* 4:00 - 5:00 PM */}
              <tr>
                <td className={timeClass}>4:00 - 5:00</td>
                <Cell color="purple" subject="Physical Education" teacher="Mr. dela Cruz" room="Gym" />
                <Cell color="teal" subject="Music" teacher="Ms. Chen" room="Music Room" />
                <Cell color="green" subject="Chemistry" teacher="Mr. Santos" room="Lab 2" />
                <Cell color="blue" subject="Mathematics" teacher="Ms. Garcia" room="Room 101" />
                <Cell color="orange" subject="English" teacher="Ms. Rodriguez" room="Room 103" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 p-6 text-[8px] font-black uppercase tracking-[0.2em] border-t bg-gray-50/50">
          {legend.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color} border border-gray-200`}></div>
              <span className="text-gray-400">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type CellProps = {
  color: 'blue' | 'green' | 'orange' | 'pink' | 'purple' | 'teal';
  subject: string;
  teacher: string;
  room: string;
};

function Cell({ color, subject, teacher, room }: CellProps) {
  const colors: Record<CellProps['color'], string> = {
    blue: 'bg-blue-50/30',
    green: 'bg-green-50/30',
    orange: 'bg-orange-50/30',
    pink: 'bg-pink-50/30',
    purple: 'bg-purple-50/30',
    teal: 'bg-teal-50/30'
  };

  return (
    <td className={`border border-gray-100 p-3 text-center transition-all hover:bg-white cursor-default group ${colors[color]}`}>
      <div className="font-black text-gray-800 leading-tight uppercase text-[10px] tracking-tight">
        {subject}
      </div>
      <div className="text-[8px] text-gray-400 mt-1 font-bold italic tracking-tighter uppercase opacity-70">
        {teacher}
      </div>
      <div className="text-[8px] text-indigo-300 font-mono mt-0.5 font-black uppercase">
        {room}
      </div>
    </td>
  );
}

const legend = [
  { name: 'Mathematics', color: 'bg-blue-100' },
  { name: 'Science', color: 'bg-green-100' },
  { name: 'English', color: 'bg-orange-100' },
  { name: 'History', color: 'bg-pink-100' },
  { name: 'P.E./Health', color: 'bg-purple-100' },
  { name: 'Arts/ICT', color: 'bg-teal-100' },
  { name: 'Breaks', color: 'bg-yellow-100' }
];

const timeClass = 'bg-gray-50 font-black text-gray-400 p-3 text-center border border-gray-100 text-[9px] tracking-tighter border-r-gray-200';