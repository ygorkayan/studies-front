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
  isEditMode: boolean;
  startEditing: () => void;
  revealAnswer: () => void;
  cancelEditing: () => void;
  saveQuestion: (body: BodyAnswer) => void;
}

export interface BodyAnswer {
  question?: string;
  answer?: string;
  controller?: "correct" | "incorrect";
}

export type withFlashCards = (Component: FC<FlashCardProps>) => () => JSX.Element;
