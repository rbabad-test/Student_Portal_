import React from 'react';

const SettingsPage = () => {
  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">Profile Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Display Name</label>
            <input type="text" defaultValue="Mr. Sean Santiago" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" defaultValue="sean.santiago@school.edu" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
        <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;