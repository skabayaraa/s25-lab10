export interface Question {
  text: string;
  options: string[];
  correctAnswerIndex: number;
  selectedAnswerIndex?: number;
}

export class QuizCore {
  private questions: Question[];
  private currentQuestionIndex: number;

  constructor(questions: Question[]) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }

  getCurrentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(index: number) {
    this.questions[this.currentQuestionIndex].selectedAnswerIndex = index;
  }

  getSelectedAnswer(): number | undefined {
    return this.questions[this.currentQuestionIndex].selectedAnswerIndex;
  }

  nextQuestion() {
    if (this.hasNextQuestion()) {
      this.currentQuestionIndex++;
    }
  }

  hasNextQuestion(): boolean {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  getScore(): number {
    return this.questions.filter(
      q => q.selectedAnswerIndex === q.correctAnswerIndex
    ).length;
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }
}
