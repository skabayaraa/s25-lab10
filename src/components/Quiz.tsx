import React, { useState } from 'react';
import { QuizCore, Question } from './QuizCore';
import './Quiz.css';


const quizCore = new QuizCore([
  {
    text: 'Монгол Улсын нийслэл юу вэ?',
    options: ['Дархан', 'Улаанбаатар', 'Эрдэнэт', 'Өлгий'],
    correctAnswerIndex: 1,
  },
  {
    text: 'Нар дэлхийг тойрдог уу?',
    options: ['Тийм', 'Үгүй'],
    correctAnswerIndex: 0,
  },
  {
    text: 'React.js-ийг хэн бүтээсэн бэ?',
    options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
    correctAnswerIndex: 1,
  },
]);

const Quiz: React.FC = () => {
  const [_, setUpdate] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizCore.getCurrentQuestion();
  const selectedAnswer = quizCore.getSelectedAnswer();

  const handleOptionClick = (index: number) => {
    quizCore.selectAnswer(index);
    setUpdate(u => u + 1);
  };

  const handleNext = () => {
    quizCore.nextQuestion();
    setUpdate(u => u + 1);
  };

  const handleFinish = () => {
    setFinished(true);
  };

  if (finished) {
    return (
      <div className="quiz-container">
        <h2>Таны оноо: {quizCore.getScore()} / {quizCore.getTotalQuestions()}</h2>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h3>{question.text}</h3>
      <ul className="options">
        {question.options.map((option: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
          <li
            key={index}
            className={selectedAnswer === index ? 'selected' : ''}
            onClick={() => handleOptionClick(index)}
          >
            {option}
          </li>
        ))}
      </ul>

      {quizCore.hasNextQuestion() ? (
        <button onClick={handleNext} disabled={selectedAnswer === undefined}>
          Дараагийн Асуулт
        </button>
      ) : (
        <button onClick={handleFinish} disabled={selectedAnswer === undefined}>
          Илгээх
        </button>
      )}
    </div>
  );
};

export default Quiz;
