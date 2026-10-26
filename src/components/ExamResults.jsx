import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  RotateCcw, 
  Sparkles, 
  Check, 
  X, 
  ChevronRight, 
  TrendingUp, 
  LayoutDashboard 
} from 'lucide-react';

export default function ExamResults({ result, onRetake, onGoToDashboard, onPracticeWeek }) {
  const [filterType, setFilterType] = useState('all');

  const {
    courseName,
    totalQuestions,
    totalMarks,
    totalScore,
    percentage,
    correctCount,
    incorrectCount,
    unattemptedCount,
    timeSpentSeconds,
    isTimeExpired,
    breakdown = [],
  } = result;

  useEffect(() => {
    if (percentage >= 60) {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  }, [percentage]);

  const getCertificateTier = (pct) => {
    if (pct >= 90) return { label: 'Elite + Gold Certification', badge: 'bg-[#fbbf24]/15 text-[#fbbf24] border-[#fbbf24]/30' };
    if (pct >= 75) return { label: 'Elite + Silver Certification', badge: 'bg-[#c4b5fd]/15 text-[#c4b5fd] border-[#c4b5fd]/30' };
    if (pct >= 60) return { label: 'Elite Certification', badge: 'bg-[#6e46e6]/15 text-[#c4b5fd] border-[#6e46e6]/30' };
    if (pct >= 40) return { label: 'Successfully Completed', badge: 'bg-[#34d399]/15 text-[#34d399] border-[#34d399]/30' };
    return { label: 'Needs Further Preparation', badge: 'bg-[#f87171]/15 text-[#f87171] border-[#f87171]/30' };
  };

  const tier = getCertificateTier(percentage);

  const weekStats = {};
  breakdown.forEach((item) => {
    const wk = item.question.week || 1;
    if (!weekStats[wk]) {
      weekStats[wk] = { total: 0, correct: 0 };
    }
    weekStats[wk].total += 1;
    if (item.isCorrect) weekStats[wk].correct += 1;
  });

  const filteredBreakdown = breakdown.filter((item) => {
    if (filterType === 'correct') return item.isCorrect;
    if (filterType === 'incorrect') return item.isAttempted && !item.isCorrect;
    if (filterType === 'unattempted') return !item.isAttempted;
    return true;
  });

  const formatMinutes = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Score Header Card */}
      <div className="sre-card p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${tier.badge}`}>
                {tier.label}
              </span>
              {isTimeExpired && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f87171]/15 text-[#f87171] border border-[#f87171]/30">
                  Time Expired
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f1ecff]">
              Examination Performance Evaluation
            </h2>
            <p className="text-sm text-[#8c859f] font-normal">
              Course: <strong className="text-[#f1ecff] font-medium">{courseName}</strong>
            </p>
          </div>

          {/* Big Score Display */}
          <div className="bg-[#1c1728] rounded-xl p-6 border border-[#2d263d] text-center shrink-0 flex flex-col items-center justify-center min-w-[200px]">
            <div className="text-4xl sm:text-5xl font-black text-[#c4b5fd] font-mono">
              {totalScore} <span className="text-2xl text-[#8c859f] font-normal">/ {totalMarks}</span>
            </div>
            <div className="text-xs font-semibold tracking-wider text-[#8c859f] uppercase mt-1">
              Final Score ({percentage}%)
            </div>
          </div>
        </div>

        {/* Performance Metrics Row */}
        <div className="mt-8 pt-6 border-t border-[#2d263d] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-[#1c1728] p-3.5 rounded-xl border border-[#2d263d]">
            <div className="text-xl sm:text-2xl font-bold text-[#34d399] font-mono">{correctCount}</div>
            <div className="text-xs text-[#8c859f] mt-0.5">Correct Answers</div>
          </div>
          <div className="bg-[#1c1728] p-3.5 rounded-xl border border-[#2d263d]">
            <div className="text-xl sm:text-2xl font-bold text-[#f87171] font-mono">{incorrectCount}</div>
            <div className="text-xs text-[#8c859f] mt-0.5">Incorrect</div>
          </div>
          <div className="bg-[#1c1728] p-3.5 rounded-xl border border-[#2d263d]">
            <div className="text-xl sm:text-2xl font-bold text-[#8c859f] font-mono">{unattemptedCount}</div>
            <div className="text-xs text-[#8c859f] mt-0.5">Unattempted</div>
          </div>
          <div className="bg-[#1c1728] p-3.5 rounded-xl border border-[#2d263d]">
            <div className="text-xl sm:text-2xl font-bold text-[#c4b5fd] font-mono">{formatMinutes(timeSpentSeconds)}</div>
            <div className="text-xs text-[#8c859f] mt-0.5">Time Elapsed</div>
          </div>
        </div>
      </div>

      {/* Week-Wise Accuracy Breakdown */}
      <div className="sre-card p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#f1ecff]">
              Weekly Performance Breakdown
            </h3>
            <p className="text-xs text-[#8c859f]">
              Identify syllabus topics that require further revision
            </p>
          </div>
          <TrendingUp className="w-5 h-5 text-[#c4b5fd]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(weekStats).map(([wk, stat]) => {
            const wkPct = Math.round((stat.correct / stat.total) * 100);
            return (
              <div
                key={wk}
                onClick={() => onPracticeWeek(Number(wk))}
                className="p-3.5 rounded-xl border border-[#2d263d] bg-[#1c1728] hover:border-[#6e46e6] transition cursor-pointer group flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-[#f1ecff] group-hover:text-[#c4b5fd] transition">
                    Week {wk}
                  </div>
                  <div className="text-[11px] text-[#8c859f] font-mono">
                    {stat.correct}/{stat.total} Correct ({wkPct}%)
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className={`text-xs font-bold font-mono ${
                    wkPct >= 70 ? 'text-[#34d399]' : wkPct >= 40 ? 'text-[#fbbf24]' : 'text-[#f87171]'
                  }`}>
                    {wkPct}%
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8c859f] group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question-By-Question Detailed Review */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#f1ecff]">
              Detailed Question Review
            </h3>
            <p className="text-xs text-[#8c859f]">
              Examine answer selections and verified explanations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { id: 'all', label: `All (${breakdown.length})` },
              { id: 'correct', label: `Correct (${correctCount})` },
              { id: 'incorrect', label: `Incorrect (${incorrectCount})` },
              { id: 'unattempted', label: `Skipped (${unattemptedCount})` },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition border text-xs ${
                  filterType === f.id
                    ? 'bg-[#6e46e6] text-white border-[#6e46e6] shadow-[0_0_14px_rgba(110,70,230,0.4)]'
                    : 'bg-[#15111e] text-[#8c859f] hover:text-[#f1ecff] border-[#2d263d]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-4">
          {filteredBreakdown.map((item, idx) => {
            const { question, selectedAnswer, isCorrect, isAttempted } = item;

            return (
              <div
                key={question.id || idx}
                className={`sre-card p-6 shadow-md space-y-4 ${
                  !isAttempted
                    ? 'border-[#2d263d]'
                    : isCorrect
                    ? 'border-[#34d399]/40 bg-[#34d399]/5'
                    : 'border-[#f87171]/40 bg-[#f87171]/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#c4b5fd] bg-[#1c1728] border border-[#2d263d] px-2.5 py-1 rounded">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-[#c4b5fd] bg-[#6e46e6]/15 border border-[#6e46e6]/30 px-2.5 py-0.5 rounded">
                      Week {question.week}
                    </span>
                  </div>

                  <div>
                    {!isAttempted ? (
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#1c1728] text-[#8c859f] border border-[#2d263d]">
                        Not Attempted
                      </span>
                    ) : isCorrect ? (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Correct (+1.00)</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f87171]/15 text-[#f87171] border border-[#f87171]/30 flex items-center space-x-1">
                        <X className="w-3 h-3" />
                        <span>Incorrect (0.00)</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-base font-medium text-[#f1ecff] leading-relaxed whitespace-pre-line">
                  {question.question}
                </div>

                {/* Options Review */}
                <div className="space-y-2">
                  {question.options.map((opt, optIdx) => {
                    const isOptionCorrect = optIdx === question.correctAnswer;
                    const isOptionSelected = optIdx === selectedAnswer;

                    let style = 'border-[#2d263d] bg-[#1c1728] text-[#8c859f] opacity-60';

                    if (isOptionCorrect) {
                      style = 'border-[#34d399] bg-[#34d399]/15 text-[#34d399] font-medium opacity-100';
                    } else if (isOptionSelected && !isCorrect) {
                      style = 'border-[#f87171] bg-[#f87171]/15 text-[#f87171] font-medium opacity-100';
                    }

                    const letter = String.fromCharCode(65 + optIdx);

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-start space-x-3.5 p-3 rounded-xl border text-sm ${style}`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                          isOptionCorrect
                            ? 'bg-[#34d399] text-[#0e0b16] border-[#34d399]'
                            : isOptionSelected && !isCorrect
                            ? 'bg-[#f87171] text-white border-[#f87171]'
                            : 'bg-[#15111e] text-[#8c859f] border-[#2d263d]'
                        }`}>
                          {letter}
                        </div>
                        <div className="flex-1 text-xs sm:text-sm">{opt}</div>
                        {isOptionCorrect && (
                          <span className="text-[11px] font-semibold text-[#34d399] shrink-0">
                            Accepted Answer
                          </span>
                        )}
                        {isOptionSelected && !isCorrect && (
                          <span className="text-[11px] font-semibold text-[#f87171] shrink-0">
                            Selected
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {question.explanation && (
                  <div className="p-4 rounded-xl bg-[#1c1728] border border-[#2d263d] text-xs text-[#8c859f] space-y-1">
                    <div className="font-semibold text-[#c4b5fd] text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Official Solution</span>
                    </div>
                    <p className="text-[#f1ecff]/90 leading-relaxed font-normal">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Bar */}
      <div className="sticky bottom-4 z-30 bg-[#15111e] text-white p-4 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-4 border border-[#3c344d]">
        <div className="flex items-center space-x-2 text-xs text-[#8c859f]">
          <Award className="w-4 h-4 text-[#c4b5fd]" />
          <span>Score: <strong className="text-[#f1ecff] font-mono">{totalScore}/{totalMarks}</strong> ({percentage}%)</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onGoToDashboard}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#1c1728] hover:bg-[#1e1829] text-[#f1ecff] text-xs font-semibold border border-[#2d263d] transition"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={onRetake}
            className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-[#6e46e6] hover:bg-[#5a32d3] text-white text-xs font-semibold shadow-[0_0_16px_rgba(110,70,230,0.35)] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>
        </div>
      </div>
    </div>
  );
}
