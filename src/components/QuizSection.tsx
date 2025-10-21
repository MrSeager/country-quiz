"use client";
import { useState, useEffect } from 'react';
//Components
import Image from 'next/image';
import { QuestionProps } from '@/types/types';
import { generateQuestions } from '@/lib/generateQuestions';
import QuestionText from './QuestionText';
//Bootstrap
import { Container, ButtonGroup, Button, Row, Col, Placeholder } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

type QuizSectionProps = {
    answeredQuest: number;
    setAnsweredQuest: React.Dispatch<React.SetStateAction<number>>;
    currQuest: number;
    setCurrQuest: React.Dispatch<React.SetStateAction<number>>;
    setRightAnswers: React.Dispatch<React.SetStateAction<number>>;
    setEndQuiz: (endQuiz: boolean) => void;
}

export default function QuizSection({answeredQuest, setAnsweredQuest, currQuest, setCurrQuest, setRightAnswers}: QuizSectionProps) {
    const steps = Array.from({ length: 10 }, (_, i) => i + 1);
    const [questions, setQuestions] = useState<Record<number, QuestionProps>>({});
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    useEffect(() => {
        async function loadQuestions() {
            const newQuestions: Record<number, QuestionProps> = {};

            for (let i = 1; i <= 10; i++) {
                const q = await generateQuestions();
                newQuestions[i] = q;
            }

            setQuestions(newQuestions);
            setLoading(false);
        }

        loadQuestions();
    }, []);

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return; // prevent multiple clicks

        setSelectedAnswer(index);

        const isCorrect = index + 1 === questions[currQuest].option;
        if (isCorrect) {
            setRightAnswers((prev) => prev + 1);
        }

        setTimeout(() => {
            setSelectedAnswer(null);
            setCurrQuest((prev) => prev + 1);
            setAnsweredQuest((prev) => prev + 1);
        }, 1000); // 1 second delay
    };

    return(
        <Container className="rounded-4 py-5 cs-bg-main d-flex flex-column align-items-center justify-content-center gap-3">
            <ButtonGroup className="justify-content-center gap-2">
                {steps.map((step) => (
                    <Button
                        key={step}
                        disabled={currQuest < step}
                        onClick={() => setCurrQuest(step)}
                        className={`border-0 cs-transition rounded-circle m-0 d-flex align-items-center justify-content-center fs-4 step-badge cs-bg-step${answeredQuest >= step ? '-pass' : ''}`}
                    >
                        {step}
                    </Button>
                ))}
            </ButtonGroup>
            {loading ? (
                <>
                    <Placeholder 
                        as={'h1'} 
                        xs={8} 
                        className='rounded rounded-3' 
                    />
                    <Row>
                        {[...Array(4)].map((_, index) => (
                            <Col key={index} lg={6} xs={12} className="py-2">
                                <Placeholder.Button
                                    variant="light"
                                    xs={12}
                                    className="py-2 px-5 rounded-3 w-100"
                                />
                            </Col>
                        ))}
                    </Row>
                </>
                ) : questions[currQuest] && (
                <>
                    <QuestionText
                        question={questions[currQuest].question}
                        flagUrl={questions[currQuest].flagUrl}
                    />
                    <Row>
                        {questions[currQuest].choices.map((choice, index) => (
                            <Col key={index} lg={6} xs={12} className="py-2">
                            <Button
                                onClick={() => handleAnswer(index)}
                                disabled={selectedAnswer !== null}
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