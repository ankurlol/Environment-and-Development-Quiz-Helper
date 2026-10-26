import React, { useState, useMemo } from 'react';
import { 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  LayoutList, 
  Eye, 
  Check, 
  X, 
  Sparkles 
} from 'lucide-react';

export default function PracticeMode({ 
  courseData, 
  practiceProgress, 
  bookmarks, 
  onSaveAnswer, 
  onToggleBookmark, 
  onResetProgress,
  selectedWeek,
  onSelectWeek
}) {
  const { questions = [], courseInfo } = courseData;
  const [activeWeek, setActiveWeek] = useState(selectedWeek || 1);
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [focusIndex, setFocusIndex] = useState(0);
  const [instantFeedback, setInstantFeedback] = useState(true);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (activeWeek !== 'all' && q.week !== Number(activeWeek)) {
        return false;
      }
      const state = practiceProgress[q.id];
      if (filterType === 'unsolved') {
        return !state;
      }
      if (filterType === 'wrong') {
        return state && !state.isCorrect;
      }
      if (filterType === 'bookmarked') {
        return bookmarks.includes(q.id);
      }
      return true;
    });
  }, [questions, activeWeek, filterType, practiceProgress, bookmarks]);

  const currentFocusQuestion = filteredQuestions[focusIndex] || null;

  const handleSelectOption = (q, optionIdx) => {
    const isCorrect = optionIdx === q.correctAnswer;
    onSaveAnswer(q.id, optionIdx, isCorrect);
  };

  const handleNextFocus = () => {
    if (focusIndex < filteredQuestions.length - 1) {
      setFocusIndex(focusIndex + 1);
    }
  };

  const handlePrevFocus = () => {
    if (focusIndex > 0) {
      setFocusIndex(focusIndex - 1);
    }
  };

  const weeksList = useMemo(() => {
    const set = new Set(questions.map((q) => q.week));
    return Array.from(set).sort((a, b) => a - b);
  }, [questions]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Filter Panel */}
      <div className="sre-glass-card p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Week Selector */}
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1">
            <span className="text-[11px] font-semibold text-[#8c859f] uppercase tracking-wider shrink-0 mr-1">
              Week:
            </span>
            <button
              onClick={() => { setActiveWeek('all'); setFocusIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                activeWeek === 'all'
                  ? 'bg-[#6e46e6] text-white border-[#6e46e6] shadow-[0_0_14px_rgba(110,70,230,0.4)]'
                  : 'sre-glass-subcard text-[#8c859f] hover:text-[#f1ecff]'
              }`}
            >
              All Weeks ({questions.length})
            </button>
            {weeksList.map((wk) => {
              const wkCount = questions.filter((q) => q.week === wk).length;
              return (
                <button
                  key={wk}
                  onClick={() => { setActiveWeek(wk); setFocusIndex(0); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                    activeWeek === wk
                      ? 'bg-[#6e46e6] text-white border-[#6e46e6] shadow-[0_0_14px_rgba(110,70,230,0.4)]'
                      : 'sre-glass-subcard text-[#8c859f] hover:text-[#f1ecff]'
                  }`}
                >
                  Week {wk} ({wkCount})
                </button>
              );
            })}
          </div>

          {/* View toggle (List vs 1-by-1 Focus) */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="sre-glass-subcard p-1 rounded-xl flex items-center text-xs">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg transition font-semibold ${
                  viewMode === 'list' 
                    ? 'bg-[#6e46e6] text-white shadow' 
                    : 'text-[#8c859f] hover:text-[#f1ecff]'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
              <button
                onClick={() => setViewMode('focus')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg transition font-semibold ${
                  viewMode === 'focus' 
                    ? 'bg-[#6e46e6] text-white shadow' 
                    : 'text-[#8c859f] hover:text-[#f1ecff]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Focus</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#8c859f] text-[11px] font-medium mr-1">Filter:</span>
            {[
              { id: 'all', label: `All (${filteredQuestions.length})` },
              { id: 'unsolved', label: 'Unsolved' },
              { id: 'wrong', label: 'Needs Review' },
              { id: 'bookmarked', label: `Bookmarked (${bookmarks.length})` },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => { setFilterType(f.id); setFocusIndex(0); }}
                className={`px-3 py-1 rounded-lg transition border text-xs font-semibold ${
                  filterType === f.id
                    ? 'bg-white/20 text-[#f1ecff] border-white/30 shadow'
                    : 'sre-glass-subcard text-[#8c859f] hover:text-[#f1ecff]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={instantFeedback}
                onChange={(e) => setInstantFeedback(e.target.checked)}
                className="rounded border-white/20 bg-white/10 text-[#6e46e6] focus:ring-0 w-3.5 h-3.5"
              />
              <span className="text-[#8c859f] text-xs">Instant Answer Check</span>
            </label>

            <button
              onClick={() => {
                if (window.confirm('Reset progress for this view?')) {
                  onResetProgress(activeWeek === 'all' ? null : Number(activeWeek));
                }
              }}
              title="Reset progress"
              className="text-[#8c859f] hover:text-[#f87171] transition p-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <div className="sre-glass-card rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
          <HelpCircle className="w-12 h-12 text-[#8c859f] mx-auto" />
          <h3 className="text-base font-bold text-[#f1ecff]">No questions found</h3>
          <p className="text-xs text-[#8c859f]">
            No questions match your current filter. Try resetting filters or switching weeks.
          </p>
          <button
            onClick={() => setFilterType('all')}
            className="sre-btn-primary text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* FOCUS VIEW MODE */}
      {viewMode === 'focus' && currentFocusQuestion && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8c859f] px-1">
            <span>
              Question <strong className="text-[#f1ecff] font-mono">{focusIndex + 1}</strong> of{' '}
              <strong className="text-[#f1ecff] font-mono">{filteredQuestions.length}</strong>
            </span>
            <div className="flex items-center space-x-1.5">
              <button
                disabled={focusIndex === 0}
                onClick={handlePrevFocus}
                className="p-1.5 rounded-lg sre-glass-subcard disabled:opacity-30 hover:bg-white/10 text-[#f1ecff]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={focusIndex === filteredQuestions.length - 1}
                onClick={handleNextFocus}
                className="p-1.5 rounded-lg sre-glass-subcard disabled:opacity-30 hover:bg-white/10 text-[#f1ecff]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <QuestionCard
            key={currentFocusQuestion.id}
            question={currentFocusQuestion}
            index={focusIndex}
            userProgress={practiceProgress[currentFocusQuestion.id]}
            isBookmarked={bookmarks.includes(currentFocusQuestion.id)}
            instantFeedback={instantFeedback}
            onSelectOption={(idx) => handleSelectOption(currentFocusQuestion, idx)}
            onToggleBookmark={() => onToggleBookmark(currentFocusQuestion.id)}
          />
        </div>
      )}

      {/* LIST VIEW MODE */}
      {viewMode === 'list' && (
        <div className="space-y-5">
          {filteredQuestions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={idx}
              userProgress={practiceProgress[q.id]}
              isBookmarked={bookmarks.includes(q.id)}
              instantFeedback={instantFeedback}
              onSelectOption={(optionIdx) => handleSelectOption(q, optionIdx)}
              onToggleBookmark={() => onToggleBookmark(q.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionCard({
  question,
  index,
  userProgress,
  isBookmarked,
  instantFeedback,
  onSelectOption,
  onToggleBookmark,
}) {
  const isAnswered = !!userProgress;
  const selectedAnswer = userProgress?.selectedAnswer;
  const isCorrect = userProgress?.isCorrect;

  return (
    <div className={`sre-glass-card p-6 shadow-xl transition duration-200 ${
      isAnswered
        ? isCorrect
          ? 'border-[#34d399]/40 bg-[#34d399]/10'
          : 'border-[#f87171]/40 bg-[#f87171]/10'
        : 'hover:border-white/30'
    }`}>
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-[#c4b5fd] sre-glass-subcard px-2.5 py-1 rounded">
            Q{index + 1}
          </span>
          <span className="text-xs font-semibold text-[#c4b5fd] bg-[#6e46e6]/20 border border-[#6e46e6]/40 px-2 py-0.5 rounded">
            Week {question.week}
          </span>
          <span className="text-xs text-[#8c859f] hidden sm:inline">
            {question.assignment || `Assignment ${question.week}`}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {isAnswered && (
            <span className={`inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
              isCorrect 
                ? 'bg-[#34d399]/20 text-[#34d399] border-[#34d399]/40' 
                : 'bg-[#f87171]/20 text-[#f87171] border-[#f87171]/40'
            }`}>
              {isCorrect ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
            </span>
          )}

          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
            className={`p-2 rounded-xl transition ${
              isBookmarked 
                ? 'bg-[#fbbf24]/20 border border-[#fbbf24]/50 text-[#fbbf24]' 
                : 'sre-glass-subcard text-[#8c859f] hover:text-[#fbbf24]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#fbbf24] text-[#fbbf24]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-medium text-[#f1ecff] leading-relaxed mb-5 whitespace-pre-line">
        {question.question}
      </h3>

      {/* Options List with Specular Glass Cards */}
      <div className="space-y-2.5">
        {question.options.map((option, optIdx) => {
          const isSelected = selectedAnswer === optIdx;
          const isThisOptionCorrect = optIdx === question.correctAnswer;
          
          let optionStyles = 'sre-glass-subcard text-[#f1ecff] hover:border-[#6e46e6] hover:bg-white/10';

          if (isAnswered && instantFeedback) {
            if (isThisOptionCorrect) {
              optionStyles = 'border-[#34d399] bg-[#34d399]/20 text-[#34d399] font-medium';
            } else if (isSelected && !isCorrect) {
              optionStyles = 'border-[#f87171] bg-[#f87171]/20 text-[#f87171] font-medium';
            } else {
              optionStyles = 'bg-white/[0.02] border-white/5 text-[#8c859f] opacity-40';
            }
          } else if (isSelected) {
            optionStyles = 'border-[#6e46e6] bg-[#6e46e6]/25 text-white font-medium ring-1 ring-[#6e46e6]';
          }

          const optLetter = String.fromCharCode(65 + optIdx);

          return (
            <div
              key={optIdx}
              onClick={() => onSelectOption(optIdx)}
              className={`flex items-start space-x-3.5 p-3.5 rounded-xl border text-sm transition cursor-pointer select-none ${optionStyles}`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                isAnswered && instantFeedback && isThisOptionCorrect
                  ? 'bg-[#34d399] text-[#0e0b16] border-[#34d399]'
                  : isAnswered && instantFeedback && isSelected && !isCorrect
                  ? 'bg-[#f87171] text-white border-[#f87171]'
                  : isSelected
                  ? 'bg-[#6e46e6] text-white border-[#6e46e6]'
                  : 'bg-white/10 text-[#8c859f] border-white/15'
              }`}>
                {optLetter}
              </div>

              <div className="flex-1 leading-relaxed text-sm pt-0.5">{option}</div>

              {isAnswered && instantFeedback && (
                <div className="shrink-0 mt-0.5">
                  {isThisOptionCorrect && <CheckCircle2 className="w-5 h-5 text-[#34d399]" />}
                  {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-[#f87171]" />}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isAnswered && instantFeedback && question.explanation && (
        <div className="mt-5 p-4 rounded-xl sre-glass-subcard text-xs text-[#8c859f] space-y-1">
          <div className="flex items-center space-x-1.5 text-[#c4b5fd] font-semibold text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NPTEL Official Solution</span>
          </div>
          <p className="leading-relaxed text-[#f1ecff]/90 font-normal">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
