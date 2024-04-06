import React from 'react';
import LinkyBody from './linky_body';
import LinkyFace from './linky_face';


const Linky = () => (
  <div style={{ position: 'relative', width: '100px', height: '100px', marginTop: '15px'}}>
    <LinkyBody indents={4} borderRadius={37} color={'#01b7ff'} />
    <div style={{ position: 'absolute', top: 0, left: 0 }}>
      <LinkyFace eyeSize={6} mouthType={'zigzag'} />
    </div>
  </div>
);
export default Linky;
