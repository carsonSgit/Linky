import React from 'react';

interface LinkyBodyProps {
  indents: number;
  borderRadius: number;
  color: string;
}

const LinkyBody: React.FC<LinkyBodyProps> = ({ indents, borderRadius, color }) => {
    const triangles = Array.from({ length: indents }, (_, i) => {
        // Define the three points of each triangle
        const p1 = `${13 + (i * (74 / indents))},82`;
        const p2 = `${13 + ((74 / indents) / 2) + (i * (74 / indents))},92`;
        const p3 = `${13 + (74 / indents) + (i * (74 / indents))},82`;
    
        // Return a polyline for each triangle
        return (
          <polyline
            points={`${p1} ${p2} ${p3} ${p1}`}
            fill={color}
            stroke={color}
            strokeWidth={5}
            strokeLinejoin="round"
            strokeLinecap="round"
            key={i}
          />
        );
      });

  return (
    <svg width="60%" height="60%" preserveAspectRatio='X100Y100 meet' viewBox='0 0 100 100' xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="round-corner">
            <rect x="0" y="0" width="100" height="82" rx="5" ry="5"/>
         </clipPath>
     </defs>

     <rect x="10" y="10" width="80" height="80" clipPath="url(#round-corner)" fill={color} rx={borderRadius} />
     <rect x="10" y="45" width="80" height="80" clipPath="url(#round-corner)" fill={color}/>
     {triangles}
    </svg>
  );
};

export default LinkyBody;
