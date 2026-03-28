'use client';

import React from 'react';

interface PixelPortraitProps {
  variant: number;
  color: string;
}

export function PixelPortrait({ variant, color }: PixelPortraitProps) {
  // 12x12 grid patterns for team members
  const patterns: string[][] = [
    // Variant 0: "The Analyst" (Sruthi) - Clean, focused silhouette
    [
      "    XXXX    ",
      "   XXXXXX   ",
      "  XXXXXXXX  ",
      "  XX OO XX  ",
      "  XXXXXXXX  ",
      "   XXXXXX   ",
      "    XXXX    ",
      "  XXXXXXXX  ",
      " XXXXXXXXXX ",
      "XXXXXXXXXXXX",
      "XXXXXXXXXXXX",
      " XX      XX ",
    ],
    // Variant 1: "The Architect" (Ravi) - Strong, visored silhouette
    [
      "   XXXXXX   ",
      "  XXXXXXXX  ",
      " XXXXXXXXXX ",
      " XX OOOO XX ",
      " XXXXXXXXXX ",
      "  XXXXXXXX  ",
      "   XXXXXX   ",
      "   XXXXXX   ",
      "  XXXXXXXX  ",
      " XXXXXXXXXX ",
      "XXXXXXXXXXXX",
      "XXX      XXX",
    ],
    // Variant 2: "The Builder" (Sai) - Dynamic, antenna/sensor traits
    [
      "     XX     ",
      "    XXXX    ",
      "   XXXXXX   ",
      "  XX OO XX  ",
      "  XXXXXXXX  ",
      "   XXXXXX   ",
      "    XXXX    ",
      "  XXXXXXXX  ",
      " XXXXXXXXXX ",
      "XXXXXXXXXXXX",
      " XXXXXXXXXX ",
      "  XX    XX  ",
    ],
    // Variant 3: "The Integrator" (Abhiram) - Structural, solid silhouette
    [
      "   XXXXXX   ",
      "  XXXXXXXX  ",
      " XXXXXXXXXX ",
      " XX  OO  XX ",
      " XXXXXXXXXX ",
      "  XXXXXXXX  ",
      "   XXXXXX   ",
      "  XXXXXXXX  ",
      " XXXXXXXXXX ",
      "XXXXXXXXXXXX",
      "XXXXXXXXXXXX",
      "  XX    XX  ",
    ],
  ];

  const pattern = patterns[variant % patterns.length];

  return (
    <div className="relative group">
      {/* Background Glow */}
      <div 
        className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"
        style={{ backgroundColor: color }}
      />
      
      <svg 
        width="64" 
        height="64" 
        viewBox="0 0 12 12" 
        className="relative z-10 drop-shadow-lg"
      >
        {pattern.map((row, y) => 
          row.split('').map((char, x) => {
            if (char === 'X') {
              return (
                <rect 
                  key={`${x}-${y}`} 
                  x={x} 
                  y={y} 
                  width="1" 
                  height="1" 
                  fill={color}
                  className="transition-all duration-300"
                />
              );
            }
            if (char === 'O') {
              return (
                <rect 
                  key={`${x}-${y}`} 
                  x={x} 
                  y={y} 
                  width="1" 
                  height="1" 
                  fill="white"
                  opacity="0.9"
                >
                  <animate 
                    attributeName="opacity" 
                    values="0.5;1;0.5" 
                    dur="3s" 
                    repeatCount="indefinite" 
                  />
                </rect>
              );
            }
            return null;
          })
        )}
      </svg>
    </div>
  );
}
