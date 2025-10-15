"use client";
import { useState } from "react";
//Components
import Image from "next/image";
//Bootstrap
import { Container, Badge, Stack, Button, Row, Col } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Icons
import { LiaTrophySolid } from "react-icons/lia";

export default function CountryQuizPage() {
    const [currQuest, setCurrQuest] = useState<number>(1);
    const [rightAnswers, setRightAnswers] = useState<number>(0);

    return (
        <Container fluid className='py-5 cs-fc-main cs-bg-img min-vh-100 d-flex flex-column align-items-center justify-content-center gap-3'>
            <Container className="px-0 cs-mw d-flex flex-column align-items-center justify-content-center gap-3">
                <Container className="d-flex align-items-center justify-content-between">
                    <h1>Country Quiz</h1>
                    <Badge pill className="cs-fc-main cs-bg-step-pass px-3 py-2 d-flex align-items-center justify-content-center gap-2">
                        <LiaTrophySolid size={17} />
                        {currQuest}/10 Points
                    </Badge>
                </Container>
                <Container className="rounded-4 py-5 cs-bg-main d-flex flex-column align-items-center justify-content-center gap-3">
                    <Stack direction="horizontal" gap={2} className="justify-content-center">
                        {Array.from({ length: 10 }, (_, i) => {
                            const step = i + 1;
                            const passed = currQuest >= step ? '-pass' : '';
                            return (
                            <Badge
                                key={step}
                                bg="custom"
                                className={`cs-transition rounded-circle m-0 d-flex align-items-center justify-content-center fs-4 step-badge cs-bg-step${passed}`}
                            >
                                {step}
                            </Badge>
                            );
                        })}
                    </Stack>
                    <h2>Question</h2>
                    <Row>
                        <Col lg={6} xs={12} className="py-2">
                            <Button className="cs-btn cs-bg-step border-0 py-2 cs-transition rounded-3 w-100">Answer 1</Button>
                        </Col>
                        <Col lg={6} xs={12} className="py-2">
                            <Button className="cs-btn cs-bg-step border-0 py-2 cs-transition rounded-3 w-100">Answer 2</Button>
                        </Col>
                        <Col lg={6} xs={12} className="py-2">
                            <Button className="cs-btn cs-bg-step border-0 py-2 cs-transition rounded-3 w-100">Answer 3</Button>
                        </Col>
                        <Col lg={6} xs={12} className="py-2">
                            <Button className="cs-btn cs-bg-step border-0 py-2 cs-transition rounded-3 w-100">Answer 4</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container className="cs-mw-win rounded-4 py-4 text-center px-0 cs-bg-main d-flex flex-column align-items-center justify-content-center gap-3">
                <Image src={'/images/congrats.png'} alt="Win" width={349} height={107} />
                <h3 className="mx-5">Congrats! You completed the quiz.</h3>
                <p>You answer {rightAnswers}/10 correctly</p>
                <Button className="cs-btn cs-bg-step border-0 py-2 cs-transition rounded-3 px-5 rounded-3">Play again</Button>
            </Container>
        </Container>
    );
}