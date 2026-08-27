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
  Pause,
  Bot,
  Cpu,
  Zap,
  Activity
} from 'lucide-react';
import { OfficeBoyLogo } from './OfficeBoyLogo';

interface OfficeBoyStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficeBoyStudioModal: React.FC<OfficeBoyStudioModalProps> = ({
  isOpen,
  onClose
}) => {
  const [viewMode, setViewMode] = useState<'vector' | 'studioRender'>('vector');
  const [animationIntensity, setAnimationIntensity] = useState<'calm' | 'attentive' | 'shimmer' | 'still'>('calm');
  const [backgroundMood, setBackgroundMood] = useState<'darkSlate' | 'brushedSteel' | 'pureBlack' | 'frostedSilver'>('darkSlate');
  const [showAtmosphere, setShowAtmosphere] = useState<boolean>(true);
  const [zoomScale, setZoomScale] = useState<number>(1.25);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const getBackgroundStyle = () => {
    switch (backgroundMood) {
      case 'brushedSteel':
        return 'bg-[#22262c] border-[#3e4550] text-[#f4f7fa]';
      case 'pureBlack':
        return 'bg-[#08090b] border-[#1f2228] text-[#f4f7fa]';
      case 'frostedSilver':
        return 'bg-[#2c323a] border-[#4b5460] text-[#f4f7fa]';
      default: // darkSlate
        return 'bg-[#121417] border-[#292e36] text-[#f4f7fa]';
    }
  };

  const handleCopySvg = () => {
    const svgData = `<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Office Boy.ai - Monochrome Silver Robot Character Mark -->
  <defs>
    <linearGradient id="dome-silver" x1="120" y1="60" x2="280" y2="220" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="18%" stop-color="#f3f5f8" />
      <stop offset="42%" stop-color="#d5dbe3" />
      <stop offset="70%" stop-color="#9aa4b0" />
      <stop offset="92%" stop-color="#636c77" />
      <stop offset="100%" stop-color="#434a52" />
    </linearGradient>
    <linearGradient id="torso-silver" x1="140" y1="210" x2="260" y2="340" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#e2e7ec" />
      <stop offset="55%" stop-color="#a9b3be" />
      <stop offset="85%" stop-color="#6b7580" />
      <stop offset="100%" stop-color="#3d434a" />
    </linearGradient>
    <linearGradient id="visor-screen" x1="140" y1="130" x2="260" y2="190" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1a1c20" />
      <stop offset="50%" stop-color="#0d0e11" />
      <stop offset="100%" stop-color="#1f2227" />
    </linearGradient>
  </defs>

  <g id="torso">
    <ellipse cx="200" cy="225" rx="32" ry="10" fill="#2d3238" stroke="#717a85" stroke-width="1.2" />
    <path d="M 148 240 C 148 226, 172 220, 200 220 C 228 220, 252 226, 252 240 L 260 288 C 260 322, 234 340, 200 340 C 166 340, 140 322, 140 288 Z" fill="url(#torso-silver)" stroke="#ffffff" stroke-width="1.2" />
    <path d="M 186 226 L 200 248 L 214 226" stroke="#434a52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="200" cy="265" r="7.5" fill="#121417" stroke="#e0e5eb" stroke-width="1.5" />
    <circle cx="200" cy="265" r="4" fill="#ffffff" />
  </g>

  <g id="head">
    <!-- Antenna -->
    <path d="M 198 92 L 199 52 L 201 52 L 202 92 Z" fill="#7a848f" stroke="#ffffff" stroke-width="0.6" />
    <circle cx="200" cy="46" r="8" fill="url(#dome-silver)" stroke="#ffffff" stroke-width="1.2" />
    <circle cx="197.5" cy="43.5" r="2.8" fill="#ffffff" />

    <!-- Ears -->
    <rect x="110" y="132" width="12" height="36" rx="5" fill="#7a848f" stroke="#ffffff" stroke-width="1" />
    <rect x="278" y="132" width="12" height="36" rx="5" fill="#7a848f" stroke="#ffffff" stroke-width="1" />

    <!-- Dome -->
    <path d="M 120 150 C 120 102, 155 76, 200 76 C 245 76, 280 102, 280 150 C 280 198, 252 216, 200 216 C 148 216, 120 198, 120 150 Z" fill="url(#dome-silver)" stroke="#ffffff" stroke-width="1.5" />
    <path d="M 134 135 C 138 98, 165 84, 200 84 C 235 84, 262 98, 266 135 C 248 106, 218 96, 200 96 C 182 96, 152 106, 134 135 Z" fill="#ffffff" opacity="0.85" />

    <!-- Visor -->
    <rect x="136" y="120" width="128" height="66" rx="22" fill="#1e2227" stroke="#656e79" stroke-width="2" />
    <rect x="138" y="122" width="124" height="62" rx="20" fill="url(#visor-screen)" stroke="#0f1013" stroke-width="1" />

    <!-- Eyes -->
    <rect x="160" y="138" width="24" height="26" rx="9" fill="#ffffff" />
    <circle cx="176" cy="144" r="3" fill="#ffffff" />
    <rect x="216" y="138" width="24" height="26" rx="9" fill="#ffffff" />
    <circle cx="232" cy="144" r="3" fill="#ffffff" />
    <path d="M 190 172 C 196 175, 204 175, 210 172" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
  </g>
</svg>`;

    navigator.clipboard.writeText(svgData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    const svgData = `<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dome-silver" x1="120" y1="60" x2="280" y2="220" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="18%" stop-color="#f3f5f8" />
      <stop offset="42%" stop-color="#d5dbe3" />
      <stop offset="70%" stop-color="#9aa4b0" />
      <stop offset="92%" stop-color="#636c77" />
      <stop offset="100%" stop-color="#434a52" />
    </linearGradient>
    <linearGradient id="torso-silver" x1="140" y1="210" x2="260" y2="340" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#e2e7ec" />
      <stop offset="55%" stop-color="#a9b3be" />
      <stop offset="85%" stop-color="#6b7580" />
      <stop offset="100%" stop-color="#3d434a" />
    </linearGradient>
    <linearGradient id="visor-screen" x1="140" y1="130" x2="260" y2="190" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1a1c20" />
      <stop offset="50%" stop-color="#0d0e11" />
      <stop offset="100%" stop-color="#1f2227" />
    </linearGradient>
  </defs>

  <g id="torso">
    <ellipse cx="200" cy="225" rx="32" ry="10" fill="#2d3238" stroke="#717a85" stroke-width="1.2" />
    <path d="M 148 240 C 148 226, 172 220, 200 220 C 228 220, 252 226, 252 240 L 260 288 C 260 322, 234 340, 200 340 C 166 340, 140 322, 140 288 Z" fill="url(#torso-silver)" stroke="#ffffff" stroke-width="1.2" />
    <path d="M 186 226 L 200 248 L 214 226" stroke="#434a52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="200" cy="265" r="7.5" fill="#121417" stroke="#e0e5eb" stroke-width="1.5" />
    <circle cx="200" cy="265" r="4" fill="#ffffff" />
  </g>

  <g id="head">
    <path d="M 198 92 L 199 52 L 201 52 L 202 92 Z" fill="#7a848f" stroke="#ffffff" stroke-width="0.6" />
    <circle cx="200" cy="46" r="8" fill="url(#dome-silver)" stroke="#ffffff" stroke-width="1.2" />
    <circle cx="197.5" cy="43.5" r="2.8" fill="#ffffff" />
    <rect x="110" y="132" width="12" height="36" rx="5" fill="#7a848f" stroke="#ffffff" stroke-width="1" />
    <rect x="278" y="132" width="12" height="36" rx="5" fill="#7a848f" stroke="#ffffff" stroke-width="1" />
    <path d="M 120 150 C 120 102, 155 76, 200 76 C 245 76, 280 102, 280 150 C 280 198, 252 216, 200 216 C 148 216, 120 198, 120 150 Z" fill="url(#dome-silver)" stroke="#ffffff" stroke-width="1.5" />
    <path d="M 134 135 C 138 98, 165 84, 200 84 C 235 84, 262 98, 266 135 C 248 106, 218 96, 200 96 C 182 96, 152 106, 134 135 Z" fill="#ffffff" opacity="0.85" />
    <rect x="136" y="120" width="128" height="66" rx="22" fill="#1e2227" stroke="#656e79" stroke-width="2" />
    <rect x="138" y="122" width="124" height="62" rx="20" fill="url(#visor-screen)" stroke="#0f1013" stroke-width="1" />
    <rect x="160" y="138" width="24" height="26" rx="9" fill="#ffffff" />
    <circle cx="176" cy="144" r="3" fill="#ffffff" />
    <rect x="216" y="138" width="24" height="26" rx="9" fill="#ffffff" />
    <circle cx="232" cy="144" r="3" fill="#ffffff" />
    <path d="M 190 172 C 196 175, 204 175, 210 172" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
  </g>
</svg>`;

    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'office_boy_ai_silver_robot_logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#111317] border border-[#2a2f38] shadow-[0_24px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252a33] bg-[#161a20]/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#e2e7ec]/10 border border-[#e2e7ec]/25 flex items-center justify-center text-[#f0f4f8]">
              <Bot className="w-5 h-5 text-[#d4dbe3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-lg text-[#f4f7fa] tracking-wide flex items-center gap-1.5">
                  <span>OfficeBoy</span>
                  <span className="text-[#a4b0bd] font-normal text-sm">.ai Robot Logo Studio</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#d0d8e2]/15 text-[#e5ecf4] border border-[#d0d8e2]/30 text-[10px] font-mono uppercase tracking-wider">
                  Pure Monochrome Silver
                </span>
              </div>
              <p className="text-[12px] text-[#9ca7b4] font-editorial italic">
                Small, helpful assistant robot in polished chrome & brushed steel with live continuous motion & light shimmer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySvg}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1a1d24] hover:bg-[#252a33] text-[#c0cad6] hover:text-[#f4f7fa] border border-[#2f3542] text-xs font-serif transition-all cursor-pointer"
              title="Copy SVG code to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#8fa89b]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SVG' : 'Copy SVG'}</span>
            </button>

            <button
              onClick={handleDownloadSvg}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#eef2f6] to-[#b8c2cd] text-[#0f1114] text-xs font-display font-bold hover:opacity-95 shadow-[0_2px_10px_rgba(238,242,246,0.25)] transition-all cursor-pointer"
              title="Download Master SVG Vector"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .SVG</span>
            </button>

            <div className="h-4 w-px bg-[#2f3542] mx-1" />

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1a1d24] hover:bg-[#252a33] text-[#9ca7b4] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Stage + Spec/Controls */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto custom-scrollbar">
          
          {/* Main Character Stage (8 cols) */}
          <div className={`lg:col-span-8 flex flex-col items-center justify-center p-8 relative min-h-[380px] lg:min-h-[480px] transition-colors duration-500 overflow-hidden ${getBackgroundStyle()}`}>
            
            {/* View Mode Switcher Pills (Top Left) */}
            <div className="absolute top-4 left-4 z-20 flex items-center p-1 bg-[#0b0d10]/80 rounded-xl border border-[#2d3440] backdrop-blur-md">
              <button
                onClick={() => setViewMode('vector')}
                className={`px-3 py-1 rounded-lg text-xs font-display transition-all cursor-pointer ${
                  viewMode === 'vector'
                    ? 'bg-gradient-to-r from-[#f0f4f8] to-[#c2cbd6] text-[#0d0f12] font-bold shadow-[0_2px_8px_rgba(240,244,248,0.3)]'
                    : 'text-[#9ca7b4] hover:text-[#f4f7fa]'
                }`}
              >
                Live Animated Vector
              </button>
              <button
                onClick={() => setViewMode('studioRender')}
                className={`px-3 py-1 rounded-lg text-xs font-display transition-all cursor-pointer ${
                  viewMode === 'studioRender'
                    ? 'bg-gradient-to-r from-[#dbe2eb] to-[#8d99a8] text-[#0d0f12] font-bold shadow-[0_2px_8px_rgba(219,226,235,0.3)]'
                    : 'text-[#9ca7b4] hover:text-[#f4f7fa]'
                }`}
              >
                Studio 3D Render
              </button>
            </div>

            {/* Specular Radial Underlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                backgroundImage: 'radial-gradient(#c8d2dc 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Robot Presentation (Vector or 3D Render) */}
            <div className="relative z-10 flex items-center justify-center transition-all duration-300">
              {viewMode === 'vector' ? (
                <OfficeBoyLogo
                  size="hero"
                  animated={animationIntensity !== 'still'}
                  intensity={animationIntensity}
                  showAtmosphere={showAtmosphere}
                  customScale={zoomScale}
                  interactive={true}
                />
              ) : (
                <div className="relative max-w-sm rounded-2xl overflow-hidden border border-[#3f4754] shadow-[0_16px_40px_rgba(0,0,0,0.85)] group">
                  <img
                    src="/src/assets/images/office_boy_silver_robot_logo_1787820402934.jpg"
                    alt="Office Boy AI Silver Robot Studio 3D Concept"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1013]/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <span className="text-[11px] font-display text-[#e4ebf2] bg-[#12151a]/90 px-3 py-1 rounded-full border border-[#303742]">
                      Studio 3D Luxury Concept • Monochromatic Polished Silver & Obsidian Glass
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Stage Bottom Floating Controls */}
            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-auto">
              {/* Kinematic State Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d0f12]/80 border border-[#2b313c] backdrop-blur-md text-[11px] font-mono text-[#dbe2ea]">
                <Activity className={`w-3.5 h-3.5 ${animationIntensity !== 'still' ? 'animate-pulse text-[#ffffff]' : 'text-[#6b7582]'}`} />
                <span>Motion: {animationIntensity.toUpperCase()}</span>
              </div>

              {/* Zoom Scale Pill */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0f12]/80 border border-[#2b313c] backdrop-blur-md text-[11px] font-display text-[#a2adbb]">
                <span>Scale:</span>
                <button
                  onClick={() => setZoomScale(0.9)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${zoomScale === 0.9 ? 'bg-[#f0f4f8] text-[#0d0f12] font-bold' : 'hover:text-[#f4f7fa]'}`}
                >
                  75%
                </button>
                <button
                  onClick={() => setZoomScale(1.25)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${zoomScale === 1.25 ? 'bg-[#f0f4f8] text-[#0d0f12] font-bold' : 'hover:text-[#f4f7fa]'}`}
                >
                  100%
                </button>
                <button
                  onClick={() => setZoomScale(1.55)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${zoomScale === 1.55 ? 'bg-[#f0f4f8] text-[#0d0f12] font-bold' : 'hover:text-[#f4f7fa]'}`}
                >
                  125%
                </button>
              </div>
            </div>

          </div>

          {/* Right Spec & Design Anatomy (4 cols) */}
          <div className="lg:col-span-4 p-5 bg-[#14171d] border-t lg:border-t-0 lg:border-l border-[#252a33] space-y-5 text-xs font-serif text-[#f4f7fa]">
            
            {/* Idle Kinematic Movement Selector */}
            <div>
              <div className="flex items-center justify-between text-xs font-display text-[#dbe2ea] mb-2 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-[#e0e7ee]" />
                  Idle Kinematics & Shimmer:
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 font-display text-xs">
                <button
                  onClick={() => setAnimationIntensity('calm')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    animationIntensity === 'calm'
                      ? 'bg-[#ffffff]/15 border-[#ffffff] text-[#f4f7fa] font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                      : 'bg-[#0d0f12] border-[#252b36] text-[#9ca7b4] hover:text-[#f4f7fa]'
                  }`}
                >
                  <div className="text-[11px] font-bold">Gentle Tilt & Blink</div>
                  <div className="text-[10px] text-[#7d8896] font-serif italic">Subtle natural breathing</div>
                </button>

                <button
                  onClick={() => setAnimationIntensity('attentive')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    animationIntensity === 'attentive'
                      ? 'bg-[#e2e8f0]/20 border-[#e2e8f0] text-[#f4f7fa] font-bold'
                      : 'bg-[#0d0f12] border-[#252b36] text-[#9ca7b4] hover:text-[#f4f7fa]'
                  }`}
                >
                  <div className="text-[11px] font-bold">Attentive Mode</div>
                  <div className="text-[10px] text-[#7d8896] font-serif italic">Responsive ready posture</div>
                </button>

                <button
                  onClick={() => setAnimationIntensity('shimmer')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    animationIntensity === 'shimmer'
                      ? 'bg-[#cbd5e1]/25 border-[#cbd5e1] text-[#f4f7fa] font-bold'
                      : 'bg-[#0d0f12] border-[#252b36] text-[#9ca7b4] hover:text-[#f4f7fa]'
                  }`}
                >
                  <div className="text-[11px] font-bold">Metallic Shimmer</div>
                  <div className="text-[10px] text-[#7d8896] font-serif italic">Light reflection sweep</div>
                </button>

                <button
                  onClick={() => setAnimationIntensity('still')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    animationIntensity === 'still'
                      ? 'bg-[#333a46] border-[#ffffff] text-[#f4f7fa] font-bold'
                      : 'bg-[#0d0f12] border-[#252b36] text-[#9ca7b4] hover:text-[#f4f7fa]'
                  }`}
                >
                  <div className="text-[11px] font-bold">App Icon Still</div>
                  <div className="text-[10px] text-[#7d8896] font-serif italic">Crisp static silhouette</div>
                </button>
              </div>
            </div>

            {/* Monochrome Canvas Lighting */}
            <div>
              <div className="flex items-center justify-between text-xs font-display text-[#dbe2ea] mb-2 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#e0e7ee]" />
                  Monochrome Contrast Environment:
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 font-display text-xs">
                <button
                  onClick={() => setBackgroundMood('darkSlate')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    backgroundMood === 'darkSlate'
                      ? 'bg-[#1e232b] border-[#ffffff] text-[#f4f7fa]'
                      : 'bg-[#0d0f12] border-[#252b36] text-[#9ca7b4]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#121417] border border-[#a0abb8]" />
                    <span>Dark Slate</span>
                  </div>
                </button>

                <button
                  onClick={() => setBackgroundMood('brushedSteel')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    backgroundMood === 'brushedSteel'
                      ? 'bg-[#282e38] border-[#ffffff] text-[#f4f7fa]'
                      : 'bg-[#0d0f12] border-[#252b36] text-[#9ca7b4]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22262c] border border-[#d0d8e2]" />
                    <span>Brushed Steel</span>
                  </div>
                </button>

                <button
                  onClick={() => setBackgroundMood('pureBlack')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    backgroundMood === 'pureBlack'
                      ? 'bg-[#181a1f] border-[#ffffff] text-[#f4f7fa]'
                      : 'bg-[#0d0f12] border-[#252b36] text-[#9ca7b4]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#08090b] border border-[#6b7582]" />
                    <span>Pure Obsidian</span>
                  </div>
                </button>

                <button
                  onClick={() => setBackgroundMood('frostedSilver')}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    backgroundMood === 'frostedSilver'
                      ? 'bg-[#353c48] border-[#ffffff] text-[#f4f7fa]'
                      : 'bg-[#0d0f12] border-[#252b36] text-[#9ca7b4]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4a5462] border border-[#ffffff]" />
                    <span>Frosted Silver</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Design Anatomy Card */}
            <div className="p-3.5 rounded-2xl bg-[#0c0e12] border border-[#252b36] space-y-3">
              <div className="text-[11px] font-display uppercase tracking-wider text-[#dbe2ea] flex items-center justify-between border-b border-[#252b36] pb-1.5">
                <span>Robot Design Anatomy</span>
                <span className="text-[#a4b0bd]">100% Silver</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ffffff] mt-1 flex-shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
                  <div>
                    <span className="font-bold text-[#f4f7fa]">Polished Chrome Dome: </span>
                    <span className="text-[#9ca7b4] font-editorial italic">Sleek spherical head with soft brushed-metal texture and white specular highlights.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1e2227] mt-1 flex-shrink-0 border border-[#8f9aa6]" />
                  <div>
                    <span className="font-bold text-[#d4dbe3]">Obsidian Glass Visor: </span>
                    <span className="text-[#9ca7b4] font-editorial italic">Friendly rounded silver optic eyes with soft catchlights, blinking periodically.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8c97a3] mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#c0cad6]">Office Collar Silhouette: </span>
                    <span className="text-[#9ca7b4] font-editorial italic">Compact teardrop torso with minimal assistant collar notch and hovering base.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Atmosphere Halo Glow Toggle */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-display text-[#a2adbb]">Silver Luminous Specular Aura:</span>
              <button
                onClick={() => setShowAtmosphere(!showAtmosphere)}
                className={`px-2.5 py-1 rounded-lg text-xs font-display transition-all cursor-pointer ${
                  showAtmosphere
                    ? 'bg-[#ffffff]/20 text-[#ffffff] border border-[#ffffff]/50 font-bold'
                    : 'bg-[#0d0f12] text-[#6b7582] border border-[#252b36]'
                }`}
              >
                {showAtmosphere ? 'Enabled' : 'Disabled'}
              </button>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#252a33] bg-[#0e1014] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-serif text-[#9ca7b4]">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#d0d8e2]" />
            <span className="font-editorial italic">
              OfficeBoy.ai Corporate Brand Identity • Autonomous AI Assistant Mascot
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#7d8896]">Format: Scalable Vector (.SVG) + 3D Render</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#1c2027] hover:bg-[#282e38] text-[#f4f7fa] text-xs font-display transition-colors cursor-pointer"
            >
              Close Studio
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
