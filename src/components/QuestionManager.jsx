import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

export default function QuestionManager({ courseData, onSaveCourseData, onResetCourseData }) {
  const { courseInfo, questions = [] } = courseData;

  const [title, setTitle] = useState(courseInfo.courseName || '');
  const [code, setCode] = useState(courseInfo.courseCode || '');
  const [instructor, setInstructor] = useState(courseInfo.instructor || '');
  const [weeks, setWeeks] = useState(courseInfo.totalWeeks || 12);
  const [jsonInput, setJsonInput] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  const handleUpdateCourseDetails = (e) => {
    e.preventDefault();
    const updated = {
      ...courseData,
      courseInfo: {
        ...courseData.courseInfo,
        courseName: title,
        courseCode: code,
        instructor,
        totalWeeks: Number(weeks),
      },
    };
    onSaveCourseData(updated);
    setStatusMsg({ type: 'success', text: 'Course metadata updated successfully.' });
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(courseData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${code || 'nptel'}_questions.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        throw new Error('JSON structure must contain a "questions" array.');
      }
      onSaveCourseData(parsed);
      setStatusMsg({ type: 'success', text: `Imported ${parsed.questions.length} questions successfully.` });
      setJsonInput('');
      setTimeout(() => setStatusMsg(null), 3500);
    } catch (err) {
      setStatusMsg({ type: 'error', text: `Failed to import JSON: ${err.message}` });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.questions || !Array.isArray(parsed.questions)) {
          throw new Error('Uploaded JSON must contain a "questions" array.');
        }
        onSaveCourseData(parsed);
        setStatusMsg({ type: 'success', text: `Loaded ${parsed.questions.length} questions from ${file.name}.` });
        setTimeout(() => setStatusMsg(null), 3500);
      } catch (err) {
        setStatusMsg({ type: 'error', text: `Invalid file format: ${err.message}` });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#f1ecff]">
            Course & Question Bank Configuration
          </h2>
          <p className="text-xs sm:text-sm text-[#8c859f]">
            Manage course metadata, export backups, or import additional questions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportJSON}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#15111e] hover:bg-[#1e1829] text-[#f1ecff] text-xs font-semibold border border-[#2d263d] transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset questions back to the default verified syllabus dataset?')) {
                onResetCourseData();
                setStatusMsg({ type: 'success', text: 'Reset to default dataset.' });
                setTimeout(() => setStatusMsg(null), 3500);
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-[#f87171]/30 text-[#f87171] hover:bg-[#f87171]/10 text-xs font-semibold transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {statusMsg && (
        <div className={`p-4 rounded-xl flex items-center space-x-2.5 text-xs sm:text-sm font-semibold border ${
          statusMsg.type === 'success' 
            ? 'bg-[#34d399]/15 text-[#34d399] border-[#34d399]/30' 
            : 'bg-[#f87171]/15 text-[#f87171] border-[#f87171]/30'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Course Info Form */}
      <div className="sre-card p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-[#f1ecff] uppercase tracking-wider">
          Course Metadata
        </h3>
        <form onSubmit={handleUpdateCourseDetails} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#8c859f]">Course Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#2d263d] bg-[#1c1728] text-[#f1ecff] text-xs focus:ring-1 focus:ring-[#6e46e6] focus:border-[#6e46e6] focus:outline-none"
              placeholder="e.g. Environment and Development"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#8c859f]">Course Code / NOC ID</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#2d263d] bg-[#1c1728] text-[#f1ecff] text-xs focus:ring-1 focus:ring-[#6e46e6] focus:border-[#6e46e6] focus:outline-none"
              placeholder="e.g. NOC26-HS"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#8c859f]">Instructor / Institute</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#2d263d] bg-[#1c1728] text-[#f1ecff] text-xs focus:ring-1 focus:ring-[#6e46e6] focus:border-[#6e46e6] focus:outline-none"
              placeholder="e.g. IIT Guwahati"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#8c859f]">Total Duration (Weeks)</label>
            <input
              type="number"
              min="1"
              max="16"
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#2d263d] bg-[#1c1728] text-[#f1ecff] text-xs focus:ring-1 focus:ring-[#6e46e6] focus:border-[#6e46e6] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-lg bg-[#6e46e6] hover:bg-[#5a32d3] text-white font-semibold text-xs shadow-[0_0_16px_rgba(110,70,230,0.35)] transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Metadata</span>
            </button>
          </div>
        </form>
      </div>

      {/* JSON File Upload & Manual Import */}
      <div className="sre-card p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-[#f1ecff] uppercase tracking-wider">
          Import / Upload Questions
        </h3>
        
        <div>
          <label className="block text-xs font-semibold text-[#8c859f] mb-2">
            Upload .json Question File
          </label>
          <label className="flex flex-col items-center justify-center p-6 border border-dashed border-[#3c344d] rounded-xl cursor-pointer hover:border-[#6e46e6] hover:bg-[#1c1728] transition">
            <Upload className="w-6 h-6 text-[#8c859f] mb-2" />
            <span className="text-xs font-semibold text-[#f1ecff]">Click to select a JSON question package</span>
            <span className="text-[11px] text-[#8c859f] mt-0.5">Compatible with standard course schema</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="pt-2 space-y-2">
          <label className="text-xs font-semibold text-[#8c859f]">
            Or Paste Questions JSON
          </label>
          <textarea
            rows="5"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{ "courseInfo": { ... }, "questions": [ ... ] }'
            className="w-full font-mono text-xs p-3 rounded-xl border border-[#2d263d] bg-[#1c1728] text-[#f1ecff] focus:outline-none focus:ring-1 focus:ring-[#6e46e6] focus:border-[#6e46e6]"
          />
          <button
            onClick={handleImportJSON}
            disabled={!jsonInput.trim()}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#1c1728] hover:bg-[#1e1829] disabled:opacity-30 text-[#f1ecff] font-semibold text-xs border border-[#2d263d] transition"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Process JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
}
