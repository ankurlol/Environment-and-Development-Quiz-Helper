import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Timer, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  User, 
  ShieldCheck, 
  Menu, 
  X,
  Play
} from 'lucide-react';

const STATUS = {
  NOT_VISITED: 'not_visited',
  NOT_ANSWERED: 'not_answered',
  ANSWERED: 'answered',
  MARKED_FOR_REVIEW: 'marked_for_review',
  ANSWERED_AND_MARKED: 'answered_and_marked',
};

export default function MockExam({ 
  courseData, 
  onFinishExam, 
  onCancel 
}) {
  const { courseInfo, questions = [] } = courseData;

  const [examStarted, setExamStarted] = useState(false);
  const [selectedCount, setSelectedCount] = useState(
    Math.min(30, questions.length)
  );
  const [selectedMinutes, setSelectedMinutes] = useState(45);

  const [examQuestions, setExamQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const timerRef = useRef(null);

  const handleStartExam = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const sample = shuffled.slice(0, Math.min(selectedCount, questions.length));

    const initialStatus = {};
    sample.forEach((q, idx) => {
      initialStatus[q.id] = idx === 0 ? STATUS.NOT_ANSWERED : STATUS.NOT_VISITED;
    });

    setExamQuestions(sample);
    setAnswers({});
    setQuestionStatus(initialStatus);
    setCurrentIndex(0);
    setTimeLeft(selectedMinutes * 60);
    setExamStarted(true);
  };

  useEffect(() => {
    if (!examStarted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinalSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [examStarted]);

  const currentQuestion = examQuestions[currentIndex];

  const handleOptionSelect = (optionIdx) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIdx,
    }));
  };

  const handleSaveAndNext = () => {
    if (!currentQuestion) return;
    const hasAnswer = answers[currentQuestion.id] !== undefined;

    setQuestionStatus((prev) => ({
      ...prev,
      [currentQuestion.id]: hasAnswer ? STATUS.ANSWERED : STATUS.NOT_ANSWERED,
    }));

    goToNextQuestion();
  };

  const handleMarkForReviewAndNext = () => {
    if (!currentQuestion) return;
    const hasAnswer = answers[currentQuestion.id] !== undefined;

    setQuestionStatus((prev) => ({
      ...prev,
      [currentQuestion.id]: hasAnswer
        ? STATUS.ANSWERED_AND_MARKED
        : STATUS.MARKED_FOR_REVIEW,
    }));

    goToNextQuestion();
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
    setQuestionStatus((prev) => ({
      ...prev,
      [currentQuestion.id]: STATUS.NOT_ANSWERED,
    }));
  };

  const goToNextQuestion = () => {
    if (currentIndex < examQuestions.length - 1) {
      const nextIdx = currentIndex + 1;
      const nextQ = examQuestions[nextIdx];
      if (questionStatus[nextQ.id] === STATUS.NOT_VISITED) {
        setQuestionStatus((prev) => ({
          ...prev,
          [nextQ.id]: STATUS.NOT_ANSWERED,
        }));
      }
      setCurrentIndex(nextIdx);
    }
  };

  const jumpToQuestion = (targetIdx) => {
    const targetQ = examQuestions[targetIdx];
    if (questionStatus[targetQ.id] === STATUS.NOT_VISITED) {
      setQuestionStatus((prev) => ({
        ...prev,
        [targetQ.id]: STATUS.NOT_ANSWERED,
      }));
    }
    setCurrentIndex(targetIdx);
    setIsSidebarOpen(false);
  };

  const handleFinalSubmit = (isTimeExpired = false) => {
    clearInterval(timerRef.current);
    setShowSubmitModal(false);

    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const breakdown = examQuestions.map((q) => {
      const studentAns = answers[q.id];
      const isAttempted = studentAns !== undefined;
      const isCorrect = isAttempted && studentAns === q.correctAnswer;

      if (!isAttempted) {
        unattemptedCount++;
      } else if (isCorrect) {
        correctCount++;
        totalScore += q.marks || 1;
      } else {
        incorrectCount++;
      }

      return {
        question: q,
        selectedAnswer: studentAns,
        isCorrect,
        isAttempted,
      };
    });

    const totalMarks = examQuestions.reduce((acc, q) => acc + (q.marks || 1), 0);
    const percentage = totalMarks > 0 ? Math.round((totalScore / totalMarks) * 100) : 0;
    const timeSpentSeconds = selectedMinutes * 60 - timeLeft;

    onFinishExam({
      courseName: courseInfo.courseName,
      date: new Date().toISOString(),
      totalQuestions: examQuestions.length,
      totalMarks,
      totalScore,
      percentage,
      correctCount,
      incorrectCount,
      unattemptedCount,
      timeSpentSeconds,
      isTimeExpired,
      breakdown,
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const statusCounts = useMemo(() => {
    const counts = {
      [STATUS.ANSWERED]: 0,
      [STATUS.NOT_ANSWERED]: 0,
      [STATUS.NOT_VISITED]: 0,
      [STATUS.MARKED_FOR_REVIEW]: 0,
      [STATUS.ANSWERED_AND_MARKED]: 0,
    };
    examQuestions.forEach((q) => {
      const st = questionStatus[q.id] || STATUS.NOT_VISITED;
      counts[st] = (counts[st] || 0) + 1;
    });
    return counts;
  }, [examQuestions, questionStatus]);

  // Pre-Exam Setup
  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="sre-card p-6 sm:p-10 shadow-xl space-y-6">
          <div className="border-b border-[#2d263d] pb-5">
            <div className="flex items-center space-x-2 text-[#c4b5fd] font-semibold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>NPTEL Examination Simulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f1ecff]">
              Grand Mock Examination
            </h2>
            <p className="text-sm text-[#8c859f] mt-1 font-normal">
              Configure your mock test session for <strong>{courseInfo.courseName}</strong>. Questions are randomized across all assignments.
            </p>
          </div>

          {/* Test Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#8c859f] uppercase tracking-wider">
                Number of Random Questions
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  20,
                  30,
                  50,
                  questions.length
                ].filter((num, idx, arr) => num <= questions.length && arr.indexOf(num) === idx).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setSelectedCount(num);
                      setSelectedMinutes(Math.max(15, Math.round(num * 1.5)));
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition border ${
                      selectedCount === num
                        ? 'bg-[#6e46e6] text-white border-[#6e46e6] shadow-[0_0_14px_rgba(110,70,230,0.4)]'
                        : 'bg-[#1c1728] text-[#8c859f] hover:text-[#f1ecff] border-[#2d263d]'
                    }`}
                  >
                    {num === questions.length ? `All (${num})` : `${num} Questions`}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#8c859f] uppercase tracking-wider">
                Exam Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[30, 45, 60, 90].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setSelectedMinutes(mins)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition border ${
                      selectedMinutes === mins
                        ? 'bg-[#6e46e6] text-white border-[#6e46e6] shadow-[0_0_14px_rgba(110,70,230,0.4)]'
                        : 'bg-[#1c1728] text-[#8c859f] hover:text-[#f1ecff] border-[#2d263d]'
                    }`}
                  >
                    {mins} Minutes
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-[#1c1728] rounded-xl p-5 border border-[#2d263d] text-xs text-[#8c859f] space-y-3">
            <h4 className="font-semibold text-[#f1ecff] uppercase tracking-wider text-[11px]">
              TCS iON CBT Question Palette Status
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2.5">
                <span className="w-3.5 h-3.5 rounded bg-[#34d399] shrink-0" />
                <span><strong className="text-[#f1ecff]">Green:</strong> Answered question</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-3.5 h-3.5 rounded bg-[#f87171] shrink-0" />
                <span><strong className="text-[#f1ecff]">Red:</strong> Visited but not answered</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-3.5 h-3.5 rounded bg-[#6e46e6] shrink-0" />
                <span><strong className="text-[#f1ecff]">Purple:</strong> Marked for review</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-3.5 h-3.5 rounded bg-[#3c344d] shrink-0" />
                <span><strong className="text-[#f1ecff]">Gray:</strong> Not visited yet</span>
              </div>
            </div>
            <p className="text-[#8c859f] text-[11px] pt-1">
              Each question carries 1 Mark with no negative marking. Jump to any question using the numeric palette.
            </p>
          </div>

          {/* Start Actions */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg text-[#8c859f] hover:text-[#f1ecff] bg-transparent text-xs font-semibold transition border border-[#2d263d]"
            >
              Cancel
            </button>
            <button
              onClick={handleStartExam}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-[#6e46e6] hover:bg-[#5a32d3] text-white font-semibold text-xs shadow-[0_0_18px_rgba(110,70,230,0.4)] transition"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Begin Examination</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE EXAM INTERFACE
  return (
    <div className="min-h-screen flex flex-col relative z-20 bg-[#0e0b16]">
      {/* Top Bar */}
      <div className="bg-[#15111e] px-4 sm:px-6 py-3 border-b border-[#2d263d]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#c4b5fd] font-semibold uppercase tracking-wider">
              NPTEL Computer Based Test (CBT)
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[#f1ecff] truncate max-w-xs sm:max-w-md">
              {courseInfo.courseName}
            </h2>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Countdown Timer */}
            <div className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg font-mono font-bold text-xs sm:text-sm border ${
              timeLeft < 300 
                ? 'bg-[#f87171]/15 border-[#f87171]/40 text-[#f87171] animate-pulse' 
                : 'bg-[#1c1728] border-[#2d263d] text-[#c4b5fd]'
            }`}>
              <Timer className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#1c1728] border border-[#2d263d] text-[#8c859f]"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Exam Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* LEFT PANE: Question & Answer Workspace */}
        <div className="flex-1 sre-card flex flex-col justify-between overflow-hidden shadow-xl">
          {/* Question Header */}
          <div className="px-6 py-4 border-b border-[#2d263d] flex items-center justify-between bg-[#1c1728]">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-[#f1ecff]">
                Question {currentIndex + 1} of {examQuestions.length}
              </span>
              <span className="text-xs font-semibold text-[#c4b5fd] bg-[#6e46e6]/15 border border-[#6e46e6]/30 px-2.5 py-0.5 rounded">
                Week {currentQuestion?.week}
              </span>
            </div>

            <div className="text-xs text-[#8c859f]">
              Marks: <span className="font-mono text-[#34d399] font-semibold">+1.00</span> / <span className="font-mono text-[#8c859f]">-0.00</span>
            </div>
          </div>

          {/* Question & Options */}
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
            <div className="text-base sm:text-lg font-medium text-[#f1ecff] leading-relaxed whitespace-pre-line">
              {currentQuestion?.question}
            </div>

            <div className="space-y-3 pt-2">
              {currentQuestion?.options.map((option, optIdx) => {
                const isSelected = answers[currentQuestion.id] === optIdx;
                const letter = String.fromCharCode(65 + optIdx);

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    className={`flex items-start space-x-3.5 p-4 rounded-xl border text-sm sm:text-base cursor-pointer select-none transition ${
                      isSelected
                        ? 'border-[#6e46e6] bg-[#6e46e6]/20 text-white font-medium ring-1 ring-[#6e46e6]'
                        : 'border-[#2d263d] hover:border-[#3c344d] bg-[#1c1728] text-[#f1ecff]'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-[#6e46e6] border-[#6e46e6] text-white'
                        : 'border-[#2d263d] text-[#8c859f] bg-[#15111e]'
                    }`}>
                      {letter}
                    </div>
                    <div className="flex-1 leading-relaxed text-sm pt-0.5">{option}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-4 bg-[#1c1728] border-t border-[#2d263d] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSaveAndNext}
                className="px-4 py-2 rounded-lg bg-[#34d399] hover:bg-[#10b981] text-[#0e0b16] font-semibold text-xs shadow transition"
              >
                Save & Next
              </button>

              <button
                onClick={handleMarkForReviewAndNext}
                className="px-4 py-2 rounded-lg bg-[#6e46e6] hover:bg-[#5a32d3] text-white font-semibold text-xs shadow transition"
              >
                Mark for Review & Next
              </button>

              <button
                onClick={handleClearResponse}
                className="px-3.5 py-2 rounded-lg border border-[#2d263d] hover:bg-[#15111e] text-[#8c859f] text-xs transition"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => jumpToQuestion(currentIndex - 1)}
                className="p-2 rounded-lg border border-[#2d263d] bg-[#15111e] disabled:opacity-30 hover:bg-[#1e1829] text-[#8c859f]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentIndex === examQuestions.length - 1}
                onClick={() => jumpToQuestion(currentIndex + 1)}
                className="p-2 rounded-lg border border-[#2d263d] bg-[#15111e] disabled:opacity-30 hover:bg-[#1e1829] text-[#8c859f]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: TCS iON Question Palette */}
        <div className={`lg:w-80 sre-card p-5 flex flex-col justify-between fixed lg:static inset-y-0 right-0 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        } transition-transform duration-200 ease-in-out`}>
          
          <div className="space-y-4">
            {/* Candidate Box */}
            <div className="flex items-center space-x-3 pb-3 border-b border-[#2d263d]">
              <div className="w-10 h-10 rounded-lg bg-[#1c1728] border border-[#2d263d] flex items-center justify-center text-[#8c859f]">
                <User className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-[#f1ecff] truncate">Candidate</div>
                <div className="text-[11px] text-[#8c859f] font-mono">NPTEL-CBT-PREP</div>
              </div>
            </div>

            {/* Status Palette Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#8c859f] font-medium">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded bg-[#34d399] shrink-0" />
                <span>Answered ({statusCounts[STATUS.ANSWERED]})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded bg-[#f87171] shrink-0" />
                <span>Unanswered ({statusCounts[STATUS.NOT_ANSWERED]})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded bg-[#6e46e6] shrink-0" />
                <span>Review ({statusCounts[STATUS.MARKED_FOR_REVIEW]})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded bg-[#3c344d] shrink-0" />
                <span>Not Visited ({statusCounts[STATUS.NOT_VISITED]})</span>
              </div>
            </div>

            {/* Question Matrix */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-[#8c859f] uppercase tracking-wider mb-2">
                Question Palette
              </div>
              <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
                {examQuestions.map((q, idx) => {
                  const st = questionStatus[q.id] || STATUS.NOT_VISITED;
                  const isCurrent = idx === currentIndex;

                  let bg = 'bg-[#1c1728] text-[#8c859f] border border-[#2d263d] hover:bg-[#1e1829]';
                  if (st === STATUS.ANSWERED) bg = 'bg-[#34d399] text-[#0e0b16] font-bold border-[#34d399]';
                  else if (st === STATUS.NOT_ANSWERED) bg = 'bg-[#f87171] text-white font-bold border-[#f87171]';
                  else if (st === STATUS.MARKED_FOR_REVIEW) bg = 'bg-[#6e46e6] text-white font-bold border-[#6e46e6]';
                  else if (st === STATUS.ANSWERED_AND_MARKED) bg = 'bg-[#6e46e6] text-white font-bold border-[#34d399] ring-1 ring-[#34d399]';

                  return (
                    <button
                      key={q.id}
                      onClick={() => jumpToQuestion(idx)}
                      className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center transition ${bg} ${
                        isCurrent ? 'ring-2 ring-white scale-105 shadow-md' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit Exam Button */}
          <div className="pt-5 border-t border-[#2d263d]">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-[#6e46e6] hover:bg-[#5a32d3] text-white font-semibold text-xs shadow-[0_0_16px_rgba(110,70,230,0.35)] transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Final Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-[#0e0b16]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="sre-card max-w-md w-full p-6 shadow-2xl border border-[#3c344d] space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-[#f1ecff]">Submit Examination?</h3>
              <p className="text-xs text-[#8c859f]">
                Are you ready to submit your exam and view your evaluation?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#1c1728] p-4 rounded-xl text-xs border border-[#2d263d]">
              <div className="flex justify-between">
                <span className="text-[#8c859f]">Total Items:</span>
                <strong className="text-[#f1ecff] font-mono">{examQuestions.length}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c859f]">Answered:</span>
                <strong className="text-[#34d399] font-mono">{Object.keys(answers).length}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c859f]">Unanswered:</span>
                <strong className="text-[#f87171] font-mono">
                  {examQuestions.length - Object.keys(answers).length}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c859f]">Time Left:</span>
                <strong className="text-[#c4b5fd] font-mono">{formatTime(timeLeft)}</strong>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-[#2d263d] hover:bg-[#1c1728] text-[#8c859f] text-xs font-semibold"
              >
                Resume
              </button>
              <button
                onClick={() => handleFinalSubmit(false)}
                className="flex-1 py-2.5 rounded-lg bg-[#6e46e6] hover:bg-[#5a32d3] text-white font-semibold text-xs shadow-[0_0_16px_rgba(110,70,230,0.35)]"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
