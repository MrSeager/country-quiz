//Components
import Image from 'next/image';
import { QuestionProps } from '@/types/types';
import QuestionText from './QuestionText';
import QuizSectionPlaceholder from './QuizSectionPlaceholder';
import { useSlide } from './anim';
//Bootstrap
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';
//Spring
import { animated } from '@react-spring/web';

type QuizSectionProps = {
    questions: Record<number, QuestionProps>;
    loading: boolean;
    selectedAnswer: number | null;
    setSelectedAnswer: (selectedAnswer: number | null) => void;
    answers: Record<number, number>;
    setAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
    answeredQuest: number;
    setAnsweredQuest: React.Dispatch<React.SetStateAction<number>>;
    currQuest: number;
    setCurrQuest: React.Dispatch<React.SetStateAction<number>>;
    setRightAnswers: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuizSection({questions, loading, selectedAnswer, setSelectedAnswer, answers, setAnswers, answeredQuest, setAnsweredQuest, currQuest, setCurrQuest, setRightAnswers}: QuizSectionProps) {
    const steps = Array.from({ length: 10 }, (_, i) => i + 1);

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return; // prevent multiple clicks

        setSelectedAnswer(index);

        const isCorrect = index + 1 === questions[currQuest].option;
        if (isCorrect) {
            setRightAnswers((prev) => prev + 1);
        }

        setAnswers((prev) => ({ ...prev, [currQuest]: index }));

        setTimeout(() => {
            setSelectedAnswer(null);
            setCurrQuest((prev) => prev + 1);
            setAnsweredQuest((prev) => prev + 1);
        }, 1000); // 1 second delay
    };

    const slideAnim = useSlide(200, 100);

    return(
        <animated.div style={slideAnim} className="container rounded-4 py-5 cs-bg-main d-flex flex-column align-items-center justify-content-center gap-3">
            <ButtonGroup className="justify-content-around gap-2 flex-wrap">
                {steps.map((step) => (
                    <Button
                        key={step}
                        disabled={answeredQuest + 1 < step}
                        onClick={() => setCurrQuest(step)}
                        className={`border-0 cs-transition rounded-circle m-0 d-flex align-items-center justify-content-center fs-4 step-btn cs-transition cs-bg-step${answeredQuest >= step ? '-pass' : ''}`}
                    >
                        {step}
                    </Button>
                ))}
            </ButtonGroup>
            {loading ? (
                <QuizSectionPlaceholder />
                ) : questions[currQuest] && (
                <>
                    <QuestionText
                        question={questions[currQuest].question}
                        flagUrl={questions[currQuest].flagUrl}
                    />
                    <Row className='w-75'>
                        {questions[currQuest].choices.map((choice, index) => (
                            <Col key={index} lg={6} xs={12} className="py-2">
                                <Button
                                    onClick={() => handleAnswer(index)}
                                    disabled={selectedAnswer !== null || answers[currQuest] !== undefined}
                                    value={index + 1}
                                    className={`cs-btn${answers[currQuest] === index  ? '-checked' : ''} cs-transition text-nowrap cs-bg-step border-0 px-4 cs-transition rounded-3 w-100`}
                                >
                                    {choice}
                                    {/* ✅ Show check icon if this is the correct answer and question was answered */}
                                    {answers[currQuest] !== undefined && index + 1 === questions[currQuest].option && (
                                        <Image
                                            src="/images/Check_round_fill.svg"
                                            alt="Correct"
                                            width={20}
                                            height={20}
                                            className="ms-2"
                                        />
                                    )}

                                    {/* ❌ Show close icon if this was the selected wrong answer */}
                                    {answers[currQuest] !== undefined && answers[currQuest] === index && index + 1 !== questions[currQuest].option && (
                                        <Image
                                            src="/images/Close_round_fill.svg"
                                            alt="Wrong"
                                            width={20}
                                            height={20}
                                            className="ms-2"
                                        />
                                    )}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </animated.div>
    );
}