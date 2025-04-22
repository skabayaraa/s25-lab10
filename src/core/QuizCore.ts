import quizData from '../data/quizData';
import QuizQuestion from './QuizQuestion';

class QuizCore {
  private questions: QuizQuestion[];
  private currentQuestionIndex: number;
  private score: number;

  constructor() {
    this.questions = quizData;
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  public getCurrentQuestion(): QuizQuestion | null {
    if (this.currentQuestionIndex >= 0 && this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  public nextQuestion(): void {
    this.currentQuestionIndex++;
  }

  public hasNextQuestion(): boolean {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  public answerQuestion(answer: string): void {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      this.score++;
    }
  }

  public getScore(): number {
    return this.score;
  }

  public getTotalQuestions(): number {
    return this.questions.length;
  }
}

export default QuizCore;
