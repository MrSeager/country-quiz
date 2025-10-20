"use client";
import { useState, useEffect } from 'react';
//Components
import Image from 'next/image';
import { QuestionProps } from '@/types/types';
//Bootstrap
import { Container, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
import { generateQuestions } from '@/lib/generateQuestions';

interface QuizSectionProps {
    answeredQuest: number,
    setAnsweredQuest: (answeredQuest: number) => void,
    currQuest: number,
    setCurrQuest: (currQuest: number) => void,
    setRightAnswers: (rightAnswers: number) => void,
    setEndQuiz: (endQuiz: boolean) => void
}

export default function QuizSection({answeredQuest, setAnsweredQuest, currQuest, setCurrQuest, setRightAnswers}: QuizSectionProps) {
    const steps = Array.from({ length: 10 }, (_, i) => i + 1);
    const [questions, setQuestions] = useState<Record<number, QuestionProps>>({});
    
    useEffect(() => {
        async function loadQueastions() {
            const q1 = await generateQuestions();
            setQuestions({ 1: q1 });
        }
        loadQueastions();
    }, []);

    return(
        <Container className="rounded-4 py-5 cs-bg-main d-flex flex-column align-items-center justify-content-center gap-3">
            <ButtonGroup className="justify-content-center gap-2">
                {steps.map((step) => (
                    <Button
                        key={step}
                        disabled={answeredQuest < step}
                        onClick={() => setCurrQuest(step)}
                        className={`border-0 cs-transition rounded-circle m-0 d-flex align-items-center justify-content-center fs-4 step-badge cs-bg-step${answeredQuest >= step ? '-pass' : ''}`}
                    >
                        {step}
                    </Button>
                ))}
            </ButtonGroup>
            {questions[currQuest] && (
                <>
                    <h2>
                        {questions[currQuest].question}{' '}
                        <Image
                            src={questions[currQuest].flagUrl}
                            alt="Country flag"
                            width={24}
                            height={18}
                            style={{ verticalAlign: 'middle', marginLeft: '6px' }}
                        />
                    </h2>
                    <Row>
                        {questions[currQuest].choices.map((choice, index) => (
                            <Col key={index} lg={6} xs={12} className="py-2">
                                <Button
                                    value={index + 1}
                                    className="cs-btn cs-bg-step border-0 py-2 cs-transition rounded-3 w-100"
                                >
                                    {choice}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
}