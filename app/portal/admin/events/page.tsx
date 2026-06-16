"use client";

import { useState } from "react";

type CalendarEvent = {
  title: string;
  color: string;
  startTime: string;
  endTime: string;
};

export default function CalendarModule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [events, setEvents] = useState<
    Record<string, CalendarEvent[]>
  >({
    "2026-05-05": [
      {
        title: "Recognition Day",
        color: "bg-blue-500",
        startTime: "09:00 AM",
        endTime: "11:00 AM",
      },
    ],

    "2026-05-12": [
      {
        title: "Sports Fest",
        color: "bg-red-500",
        startTime: "10:00 AM",
        endTime: "02:00 PM",
      },
    ],
  });

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("bg-blue-500");

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const changeMonth = (dir: number) => {
    setCurrentDate(new Date(year, month + dir, 1));
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-pink-500",
  ];

  const saveEvent = () => {
    if (!selectedDay || !title) return;

    const dateKey = `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(selectedDay).padStart(2, "0")}`;

    setEvents((prev) => {
      const dayEvents = prev[dateKey] || [];

      if (editIndex !== null) {
        const updated = [...dayEvents];

        updated[editIndex] = {
          title,
          color,
          startTime,
          endTime,
        };

        return {
          ...prev,
          [dateKey]: updated,
        };
      }

      const newEvent: CalendarEvent = {
        title,
        color,
        startTime,
        endTime,
      };

      return {
        ...prev,
        [dateKey]: [...dayEvents, newEvent],
      };
    });

    setTitle("");
    setStartTime("");
    setEndTime("");
    setColor("bg-blue-500");

    setSelectedDay(null);
    setEditIndex(null);
  };

  const cells = [];

  let day = 1;

  for (let row = 0; row < 6; row++) {
    const cols = [];

    for (let col = 0; col < 7; col++) {
      if (
        (row === 0 && col < firstDay) ||
        day > daysInMonth
      ) {
        cols.push(
          <td
            key={`${row}-${col}`}
            className="border border-slate-100 h-32 bg-slate-50"
          />
        );
      } else {
        const currentDay = day;

        const dateKey = `${year}-${String(
          month + 1
        ).padStart(2, "0")}-${String(day).padStart(
          2,
          "0"
        )}`;

        cols.push(
          <td
            key={day}
            onClick={() => {
              setSelectedDay(currentDay);
              setEditIndex(null);

              setTitle("");
              setStartTime("");
              setEndTime("");
              setColor("bg-blue-500");
            }}
            className="border border-slate-100 h-32 align-top p-2 cursor-pointer hover:bg-slate-50 transition"
          >
            <div className="text-sm font-bold text-slate-700 mb-2">
              {day}
            </div>

            <div className="space-y-1">
              {events[dateKey]?.map((event, index) => (
                <div
                  key={index}
                  className={`${event.color} text-white text-[10px] px-2 py-1 rounded-lg`}
                >
                  <div className="font-semibold truncate">
                    {event.title}
                  </div>

                  <div className="text-[9px] opacity-90">
                    {event.startTime} - {event.endTime}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      setSelectedDay(currentDay);

                      setTitle(event.title);
                      setStartTime(event.startTime);
                      setEndTime(event.endTime);
                      setColor(event.color);

                      setEditIndex(index);
                    }}
                    className="mt-1 text-[9px] opacity-80 hover:opacity-100"
                  >
                    ✏️ Edit
                  </button>
                </div>
              ))}
            </div>
          </td>
        );

        day++;
      }
    }

    cells.push(<tr key={row}>{cols}</tr>);
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm md:text-lg font-black text-slate-800 tracking-tight">
          {monthNames[month]}{" "}
          <span className="text-slate-300 font-light">
            {year}
          </span>
        </h3>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => changeMonth(-1)}
            className="px-3 py-1 text-[10px] font-bold text-slate-500 hover:text-black"
          >
            Prev
          </button>

          <button
            onClick={goToday}
            className="px-3 py-1 text-[10px] font-black uppercase bg-white text-blue-600 shadow-sm rounded-lg mx-1"
          >
            Today
          </button>

          <button
            onClick={() => changeMonth(1)}
            className="px-3 py-1 text-[10px] font-bold text-slate-500 hover:text-black"
          >
            Next
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(241,245,249,1)]">
          <thead>
            <tr className="bg-slate-50/50">
              {[
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ].map((d) => (
                <th
                  key={d}
                  className="p-2 md:p-3 text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{cells}</tbody>
        </table>
      </div>

      {selectedDay && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-2xl w-80 shadow-xl">

            <h2 className="font-bold mb-3 text-slate-800">
              {editIndex !== null
                ? "Edit Event"
                : "Add Event"}{" "}
              — {monthNames[month]} {selectedDay},{" "}
              {year}
            </h2>

            <input
              className="border border-slate-200 p-2 w-full mb-2 rounded-lg"
              placeholder="Event title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <input
              className="border border-slate-200 p-2 w-full mb-2 rounded-lg"
              placeholder="Start Time"
              value={startTime}
              onChange={(e) =>
                setStartTime(e.target.value)
              }
            />

            <input
              className="border border-slate-200 p-2 w-full mb-3 rounded-lg"
              placeholder="End Time"
              value={endTime}
              onChange={(e) =>
                setEndTime(e.target.value)
              }
            />

            <div className="flex gap-2 flex-wrap mb-4">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full ${c} ${
                    color === c
                      ? "ring-2 ring-black"
                      : ""
                  }`}
                />
              ))}
            </div>

            <button
              onClick={saveEvent}
              className="bg-blue-500 hover:bg-blue-600 transition text-white w-full py-2 rounded-xl font-semibold"
            >
              {editIndex !== null
                ? "Update Event"
                : "Add Event"}
            </button>

            <button
              onClick={() => {
                setSelectedDay(null);

                setTitle("");
                setStartTime("");
                setEndTime("");
                setColor("bg-blue-500");

                setEditIndex(null);
              }}
              className="mt-2 text-sm text-slate-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}