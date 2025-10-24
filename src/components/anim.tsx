import { useSpring } from '@react-spring/web';

export const useSlide = ( y: number, del: number = 0 ) => 
    useSpring({
        from: { opacity: 0, transform: `translateY(${y}px)` },
        to : { opacity: 1, transform: 'translateY(0px)' },
        config: { tension: 180, friction: 20 },
        delay: del,
    }); 