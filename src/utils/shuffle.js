// Fisher-Yates array shuffle
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Shuffles the options of a question and recalculates the new correctAnswer index
export function shuffleQuestionOptions(question) {
  if (!question || !question.options) return question;

  const correctText = question.options[question.correctAnswer];
  const shuffledOptions = shuffleArray(question.options);
  const newCorrectIndex = shuffledOptions.indexOf(correctText);

  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex,
  };
}

// Shuffles both the question order AND each question's option choices
export function shuffleQuestionsAndOptions(questions) {
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.map((q) => shuffleQuestionOptions(q));
}
