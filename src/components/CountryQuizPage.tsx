"use client";
import { useState, useEffect } from "react";
//Components
import QuizSection from "./QuizSection";
import CongratsSection from "./CongratsSection";
import { QuestionProps } from '@/types/types';
import { generateQuestions } from '@/lib/generateQuestions';
import { useSlide } from "./anim";
//Bootstrap
import { Container, Badge } from 'react-bootstrap';
//Spring
import { animated } from '@react-spring/web';
//Icons
import { LiaTrophySolid } from "react-icons/lia";

export default function CountryQuizPage() {
  const [answeredQuest, setAnsweredQuest] = useState<number>(0);//amount of answered questions
  const [currQuest, setCurrQuest] = useState<number>(1);//current question number
  const [rightAnswers, setRightAnswers] = useState<number>(0);//amount of right answers
  const [questions, setQuestions] = useState<Record<number, QuestionProps>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const loadQuestions = async () => {
    const newQuestions: Record<number, QuestionProps> = {};
    for (let i = 1; i <= 10; i++) {
      const q = await generateQuestions();
      newQuestions[i] = q;
    }
    setQuestions(newQuestions);
    setLoading(false);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const resetQuiz = () => {
    setAnsweredQuest(0);
    setCurrQuest(1);
    setRightAnswers(0);
    setQuestions({});
    setLoading(true);
    setSelectedAnswer(null);
    setAnswers({});
    loadQuestions();
  };

  const slideAnim = useSlide(-200, 50);

  return (
    <Container fluid className='overflow-hidden py-5 cs-fc-main cs-bg-img min-vh-100 d-flex flex-column align-items-center justify-content-center gap-3'>
      {answeredQuest < 10 ?
        <animated.div style={slideAnim} className="container px-0 cs-mw d-flex flex-column align-items-center justify-content-center gap-3">
          <Container className="d-flex px-0 align-items-center justify-content-between">
            <h1>Country Quiz</h1>
            <Badge pill className="cs-fc-main cs-bg-step-pass px-3 py-2 d-flex align-items-center justify-content-center gap-2">
              <LiaTrophySolid size={17} />
              {rightAnswers}/10 Points
            </Badge>
          </Container>
          <QuizSection 
            questions={questions}
            loading={loading}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            answers={answers}
            setAnswers={setAnswers}
            answeredQuest={answeredQuest}
            setAnsweredQuest={setAnsweredQuest}
            currQuest={currQuest}
            setCurrQuest={setCurrQuest}
            setRightAnswers={setRightAnswers}
          />
        </animated.div>
      :
        <CongratsSection 
          rightAnswers={rightAnswers}
          resetQuiz={resetQuiz}
        />
    }
    </Container>
  );
}