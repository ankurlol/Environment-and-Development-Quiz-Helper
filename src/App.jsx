import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PracticeMode from './components/PracticeMode';
import MockExam from './components/MockExam';
import ExamResults from './components/ExamResults';
import QuestionManager from './components/QuestionManager';
import FluidBackground from './components/FluidBackground';
import { 
  getCourseData, 
  saveCourseData, 
  resetCourseData, 
  getBookmarks, 
  toggleBookmark, 
  getPracticeProgress, 
  savePracticeAnswer, 
  resetPracticeProgress,
  saveExamResult 
} from './utils/storage';

export default function App() {
  const [courseData, setCourseDataState] = useState(getCourseData);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [practiceProgress, setPracticeProgressState] = useState(getPracticeProgress);
  const [bookmarks, setBookmarksState] = useState(getBookmarks);
  const [examResult, setExamResult] = useState(null);

  const handleSaveAnswer = (qId, optionIdx, isCorrect) => {
    const updated = savePracticeAnswer(qId, optionIdx, isCorrect);
    setPracticeProgressState({ ...updated });
  };

  const handleToggleBookmark = (qId) => {
    const updated = toggleBookmark(qId);
    setBookmarksState([...updated]);
  };

  const handleResetProgress = (week = null) => {
    const updated = resetPracticeProgress(week);
    setPracticeProgressState({ ...updated });
  };

  const handleSelectWeek = (week) => {
    setSelectedWeek(week);
    setActiveTab('practice');
  };

  const handleStartExam = () => {
    setActiveTab('exam');
  };

  const handleFinishExam = (result) => {
    saveExamResult(result);
    setExamResult(result);
    setActiveTab('results');
  };

  const handleRetakeExam = () => {
    setExamResult(null);
    setActiveTab('exam');
  };

  const handleSaveCourseData = (newData) => {
    saveCourseData(newData);
    setCourseDataState(newData);
  };

  const handleResetCourseData = () => {
    const def = resetCourseData();
    setCourseDataState(def);
  };

  const answeredCount = Object.keys(practiceProgress).length;
  const totalCount = courseData?.questions?.length || 0;

  return (
    <div className="min-h-screen relative bg-[#0e0b16] text-[#f1ecff] flex flex-col font-sans selection:bg-[#6e46e6] selection:text-white">
      {/* 3D WebGL Chromatic Fluid Background (Exact SRE Copilot Canvas) */}
      <FluidBackground />

      {/* Navbar */}
      {activeTab !== 'exam' && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          courseInfo={courseData.courseInfo}
          bookmarksCount={bookmarks.length}
          answeredCount={answeredCount}
          totalCount={totalCount}
        />
      )}

      {/* Main Tab Views with Glassmorphism Over Canvas */}
      <main className="flex-1 pb-16 relative z-10">
        {activeTab === 'dashboard' && (
          <Dashboard
            courseData={courseData}
            practiceProgress={practiceProgress}
            bookmarks={bookmarks}
            onSelectWeek={handleSelectWeek}
            onStartExam={handleStartExam}
            onOpenManager={() => setActiveTab('manager')}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeMode
            courseData={courseData}
            practiceProgress={practiceProgress}
            bookmarks={bookmarks}
            selectedWeek={selectedWeek}
            onSelectWeek={setSelectedWeek}
            onSaveAnswer={handleSaveAnswer}
            onToggleBookmark={handleToggleBookmark}
            onResetProgress={handleResetProgress}
          />
        )}

        {activeTab === 'exam' && (
          <MockExam
            courseData={courseData}
            onFinishExam={handleFinishExam}
            onCancel={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'results' && examResult && (
          <ExamResults
            result={examResult}
            onRetake={handleRetakeExam}
            onGoToDashboard={() => setActiveTab('dashboard')}
            onPracticeWeek={(wk) => {
              setSelectedWeek(wk);
              setActiveTab('practice');
            }}
          />
        )}

        {activeTab === 'manager' && (
          <QuestionManager
            courseData={courseData}
            onSaveCourseData={handleSaveCourseData}
            onResetCourseData={handleResetCourseData}
          />
        )}
      </main>

      {/* Glass Footer */}
      {activeTab !== 'exam' && (
        <footer className="relative z-10 border-t border-white/10 bg-[#0e0b16]/75 backdrop-blur-xl text-[#8c859f] py-6 px-4 text-center text-xs space-y-1">
          <div className="flex items-center justify-center space-x-2 text-[#f1ecff] font-medium">
            <span>NPTEL Examination Platform</span>
            <span className="text-white/20">•</span>
            <span>IIT Guwahati</span>
            <span className="text-white/20">•</span>
            <span>Environment and Development</span>
          </div>
          <p className="text-[#8c859f] text-[11px]">
            Comprehensive week-wise assignment practice and computer-based test simulator.
          </p>
        </footer>
      )}
    </div>
  );
}
