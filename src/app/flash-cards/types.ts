import type { FC, JSX } from "react";

export type Question = {
  id: number;
  answer: string;
  question: string;
  showAnswer: boolean;
};

export interface FlashCardProps {
  id: number;
  loading: boolean;
  question: Question;
  revealAnswer: () => void;
  handleAnswer: (correct: boolean) => void;
}

export type withFlashCards = (Component: FC<FlashCardProps>) => () => JSX.Element;
