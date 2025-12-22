import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface FadeInAnimationOptions {
    direction?: 'left' | 'right' | 'top' | 'bottom';
    distance?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
    enabled?: boolean;
    dependencies?: any[];
}

export function useFadeInAnimation<T extends HTMLElement>(
    options: FadeInAnimationOptions = {}
) {
    const {
        direction = 'left',
        distance = 50,
        duration = 0.6,
        stagger = 0.15,
        delay = 0,
        ease = 'power2.out',
        enabled = true,
        dependencies = []
    } = options;

    const ref = useRef<T>(null);
    const hasAnimated = useRef(false);

    const getInitialPosition = () => {
        switch (direction) {
            case 'left':
                return { x: -distance, y: 0 };
            case 'right':
                return { x: distance, y: 0 };
            case 'top':
                return { x: 0, y: -distance };
            case 'bottom':
                return { x: 0, y: distance };
            default:
                return { x: -distance, y: 0 };
        }
    };

    useGSAP(() => {
        if (enabled && !hasAnimated.current && ref.current) {
            const elements = ref.current.children;
            const initialPosition = getInitialPosition();

            gsap.fromTo(
                elements,
                {
                    opacity: 0,
                    ...initialPosition
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration,
                    stagger,
                    delay,
                    ease
                }
            );
            
            hasAnimated.current = true;
        }
    }, { scope: ref, dependencies: [enabled, ...dependencies] });

    return ref;
}
