"use client";
import { Card, Result } from "antd";
import styles from "../quiz/Quiz.module.css";

export default function QuizCorrection({ result, questions }) {
  return (
    <>
      <Result
        status="success"
        title={`Você acertou ${result.correct} de ${result.total} questões!`}
        subTitle="Veja o gabarito abaixo:"
      />
      <div className={styles.correctionList}>
        {result.correction.map((item, idx) => {
          const question = questions.find((q) => q.id === item.question_id);
          const yourAlt = question.alternatives.find((a) => a.id === item.your_answer);
          const correctAlt = question.alternatives.find((a) => a.id === item.correct_alternative_id);
          return (
            <Card
              key={item.question_id}
              className={item.is_correct ? styles.correct : styles.incorrect}
              title={`Questão ${idx + 1}`}
              size="small"
            >
              <p className={styles.question}>{question.question_text}</p>
              <p>
                Sua resposta:{" "}
                <b>
                  {yourAlt
                    ? yourAlt.alternative_text
                    : <span style={{ color: "red" }}>Não respondida</span>}
                </b>
              </p>
              {!item.is_correct && (
                <p>
                  Correta: <b>{correctAlt?.alternative_text}</b>
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </>
  );
}