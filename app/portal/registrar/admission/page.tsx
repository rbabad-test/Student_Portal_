export default function EnrollmentPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Admission Requests</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Refresh</button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Strand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">APP2024001</td>
              <td className="px-6 py-4">Jb Ramirez</td>
              <td className="px-6 py-4">TVL-ICT</td>
              <td className="px-6 py-4"><span className="px-2 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span></td>
              <td className="px-6 py-4 text-blue-600 cursor-pointer">
                <a href="/portal/registrar/admission/information" className="text-blue-600 hover:underline">
                View
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}