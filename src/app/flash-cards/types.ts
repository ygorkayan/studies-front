import type { FC, JSX } from "react";

export type Question = {
  question: string;
  answer: string;
  showAnswer: boolean;
};

export interface FlashCardProps {
  loading: boolean;
  question: Question;
  revealAnswer: () => void;
  questionCorrected: () => void;
  questionIncorrect: () => void;
}

export type withFlashCards = (Component: FC<FlashCardProps>) => () => JSX.Element;
