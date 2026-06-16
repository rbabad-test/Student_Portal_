"use client";

import React from 'react';
import Link from 'next/link';


const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', href: '/portal/admin/dashboard', icon: <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /> },
    { name: 'Manage Teachers', href: '/portal/admin/manage-teachers', icon: <path d="M4.26 10.174L10.74 12c.38.1.74-.14.74-.53V3.84c0-.38-.34-.65-.7-.57L4.3 4.44a.6.6 0 00-.46.58v4.57c0 .28.2.53.42.58zM19.74 10.174L13.26 12c-.38.1-.74-.14-.74-.53V3.84c0-.38.34-.65.7-.57l6.44 1.17c.28.05.46.3.46.58v4.57c0 .28-.2.53-.42.58z" /> },
    { name: 'View Schedule', href: '/portal/admin/manage-schedule', icon: <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75" /> },
    { name: 'Manage Subjects', href: '/portal/admin/manage-subjects', icon: <path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15" /> },
    { name: 'Events', href: '/portal/admin/events', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-12-11.25h.008v.008H9V7.5zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zM12 7.5h.008v.008H12V7.5zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm1.125 4.5h.008v.008H13.5V12zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm1.5 0h.008v.008H15V12zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm-3.75 3h.008v.008H11.25v-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm1.5 0h.008v.008H12.75v-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm1.5 0h.008v.008H14.25v-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z" />}
  ];

  const handleLogout = () => {
    console.log("User logged out");
    window.location.href = '/portal/log-in'; 
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-yellow-400 text-yellow-950 flex flex-col z-50 shadow-lg">
      <div className="p-6 border-b border-yellow-500/30">
        <h2 className="text-xl font-black tracking-tighter uppercase">Admins Portal</h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-yellow-500/40 transition-all group"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-5 h-5 text-yellow-900/70 group-hover:text-yellow-950"
                >
                  {item.icon}
                </svg>
                <span className="text-sm font-bold">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 px-6 border-t border-yellow-500/30">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 py-3 px-2 rounded-lg hover:bg-red-500 hover:text-white transition-all group font-bold text-sm text-left"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;