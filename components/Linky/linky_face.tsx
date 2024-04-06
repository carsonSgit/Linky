import React, { useState, useEffect, useRef } from 'react';

interface LinkyFaceProps {
  eyeSize: number;
  mouthType: 'flat' | 'o' | 'zigzag' | 'dot';
}

const LinkyFace: React.FC<LinkyFaceProps> = ({ eyeSize, mouthType }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bobbingOffset, setBobbingOffset] = useState(0);
  const linkyRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (linkyRef.current) {
      const linkyRect = linkyRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - linkyRect.left,
        y: event.clientY - linkyRect.top,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const startBreathing = () => {
      const bobbing = () => {
        setBobbingOffset(1.5 * Math.sin(Date.now() / 500));
        requestAnimationFrame(bobbing);
      };
      bobbing();
    };
    startBreathing();
  }, []);

  const calculatePosition = (initialPosition: { x: number, y: number }, maxMovement: number, breathOffset: number = 0) => {
    const dx = mousePosition.x - initialPosition.x;
    const dy = mousePosition.y - initialPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const movementScale = Math.min(distance, maxMovement) / distance;
    return {
      x: initialPosition.x + dx * movementScale,
      y: initialPosition.y + dy * movementScale + bobbingOffset,
    };
  };

  const initialLeftEyePosition = { x: 35, y: 40 };
  const initialRightEyePosition = { x: 65, y: 40 };
  const initialMouthPosition = { x: 50, y: 65 };

  const breathOffset = Math.sin(Date.now() / 500) * 1.5; // 1.5px vertical oscillation

  const leftEyePosition = calculatePosition(initialLeftEyePosition, 5, breathOffset);
  const rightEyePosition = calculatePosition(initialRightEyePosition, 5, breathOffset);
  const mouthPosition = calculatePosition(initialMouthPosition, 2, breathOffset);

  const renderMouth = () => {
    switch (mouthType) {
      case 'flat':
        return <line x1="30" y1={mouthPosition.y} x2="70" y2={mouthPosition.y} stroke="white" strokeWidth="5" />;
      case 'o':
        return <circle cx={mouthPosition.x} cy={mouthPosition.y} r="10" fill="none" stroke="white" strokeWidth="5" />;
      case 'zigzag':
        return (
          <polyline
            points={`30,${mouthPosition.y - 5} 40,${mouthPosition.y + 5} 50,${mouthPosition.y - 5} 60,${mouthPosition.y + 5} 70,${mouthPosition.y - 5}`}
            fill="none"
            stroke="white"
            strokeWidth="5"
          />
        );
      case 'dot':
        return <circle cx={mouthPosition.x} cy={mouthPosition.y} r="5" fill="white" />;
      default:
        return null;
    }
  };

  return (
    <svg ref={linkyRef} width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      {/* Eyes */}
      <circle cx={leftEyePosition.x} cy={leftEyePosition.y} r={eyeSize} fill="white"/>
      <circle cx={rightEyePosition.x} cy={rightEyePosition.y} r={eyeSize} fill="white"/>
      {/* Mouth */}
      {renderMouth()}
    </svg>
  );
};

export default LinkyFace;
