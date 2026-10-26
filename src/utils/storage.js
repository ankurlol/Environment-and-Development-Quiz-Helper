import defaultData from '../data/courseData.json';

const STORAGE_KEYS = {
  COURSE_DATA: 'nptel_course_data',
  BOOKMARKS: 'nptel_bookmarks',
  PRACTICE_PROGRESS: 'nptel_practice_progress',
  EXAM_HISTORY: 'nptel_exam_history',
};

// Get active course data (fallback to defaultData)
export function getCourseData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSE_DATA);
    if (saved) {
      const parsed = JSON.parse(saved);
      // If course matches and question count matches default, return saved; otherwise load updated defaultData
      if (
        parsed.courseInfo?.courseName === defaultData.courseInfo?.courseName &&
        parsed.questions?.length === defaultData.questions?.length
      ) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading course data from storage', e);
  }
  return defaultData;
}

// Save course data
export function saveCourseData(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.COURSE_DATA, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving course data', e);
  }
}

// Reset course data back to default
export function resetCourseData() {
  localStorage.removeItem(STORAGE_KEYS.COURSE_DATA);
  return defaultData;
}

// Bookmarks management
export function getBookmarks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function toggleBookmark(questionId) {
  const current = getBookmarks();
  let updated;
  if (current.includes(questionId)) {
    updated = current.filter((id) => id !== questionId);
  } else {
    updated = [...current, questionId];
  }
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  return updated;
}

// Practice progress tracking (questionId -> { selectedAnswer, isCorrect, timestamp })
export function getPracticeProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PRACTICE_PROGRESS);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
}

export function savePracticeAnswer(questionId, selectedAnswer, isCorrect) {
  const progress = getPracticeProgress();
  progress[questionId] = {
    selectedAnswer,
    isCorrect,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEYS.PRACTICE_PROGRESS, JSON.stringify(progress));
  return progress;
}

export function resetPracticeProgress(week = null) {
  if (week === null) {
    localStorage.removeItem(STORAGE_KEYS.PRACTICE_PROGRESS);
    return {};
  }
  const progress = getPracticeProgress();
  const courseData = getCourseData();
  const weekQIds = new Set(
    courseData.questions.filter((q) => q.week === week).map((q) => q.id)
  );
  
  const updated = {};
  for (const [id, data] of Object.entries(progress)) {
    if (!weekQIds.has(id)) {
      updated[id] = data;
    }
  }
  localStorage.setItem(STORAGE_KEYS.PRACTICE_PROGRESS, JSON.stringify(updated));
  return updated;
}

// Exam history
export function getExamHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function saveExamResult(result) {
  const history = getExamHistory();
  const updated = [result, ...history].slice(0, 30); // keep last 30 exams
  localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(updated));
  return updated;
}
