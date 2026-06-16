"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/portal/teachers/dashboard', icon: 'fas fa-tachometer-alt' },
  { name: 'Grades', href: '/portal/teachers/grades', icon: 'fas fa-graduation-cap' },
  { name: 'Schedule', href: '/portal/teachers/schedule', icon: 'fas fa-calendar-alt' },
  { name: 'Master List', href: '/portal/teachers/masterlist', icon: 'fas fa-users' },
  { name: 'Settings', href: '/portal/teachers/settings', icon: 'fas fa-cog' },
];

// ... (imports and navItems same)
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-yellow-400 text-yellow-950 flex flex-col h-full shrink-0 shadow-lg border-r border-yellow-500 font-sans">
      <div className="p-6 border-b border-yellow-600/30">
        <h1 className="text-xl font-bold uppercase tracking-tight">Teacher Portal</h1>
        <p className="text-sm font-bold opacity-60">Mr. Santiago</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-lg group ${
                    isActive ? 'bg-yellow-500/60 text-yellow-950 font-bold shadow-sm' : 'text-yellow-900/80 hover:bg-yellow-500/40 hover:text-yellow-950 font-bold'
                  }`}
                >
                  <i className={`${item.icon} w-5 h-5 flex items-center justify-center opacity-70 group-hover:opacity-100`}></i>
                  <span className="text-sm font-bold">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-yellow-600/30">
        <Link href="/portal/log-in" className="flex items-center gap-3 w-full px-4 py-3 text-red-700 hover:bg-red-600 hover:text-white transition-all rounded-lg font-bold text-sm">
          <i className="fas fa-sign-out-alt w-5 text-center"></i> 
          <span className="font-bold">Logout</span>
        </Link>
      </div>
    </aside>
  );
}