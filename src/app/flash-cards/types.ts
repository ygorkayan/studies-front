import type { FC, JSX } from "react";

export type Question = {
  id: number;
  question: string;
  answer: string;
  showAnswer: boolean;
};

export interface FlashCardProps {
  loading: boolean;
  question: Question;
  revealAnswer: () => void;
  handleAnswer: (correct: boolean) => void;
}

export type withFlashCards = (Component: FC<FlashCardProps>) => () => JSX.Element;
