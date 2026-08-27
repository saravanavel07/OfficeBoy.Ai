import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Wind, 
  Feather, 
  Shield, 
  Sun, 
  Moon, 
  Sliders, 
  Layers, 
  Eye,
  Maximize2,
  Compass,
  Play,
  Pause
} from 'lucide-react';
import { MarkIILogo } from './MarkIILogo';

interface MarkIIStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarkIIStudioModal: React.FC<MarkIIStudioModalProps> = ({
  isOpen,
  onClose
}) => {
  const [viewMode, setViewMode] = useState<'vector' | 'artPrint'>('vector');
  const [animationIntensity, setAnimationIntensity] = useState<'calm' | 'dynamic' | 'poised' | 'still'>('calm');
  const [backgroundMood, setBackgroundMood] = useState<'deepUmber' | 'bleachedSand' | 'midnightObsidian' | 'rawLinen'>('deepUmber');
  const [showAtmosphere, setShowAtmosphere] = useState<boolean>(true);
  const [zoomScale, setZoomScale] = useState<number>(1.2);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const getBackgroundStyle = () => {
    switch (backgroundMood) {
      case 'bleachedSand':
        return 'bg-[#261f19] border-[#4a392b] text-[#fcf8f2]';
      case 'midnightObsidian':
        return 'bg-[#0a0807] border-[#221812] text-[#fcf8f2]';
      case 'rawLinen':
        return 'bg-[#1e1712] border-[#3d2e24] text-[#fcf8f2]';
      default: // deepUmber
        return 'bg-[#150f0c] border-[#382b22] text-[#fcf8f2]';
    }
  };

  const handleCopySvg = () => {
    // Generate clean standalone SVG markup
    const svgData = `<svg viewBox="0 0 600 460" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Integrated Innovations Mark II Logo: Hunter Hawk Wings & 'II' Monolith -->
  <defs>
    <linearGradient id="ii-pillar-l" x1="220" y1="90" x2="270" y2="370" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fffcf7" />
      <stop offset="28%" stop-color="#f4ece1" />
      <stop offset="65%" stop-color="#d8c2ad" />
      <stop offset="100%" stop-color="#b3977e" />
    </linearGradient>
    <linearGradient id="ii-pillar-r" x1="380" y1="90" x2="330" y2="370" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fffcf7" />
      <stop offset="28%" stop-color="#f4ece1" />
      <stop offset="65%" stop-color="#d8c2ad" />
      <stop offset="100%" stop-color="#b3977e" />
    </linearGradient>
    <linearGradient id="feather-pri" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#f4eee4" />
      <stop offset="58%" stop-color="#d8c2ab" />
      <stop offset="85%" stop-color="#7a9cb8" />
      <stop offset="100%" stop-color="#507594" />
    </linearGradient>
    <linearGradient id="feather-sec" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fcf8f2" />
      <stop offset="35%" stop-color="#dbc7b3" />
      <stop offset="70%" stop-color="#a9886d" />
      <stop offset="95%" stop-color="#688ca8" />
    </linearGradient>
    <linearGradient id="feather-cov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f7f1e6" />
      <stop offset="50%" stop-color="#caa98e" />
      <stop offset="100%" stop-color="#634c3c" />
    </linearGradient>
  </defs>

  <!-- Left Falcon Wing -->
  <g id="left-wing">
    <path d="M 235 155 C 190 120, 110 95, 25 80 C 65 110, 130 145, 225 180 Z" fill="url(#feather-pri)" stroke="#9ec0d8" stroke-width="1.2" />
    <path d="M 230 154 C 185 118, 108 94, 25 80 C 70 98, 140 125, 220 162" stroke="#b8d7ec" stroke-width="2.2" />
    <path d="M 230 175 C 175 145, 95 130, 10 125 C 55 150, 125 180, 220 205 Z" fill="url(#feather-pri)" stroke="#82a5c0" stroke-width="1.2" />
    <path d="M 225 174 C 170 144, 92 129, 10 125 C 60 142, 130 168, 215 192" stroke="#9ec0d8" stroke-width="2" />
    <path d="M 225 198 C 165 175, 90 170, 20 178 C 68 198, 132 220, 215 230 Z" fill="url(#feather-sec)" stroke="#7096b4" stroke-width="1.1" />
    <path d="M 220 225 C 158 210, 95 218, 38 238 C 82 248, 142 258, 210 255 Z" fill="url(#feather-sec)" stroke="#5c829e" />
    <path d="M 232 185 C 185 170, 130 172, 70 190 C 112 210, 168 226, 222 232 Z" fill="url(#feather-sec)" />
    <path d="M 228 215 C 178 208, 128 222, 75 250 C 118 262, 172 268, 218 262 Z" fill="url(#feather-sec)" />
    <path d="M 222 245 C 175 248, 132 272, 92 305 C 130 310, 178 300, 215 285 Z" fill="url(#feather-sec)" />
    <path d="M 238 160 C 205 155, 170 162, 135 178 C 165 192, 202 198, 236 195 Z" fill="url(#feather-cov)" />
    <path d="M 236 190 C 200 190, 165 204, 130 226 C 162 236, 198 238, 234 230 Z" fill="url(#feather-cov)" />
  </g>

  <!-- Right Falcon Wing -->
  <g id="right-wing">
    <path d="M 365 155 C 410 120, 490 95, 575 80 C 535 110, 470 145, 375 180 Z" fill="url(#feather-pri)" stroke="#9ec0d8" stroke-width="1.2" />
    <path d="M 370 154 C 415 118, 492 94, 575 80 C 530 98, 460 125, 380 162" stroke="#b8d7ec" stroke-width="2.2" />
    <path d="M 370 175 C 425 145, 505 130, 590 125 C 545 150, 475 180, 380 205 Z" fill="url(#feather-pri)" stroke="#82a5c0" stroke-width="1.2" />
    <path d="M 375 174 C 430 144, 508 129, 590 125 C 540 142, 470 168, 385 192" stroke="#9ec0d8" stroke-width="2" />
    <path d="M 375 198 C 435 175, 510 170, 580 178 C 532 198, 468 220, 385 230 Z" fill="url(#feather-sec)" stroke="#7096b4" stroke-width="1.1" />
    <path d="M 380 225 C 442 210, 505 218, 562 238 C 518 248, 458 258, 390 255 Z" fill="url(#feather-sec)" stroke="#5c829e" />
    <path d="M 368 185 C 415 170, 470 172, 530 190 C 488 210, 432 226, 378 232 Z" fill="url(#feather-sec)" />
    <path d="M 372 215 C 422 208, 472 222, 525 250 C 482 262, 428 268, 382 262 Z" fill="url(#feather-sec)" />
    <path d="M 378 245 C 425 248, 468 272, 508 305 C 470 310, 422 300, 385 285 Z" fill="url(#feather-sec)" />
    <path d="M 362 160 C 395 155, 430 162, 465 178 C 435 192, 398 198, 364 195 Z" fill="url(#feather-cov)" />
    <path d="M 364 190 C 400 190, 435 204, 470 226 C 438 236, 402 238, 366 230 Z" fill="url(#feather-cov)" />
  </g>

  <!-- Centerpiece 'II' Mark -->
  <g id="mark-ii">
    <!-- Left 'I' -->
    <path d="M 215 110 C 220 110, 230 112, 236 122 L 238 135 L 262 135 L 264 122 C 270 112, 280 110, 285 110 L 215 110 Z" fill="url(#ii-pillar-l)" stroke="#fffdf9" />
    <path d="M 236 130 C 235 180, 234 270, 236 320 L 264 320 C 266 270, 265 180, 264 130 Z" fill="url(#ii-pillar-l)" stroke="#d4beaa" />
    <path d="M 215 340 C 220 340, 230 338, 236 328 L 238 315 L 262 315 L 264 328 C 270 338, 280 340, 285 340 L 215 340 Z" fill="url(#ii-pillar-l)" />
    <line x1="240" y1="120" x2="240" y2="330" stroke="#ffffff" stroke-width="1.4" opacity="0.85" />
    
    <!-- Right 'I' -->
    <path d="M 315 110 C 320 110, 330 112, 336 122 L 338 135 L 362 135 L 364 122 C 370 112, 380 110, 385 110 L 315 110 Z" fill="url(#ii-pillar-r)" stroke="#fffdf9" />
    <path d="M 336 130 C 335 180, 334 270, 336 320 L 364 320 C 366 270, 365 180, 364 130 Z" fill="url(#ii-pillar-r)" stroke="#d4beaa" />
    <path d="M 315 340 C 320 340, 330 338, 336 328 L 338 315 L 362 315 L 364 328 C 370 338, 380 340, 385 340 L 315 340 Z" fill="url(#ii-pillar-r)" />
    <line x1="340" y1="120" x2="340" y2="330" stroke="#ffffff" stroke-width="1.4" opacity="0.85" />

    <!-- Central Diamond Gem -->
    <polygon points="300,212 308,225 300,238 292,225" fill="#fffcf7" stroke="#7a9cb8" stroke-width="1.2" />
  </g>
</svg>`;

    navigator.clipboard.writeText(svgData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    const svgData = `<svg viewBox="0 0 600 460" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Integrated Innovations Mark II Logo: Hunter Hawk Wings & 'II' Monolith -->
  <defs>
    <linearGradient id="ii-pillar-l" x1="220" y1="90" x2="270" y2="370" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fffcf7" />
      <stop offset="28%" stop-color="#f4ece1" />
      <stop offset="65%" stop-color="#d8c2ad" />
      <stop offset="100%" stop-color="#b3977e" />
    </linearGradient>
    <linearGradient id="ii-pillar-r" x1="380" y1="90" x2="330" y2="370" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fffcf7" />
      <stop offset="28%" stop-color="#f4ece1" />
      <stop offset="65%" stop-color="#d8c2ad" />
      <stop offset="100%" stop-color="#b3977e" />
    </linearGradient>
    <linearGradient id="feather-pri" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#f4eee4" />
      <stop offset="58%" stop-color="#d8c2ab" />
      <stop offset="85%" stop-color="#7a9cb8" />
      <stop offset="100%" stop-color="#507594" />
    </linearGradient>
    <linearGradient id="feather-sec" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fcf8f2" />
      <stop offset="35%" stop-color="#dbc7b3" />
      <stop offset="70%" stop-color="#a9886d" />
      <stop offset="95%" stop-color="#688ca8" />
    </linearGradient>
    <linearGradient id="feather-cov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f7f1e6" />
      <stop offset="50%" stop-color="#caa98e" />
      <stop offset="100%" stop-color="#634c3c" />
    </linearGradient>
  </defs>

  <g id="left-wing">
    <path d="M 235 155 C 190 120, 110 95, 25 80 C 65 110, 130 145, 225 180 Z" fill="url(#feather-pri)" stroke="#9ec0d8" stroke-width="1.2" />
    <path d="M 230 154 C 185 118, 108 94, 25 80 C 70 98, 140 125, 220 162" stroke="#b8d7ec" stroke-width="2.2" />
    <path d="M 230 175 C 175 145, 95 130, 10 125 C 55 150, 125 180, 220 205 Z" fill="url(#feather-pri)" stroke="#82a5c0" stroke-width="1.2" />
    <path d="M 225 174 C 170 144, 92 129, 10 125 C 60 142, 130 168, 215 192" stroke="#9ec0d8" stroke-width="2" />
    <path d="M 225 198 C 165 175, 90 170, 20 178 C 68 198, 132 220, 215 230 Z" fill="url(#feather-sec)" stroke="#7096b4" stroke-width="1.1" />
    <path d="M 220 225 C 158 210, 95 218, 38 238 C 82 248, 142 258, 210 255 Z" fill="url(#feather-sec)" stroke="#5c829e" />
    <path d="M 232 185 C 185 170, 130 172, 70 190 C 112 210, 168 226, 222 232 Z" fill="url(#feather-sec)" />
    <path d="M 228 215 C 178 208, 128 222, 75 250 C 118 262, 172 268, 218 262 Z" fill="url(#feather-sec)" />
    <path d="M 222 245 C 175 248, 132 272, 92 305 C 130 310, 178 300, 215 285 Z" fill="url(#feather-sec)" />
    <path d="M 238 160 C 205 155, 170 162, 135 178 C 165 192, 202 198, 236 195 Z" fill="url(#feather-cov)" />
  </g>

  <g id="right-wing">
    <path d="M 365 155 C 410 120, 490 95, 575 80 C 535 110, 470 145, 375 180 Z" fill="url(#feather-pri)" stroke="#9ec0d8" stroke-width="1.2" />
    <path d="M 370 154 C 415 118, 492 94, 575 80 C 530 98, 460 125, 380 162" stroke="#b8d7ec" stroke-width="2.2" />
    <path d="M 370 175 C 425 145, 505 130, 590 125 C 545 150, 475 180, 380 205 Z" fill="url(#feather-pri)" stroke="#82a5c0" stroke-width="1.2" />
    <path d="M 375 174 C 430 144, 508 129, 590 125 C 540 142, 470 168, 385 192" stroke="#9ec0d8" stroke-width="2" />
    <path d="M 375 198 C 435 175, 510 170, 580 178 C 532 198, 468 220, 385 230 Z" fill="url(#feather-sec)" stroke="#7096b4" stroke-width="1.1" />
    <path d="M 380 225 C 442 210, 505 218, 562 238 C 518 248, 458 258, 390 255 Z" fill="url(#feather-sec)" stroke="#5c829e" />
    <path d="M 368 185 C 415 170, 470 172, 530 190 C 488 210, 432 226, 378 232 Z" fill="url(#feather-sec)" />
    <path d="M 372 215 C 422 208, 472 222, 525 250 C 482 262, 428 268, 382 262 Z" fill="url(#feather-sec)" />
    <path d="M 378 245 C 425 248, 468 272, 508 305 C 470 310, 422 300, 385 285 Z" fill="url(#feather-sec)" />
    <path d="M 362 160 C 395 155, 430 162, 465 178 C 435 192, 398 198, 364 195 Z" fill="url(#feather-cov)" />
  </g>

  <g id="mark-ii">
    <path d="M 215 110 C 220 110, 230 112, 236 122 L 238 135 L 262 135 L 264 122 C 270 112, 280 110, 285 110 L 215 110 Z" fill="url(#ii-pillar-l)" stroke="#fffdf9" />
    <path d="M 236 130 C 235 180, 234 270, 236 320 L 264 320 C 266 270, 265 180, 264 130 Z" fill="url(#ii-pillar-l)" stroke="#d4beaa" />
    <path d="M 215 340 C 220 340, 230 338, 236 328 L 238 315 L 262 315 L 264 328 C 270 338, 280 340, 285 340 L 215 340 Z" fill="url(#ii-pillar-l)" />
    <line x1="240" y1="120" x2="240" y2="330" stroke="#ffffff" stroke-width="1.4" opacity="0.85" />
    
    <path d="M 315 110 C 320 110, 330 112, 336 122 L 338 135 L 362 135 L 364 122 C 370 112, 380 110, 385 110 L 315 110 Z" fill="url(#ii-pillar-r)" stroke="#fffdf9" />
    <path d="M 336 130 C 335 180, 334 270, 336 320 L 364 320 C 366 270, 365 180, 364 130 Z" fill="url(#ii-pillar-r)" stroke="#d4beaa" />
    <path d="M 315 340 C 320 340, 330 338, 336 328 L 338 315 L 362 315 L 364 328 C 370 338, 380 340, 385 340 L 315 340 Z" fill="url(#ii-pillar-r)" />
    <line x1="340" y1="120" x2="340" y2="330" stroke="#ffffff" stroke-width="1.4" opacity="0.85" />

    <polygon points="300,212 308,225 300,238 292,225" fill="#fffcf7" stroke="#7a9cb8" stroke-width="1.2" />
  </g>
</svg>`;

    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'integrated_innovations_mark_ii_falcon_logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#140e0b] border border-[#3d2e24] shadow-[0_24px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#33251c] bg-[#1a1410]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#d4beaa]/15 border border-[#d4beaa]/30 flex items-center justify-center text-[#d4beaa]">
              <Feather className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-lg text-[#fcf8f2] tracking-wide">
                  Mark 'II' Master Insignia
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#7a9cb8]/20 text-[#a4c2d8] border border-[#7a9cb8]/35 text-[10px] font-mono uppercase">
                  Hunter Hawk Wingform
                </span>
              </div>
              <p className="text-[12px] text-[#c4ad98] font-editorial italic">
                Symmetrical Roman Monolith with Kinetic Falcon Flight Feathers & Dusty Blue Edge Streaks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySvg}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#221913] hover:bg-[#2d211a] text-[#c4ad98] hover:text-[#fcf8f2] border border-[#382b22] text-xs font-serif transition-all cursor-pointer"
              title="Copy SVG code to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#8fa89b]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SVG' : 'Copy SVG'}</span>
            </button>

            <button
              onClick={handleDownloadSvg}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#d4beaa] to-[#c47c5d] text-[#120e0b] text-xs font-display font-bold hover:opacity-95 shadow-[0_2px_10px_rgba(212,190,170,0.25)] transition-all cursor-pointer"
              title="Download Master SVG Vector"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .SVG</span>
            </button>

            <div className="h-4 w-px bg-[#382b22] mx-1" />

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#221913] hover:bg-[#2d211a] text-[#c4ad98] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Center Content: Left Canvas Display + Right Control & Spec Panel */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto custom-scrollbar">
          
          {/* Main Logo Canvas Stage (8 cols) */}
          <div className={`lg:col-span-8 flex flex-col items-center justify-center p-8 relative min-h-[380px] lg:min-h-[480px] transition-colors duration-500 overflow-hidden ${getBackgroundStyle()}`}>
            
            {/* View Mode Switcher Pills (Top Left of Stage) */}
            <div className="absolute top-4 left-4 z-20 flex items-center p-1 bg-[#100c09]/90 rounded-xl border border-[#382b22] backdrop-blur-md">
              <button
                onClick={() => setViewMode('vector')}
                className={`px-3 py-1 rounded-lg text-xs font-display transition-all cursor-pointer ${
                  viewMode === 'vector'
                    ? 'bg-gradient-to-r from-[#d4beaa] to-[#c47c5d] text-[#120e0b] font-bold shadow-[0_2px_8px_rgba(212,190,170,0.3)]'
                    : 'text-[#c4ad98] hover:text-[#fcf8f2]'
                }`}
              >
                Live Kinetic Vector
              </button>
              <button
                onClick={() => setViewMode('artPrint')}
                className={`px-3 py-1 rounded-lg text-xs font-display transition-all cursor-pointer ${
                  viewMode === 'artPrint'
                    ? 'bg-gradient-to-r from-[#7a9cb8] to-[#507594] text-[#fffdf9] font-bold shadow-[0_2px_8px_rgba(122,156,184,0.3)]'
                    : 'text-[#c4ad98] hover:text-[#fcf8f2]'
                }`}
              >
                Fine-Art Print Render
              </button>
            </div>

            {/* Subtle Grid / Deckled Paper Underlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'radial-gradient(#d4beaa 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* High-Resolution Live Animated Mark II Logo OR Fine Art Render */}
            <div className="relative z-10 flex items-center justify-center transition-all duration-300">
              {viewMode === 'vector' ? (
                <MarkIILogo
                  size="hero"
                  animated={animationIntensity !== 'still'}
                  intensity={animationIntensity}
                  showAtmosphere={showAtmosphere}
                  customScale={zoomScale}
                  interactive={true}
                />
              ) : (
                <div className="relative max-w-md rounded-2xl overflow-hidden border border-[#4a392b] shadow-[0_16px_40px_rgba(0,0,0,0.8)] group">
                  <img
                    src="/src/assets/images/mark_ii_falcon_logo_1787820117456.jpg"
                    alt="Mark II Falcon Wings Fine Art Concept"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120e0b]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <span className="text-[11px] font-display text-[#d4beaa] bg-[#120e0b]/80 px-3 py-1 rounded-full border border-[#382b22]">
                      Fine-Art Studio Render • Textured Brushwork & Dusty Blue Streaks
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Stage Bottom Floating Controls */}
            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-auto">
              {/* Flight State Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120e0b]/80 border border-[#382b22] backdrop-blur-md text-[11px] font-mono text-[#d4beaa]">
                <Wind className={`w-3.5 h-3.5 ${animationIntensity !== 'still' ? 'animate-pulse text-[#7a9cb8]' : 'text-[#8e7663]'}`} />
                <span>Motion: {animationIntensity.toUpperCase()}</span>
              </div>

              {/* Zoom Scale Pill */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#120e0b]/80 border border-[#382b22] backdrop-blur-md text-[11px] font-display text-[#c4ad98]">
                <span>Scale:</span>
                <button
                  onClick={() => setZoomScale(0.85)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${zoomScale === 0.85 ? 'bg-[#d4beaa] text-[#120e0b] font-bold' : 'hover:text-[#fcf8f2]'}`}
                >
                  75%
                </button>
                <button
                  onClick={() => setZoomScale(1.1)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${zoomScale === 1.1 ? 'bg-[#d4beaa] text-[#120e0b] font-bold' : 'hover:text-[#fcf8f2]'}`}
                >
                  100%
                </button>
                <button
                  onClick={() => setZoomScale(1.35)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${zoomScale === 1.35 ? 'bg-[#d4beaa] text-[#120e0b] font-bold' : 'hover:text-[#fcf8f2]'}`}
                >
                  125%
                </button>
              </div>
            </div>

          </div>

          {/* Right Design Spec & Control Sidebar (4 cols) */}
          <div className="lg:col-span-4 p-5 bg-[#17110d] border-t lg:border-t-0 lg:border-l border-[#33251c] space-y-5 text-xs font-serif text-[#fcf8f2]">
            
            {/* Wing Kinetic Flight Dynamics */}
            <div>
              <div className="flex items-center justify-between text-xs font-display text-[#d4beaa] mb-2 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-[#7a9cb8]" />
                  Falcon Wing Kinetic Flight:
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 font-display text-xs">
                <button
                  onClick={() => setAnimationIntensity('calm')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    animationIntensity === 'calm'
                      ? 'bg-[#d4beaa]/20 border-[#d4beaa] text-[#fcf8f2] font-bold shadow-[0_0_10px_rgba(212,190,170,0.2)]'
                      : 'bg-[#100c09] border-[#2e2118] text-[#c4ad98] hover:text-[#fcf8f2]'
                  }`}
                >
                  <div className="text-[11px] font-bold">Subtle Gliding</div>
                  <div className="text-[10px] text-[#a68f7b] font-serif italic">Slow natural unfurl</div>
                </button>

                <button
                  onClick={() => setAnimationIntensity('dynamic')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    animationIntensity === 'dynamic'
                      ? 'bg-[#7a9cb8]/25 border-[#7a9cb8] text-[#fcf8f2] font-bold shadow-[0_0_10px_rgba(122,156,184,0.25)]'
                      : 'bg-[#100c09] border-[#2e2118] text-[#c4ad98] hover:text-[#fcf8f2]'
                  }`}
                >
                  <div className="text-[11px] font-bold">Hunter Strike</div>
                  <div className="text-[10px] text-[#a68f7b] font-serif italic">Speed & wing power</div>
                </button>

                <button
                  onClick={() => setAnimationIntensity('poised')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    animationIntensity === 'poised'
                      ? 'bg-[#c47c5d]/25 border-[#c47c5d] text-[#fcf8f2] font-bold'
                      : 'bg-[#100c09] border-[#2e2118] text-[#c4ad98] hover:text-[#fcf8f2]'
                  }`}
                >
                  <div className="text-[11px] font-bold">Poised Hover</div>
                  <div className="text-[10px] text-[#a68f7b] font-serif italic">Micro feather flutter</div>
                </button>

                <button
                  onClick={() => setAnimationIntensity('still')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    animationIntensity === 'still'
                      ? 'bg-[#382b22] border-[#d4beaa] text-[#fcf8f2] font-bold'
                      : 'bg-[#100c09] border-[#2e2118] text-[#c4ad98] hover:text-[#fcf8f2]'
                  }`}
                >
                  <div className="text-[11px] font-bold">Print Still Mark</div>
                  <div className="text-[10px] text-[#a68f7b] font-serif italic">Static emblem</div>
                </button>
              </div>
            </div>

            {/* Atmosphere Backdrop Mood */}
            <div>
              <div className="flex items-center justify-between text-xs font-display text-[#d4beaa] mb-2 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#d4beaa]" />
                  Canvas Lighting Atmosphere:
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 font-display text-xs">
                <button
                  onClick={() => setBackgroundMood('deepUmber')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    backgroundMood === 'deepUmber'
                      ? 'bg-[#221913] border-[#d4beaa] text-[#fcf8f2]'
                      : 'bg-[#100c09] border-[#2e2118] text-[#c4ad98]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#150f0c] border border-[#d4beaa]/50" />
                    <span>Deep Umber</span>
                  </div>
                </button>

                <button
                  onClick={() => setBackgroundMood('bleachedSand')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    backgroundMood === 'bleachedSand'
                      ? 'bg-[#261f19] border-[#d4beaa] text-[#fcf8f2]'
                      : 'bg-[#100c09] border-[#2e2118] text-[#c4ad98]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d4beaa]" />
                    <span>Bleached Sand</span>
                  </div>
                </button>

                <button
                  onClick={() => setBackgroundMood('midnightObsidian')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    backgroundMood === 'midnightObsidian'
                      ? 'bg-[#1a1410] border-[#d4beaa] text-[#fcf8f2]'
                      : 'bg-[#100c09] border-[#2e2118] text-[#c4ad98]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0a0807] border border-[#7a9cb8]" />
                    <span>Midnight Obsidian</span>
                  </div>
                </button>

                <button
                  onClick={() => setBackgroundMood('rawLinen')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    backgroundMood === 'rawLinen'
                      ? 'bg-[#221a14] border-[#d4beaa] text-[#fcf8f2]'
                      : 'bg-[#100c09] border-[#2e2118] text-[#c4ad98]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c4ad98]" />
                    <span>Raw Linen</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Design Anatomy & Color Matrix */}
            <div className="p-3.5 rounded-2xl bg-[#100c09] border border-[#2e2118] space-y-3">
              <div className="text-[11px] font-display uppercase tracking-wider text-[#d4beaa] flex items-center justify-between border-b border-[#2e2118] pb-1.5">
                <span>Insignia Design Anatomy</span>
                <span className="text-[#8fa89b]">100% Vector</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#fffcf7] mt-1 flex-shrink-0 shadow-[0_0_6px_rgba(255,252,247,0.8)]" />
                  <div>
                    <span className="font-bold text-[#fcf8f2]">The 'II' Monoliths: </span>
                    <span className="text-[#c4ad98] font-editorial italic">Symmetrical chiseled pillars in luminous pearl, warm biscuit & bleached linen.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#7a9cb8] mt-1 flex-shrink-0 shadow-[0_0_6px_rgba(122,156,184,0.8)]" />
                  <div>
                    <span className="font-bold text-[#a4c2d8]">Hunter Falcon Pinions: </span>
                    <span className="text-[#c4ad98] font-editorial italic">Sharp, blade-like primary feathers spreading outward with muted dusty blue light streaks.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#a9886d] mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#d4beaa]">Coverts & Hatching: </span>
                    <span className="text-[#c4ad98] font-editorial italic">Textured, hand-drawn brush strokes layered with organic feather overlap.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Atmosphere Halo Glow Toggle */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-display text-[#c4ad98]">Cool Atmospheric Light Halo:</span>
              <button
                onClick={() => setShowAtmosphere(!showAtmosphere)}
                className={`px-2.5 py-1 rounded-lg text-xs font-display transition-all cursor-pointer ${
                  showAtmosphere
                    ? 'bg-[#7a9cb8]/20 text-[#a4c2d8] border border-[#7a9cb8]/40'
                    : 'bg-[#100c09] text-[#8e7663] border border-[#2e2118]'
                }`}
              >
                {showAtmosphere ? 'Enabled' : 'Disabled'}
              </button>
            </div>

          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3.5 border-t border-[#33251c] bg-[#120e0b] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-serif text-[#c4ad98]">
          <div className="flex items-center gap-2">
            <Feather className="w-3.5 h-3.5 text-[#d4beaa]" />
            <span className="font-editorial italic">
              Integrated Innovations Corporate Brand Identity • Hand-Crafted Hunter Mark
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#a68f7b]">Format: Standalone Scalable Vector (.SVG)</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#221913] hover:bg-[#2d211a] text-[#fcf8f2] text-xs font-display transition-colors cursor-pointer"
            >
              Close Studio
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
