// components/DashboardPage.tsx

export default function DashboardPage() {
  const stats = [
    { 
      label: 'Active Teachers', 
      value: '26', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-100', 
      trend: 'All verified', 
      up: true,
      svg: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.174L10.74 12.5a.75.75 0 0 0 .52 0l6.48-2.326m-13.48 0L3 9.375l9-3.75 9 3.75-1.26.524m-12.48 2.523v3.546c0 .542.472.946 1.011.838 1.64-.33 3.29-.514 4.989-.551a37.883 37.883 0 0 1 4.989.551c.539.108 1.011-.296 1.011-.838V10.174m-12.48 2.523L12 15.25l6-2.553" />
    },
    { 
      label: 'Upcoming Events', 
      value: '2', 
      color: 'text-blue-600', 
      bg: 'bg-blue-100', 
      trend: 'Updated', 
      up: true,
      svg: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-12-11.25h.008v.008H9V7.5zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zM12 7.5h.008v.008H12V7.5zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm1.125 4.5h.008v.008H13.5V12zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm1.5 0h.008v.008H15V12zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm-3.75 3h.008v.008H11.25v-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm1.5 0h.008v.008H12.75v-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm1.5 0h.008v.008H14.25v-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z" />
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  {stat.svg}
                </svg>
              </div>
            </div>
            <div className={`mt-4 flex items-center text-xs font-semibold ${stat.up ? 'text-emerald-500' : 'text-amber-500'}`}>
              {stat.up && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="mr-1 size-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              )}
              {stat.trend}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ActivityItemProps {
  svgPath: React.ReactNode;
  color: string;
  bg: string;
  title: string;
  desc: string;
  time: string;
}

function ActivityItem({ svgPath, color, bg, title, desc, time }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className={`rounded-full p-2.5 ${bg} ${color}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          {svgPath}
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
        <p className="mt-1 text-[10px] font-medium text-slate-400 uppercase tracking-wider">{time}</p>
      </div>
    </div>
  );
}