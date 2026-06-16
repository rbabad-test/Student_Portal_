"use client";

import React from "react";

interface CellProps {
  color: 'blue' | 'green' | 'orange' | 'pink' | 'purple' | 'teal';
  subject: string;
  teacher: string;
  room: string;
}

export default function Page() {
  const timeClass = 'bg-gray-50 font-black text-gray-400 p-3 text-center border border-gray-100 text-[9px] tracking-tighter border-r-gray-200';

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-slate-100 to-slate-300 p-2 md:p-10 font-sans gap-8">
      
      {/* CLASS SCHEDULE VISUALIZER */}
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="bg-black text-white text-center py-4 md:py-6 border-b border-gray-800">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em]">Weekly Time Grid</h1>
          <p className="text-[9px] font-bold opacity-50 mt-1 uppercase tracking-[0.4em]">Grade 11 - Academic Track</p>
        </div>

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
              <tr>
                <td className={timeClass}>12:00 - 1:00</td>
                <Cell color="blue" subject="General Math" teacher="Mr. Santos" room="R-201" />
                <Cell color="green" subject="Earth Science" teacher="Ms. Garcia" room="Lab 2" />
                <Cell color="orange" subject="Philosophy" teacher="Ms. Rodriguez" room="R-103" />
                <Cell color="blue" subject="General Math" teacher="Mr. Santos" room="R-201" />
                <Cell color="green" subject="Earth Science" teacher="Ms. Garcia" room="Lab 2" />
              </tr>
              <tr>
                <td className={timeClass}>1:00 - 2:00</td>
                <Cell color="teal" subject="Programming 1" teacher="Ms. Torres" room="CL-A" />
                <Cell color="pink" subject="Research 1" teacher="Mr. Lopez" room="Library" />
                <Cell color="teal" subject="Programming 1" teacher="Ms. Torres" room="CL-A" />
                <Cell color="pink" subject="Research 1" teacher="Mr. Lopez" room="Library" />
                <Cell color="orange" subject="Philosophy" teacher="Ms. Rodriguez" room="R-103" />
              </tr>
              <tr>
                <td className={timeClass}>2:00 - 3:00</td>
                <td colSpan={5} className="bg-yellow-50/50 text-center p-4 border border-yellow-100">
                   <div className="text-yellow-700 font-black uppercase tracking-[0.4em] text-[10px] italic">Lunch Break</div>
                </td>
              </tr>
              <tr>
                <td className={timeClass}>3:00 - 4:00</td>
                <Cell color="orange" subject="Oral Comm" teacher="Ms. Evangelista" room="AVR" />
                <Cell color="pink" subject="Komunikasyon" teacher="Mr. Bautista" room="R-105" />
                <Cell color="orange" subject="Oral Comm" teacher="Ms. Evangelista" room="AVR" />
                <Cell color="pink" subject="Komunikasyon" teacher="Mr. Bautista" room="R-105" />
                <Cell color="teal" subject="Computer Concepts" teacher="Ms. Torres" room="CL-B" />
              </tr>
              <tr>
                <td className={timeClass}>4:00 - 5:00</td>
                <Cell color="purple" subject="Physical Education" teacher="Mr. dela Cruz" room="Gym" />
                <Cell color="teal" subject="Computer Concepts" teacher="Ms. Torres" room="CL-B" />
                <Cell color="blue" subject="General Math" teacher="Mr. Santos" room="R-201" />
                <Cell color="purple" subject="Physical Education" teacher="Mr. dela Cruz" room="Gym" />
                <Cell color="orange" subject="Oral Comm" teacher="Ms. Evangelista" room="AVR" />
              </tr>
            </tbody>
          </table>
        </div>

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
    <td className={`border border-gray-100 p-3 text-center transition-all hover:bg-white cursor-default ${colors[color]}`}>
      <div className="font-black text-gray-800 leading-tight uppercase text-[10px] tracking-tight">{subject}</div>
      <div className="text-[8px] text-gray-400 mt-1 font-bold italic uppercase opacity-70">{teacher}</div>
      <div className="text-[8px] text-indigo-300 font-mono mt-0.5 font-black uppercase">{room}</div>
    </td>
  );
}

const legend = [
  { name: 'Core Math', color: 'bg-blue-100' },
  { name: 'Science', color: 'bg-green-100' },
  { name: 'HumSS / Philosophy', color: 'bg-orange-100' },
  { name: 'Research / Wika', color: 'bg-pink-100' },
  { name: 'P.E. & Health', color: 'bg-purple-100' },
  { name: 'ICT / Programming', color: 'bg-teal-100' },
];