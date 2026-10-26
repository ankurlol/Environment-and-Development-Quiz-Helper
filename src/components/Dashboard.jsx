import React from 'react';
import { 
  BookOpen, 
  Timer, 
  CheckCircle2, 
  Bookmark, 
  ChevronRight, 
  Upload
} from 'lucide-react';

export default function Dashboard({ 
  courseData, 
  practiceProgress, 
  bookmarks, 
  onSelectWeek, 
  onStartExam, 
  onOpenManager 
}) {
  const { courseInfo, questions = [] } = courseData;
  const totalQuestions = questions.length;
  
  // Calculate stats
  const answeredIds = Object.keys(practiceProgress);
  const totalAnswered = answeredIds.length;
  const correctCount = answeredIds.filter((id) => practiceProgress[id]?.isCorrect).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  
  // Group questions by week
  const weekMap = {};
  for (let i = 1; i <= (courseInfo.totalWeeks || 12); i++) {
    weekMap[i] = [];
  }
  questions.forEach((q) => {
    const wk = q.week || 1;
    if (!weekMap[wk]) weekMap[wk] = [];
    weekMap[wk].push(q);
  });

  const weekList = Object.keys(weekMap).map(Number).sort((a, b) => a - b);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* SRE Copilot Authentic Glass Hero Card */}
      <div className="sre-glass-card p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="sre-pill-badge">
                Official Certification Prep
              </span>
              <span className="text-xs text-[#8c859f] font-mono bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                {courseInfo.courseCode}
              </span>
              <span className="text-xs text-[#c4b5fd] font-medium">
                {courseInfo.instructor}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#f1ecff]">
              {courseInfo.courseName}
            </h2>

            <p className="text-sm text-[#8c859f] leading-relaxed font-normal">
              Practice assignment quizzes week-by-week with verified solutions and explanations, or simulate the comprehensive final examination.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => onSelectWeek(1)}
              className="sre-btn-primary"
            >
              <BookOpen className="w-4 h-4" />
              <span>Practice Week 1</span>
            </button>
            <button
              onClick={onStartExam}
              className="sre-btn-ghost"
            >
              <Timer className="w-4 h-4 text-[#c4b5fd]" />
              <span>Launch Mock Exam</span>
            </button>
          </div>
        </div>

        {/* Stats Row with Frosted Subcards */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="p-3.5 sre-glass-subcard">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#f1ecff] font-mono">{totalQuestions}</div>
            <div className="text-xs font-medium text-[#8c859f] mt-0.5">Total Questions</div>
          </div>
          <div className="p-3.5 sre-glass-subcard">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#34d399] font-mono">{totalAnswered}</div>
            <div className="text-xs font-medium text-[#8c859f] mt-0.5">Attempted Questions</div>
          </div>
          <div className="p-3.5 sre-glass-subcard">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#c4b5fd] font-mono">{accuracy}%</div>
            <div className="text-xs font-medium text-[#8c859f] mt-0.5">Practice Accuracy</div>
          </div>
          <div className="p-3.5 sre-glass-subcard">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#fbbf24] font-mono">{bookmarks.length}</div>
            <div className="text-xs font-medium text-[#8c859f] mt-0.5">Bookmarked Items</div>
          </div>
        </div>
      </div>

      {/* Two Modes Cards with True Glassmorphic Depth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Week-Wise Practice */}
        <div className="sre-glass-card p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#6e46e6]/20 border border-[#6e46e6]/40 backdrop-blur-md flex items-center justify-center text-[#c4b5fd] mb-4 shadow-[0_0_18px_rgba(110,70,230,0.35)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-[#f1ecff]">Week-Wise Practice</h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-[#8c859f] border border-white/10">
                Self-Paced
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-[#8c859f] leading-relaxed">
              Study assignment questions organized week by week. Get instant answers, comprehensive academic explanations, and bookmark challenging items for review.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#8c859f]">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0" />
                <span>Instant answer check & verified solution reasoning</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0" />
                <span>Filter by unattempted, incorrect, or bookmarked items</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0" />
                <span>All {courseInfo.totalWeeks || 12} weeks systematically categorized</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10">
            <button
              onClick={() => onSelectWeek('all')}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl sre-btn-ghost text-xs font-semibold"
            >
              <span>Explore All Questions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Grand Random Mock Exam */}
        <div className="sre-glass-card p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#6e46e6]/20 border border-[#6e46e6]/40 backdrop-blur-md flex items-center justify-center text-[#c4b5fd] mb-4 shadow-[0_0_18px_rgba(110,70,230,0.35)]">
              <Timer className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-[#f1ecff]">Grand Mock Exam</h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#6e46e6]/20 text-[#c4b5fd] border border-[#6e46e6]/40">
                TCS iON Simulation
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-[#8c859f] leading-relaxed">
              Simulate the authentic computer-based test (CBT) environment. Contains randomized questions across all weeks, live timer, and the official question palette.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#8c859f]">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#c4b5fd] shrink-0" />
                <span>Official Question Palette (Answered, Review, Not Visited)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#c4b5fd] shrink-0" />
                <span>Configurable question count and countdown time limit</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#c4b5fd] shrink-0" />
                <span>Detailed scorecard and performance evaluation</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10">
            <button
              onClick={onStartExam}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl sre-btn-primary text-xs font-semibold"
            >
              <span>Launch Mock Test</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Assignments Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#f1ecff]">Weekly Assignments</h3>
            <p className="text-xs text-[#8c859f]">Select any week to begin practice</p>
          </div>
          <button
            onClick={onOpenManager}
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#8c859f] hover:text-[#f1ecff] sre-glass-subcard px-3.5 py-1.5 rounded-xl transition"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Manage Questions</span>
          </button>
        </div>

        {/* Grid of Weeks with Frosted Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {weekList.map((wk) => {
            const wkQuestions = weekMap[wk] || [];
            const wkTotal = wkQuestions.length;
            const wkAnswered = wkQuestions.filter((q) => practiceProgress[q.id]).length;
            const wkCorrect = wkQuestions.filter((q) => practiceProgress[q.id]?.isCorrect).length;
            const wkAccuracy = wkAnswered > 0 ? Math.round((wkCorrect / wkAnswered) * 100) : 0;
            const percentComplete = wkTotal > 0 ? Math.round((wkAnswered / wkTotal) * 100) : 0;

            return (
              <div
                key={wk}
                onClick={() => onSelectWeek(wk)}
                className="sre-glass-card p-5 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#c4b5fd] bg-[#6e46e6]/20 border border-[#6e46e6]/40 px-2 py-0.5 rounded">
                      Week {wk}
                    </span>
                    <span className="text-xs text-[#8c859f] font-mono">
                      {wkTotal} {wkTotal === 1 ? 'Question' : 'Questions'}
                    </span>
                  </div>

                  <h4 className="font-semibold text-[#f1ecff] text-sm group-hover:text-[#c4b5fd] transition">
                    Assignment {wk}
                  </h4>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[11px] text-[#8c859f] mb-1.5">
                      <span>Progress</span>
                      <span className="font-mono text-[#f1ecff]">{percentComplete}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden border border-white/5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          percentComplete === 100
                            ? 'bg-[#34d399]'
                            : percentComplete > 0
                            ? 'bg-[#6e46e6]'
                            : 'bg-transparent'
                        }`}
                        style={{ width: `${percentComplete}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#8c859f] text-[11px]">
                    {wkAnswered > 0 ? `${wkAccuracy}% Accuracy` : 'Not Started'}
                  </span>
                  <span className="font-semibold text-[#c4b5fd] group-hover:translate-x-0.5 transition flex items-center space-x-0.5 text-xs">
                    <span>Practice</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
