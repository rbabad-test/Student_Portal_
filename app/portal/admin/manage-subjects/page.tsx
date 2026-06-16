'use client';

import { useState } from 'react';

type ScheduleItem = {
  schedCode: string;
  specification: string;
  subjectName: string;
  yearSection: string;
  teacher: string;
  classTime: string;
  day: string;
  room: string;
};

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  const [form, setForm] = useState<ScheduleItem>({
    schedCode: '',
    specification: '',
    subjectName: '',
    yearSection: '',
    teacher: '',
    classTime: '',
    day: '',
    room: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // extra safety check (not just HTML required)
    const hasEmptyField = Object.values(form).some((val) => val.trim() === '');
    if (hasEmptyField) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    setSchedule([...schedule, form]);

    setForm({
      schedCode: '',
      specification: '',
      subjectName: '',
      yearSection: '',
      teacher: '',
      classTime: '',
      day: '',
      room: '',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Schedule Module</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border"
      >
        <input
          name="schedCode"
          value={form.schedCode}
          onChange={handleChange}
          placeholder="Sched Code"
          className="border p-2 rounded"
          required
        />

        {/* SPECIFICATION DROPDOWN */}
        <select
          name="specification"
          value={form.specification}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Specification</option>
          <option value="Core">Core</option>
          <option value="Applied">Applied</option>
          <option value="Specialized">Specialized</option>
          <option value="Other_Subjects">Other Subjects</option>
        </select>

        <input
          name="subjectName"
          value={form.subjectName}
          onChange={handleChange}
          placeholder="Subject Name"
          className="border p-2 rounded"
          required
        />

        <input
          name="yearSection"
          value={form.yearSection}
          onChange={handleChange}
          placeholder="Year & Section"
          className="border p-2 rounded"
          required
        />

        <input
          name="teacher"
          value={form.teacher}
          onChange={handleChange}
          placeholder="Teacher"
          className="border p-2 rounded"
          required
        />

        <input
          name="classTime"
          value={form.classTime}
          onChange={handleChange}
          placeholder="Class Time (e.g. 8:00 AM - 10:00 AM)"
          className="border p-2 rounded"
          required
        />

        {/* DAY DROPDOWN */}
        <select
          name="day"
          value={form.day}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>

        <input
          name="room"
          value={form.room}
          onChange={handleChange}
          placeholder="Room"
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Schedule
        </button>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Sched Code</th>
              <th className="p-2 border">Specification</th>
              <th className="p-2 border">Subject Name</th>
              <th className="p-2 border">Year & Section</th>
              <th className="p-2 border">Teacher</th>
              <th className="p-2 border">Class Time</th>
              <th className="p-2 border">Day</th>
              <th className="p-2 border">Room</th>
            </tr>
          </thead>

          <tbody>
            {schedule.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No schedules added yet.
                </td>
              </tr>
            ) : (
              schedule.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{item.schedCode}</td>
                  <td className="border p-2">{item.specification}</td>
                  <td className="border p-2">{item.subjectName}</td>
                  <td className="border p-2">{item.yearSection}</td>
                  <td className="border p-2">{item.teacher}</td>
                  <td className="border p-2">{item.classTime}</td>
                  <td className="border p-2">{item.day}</td>
                  <td className="border p-2">{item.room}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}