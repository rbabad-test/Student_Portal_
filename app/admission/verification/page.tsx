"use client";

import { useState } from "react";

export default function Page() {
  const [controlNumber, setControlNumber] = useState("");
  const [error, setError] = useState(false);

  const checkAccess = () => {
    if (controlNumber === "123456") {
      alert("Access granted!");
      window.location.href = "/admission/enrollment";
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">
          Access Control
        </h1>

        <p className="text-gray-600 mb-4">
          Please enter your control number:
        </p>

        <input
          type="text"
          placeholder="Enter control number"
          value={controlNumber}
          onChange={(e) => {
            setControlNumber(e.target.value);
            setError(false);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={checkAccess}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition duration-200"
        >
          Submit
        </button>

        <a
          href="/admission/registration"
          className="block w-full mt-3 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md transition duration-200 text-center"
        >
          Back
        </a>

        {error && (
          <div className="text-red-500 mt-4">
            Invalid control number. Access denied.
          </div>
        )}
      </div>
    </div>
  );
}