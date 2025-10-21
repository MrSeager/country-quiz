"use client";
import { useState } from "react";
//Components
import QuizSection from "./QuizSection";
import CongratsSection from "./CongratsSection";
//Bootstrap
import { Container, Badge } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Icons
import { LiaTrophySolid } from "react-icons/lia";

export default function CountryQuizPage() {
  const [answeredQuest, setAnsweredQuest] = useState<number>(0);//amount of answered questions
  const [currQuest, setCurrQuest] = useState<number>(1);//current question number
  const [rightAnswers, setRightAnswers] = useState<number>(0);//amount of right answers
  const [endQuiz, setEndQuiz] = useState<boolean>(false);//when all questions are answered shows CongratsSection

  return (
    <Container fluid className='py-5 cs-fc-main cs-bg-img min-vh-100 d-flex flex-column align-items-center justify-content-center gap-3'>
      {endQuiz === false ?
        <Container className="px-0 cs-mw d-flex flex-column align-items-center justify-content-center gap-3">
          <Container className="d-flex align-items-center justify-content-between">
            <h1>Country Quiz</h1>
            <Badge pill className="cs-fc-main cs-bg-step-pass px-3 py-2 d-flex align-items-center justify-content-center gap-2">
              <LiaTrophySolid size={17} />
              {rightAnswers}/10 Points
            </Badge>
          </Container>
          <QuizSection 
            answeredQuest={answeredQuest}
            setAnsweredQuest={setAnsweredQuest}
            currQuest={currQuest}
            setCurrQuest={setCurrQuest}
            setRightAnswers={setRightAnswers}
            setEndQuiz={setEndQuiz}
          />
        </Container>
      :
        <CongratsSection 
          rightAnswers={rightAnswers}
        />
    }
    </Container>
  );
}