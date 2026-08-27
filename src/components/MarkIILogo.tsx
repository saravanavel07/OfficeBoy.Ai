import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Wind, Eye, Download, Play, Pause, RefreshCw, Feather, Shield, Sliders, Layers, Sun } from 'lucide-react';

export interface MarkIILogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  animated?: boolean;
  intensity?: 'calm' | 'dynamic' | 'poised' | 'still';
  showAtmosphere?: boolean;
  customScale?: number;
  interactive?: boolean;
  onClick?: () => void;
}

export const MarkIILogo: React.FC<MarkIILogoProps> = ({
  size = 'md',
  className = '',
  animated = true,
  intensity = 'calm',
  showAtmosphere = true,
  customScale,
  interactive = false,
  onClick
}) => {
  const [hovered, setHovered] = useState(false);
  const [animTime, setAnimTime] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animated || intensity === 'still') return;

    let startTime = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      setAnimTime(elapsed);
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [animated, intensity]);

  // Size mapping
  const getDimensions = () => {
    switch (size) {
      case 'xs': return { width: 36, height: 28 };
      case 'sm': return { width: 48, height: 38 };
      case 'md': return { width: 80, height: 64 };
      case 'lg': return { width: 140, height: 110 };
      case 'xl': return { width: 220, height: 170 };
      case 'hero': return { width: 380, height: 290 };
      default: return { width: 80, height: 64 };
    }
  };

  const dims = getDimensions();
  const scaleMultiplier = customScale || 1;
  const finalWidth = dims.width * scaleMultiplier;
  const finalHeight = dims.height * scaleMultiplier;

  // Dynamic feather wing flex angles based on natural multi-harmonic physics
  const speed = intensity === 'dynamic' ? 1.6 : intensity === 'calm' ? 0.9 : 0.4;
  const t = animTime * speed;

  // Primary wing unfurl & breathing motion (natural, non-mechanical)
  const leftWingMainAngle = animated && intensity !== 'still'
    ? Math.sin(t * 0.95) * 3.8 + Math.sin(t * 1.618 + 0.5) * 1.6 + (hovered ? -3.5 : 0)
    : (hovered ? -3.5 : 0);

  const rightWingMainAngle = animated && intensity !== 'still'
    ? -Math.sin(t * 0.95 + 0.1) * 3.8 - Math.sin(t * 1.618 + 0.6) * 1.6 + (hovered ? 3.5 : 0)
    : (hovered ? 3.5 : 0);

  // Individual feather blade micro-ruffles (staggered phases for organic plumage)
  const getFeatherRuffle = (index: number, side: 'left' | 'right') => {
    if (!animated || intensity === 'still') return 0;
    const sideMultiplier = side === 'left' ? 1 : -1;
    const phaseOffset = index * 0.42;
    const flutter = Math.sin(t * 2.2 + phaseOffset) * 1.9 + Math.cos(t * 3.7 + phaseOffset * 1.3) * 0.9;
    return flutter * sideMultiplier;
  };

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center justify-center select-none ${interactive ? 'cursor-pointer transition-transform duration-300 hover:scale-[1.03]' : ''} ${className}`}
      style={{ width: finalWidth, height: finalHeight }}
    >
      {/* Cool Atmospheric Light Halo Behind Wings */}
      {showAtmosphere && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-full filter blur-[18px] opacity-45 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(122, 156, 184, 0.28) 0%, rgba(212, 190, 170, 0.2) 40%, rgba(252, 248, 242, 0.08) 65%, transparent 80%)',
            transform: `scale(${hovered ? 1.25 : 1.05})`
          }}
        />
      )}

      {/* SVG Vector Master Emblem */}
      <svg
        viewBox="0 0 600 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
        aria-label="Integrated Innovations Mark II - Hunter Hawk Wing Emblem"
      >
        <defs>
          {/* Natural Watercolor & Paper Texture Filter for Hand-Drawn Feather Strokes */}
          <filter id="mark-ii-tooth-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045 0.045" numOctaves="3" result="roughTooth" />
            <feDisplacementMap in="SourceGraphic" in2="roughTooth" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Biscuit to Bleach & Luminous Pearl Gradients */}
          <linearGradient id="ii-pillar-grad-left" x1="220" y1="90" x2="270" y2="370" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fffcf7" />
            <stop offset="28%" stopColor="#f4ece1" />
            <stop offset="65%" stopColor="#d8c2ad" />
            <stop offset="100%" stopColor="#b3977e" />
          </linearGradient>

          <linearGradient id="ii-pillar-grad-right" x1="380" y1="90" x2="330" y2="370" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fffcf7" />
            <stop offset="28%" stopColor="#f4ece1" />
            <stop offset="65%" stopColor="#d8c2ad" />
            <stop offset="100%" stopColor="#b3977e" />
          </linearGradient>

          {/* Primary Wing Blade Gradients (Pearl Base with Dusty Blue Highlights) */}
          <linearGradient id="feather-primary-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#f4eee4" />
            <stop offset="58%" stopColor="#d8c2ab" />
            <stop offset="85%" stopColor="#7a9cb8" />
            <stop offset="100%" stopColor="#507594" />
          </linearGradient>

          {/* Secondary Feather Blade Gradients (Warm Biscuit & Baked Clay Core with Blue Rim) */}
          <linearGradient id="feather-secondary-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fcf8f2" />
            <stop offset="35%" stopColor="#dbc7b3" />
            <stop offset="70%" stopColor="#a9886d" />
            <stop offset="95%" stopColor="#688ca8" />
          </linearGradient>

          {/* Covert & Marginal Feathers (Warm Linen Root) */}
          <linearGradient id="feather-covert-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7f1e6" />
            <stop offset="50%" stopColor="#caa98e" />
            <stop offset="100%" stopColor="#634c3c" />
          </linearGradient>

          {/* Muted Dusty Blue Edge Glow Filter */}
          <linearGradient id="dusty-blue-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9ec0d8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#7096b4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#456a87" stopOpacity="0.4" />
          </linearGradient>

          {/* Chiseled Central Bevel Light */}
          <linearGradient id="bevel-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#d4beaa" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2a1d15" stopOpacity="0.6" />
          </linearGradient>

          {/* Soft Shadow Glow for Wings */}
          <radialGradient id="falcon-heart-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffdf9" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#d4beaa" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7a9cb8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Core Heart Radiance */}
        <ellipse cx="300" cy="225" rx="140" ry="110" fill="url(#falcon-heart-glow)" />

        {/* ========================================================================= */}
        {/* LEFT WING (Extending outward from the left 'I' column - Falcon/Hawk Anatomy) */}
        {/* ========================================================================= */}
        <g 
          id="left-wing-root"
          filter="url(#mark-ii-tooth-filter)"
          style={{
            transformOrigin: '240px 220px',
            transform: `rotate(${leftWingMainAngle}deg)`,
            transition: animated ? 'none' : 'transform 0.4s ease-out'
          }}
        >
          {/* LEFT WING TIER 1: Primary Flight Feathers (Longest, Razor-Sharp Blade Pinions) */}
          
          {/* Primary 1 - Extreme Upper Blade (Spanning far left & up) */}
          <path
            d="M 235 155 C 190 120, 110 95, 25 80 C 65 110, 130 145, 225 180 Z"
            fill="url(#feather-primary-grad)"
            stroke="#9ec0d8"
            strokeWidth="1.2"
            strokeLinejoin="round"
            style={{
              transformOrigin: '235px 155px',
              transform: `rotate(${getFeatherRuffle(1, 'left')}deg)`
            }}
          />
          {/* Dusty Blue Windward Streak on Upper Primary 1 */}
          <path
            d="M 230 154 C 185 118, 108 94, 25 80 C 70 98, 140 125, 220 162"
            stroke="#b8d7ec"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Primary 2 - Sharp Outer Hunter Blade */}
          <path
            d="M 230 175 C 175 145, 95 130, 10 125 C 55 150, 125 180, 220 205 Z"
            fill="url(#feather-primary-grad)"
            stroke="#82a5c0"
            strokeWidth="1.2"
            strokeLinejoin="round"
            style={{
              transformOrigin: '230px 175px',
              transform: `rotate(${getFeatherRuffle(2, 'left')}deg)`
            }}
          />
          {/* Dusty Blue Edge Highlight */}
          <path
            d="M 225 174 C 170 144, 92 129, 10 125 C 60 142, 130 168, 215 192"
            stroke="#9ec0d8"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Primary 3 - Mid Flight Blade */}
          <path
            d="M 225 198 C 165 175, 90 170, 20 178 C 68 198, 132 220, 215 230 Z"
            fill="url(#feather-secondary-grad)"
            stroke="#7096b4"
            strokeWidth="1.1"
            strokeLinejoin="round"
            style={{
              transformOrigin: '225px 198px',
              transform: `rotate(${getFeatherRuffle(3, 'left')}deg)`
            }}
          />
          <path
            d="M 220 197 C 160 174, 88 169, 20 178 C 72 188, 135 208, 210 220"
            stroke="#8fb2cc"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Primary 4 - Lower Swept Blade */}
          <path
            d="M 220 225 C 158 210, 95 218, 38 238 C 82 248, 142 258, 210 255 Z"
            fill="url(#feather-secondary-grad)"
            stroke="#5c829e"
            strokeWidth="1"
            style={{
              transformOrigin: '220px 225px',
              transform: `rotate(${getFeatherRuffle(4, 'left')}deg)`
            }}
          />

          {/* LEFT WING TIER 2: Secondary Feathers (Layered Overlapping Shorter Blades) */}
          
          {/* Secondary 1 */}
          <path
            d="M 232 185 C 185 170, 130 172, 70 190 C 112 210, 168 226, 222 232 Z"
            fill="url(#feather-secondary-grad)"
            stroke="#456a87"
            strokeWidth="0.8"
          />
          {/* Secondary 2 */}
          <path
            d="M 228 215 C 178 208, 128 222, 75 250 C 118 262, 172 268, 218 262 Z"
            fill="url(#feather-secondary-grad)"
            stroke="#456a87"
            strokeWidth="0.8"
          />
          {/* Secondary 3 - Lower Keel Feather */}
          <path
            d="M 222 245 C 175 248, 132 272, 92 305 C 130 310, 178 300, 215 285 Z"
            fill="url(#feather-secondary-grad)"
            stroke="#3a5870"
            strokeWidth="0.8"
          />

          {/* LEFT WING TIER 3: Covert & Marginal Feathers (Root Feather Crest Anchoring to Left 'I') */}
          <path
            d="M 238 160 C 205 155, 170 162, 135 178 C 165 192, 202 198, 236 195 Z"
            fill="url(#feather-covert-grad)"
            opacity="0.95"
          />
          <path
            d="M 236 190 C 200 190, 165 204, 130 226 C 162 236, 198 238, 234 230 Z"
            fill="url(#feather-covert-grad)"
            opacity="0.95"
          />
          <path
            d="M 234 225 C 198 230, 164 250, 132 276 C 162 280, 198 274, 230 260 Z"
            fill="url(#feather-covert-grad)"
            opacity="0.9"
          />

          {/* Hand-Drawn Brush Hatching Texture Lines (Left Wing) */}
          <g stroke="#fffcf7" strokeWidth="0.75" strokeLinecap="round" opacity="0.45">
            <line x1="210" y1="160" x2="90" y2="108" />
            <line x1="205" y1="180" x2="80" y2="145" />
            <line x1="195" y1="205" x2="85" y2="190" />
            <line x1="190" y1="230" x2="100" y2="242" />
            <line x1="185" y1="255" x2="120" y2="285" />
          </g>
        </g>

        {/* ========================================================================== */}
        {/* RIGHT WING (Extending outward from the right 'I' column - Falcon/Hawk Anatomy) */}
        {/* ========================================================================== */}
        <g 
          id="right-wing-root"
          filter="url(#mark-ii-tooth-filter)"
          style={{
            transformOrigin: '360px 220px',
            transform: `rotate(${rightWingMainAngle}deg)`,
            transition: animated ? 'none' : 'transform 0.4s ease-out'
          }}
        >
          {/* RIGHT WING TIER 1: Primary Flight Feathers (Longest Razor-Sharp Blade Pinions) */}
          
          {/* Primary 1 - Extreme Upper Blade (Spanning far right & up) */}
          <path
            d="M 365 155 C 410 120, 490 95, 575 80 C 535 110, 470 145, 375 180 Z"
            fill="url(#feather-primary-grad)"
            stroke="#9ec0d8"
            strokeWidth="1.2"
            strokeLinejoin="round"
            style={{
              transformOrigin: '365px 155px',
              transform: `rotate(${getFeatherRuffle(1, 'right')}deg)`
            }}
          />
          {/* Dusty Blue Windward Streak on Upper Primary 1 */}
          <path
            d="M 370 154 C 415 118, 492 94, 575 80 C 530 98, 460 125, 380 162"
            stroke="#b8d7ec"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Primary 2 - Sharp Outer Hunter Blade */}
          <path
            d="M 370 175 C 425 145, 505 130, 590 125 C 545 150, 475 180, 380 205 Z"
            fill="url(#feather-primary-grad)"
            stroke="#82a5c0"
            strokeWidth="1.2"
            strokeLinejoin="round"
            style={{
              transformOrigin: '370px 175px',
              transform: `rotate(${getFeatherRuffle(2, 'right')}deg)`
            }}
          />
          {/* Dusty Blue Edge Highlight */}
          <path
            d="M 375 174 C 430 144, 508 129, 590 125 C 540 142, 470 168, 385 192"
            stroke="#9ec0d8"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Primary 3 - Mid Flight Blade */}
          <path
            d="M 375 198 C 435 175, 510 170, 580 178 C 532 198, 468 220, 385 230 Z"
            fill="url(#feather-secondary-grad)"
            stroke="#7096b4"
            strokeWidth="1.1"
            strokeLinejoin="round"
            style={{
              transformOrigin: '375px 198px',
              transform: `rotate(${getFeatherRuffle(3, 'right')}deg)`
            }}
          />
          <path
            d="M 380 197 C 440 174, 512 169, 580 178 C 528 188, 465 208, 390 220"
            stroke="#8fb2cc"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Primary 4 - Lower Swept Blade */}
          <path
            d="M 380 225 C 442 210, 505 218, 562 238 C 518 248, 458 258, 390 255 Z"
            fill="url(#feather-secondary-grad)"
            stroke="#5c829e"
            strokeWidth="1"
            style={{
              transformOrigin: '380px 225px',
              transform: `rotate(${getFeatherRuffle(4, 'right')}deg)`
            }}
          />

          {/* RIGHT WING TIER 2: Secondary Feathers (Layered Overlapping Shorter Blades) */}
          
          {/* Secondary 1 */}
          <path
            d="M 368 185 C 415 170, 470 172, 530 190 C 488 210, 432 226, 378 232 Z"
            fill="url(#feather-secondary-grad)"
            stroke="#456a87"
            strokeWidth="0.8"
          />
          {/* Secondary 2 */}
          <path
            d="M 372 215 C 422 208, 472 222, 525 250 C 482 262, 428 268, 382 262 Z"
            fill="url(#feather-secondary-grad)"
            stroke="#456a87"
            strokeWidth="0.8"
          />
          {/* Secondary 3 - Lower Keel Feather */}
          <path
            d="M 378 245 C 425 248, 468 272, 508 305 C 470 310, 422 300, 385 285 Z"
            fill="url(#feather-secondary-grad)"
            stroke="#3a5870"
            strokeWidth="0.8"
          />

          {/* RIGHT WING TIER 3: Covert & Marginal Feathers (Root Feather Crest Anchoring to Right 'I') */}
          <path
            d="M 362 160 C 395 155, 430 162, 465 178 C 435 192, 398 198, 364 195 Z"
            fill="url(#feather-covert-grad)"
            opacity="0.95"
          />
          <path
            d="M 364 190 C 400 190, 435 204, 470 226 C 438 236, 402 238, 366 230 Z"
            fill="url(#feather-covert-grad)"
            opacity="0.95"
          />
          <path
            d="M 366 225 C 402 230, 436 250, 468 276 C 438 280, 402 274, 370 260 Z"
            fill="url(#feather-covert-grad)"
            opacity="0.9"
          />

          {/* Hand-Drawn Brush Hatching Texture Lines (Right Wing) */}
          <g stroke="#fffcf7" strokeWidth="0.75" strokeLinecap="round" opacity="0.45">
            <line x1="390" y1="160" x2="510" y2="108" />
            <line x1="395" y1="180" x2="520" y2="145" />
            <line x1="405" y1="205" x2="515" y2="190" />
            <line x1="410" y1="230" x2="500" y2="242" />
            <line x1="415" y1="255" x2="480" y2="285" />
          </g>
        </g>

        {/* ========================================================================== */}
        {/* CENTERPIECE: THE BOLD 'II' MARK (Strong, Grounded, Chiseled Monoliths) */}
        {/* ========================================================================== */}
        <g id="centerpiece-ii-mark" filter="url(#mark-ii-tooth-filter)">
          
          {/* Subtle Deep Ambient Drop Shadow Behind Both Pillars */}
          <path
            d="M 230 115 L 268 115 L 268 335 L 230 335 Z"
            fill="#120c08"
            opacity="0.65"
            filter="blur(4px)"
          />
          <path
            d="M 332 115 L 370 115 L 370 335 L 332 335 Z"
            fill="#120c08"
            opacity="0.65"
            filter="blur(4px)"
          />

          {/* --- LEFT 'I' PILLAR (Hand-Crafted Serif Monolith with Chiseled Bevels) --- */}
          <g id="left-pillar-I">
            {/* Top Serif Bracket */}
            <path
              d="M 215 110 C 220 110, 230 112, 236 122 L 238 135 L 262 135 L 264 122 C 270 112, 280 110, 285 110 L 215 110 Z"
              fill="url(#ii-pillar-grad-left)"
              stroke="#fffdf9"
              strokeWidth="0.8"
            />
            {/* Main Central Stem */}
            <path
              d="M 236 130 C 235 180, 234 270, 236 320 L 264 320 C 266 270, 265 180, 264 130 Z"
              fill="url(#ii-pillar-grad-left)"
              stroke="#d4beaa"
              strokeWidth="0.75"
            />
            {/* Bottom Serif Bracket */}
            <path
              d="M 215 340 C 220 340, 230 338, 236 328 L 238 315 L 262 315 L 264 328 C 270 338, 280 340, 285 340 L 215 340 Z"
              fill="url(#ii-pillar-grad-left)"
              stroke="#b5997f"
              strokeWidth="0.8"
            />
            
            {/* Inner Light Bevel (Vertical Hand-Chiseled Ridge) */}
            <line x1="240" y1="120" x2="240" y2="330" stroke="#ffffff" strokeWidth="1.4" opacity="0.85" strokeLinecap="round" />
            <line x1="260" y1="120" x2="260" y2="330" stroke="#5c4332" strokeWidth="1.2" opacity="0.7" strokeLinecap="round" />

            {/* Subtle Calligraphic Horizontal Cross-Bracing / Fillet Accent */}
            <path
              d="M 228 220 C 235 218, 265 218, 272 220 L 270 228 C 265 226, 235 226, 230 228 Z"
              fill="#fffaf2"
              opacity="0.6"
            />
          </g>

          {/* --- RIGHT 'I' PILLAR (Hand-Crafted Serif Monolith with Chiseled Bevels) --- */}
          <g id="right-pillar-I">
            {/* Top Serif Bracket */}
            <path
              d="M 315 110 C 320 110, 330 112, 336 122 L 338 135 L 362 135 L 364 122 C 370 112, 380 110, 385 110 L 315 110 Z"
              fill="url(#ii-pillar-grad-right)"
              stroke="#fffdf9"
              strokeWidth="0.8"
            />
            {/* Main Central Stem */}
            <path
              d="M 336 130 C 335 180, 334 270, 336 320 L 364 320 C 366 270, 365 180, 364 130 Z"
              fill="url(#ii-pillar-grad-right)"
              stroke="#d4beaa"
              strokeWidth="0.75"
            />
            {/* Bottom Serif Bracket */}
            <path
              d="M 315 340 C 320 340, 330 338, 336 328 L 338 315 L 362 315 L 364 328 C 370 338, 380 340, 385 340 L 315 340 Z"
              fill="url(#ii-pillar-grad-right)"
              stroke="#b5997f"
              strokeWidth="0.8"
            />

            {/* Inner Light Bevel (Vertical Hand-Chiseled Ridge) */}
            <line x1="340" y1="120" x2="340" y2="330" stroke="#ffffff" strokeWidth="1.4" opacity="0.85" strokeLinecap="round" />
            <line x1="360" y1="120" x2="360" y2="330" stroke="#5c4332" strokeWidth="1.2" opacity="0.7" strokeLinecap="round" />

            {/* Subtle Calligraphic Horizontal Cross-Bracing / Fillet Accent */}
            <path
              d="M 328 220 C 335 218, 365 218, 372 220 L 370 228 C 365 226, 335 226, 330 228 Z"
              fill="#fffaf2"
              opacity="0.6"
            />
          </g>

          {/* Central Keystone Diamond (Predator Heart Gem linking the symmetry) */}
          <polygon
            points="300,212 308,225 300,238 292,225"
            fill="#fffcf7"
            stroke="#7a9cb8"
            strokeWidth="1.2"
          />
          <circle cx="300" cy="225" r="2" fill="#7a9cb8" />
        </g>
      </svg>
    </div>
  );
};
