import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Timer, 
  Bookmark, 
  Settings, 
  LayoutDashboard,
  CheckCircle2,
  Shuffle
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, courseInfo, bookmarksCount, answeredCount, totalCount }) {
  return (
    <header className="sticky top-0 z-40 bg-[#0e0b16]/70 border-b border-white/10 backdrop-blur-xl text-[#f1ecff] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-17">
          {/* SRE Copilot Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6e46e6] to-[#a78bfa] flex items-center justify-center shadow-[0_0_18px_rgba(110,70,230,0.5)] text-white group-hover:scale-105 transition duration-200 border border-white/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#6e46e6]/20 border border-[#6e46e6]/40 text-[#c4b5fd]">
                  NPTEL / SWAYAM
                </span>
                <span className="text-xs text-[#8c859f] font-mono hidden sm:inline">
                  {courseInfo?.courseCode || 'NOC26-HS'}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-[#f1ecff] truncate max-w-xs sm:max-w-md md:max-w-xl group-hover:text-[#c4b5fd] transition">
                {courseInfo?.courseName || 'Environment and Development'}
              </h1>
            </div>
          </div>

          {/* Quick Metrics & Nav Links */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Answered Progress Pill */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full sre-glass-subcard text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399]" />
              <span className="text-[#8c859f]">Solved:</span>
              <span className="font-semibold text-[#34d399] font-mono">{answeredCount}/{totalCount}</span>
            </div>

            {/* Bookmarks Pill */}
            <button 
              onClick={() => setActiveTab('practice')}
              title="View Bookmarked Questions"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl sre-glass-subcard text-xs font-semibold text-[#fbbf24] hover:border-[#fbbf24]/50 transition"
            >
              <Bookmark className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
              <span className="font-mono">{bookmarksCount}</span>
            </button>

            {/* Question Manager Pill */}
            <button
              onClick={() => setActiveTab('manager')}
              title="Manage & Import Questions"
              className={`p-2 rounded-xl text-xs font-medium border transition ${
                activeTab === 'manager' 
                  ? 'bg-[#6e46e6] text-white border-[#6e46e6] shadow-[0_0_16px_rgba(110,70,230,0.5)]' 
                  : 'sre-glass-subcard text-[#8c859f] hover:text-[#f1ecff]'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1.5 border-t border-white/10 pt-1.5 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-white/15 text-white border border-white/25 shadow-lg backdrop-blur-md'
                : 'text-[#8c859f] hover:text-[#c4b5fd] hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              activeTab === 'practice'
                ? 'bg-white/15 text-white border border-white/25 shadow-lg backdrop-blur-md'
                : 'text-[#8c859f] hover:text-[#c4b5fd] hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Week-Wise Practice</span>
          </button>

          <button
            onClick={() => setActiveTab('week-test')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              activeTab === 'week-test'
                ? 'bg-white/15 text-white border border-white/25 shadow-lg backdrop-blur-md'
                : 'text-[#8c859f] hover:text-[#c4b5fd] hover:bg-white/5'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Week Test</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] uppercase tracking-wider font-bold bg-[#6e46e6]/30 text-[#c4b5fd] border border-[#6e46e6]/40">
              Shuffled
            </span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              activeTab === 'exam'
                ? 'sre-btn-primary'
                : 'text-[#c4b5fd] bg-[#6e46e6]/15 hover:bg-[#6e46e6]/25 border border-[#6e46e6]/30 backdrop-blur-md'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Mock Examination</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] uppercase tracking-wider font-bold bg-white/20 text-white">
              CBT
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
