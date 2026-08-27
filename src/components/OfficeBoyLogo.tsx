import React, { useEffect, useRef, useState } from 'react';

export interface OfficeBoyLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  animated?: boolean;
  intensity?: 'calm' | 'attentive' | 'shimmer' | 'still';
  showAtmosphere?: boolean;
  customScale?: number;
  interactive?: boolean;
  onClick?: () => void;
}

export const OfficeBoyLogo: React.FC<OfficeBoyLogoProps> = ({
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

  // Dimension scaling
  const getDimensions = () => {
    switch (size) {
      case 'xs': return { width: 32, height: 32 };
      case 'sm': return { width: 44, height: 44 };
      case 'md': return { width: 72, height: 72 };
      case 'lg': return { width: 128, height: 128 };
      case 'xl': return { width: 200, height: 200 };
      case 'hero': return { width: 320, height: 320 };
      default: return { width: 72, height: 72 };
    }
  };

  const dims = getDimensions();
  const scaleMultiplier = customScale || 1;
  const finalWidth = dims.width * scaleMultiplier;
  const finalHeight = dims.height * scaleMultiplier;

  // Gentle, organic idle kinematics speed
  const speed = intensity === 'attentive' ? 1.4 : intensity === 'shimmer' ? 1.8 : 0.9;
  const t = animTime * speed;

  // Natural multi-harmonic head tilt (soft, organic, continuous)
  const headTilt = animated && intensity !== 'still'
    ? Math.sin(t * 0.85) * 3.8 + Math.sin(t * 1.4) * 1.4 + (hovered ? -5.0 : 0)
    : (hovered ? -5.0 : 0);

  // Soft vertical breathing / floating hover
  const headBob = animated && intensity !== 'still'
    ? Math.sin(t * 1.15) * 3.2
    : 0;

  // Antenna spherical beacon gentle sway
  const antennaSway = animated && intensity !== 'still'
    ? Math.sin(t * 1.5 + 0.35) * 4.6
    : 0;

  // Eye visor blink & glow pulse (natural organic pacing: blink every ~4 seconds)
  const blinkCycle = (t * 0.28) % 1;
  const isBlinking = blinkCycle > 0.93 && blinkCycle < 0.97;
  const eyeGlowIntensity = isBlinking ? 0.05 : (0.86 + Math.sin(t * 2.4) * 0.14);

  // Constant smooth light shimmer sweep moving across the curved metallic dome
  // Wrapping seamlessly across x coords
  const shimmerProgress = (t * 0.32) % 1;
  const shimmerX = 60 + shimmerProgress * 280;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center justify-center select-none ${interactive ? 'cursor-pointer transition-transform duration-300 hover:scale-105' : ''} ${className}`}
      style={{ width: finalWidth, height: finalHeight }}
    >
      {/* Monochrome Silver Luminous Specular Aura / Soft Ambient Halo */}
      {showAtmosphere && (
        <div
          className="absolute inset-0 pointer-events-none rounded-full filter blur-[22px] opacity-45 transition-all duration-700"
          style={{
            background: 'radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.45) 0%, rgba(203, 213, 225, 0.25) 35%, rgba(100, 116, 139, 0.12) 65%, transparent 80%)',
            transform: `scale(${hovered ? 1.25 : 1.05})`
          }}
        />
      )}

      {/* SVG Master Metallic Silver Robot Vector */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
        aria-label="OfficeBoy.ai Live Motion Silver Robot Logo"
      >
        <defs>
          {/* Head Dome Clip Path for specular light shimmer */}
          <clipPath id="silver-dome-clip">
            <path d="M 120 150 C 120 102, 155 76, 200 76 C 245 76, 280 102, 280 150 C 280 198, 252 216, 200 216 C 148 216, 120 198, 120 150 Z" />
          </clipPath>

          {/* Torso Clip Path for subtle body reflections */}
          <clipPath id="silver-torso-clip">
            <path d="M 148 240 C 148 226, 172 220, 200 220 C 228 220, 252 226, 252 240 L 260 288 C 260 322, 234 340, 200 340 C 166 340, 140 322, 140 288 Z" />
          </clipPath>

          {/* Polished Chrome Highlights Gradient (Upper Dome & Cranium) */}
          <linearGradient id="silver-polished-dome" x1="120" y1="60" x2="280" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="16%" stopColor="#f8fafc" />
            <stop offset="38%" stopColor="#e2e8f0" />
            <stop offset="68%" stopColor="#94a3b8" />
            <stop offset="88%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Curved Brushed Silver Gradient (Body & Pod Torso) */}
          <linearGradient id="silver-torso-grad" x1="140" y1="210" x2="260" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="22%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="80%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Deep Obsidian / Gunmetal Screen Inset */}
          <linearGradient id="silver-visor-screen" x1="140" y1="130" x2="260" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#181b20" />
            <stop offset="50%" stopColor="#0a0c10" />
            <stop offset="100%" stopColor="#1f242b" />
          </linearGradient>

          {/* Glowing Pure Platinum Silver Eyes */}
          <linearGradient id="silver-eye-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Ear Puck / Lateral Sensor Dials */}
          <linearGradient id="silver-ear-puck" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#cbd5e1" />
            <stop offset="70%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Moving Specular Reflection Light Shimmer Beam */}
          <linearGradient id="specular-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Soft Ground Contact Shadow */}
          <radialGradient id="silver-ground-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#0a0c10" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Grounding Ambient Contact Shadow */}
        <ellipse cx="200" cy="360" rx="90" ry="14" fill="url(#silver-ground-shadow)" />

        {/* ========================================================================= */}
        {/* ROBOT BODY / TORSO (Sleek pod base with minimal assistant collar notch) */}
        {/* ========================================================================= */}
        <g id="robot-torso">
          {/* Subtle Neck Pivot Ring */}
          <ellipse cx="200" cy="225" rx="32" ry="10" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />

          {/* Main Torso Pod (Friendly teardrop silhouette) */}
          <path
            d="M 148 240 C 148 226, 172 220, 200 220 C 228 220, 252 226, 252 240 L 260 288 C 260 322, 234 340, 200 340 C 166 340, 140 322, 140 288 Z"
            fill="url(#silver-torso-grad)"
            stroke="#ffffff"
            strokeWidth="1.2"
          />

          {/* Specular Highlight on Left Torso Shoulder */}
          <path
            d="M 152 242 C 152 232, 172 224, 195 223 C 180 230, 160 252, 154 285 C 150 268, 150 252, 152 242 Z"
            fill="#ffffff"
            opacity="0.65"
          />

          {/* Shadow Cutout on Right Under-Torso */}
          <path
            d="M 248 248 C 255 264, 258 285, 254 305 C 248 322, 228 334, 204 338 C 230 334, 252 316, 256 290 Z"
            fill="#0f172a"
            opacity="0.55"
          />

          {/* Assistant Lapel Collar & Silver AI Core Indicator */}
          <g id="office-tie-collar">
            {/* Minimalist V-Neck Lapel Inset Seam */}
            <path
              d="M 186 226 L 200 248 L 214 226"
              stroke="#334155"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 186 225 L 200 247 L 214 225"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* Central Silver Assistant Core Gem */}
            <circle cx="200" cy="265" r="7.5" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" />
            <circle cx="200" cy="265" r="4.2" fill="#ffffff" opacity={eyeGlowIntensity} />
            <circle cx="198.5" cy="263.5" r="1.5" fill="#ffffff" />
          </g>

          {/* Compact Hover Stabilizers */}
          <ellipse cx="170" cy="336" rx="14" ry="5" fill="#334155" stroke="#64748b" strokeWidth="1" />
          <ellipse cx="230" cy="336" rx="14" ry="5" fill="#334155" stroke="#64748b" strokeWidth="1" />
        </g>

        {/* ========================================================================= */}
        {/* ROBOT HEAD & VISOR (Continuously articulated with gentle idle motion) */}
        {/* ========================================================================= */}
        <g
          id="robot-head-assembly"
          style={{
            transformOrigin: '200px 225px',
            transform: `translateY(${headBob}px) rotate(${headTilt}deg)`,
            transition: animated && intensity !== 'still' ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.3, 1)'
          }}
        >
          {/* --- TOP ANTENNA & SPHERICAL BEACON --- */}
          <g id="antenna" style={{ transformOrigin: '200px 92px', transform: `rotate(${antennaSway}deg)` }}>
            {/* Sleek Tapered Antenna Stem */}
            <path
              d="M 198 92 L 199 52 L 201 52 L 202 92 Z"
              fill="url(#silver-ear-puck)"
              stroke="#ffffff"
              strokeWidth="0.6"
            />
            {/* Top Chrome Sphere Beacon */}
            <circle cx="200" cy="46" r="8" fill="url(#silver-polished-dome)" stroke="#ffffff" strokeWidth="1.2" />
            {/* Beacon Specular Highlight */}
            <circle cx="197.5" cy="43.5" r="2.8" fill="#ffffff" opacity="0.95" />
            {/* Subtle Pulse Halo on Beacon */}
            <circle cx="200" cy="46" r="13" stroke="#ffffff" strokeWidth="0.8" opacity={eyeGlowIntensity * 0.45} />
          </g>

          {/* --- LEFT & RIGHT EAR DIALS (Acoustic Sensors) --- */}
          {/* Left Ear Puck */}
          <g id="left-ear">
            <rect x="110" y="132" width="12" height="36" rx="5" fill="url(#silver-ear-puck)" stroke="#ffffff" strokeWidth="1" />
            <line x1="116" y1="138" x2="116" y2="162" stroke="#1e293b" strokeWidth="1.5" />
          </g>
          {/* Right Ear Puck */}
          <g id="right-ear">
            <rect x="278" y="132" width="12" height="36" rx="5" fill="url(#silver-ear-puck)" stroke="#ffffff" strokeWidth="1" />
            <line x1="284" y1="138" x2="284" y2="162" stroke="#1e293b" strokeWidth="1.5" />
          </g>

          {/* --- MAIN CRANIUM / DOME (Polished Metallic Silver Shell) --- */}
          <path
            d="M 120 150 C 120 102, 155 76, 200 76 C 245 76, 280 102, 280 150 C 280 198, 252 216, 200 216 C 148 216, 120 198, 120 150 Z"
            fill="url(#silver-polished-dome)"
            stroke="#ffffff"
            strokeWidth="1.5"
          />

          {/* Upper Dome Specular Crest (White Chrome Reflection) */}
          <path
            d="M 134 135 C 138 98, 165 84, 200 84 C 235 84, 262 98, 266 135 C 248 106, 218 96, 200 96 C 182 96, 152 106, 134 135 Z"
            fill="#ffffff"
            opacity="0.85"
          />

          {/* CONTINUOUS METALLIC REFLECTIVE LIGHT SHIMMER (Gliding across polished brow) */}
          {animated && intensity !== 'still' && (
            <g clipPath="url(#silver-dome-clip)">
              <rect
                x={shimmerX - 80}
                y="60"
                width="65"
                height="160"
                fill="url(#specular-sweep)"
                transform="rotate(22 200 140)"
                opacity="0.6"
              />
            </g>
          )}

          {/* --- BLACK OBSIDIAN VISOR SCREEN (Glossy Glass Inset) --- */}
          <g id="visor-glass">
            {/* Visor Inset Bezel Rim */}
            <rect
              x="136"
              y="120"
              width="128"
              height="66"
              rx="22"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="2"
            />
            {/* Deep Glass Visor Screen */}
            <rect
              x="138"
              y="122"
              width="124"
              height="62"
              rx="20"
              fill="url(#silver-visor-screen)"
              stroke="#0a0c10"
              strokeWidth="1"
            />

            {/* Subtle Curved Gloss Slash across Visor */}
            <path
              d="M 148 126 C 180 126, 230 130, 250 145 L 244 148 C 224 134, 178 130, 148 130 Z"
              fill="#ffffff"
              opacity="0.32"
            />
          </g>

          {/* --- FRIENDLY GLOWING SILVER OPTIC EYES & VISOR SMILE --- */}
          <g id="eyes" opacity={isBlinking ? 0.05 : 1}>
            {/* Left Eye: Expressive Pill */}
            <rect
              x="160"
              y="138"
              width="24"
              height="26"
              rx="9"
              fill="url(#silver-eye-glow)"
              filter="drop-shadow(0 0 6px rgba(255, 255, 255, 0.95))"
            />
            {/* Left Eye Catchlight */}
            <circle cx="176" cy="144" r="3" fill="#ffffff" />
            <circle cx="166" cy="154" r="1.5" fill="#ffffff" opacity="0.85" />

            {/* Right Eye: Expressive Pill */}
            <rect
              x="216"
              y="138"
              width="24"
              height="26"
              rx="9"
              fill="url(#silver-eye-glow)"
              filter="drop-shadow(0 0 6px rgba(255, 255, 255, 0.95))"
            />
            {/* Right Eye Catchlight */}
            <circle cx="232" cy="144" r="3" fill="#ffffff" />
            <circle cx="222" cy="154" r="1.5" fill="#ffffff" opacity="0.85" />

            {/* Subtle Assistant Smile Bar in Visor */}
            <path
              d="M 190 172 C 196 175, 204 175, 210 172"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={eyeGlowIntensity * 0.9}
            />
          </g>

          {/* Lower Jaw Chiseled Chin Lip */}
          <path
            d="M 160 206 C 180 212, 220 212, 240 206 C 220 216, 180 216, 160 206 Z"
            fill="#ffffff"
            opacity="0.65"
          />
        </g>
      </svg>
    </div>
  );
};
