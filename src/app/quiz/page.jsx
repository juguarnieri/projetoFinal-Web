"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Skeleton, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Quiz.module.css";
import Banner from "../components/Banner";
import QuizQuestion from "../components/QuizQuestion";
import QuizCorrection from "../components/QuizCorrection";
import ScrollToTopButton from "../components/ScrollToTopButton"; 
const API_URL = "http://localhost:4000";
const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchQuiz() {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/api/quiz`, { headers: HEADERS });
        setQuestions(data);
      } catch {
        toast.error("Erro ao carregar quiz.");
      }
      setLoading(false);
    }
    fetchQuiz();
  }, []);

  const handleSelect = (questionId, alternativeId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: alternativeId }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      toast.warn("Responda todas as perguntas!");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        answers: Object.entries(answers).map(([question_id, alternative_id]) => ({
          question_id: Number(question_id),
          alternative_id,
        })),
      };
      const { data } = await axios.post(`${API_URL}/api/quiz/submit`, payload, {
        headers: {
          ...HEADERS,
          "Content-Type": "application/json"
        }
      });
      setResult(data);
      setShowModal(true);
    } catch {
      toast.error("Erro ao enviar quiz.");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Banner title="QUIZ" image="/images/bannerQuiz.png" />
      <div className={styles.titulo}>
        <span>Teste seus conhecimentos criminais:</span>
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <form className={styles.quizForm}>
          {questions.map((q, idx) => (
            <QuizQuestion
              key={q.id}
              question={q}
              idx={idx}
              value={answers[q.id]}
              onSelect={handleSelect}
            />
          ))}
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={submitting}
            size="large"
            className={styles.submitBtn}
          >
            Enviar Respostas
          </Button>
        </form>
      )}

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={700}
      >
        {result && (
          <QuizCorrection result={result} questions={questions} />
        )}
      </Modal>
      <ToastContainer position="top-right" autoClose={4000} />
      <ScrollToTopButton />
    </div>
  );
}