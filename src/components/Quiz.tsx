import React, { useState, useEffect } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';

const quizCore = new QuizCore();

const Quiz: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [update, setUpdate] = useState<number>(0); // UI-г дахин зурна
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);

  const currentQuestion = quizCore.getCurrentQuestion();
  const score = quizCore.getScore();
  const total = quizCore.getTotalQuestions();

  const handleOptionSelect = (option: string): void => {
    if (!showAnswerFeedback) {
      setSelectedAnswer(option);
    }
  };

  const handleButtonClick = (): void => {
    if (!selectedAnswer) return;

    quizCore.answerQuestion(selectedAnswer);
    setShowAnswerFeedback(true);

    // Зөв/буруу хариулт 1 сек үзүүлээд дараагийн асуулт руу шилжинэ
    setTimeout(() => {
      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
        setSelectedAnswer(null);
        setShowAnswerFeedback(false);
      } else {
        setSubmitted(true);
      }
      setUpdate((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (submitted) {
      localStorage.setItem('lastScore', score.toString());
    }
  }, [submitted]);

  if (submitted || !currentQuestion) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {total}</p>
        <button onClick={() => window.location.reload()}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul className="options">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === currentQuestion.correctAnswer;

          let className = '';
          if (isSelected) {
            className = showAnswerFeedback
              ? isCorrect ? 'selected correct' : 'selected incorrect'
              : 'selected';
          } else if (showAnswerFeedback && isCorrect) {
            className = 'correct';
          }

          return (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={className}
            >
              {option}
            </li>
          );
        })}
      </ul>

      <p>
        <strong>Selected Answer:</strong>{' '}
        {selectedAnswer ?? 'No answer selected'}
      </p>

      <p>
        Question {quizCore['currentQuestionIndex'] + 1} of {total} | Score: {score}
      </p>

      <button onClick={handleButtonClick} disabled={!selectedAnswer}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;
