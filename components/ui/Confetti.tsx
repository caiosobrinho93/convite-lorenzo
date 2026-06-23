'use client';

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import confetti from 'canvas-confetti';

export interface ConfettiHandle {
  fire: () => void;
}

const Confetti = forwardRef<ConfettiHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const myConfettiRef = useRef<confetti.CreateTypes | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    myConfettiRef.current = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });
    return () => {
      myConfettiRef.current?.reset();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    fire: () => {
      const fire = myConfettiRef.current;
      if (!fire) return;

      const colors = ['#E53935', '#1A237E', '#FFD700', '#FFFFFF', '#C0392B', '#5C6BC0'];

      // Multiple bursts for spectacular effect
      fire({
        particleCount: 80,
        spread: 90,
        origin: { x: 0.3, y: 0.6 },
        colors,
        gravity: 0.8,
        scalar: 1.2,
      });

      setTimeout(() => {
        fire({
          particleCount: 80,
          spread: 90,
          origin: { x: 0.7, y: 0.6 },
          colors,
          gravity: 0.8,
          scalar: 1.2,
        });
      }, 150);

      setTimeout(() => {
        fire({
          particleCount: 120,
          spread: 120,
          origin: { x: 0.5, y: 0.4 },
          colors,
          gravity: 0.6,
          scalar: 1.4,
          startVelocity: 45,
        });
      }, 350);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      id="confetti-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 200,
      }}
    />
  );
});

Confetti.displayName = 'Confetti';

export default Confetti;
