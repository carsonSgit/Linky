import React from 'react';
import LinkyBody from './linky_body';
import LinkyFace from './linky_face';

interface LinkyProps {
    primaryColor?: string;
}

const Linky: React.FC<LinkyProps> = ({
    primaryColor = '01b7ff'
}) => {
    // Hardcoded values as per requirement
    const indents = 4;
    const borderRadius = 40;
    const eyeSize = 6;
    const mouthType = 'zigzag';
    const color = '01b7ff'; // Using the hardcoded color directly

    return (
      <div style={{ position: 'relative', width: '100px', height: '100px'}}>
      <LinkyBody indents={indents} borderRadius={borderRadius} color={color} />
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <LinkyFace eyeSize={eyeSize} mouthType={mouthType} />
      </div>
    </div>
  );
};

export default Linky;