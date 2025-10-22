//Components
import Image from "next/image";
//Bootstrap
import { Container, Button } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

type CongratsSectionProps = {
  rightAnswers: number;
  resetQuiz: () => void;
};

export default function CongratsSection({rightAnswers, resetQuiz}: CongratsSectionProps){
    return(
        <Container className="cs-mw-win rounded-4 py-4 text-center px-0 cs-bg-main d-flex flex-column align-items-center justify-content-center gap-3">
            <Image src={'/images/congrats.png'} alt="Win" width={349} height={107} />
            <h3 className="mx-5">Congrats! You completed the quiz.</h3>
            <p>You answer {rightAnswers}/10 correctly</p>
            <Button onClick={resetQuiz} className="cs-btn cs-bg-step border-0 py-2 cs-transition rounded-3 px-5 rounded-3">Play again</Button>
        </Container>
    );
}