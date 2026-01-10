import styles from "./CreateFlashCard.module.css";
import Textarea from "../components/Textarea/Textarea";
import Button from "../components/Button/Button";
import withCreateFlashCard from "./withCreateFlashCard";
import type { FC } from "react";
import type { CreateFlashCardProps } from "./helpers/types";

export const CreateFlashCard: FC<CreateFlashCardProps> = ({
  question,
  setQuestion,
  answer,
  setAnswer,
  hasError,
  createFlashCard,
  clean,
}) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <h1 className={styles.title}>Create Flash Card</h1>

      <Textarea label="Question" value={question} onChange={setQuestion} />

      <Textarea label="Answer" value={answer} onChange={setAnswer} height="250px" />

      <div className={styles["button-container"]}>
        <Button onClick={createFlashCard}>create</Button>

        <Button onClick={clean}>clean</Button>
      </div>

      {hasError && <div className={styles.error}>An error occurred. Please try again.</div>}
    </div>
  </div>
);

export default withCreateFlashCard(CreateFlashCard);
