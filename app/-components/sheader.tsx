export default function Header() {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm z-10">
      <h1 className="text-xl font-bold text-gray-800">Portal</h1>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-gray-700 leading-none">Jb Ramirez</p>
          <p className="text-xs text-gray-500 mt-1">ID: 2024-001</p>
        </div>
        {/* You could add an Avatar here later */}
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
          JR
        </div>
      </div>
    </header>
  );
}