export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-5 bg-gray-50">
      <div className="w-full max-w-3xl text-center">
        
        {/* Main Content Card */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-200">
          
          {/* Icon */}
          <div className="text-5xl mb-5 animate-bounce">📊</div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 relative mb-5 tracking-tight">
            Under Student Evaluation
            <span className="block w-24 h-1.5 bg-black mx-auto mt-4 rounded-full"></span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl font-medium text-gray-400 mb-8 uppercase tracking-widest">
            Assessment in Progress
          </p>

          {/* Progress bar */}
          <div className="w-4/5 mx-auto h-3 bg-gray-100 rounded-full overflow-hidden mb-8">
            <div className="h-full bg-black animate-pulse w-[65%]"></div>
          </div>

          {/* Messages */}
          <div className="space-y-4 px-4 mb-10">
            <p className="text-gray-600 text-lg leading-relaxed">
              We’re currently taking a closer look at your progress to make sure everything is on track.
               This standard review ensures you’re meeting all your requirements before you move forward with registration.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Please check back later for updates.
            </p>
          </div>

          {/* Contact */}
          <div className="border-t border-gray-100 pt-8 text-gray-400 text-sm italic">
            <p>For urgent inquiries, contact us:</p>
            <p className="font-bold not-italic text-gray-500 mt-1">SG2015gregorians@gmail.com | (046) 432-1680</p>
          </div>
        </div>


      </div>
    </main>
  );
}