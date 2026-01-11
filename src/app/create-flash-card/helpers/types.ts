import type { FC, JSX } from "react";

export type CreateFlashCardProps = {
  createDisabled: boolean;
  question: string;
  setQuestion: (value: string) => void;
  answer: string;
  setAnswer: (value: string) => void;
  hasError: boolean;
  clean: () => void;
  createFlashCard: () => void;
};

export type withCreateFlashCardType = (Component: FC<CreateFlashCardProps>) => () => JSX.Element;
