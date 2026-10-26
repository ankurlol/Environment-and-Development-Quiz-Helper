import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Check, 
  X, 
  Clock, 
  Award, 
  AlertCircle,
  HelpCircle,
  Shuffle,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { shuffleQuestionsAndOptions } from '../utils/shuffle';

export default function WeekTest({
  courseData,
  initialWeek = 1,
  onExit,
  onPracticeWeek
}) {
  const { questions = [], courseInfo } = courseData;

  // Extract available weeks
  const availableWeeks = useMemo(() => {
    const set = new Set(questions.map((q) => q.week));
    return Array.from(set).sort((a, b) => a - b);
  }, [questions]);

  const [activeWeek, setActiveWeek] = useState(initialWeek || 1);
  const [testState, setTestState] = useState('config'); // 'config' | 'taking' | 'submitted'
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Filter raw questions for current active week
  const rawWeekQuestions = useMemo(() => {
    return questions.filter((q) => q.week === Number(activeWeek));
  }, [questions, activeWeek]);

  // Start / Retake Test: Shuffles questions AND shuffles options
  const handleStartTest = (weekToStart = activeWeek) => {
    const wkQuestions = questions.filter((q) => q.week === Number(weekToStart));
    if (wkQuestions.length === 0) return;

    // Deep shuffle: randomize question sequence AND randomize option choices inside each question
    const randomized = shuffleQuestionsAndOptions(wkQuestions);

    setActiveWeek(weekToStart);
    setTestQuestions(randomized);
    setCurrentIndex(0);
    setUserAnswers({});
    setMarkedForReview([]);
    setElapsedSeconds(0);
    setShowSubmitModal(false);
    setTestState('taking');
  };

  // Timer while taking test
  useEffect(() => {
    if (testState !== 'taking') return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [testState]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = testQuestions[currentIndex] || null;

  const handleSelectOption = (optIdx) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optIdx,
    }));
  };

  const handleClearAnswer = () => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    if (!currentQuestion) return;
    setMarkedForReview((prev) => 
      prev.includes(currentQuestion.id)
        ? prev.filter((id) => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
    );
  };

  const handleSubmitTest = () => {
    setShowSubmitModal(false);
    setTestState('submitted');
  };

  // Compute scorecard upon submission
  const scorecard = useMemo(() => {
    if (testState !== 'submitted') return null;

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    const detailedList = testQuestions.map((q) => {
      const selected = userAnswers[q.id];
      const isAttempted = selected !== undefined;
      const isCorrect = isAttempted && selected === q.correctAnswer;

      if (!isAttempted) {
        unattemptedCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }

      return {
        ...q,
        userSelected: selected,
        isAttempted,
        isCorrect,
      };
    });

    const total = testQuestions.length;
    const scorePercentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return {
      total,
      correctCount,
      wrongCount,
      unattemptedCount,
      scorePercentage,
      detailedList,
    };
  }, [testState, testQuestions, userAnswers]);

  // If in 'config' state: show week picker & test briefing
  if (testState === 'config') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="sre-glass-card p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="sre-pill-badge">
                  Week-Wise Shuffled Assessment
                </span>
                <span className="text-xs text-[#8c859f] font-mono">
                  1-By-1 Exam Mode
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f1ecff] tracking-tight">
                Week-Wise Test Simulator
              </h2>
              <p className="text-xs sm:text-sm text-[#8c859f] mt-1">
                Both <strong className="text-[#c4b5fd]">questions</strong> and <strong className="text-[#c4b5fd]">answer choices</strong> are automatically randomized to guarantee genuine concept mastery.
              </p>
            </div>

            <button
              onClick={() => handleStartTest(activeWeek)}
              disabled={rawWeekQuestions.length === 0}
              className="sre-btn-primary self-start sm:self-auto shrink-0 shadow-[0_0_20px_rgba(110,70,230,0.4)]"
            >
              <Shuffle className="w-4 h-4" />
              <span>Start Week {activeWeek} Test</span>
            </button>
          </div>

          {/* Week Selector Chips */}
          <div className="mt-6 space-y-3">
            <label className="text-xs font-semibold text-[#8c859f] uppercase tracking-wider block">
              Select Assignment Week:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {availableWeeks.map((wk) => {
                const qCount = questions.filter((q) => q.week === wk).length;
                const isSelected = activeWeek === wk;
                return (
                  <button
                    key={wk}
                    onClick={() => setActiveWeek(wk)}
                    className={`p-3 rounded-xl border text-center transition ${
                      isSelected
                        ? 'border-[#6e46e6] bg-[#6e46e6]/25 shadow-[0_0_16px_rgba(110,70,230,0.35)]'
                        : 'sre-glass-subcard hover:border-white/20'
                    }`}
                  >
                    <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-[#f1ecff]'}`}>
                      Week {wk}
                    </div>
                    <div className="text-[11px] text-[#8c859f] mt-0.5">
                      {qCount} {qCount === 1 ? 'Q' : 'Qs'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Highlights */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#8c859f]">
            <div className="p-4 sre-glass-subcard space-y-1">
              <div className="flex items-center space-x-2 text-[#c4b5fd] font-bold">
                <Shuffle className="w-4 h-4 text-[#6e46e6]" />
                <span>Dual Shuffling</span>
              </div>
              <p>Questions and option positions (A, B, C, D) are completely reshuffled on every test launch.</p>
            </div>

            <div className="p-4 sre-glass-subcard space-y-1">
              <div className="flex items-center space-x-2 text-[#34d399] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                <span>Strict 1-By-1 Focus</span>
              </div>
              <p>Take one question at a time without distractions, mimicking actual testing focus.</p>
            </div>

            <div className="p-4 sre-glass-subcard space-y-1">
              <div className="flex items-center space-x-2 text-[#fbbf24] font-bold">
                <Award className="w-4 h-4 text-[#fbbf24]" />
                <span>Verified Explanations</span>
              </div>
              <p>Review comprehensive official NPTEL explanations and solution breakdowns upon test submission.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If in 'submitted' state: show full scorecard & review
  if (testState === 'submitted' && scorecard) {
    const isPassing = scorecard.scorePercentage >= 50;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Score Card Header */}
        <div className="sre-glass-card p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#6e46e6]/20 border border-[#6e46e6]/40 text-[#c4b5fd]">
                <span>Week {activeWeek} Test Result</span>
                <span>•</span>
                <span>Time: {formatTime(elapsedSeconds)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f1ecff]">
                {scorecard.scorePercentage >= 80
                  ? 'Outstanding Performance'
                  : scorecard.scorePercentage >= 50
                  ? 'Test Passed Successfully'
                  : 'Needs Further Review'}
              </h2>
              <p className="text-xs sm:text-sm text-[#8c859f]">
                You scored <strong className="text-[#f1ecff] font-mono">{scorecard.correctCount}</strong> out of <strong className="text-[#f1ecff] font-mono">{scorecard.total}</strong> on the shuffled assessment.
              </p>
            </div>

            {/* Score Ring / Pill */}
            <div className="flex items-center space-x-4">
              <div className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center border shadow-xl ${
                isPassing 
                  ? 'bg-[#34d399]/15 border-[#34d399]/40 text-[#34d399]' 
                  : 'bg-[#f87171]/15 border-[#f87171]/40 text-[#f87171]'
              }`}>
                <span className="text-3xl font-extrabold font-mono tracking-tight">
                  {scorecard.scorePercentage}%
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider mt-0.5">
                  {isPassing ? 'Qualified' : 'Review'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10 text-center">
            <div className="p-3 sre-glass-subcard">
              <div className="text-xl font-bold font-mono text-[#34d399]">{scorecard.correctCount}</div>
              <div className="text-xs text-[#8c859f]">Correct</div>
            </div>
            <div className="p-3 sre-glass-subcard">
              <div className="text-xl font-bold font-mono text-[#f87171]">{scorecard.wrongCount}</div>
              <div className="text-xs text-[#8c859f]">Incorrect</div>
            </div>
            <div className="p-3 sre-glass-subcard">
              <div className="text-xl font-bold font-mono text-[#8c859f]">{scorecard.unattemptedCount}</div>
              <div className="text-xs text-[#8c859f]">Skipped</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleStartTest(activeWeek)}
                className="sre-btn-primary text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Test (Reshuffled)</span>
              </button>
              {availableWeeks.includes(Number(activeWeek) + 1) && (
                <button
                  onClick={() => handleStartTest(Number(activeWeek) + 1)}
                  className="sre-btn-ghost text-xs"
                >
                  <span>Next Week {Number(activeWeek) + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTestState('config')}
                className="sre-glass-subcard px-3.5 py-2 rounded-xl text-xs font-semibold text-[#8c859f] hover:text-[#f1ecff] transition"
              >
                Choose Another Week
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold text-[#f1ecff]">
              Detailed Question Review ({scorecard.detailedList.length})
            </h3>
            <span className="text-xs text-[#8c859f]">
              Shuffled Questions with Official Solutions
            </span>
          </div>

          {scorecard.detailedList.map((item, idx) => {
            const hasUserAnswered = item.isAttempted;
            const isCorrect = item.isCorrect;

            return (
              <div
                key={item.id}
                className={`sre-glass-card p-5 sm:p-6 transition ${
                  !hasUserAnswered
                    ? 'border-white/15'
                    : isCorrect
                    ? 'border-[#34d399]/40 bg-[#34d399]/5'
                    : 'border-[#f87171]/40 bg-[#f87171]/5'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#c4b5fd] sre-glass-subcard px-2.5 py-1 rounded">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs text-[#8c859f]">
                      Assignment Week {item.week}
                    </span>
                  </div>

                  <span className={`inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    !hasUserAnswered
                      ? 'bg-white/5 text-[#8c859f] border-white/10'
                      : isCorrect
                      ? 'bg-[#34d399]/20 text-[#34d399] border-[#34d399]/40'
                      : 'bg-[#f87171]/20 text-[#f87171] border-[#f87171]/40'
                  }`}>
                    {!hasUserAnswered ? (
                      <span>Unattempted</span>
                    ) : isCorrect ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Correct</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3" />
                        <span>Incorrect</span>
                      </>
                    )}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-medium text-[#f1ecff] mb-4 whitespace-pre-line leading-relaxed">
                  {item.question}
                </p>

                {/* Shuffled Options Review */}
                <div className="space-y-2">
                  {item.options.map((opt, optIdx) => {
                    const isSelected = item.userSelected === optIdx;
                    const isOfficialCorrect = optIdx === item.correctAnswer;

                    let optClass = 'sre-glass-subcard text-[#8c859f] opacity-70';

                    if (isOfficialCorrect) {
                      optClass = 'border-[#34d399] bg-[#34d399]/20 text-[#34d399] font-medium opacity-100';
                    } else if (isSelected && !isOfficialCorrect) {
                      optClass = 'border-[#f87171] bg-[#f87171]/20 text-[#f87171] font-medium opacity-100';
                    }

                    const optLetter = String.fromCharCode(65 + optIdx);

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-start space-x-3 p-3 rounded-xl border text-xs sm:text-sm ${optClass}`}
                      >
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                          isOfficialCorrect
                            ? 'bg-[#34d399] text-[#0e0b16] border-[#34d399]'
                            : isSelected
                            ? 'bg-[#f87171] text-white border-[#f87171]'
                            : 'bg-white/10 text-[#8c859f] border-white/10'
                        }`}>
                          {optLetter}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt}</span>
                        {isOfficialCorrect && (
                          <span className="text-[11px] font-semibold text-[#34d399] uppercase tracking-wider shrink-0 mt-0.5">
                            Correct Answer
                          </span>
                        )}
                        {isSelected && !isOfficialCorrect && (
                          <span className="text-[11px] font-semibold text-[#f87171] uppercase tracking-wider shrink-0 mt-0.5">
                            Your Selection
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {item.explanation && (
                  <div className="mt-4 p-3.5 rounded-xl sre-glass-subcard text-xs text-[#8c859f] space-y-1">
                    <div className="flex items-center space-x-1.5 text-[#c4b5fd] font-semibold text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Official Explanation</span>
                    </div>
                    <p className="leading-relaxed text-[#f1ecff]/90">
                      {item.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // TAKING TEST (1-BY-1 QUESTION FOCUS MODE)
  const totalCount = testQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const currentSelectedOpt = currentQuestion ? userAnswers[currentQuestion.id] : undefined;
  const isCurrentMarked = currentQuestion ? markedForReview.includes(currentQuestion.id) : false;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Test Header Bar */}
      <div className="sre-glass-card p-4 shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#6e46e6]/20 border border-[#6e46e6]/40 flex items-center justify-center text-[#c4b5fd]">
            <Shuffle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#c4b5fd]">Week {activeWeek} Test</span>
              <span className="text-[11px] text-[#8c859f]">Shuffled Q&A</span>
            </div>
            <div className="text-xs text-[#8c859f]">
              Question <strong className="text-[#f1ecff] font-mono">{currentIndex + 1}</strong> of{' '}
              <strong className="text-[#f1ecff] font-mono">{totalCount}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Elapsed Timer */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl sre-glass-subcard text-xs font-mono font-semibold text-[#f1ecff]">
            <Clock className="w-3.5 h-3.5 text-[#c4b5fd]" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          {/* Submit Test Trigger */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="sre-btn-primary text-xs !py-2 !px-4"
          >
            <span>Finish Test</span>
          </button>
        </div>
      </div>

      {/* Question Progress Pill Grid */}
      <div className="sre-glass-card p-3.5 shadow-md">
        <div className="flex items-center justify-between mb-2 text-xs text-[#8c859f]">
          <span>
            Progress: <strong className="text-[#34d399] font-mono">{answeredCount}</strong> / {totalCount} Answered
          </span>
          {markedForReview.length > 0 && (
            <span className="text-[#fbbf24] font-medium">
              {markedForReview.length} Flagged for Review
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {testQuestions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isMarked = markedForReview.includes(q.id);
            const isCurrent = idx === currentIndex;

            let badgeStyle = 'sre-glass-subcard text-[#8c859f] border-white/10';

            if (isCurrent) {
              badgeStyle = 'border-[#6e46e6] bg-[#6e46e6] text-white shadow-[0_0_12px_rgba(110,70,230,0.5)] font-bold';
            } else if (isMarked) {
              badgeStyle = 'border-[#fbbf24] bg-[#fbbf24]/20 text-[#fbbf24] font-semibold';
            } else if (isAnswered) {
              badgeStyle = 'border-[#34d399]/40 bg-[#34d399]/15 text-[#34d399] font-semibold';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-mono flex items-center justify-center shrink-0 border transition ${badgeStyle}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Single Question View Card */}
      {currentQuestion && (
        <div className="sre-glass-card p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-[#c4b5fd] sre-glass-subcard px-2.5 py-1 rounded">
                Question {currentIndex + 1}
              </span>
              <span className="text-xs text-[#8c859f]">
                Assignment {activeWeek}
              </span>
            </div>

            <button
              onClick={handleToggleReview}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
                isCurrentMarked
                  ? 'bg-[#fbbf24]/20 border-[#fbbf24]/50 text-[#fbbf24]'
                  : 'sre-glass-subcard text-[#8c859f] hover:text-[#fbbf24]'
              }`}
            >
              <span>{isCurrentMarked ? 'Flagged for Review' : 'Flag Question'}</span>
            </button>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-medium text-[#f1ecff] leading-relaxed whitespace-pre-line">
            {currentQuestion.question}
          </h3>

          {/* Shuffled Options (Click to Select) */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = currentSelectedOpt === optIdx;
              const optLetter = String.fromCharCode(65 + optIdx);

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`flex items-start space-x-3.5 p-4 rounded-xl border text-sm transition cursor-pointer select-none ${
                    isSelected
                      ? 'border-[#6e46e6] bg-[#6e46e6]/25 text-white font-medium ring-1 ring-[#6e46e6] shadow-[0_0_16px_rgba(110,70,230,0.25)]'
                      : 'sre-glass-subcard text-[#f1ecff] hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                    isSelected
                      ? 'bg-[#6e46e6] text-white border-[#6e46e6]'
                      : 'bg-white/10 text-[#8c859f] border-white/15'
                  }`}>
                    {optLetter}
                  </div>
                  <div className="flex-1 leading-relaxed text-sm pt-0.5">{option}</div>
                </div>
              );
            })}
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
            <div>
              {currentSelectedOpt !== undefined && (
                <button
                  onClick={handleClearAnswer}
                  className="text-xs text-[#8c859f] hover:text-[#f87171] transition"
                >
                  Clear Selection
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl sre-glass-subcard disabled:opacity-30 hover:bg-white/10 text-xs font-semibold text-[#f1ecff] transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIndex < totalCount - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-[#6e46e6] text-white hover:bg-[#5a32d3] text-xs font-semibold shadow-[0_0_14px_rgba(110,70,230,0.3)] transition"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="sre-btn-primary text-xs !py-2 !px-5"
                >
                  <span>Finish & Submit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="sre-glass-card max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-[#fbbf24]">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="text-base font-bold text-[#f1ecff]">Submit Week {activeWeek} Test?</h4>
            </div>

            <p className="text-xs text-[#8c859f] leading-relaxed">
              You have answered <strong className="text-[#34d399] font-mono">{answeredCount}</strong> of{' '}
              <strong className="text-[#f1ecff] font-mono">{totalCount}</strong> questions.
              {totalCount - answeredCount > 0 && (
                <span className="block mt-1 text-[#f87171]">
                  {totalCount - answeredCount} question(s) remain unanswered.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl sre-glass-subcard text-xs font-semibold text-[#8c859f] hover:text-[#f1ecff] transition"
              >
                Return to Test
              </button>
              <button
                onClick={handleSubmitTest}
                className="sre-btn-primary text-xs !py-2 !px-5"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
