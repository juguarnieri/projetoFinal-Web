"use client";
import { Card, Radio } from "antd";
import styles from "../quiz/Quiz.module.css";

export default function QuizQuestion({ question, idx, value, onSelect }) {
  return (
    <div className={styles.card}>
      <div className={styles.questionTitle}>Questão {idx + 1}</div>
      <p className={styles.question}>{question.question_text}</p>
      <Radio.Group
        onChange={(e) => onSelect(question.id, e.target.value)}
        value={value}
        className={styles.radioGroup}
      >
        {question.alternatives.map((alt, i) => (
          <Radio key={alt.id} value={alt.id} className={styles.radio}>
            {String.fromCharCode(65 + i)}) {alt.alternative_text}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
}