import React, { useEffect, useRef, useState } from 'react';
import { Palette, Sliders, Droplet, Sparkles, Feather } from 'lucide-react';

interface PigmentBlob {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  colorType: 'pearlLuminous' | 'biscuitWarm' | 'bakedClay' | 'bleachedSand' | 'mutedSepia' | 'softLinen';
  baseAlpha: number;
  phase: number;
  frequency: number;
  roughness: number[];
}

interface InkDrop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  points: { angle: number; distance: number; speed: number }[];
}

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tactileGrainIntensity, setTactileGrainIntensity] = useState<'medium' | 'high' | 'soft'>('medium');
  const [isAtmosphericDrift, setIsAtmosphericDrift] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [canvasMood, setCanvasMood] = useState<'pearlLinen' | 'bakedClay' | 'bleachedSand'>('pearlLinen');

  const inkDropsRef = useRef<InkDrop[]>([]);
  const lastMousePosRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create organic, hand-mixed pigment masses in warm biscuit, pearl, bleached-sand, and baked clay
    const blobs: PigmentBlob[] = [
      // Luminous Pearl & Shell Sheen (Soft, slightly luminous, opalescent)
      {
        x: width * 0.22,
        y: height * 0.2,
        radius: Math.min(width, height) * 0.58,
        vx: 0.05,
        vy: -0.035,
        colorType: 'pearlLuminous',
        baseAlpha: 0.52,
        phase: 0,
        frequency: 0.00045,
        roughness: Array.from({ length: 18 }, () => 0.84 + Math.random() * 0.32)
      },
      {
        x: width * 0.78,
        y: height * 0.74,
        radius: Math.min(width, height) * 0.62,
        vx: -0.045,
        vy: 0.05,
        colorType: 'pearlLuminous',
        baseAlpha: 0.48,
        phase: Math.PI * 0.65,
        frequency: 0.00038,
        roughness: Array.from({ length: 18 }, () => 0.8 + Math.random() * 0.38)
      },
      // Warm Biscuit & Natural Linen (Warm, matte, like baked clay and aged parchment)
      {
        x: width * 0.16,
        y: height * 0.68,
        radius: Math.min(width, height) * 0.52,
        vx: 0.065,
        vy: 0.03,
        colorType: 'biscuitWarm',
        baseAlpha: 0.56,
        phase: Math.PI * 0.35,
        frequency: 0.0005,
        roughness: Array.from({ length: 18 }, () => 0.78 + Math.random() * 0.42)
      },
      {
        x: width * 0.82,
        y: height * 0.22,
        radius: Math.min(width, height) * 0.54,
        vx: -0.05,
        vy: -0.045,
        colorType: 'bakedClay',
        baseAlpha: 0.5,
        phase: Math.PI * 1.15,
        frequency: 0.00042,
        roughness: Array.from({ length: 18 }, () => 0.82 + Math.random() * 0.34)
      },
      // Bleached / Beach Sand (Washed-out sandy white, sun-faded shoreline)
      {
        x: width * 0.5,
        y: height * 0.46,
        radius: Math.min(width, height) * 0.48,
        vx: 0.03,
        vy: -0.06,
        colorType: 'bleachedSand',
        baseAlpha: 0.45,
        phase: Math.PI * 1.45,
        frequency: 0.00055,
        roughness: Array.from({ length: 18 }, () => 0.76 + Math.random() * 0.46)
      },
      // Soft Linen Wash & Muted Sepia Ink
      {
        x: width * 0.35,
        y: height * 0.85,
        radius: Math.min(width, height) * 0.4,
        vx: -0.04,
        vy: 0.038,
        colorType: 'softLinen',
        baseAlpha: 0.42,
        phase: Math.PI * 0.8,
        frequency: 0.00048,
        roughness: Array.from({ length: 18 }, () => 0.8 + Math.random() * 0.38)
      },
      {
        x: width * 0.65,
        y: height * 0.12,
        radius: Math.min(width, height) * 0.38,
        vx: 0.045,
        vy: 0.042,
        colorType: 'mutedSepia',
        baseAlpha: 0.35,
        phase: Math.PI * 0.25,
        frequency: 0.00044,
        roughness: Array.from({ length: 18 }, () => 0.82 + Math.random() * 0.36)
      }
    ];

    // Color definitions for the handmade palette: pearl, warm biscuit, bleached sand, baked clay
    const getColorStops = (type: PigmentBlob['colorType'], alpha: number, mood: string) => {
      if (mood === 'bakedClay') {
        // Deeper warm terracotta & sun-baked clay emphasis
        switch (type) {
          case 'pearlLuminous':
            return { inner: `rgba(252, 246, 238, ${alpha * 0.42})`, outer: 'rgba(32, 22, 16, 0)' };
          case 'biscuitWarm':
            return { inner: `rgba(218, 186, 156, ${alpha * 0.58})`, outer: 'rgba(28, 18, 12, 0)' };
          case 'bakedClay':
            return { inner: `rgba(186, 128, 92, ${alpha * 0.62})`, outer: 'rgba(24, 15, 10, 0)' };
          case 'bleachedSand':
            return { inner: `rgba(244, 236, 224, ${alpha * 0.46})`, outer: 'rgba(30, 20, 14, 0)' };
          case 'softLinen':
            return { inner: `rgba(206, 178, 150, ${alpha * 0.52})`, outer: 'rgba(26, 16, 11, 0)' };
          case 'mutedSepia':
            return { inner: `rgba(142, 98, 70, ${alpha * 0.48})`, outer: 'rgba(20, 12, 8, 0)' };
        }
      } else if (mood === 'bleachedSand') {
        // High-key sun-washed shoreline & bleached linen
        switch (type) {
          case 'pearlLuminous':
            return { inner: `rgba(255, 252, 245, ${alpha * 0.55})`, outer: 'rgba(240, 232, 220, 0)' };
          case 'biscuitWarm':
            return { inner: `rgba(230, 214, 194, ${alpha * 0.52})`, outer: 'rgba(220, 202, 180, 0)' };
          case 'bakedClay':
            return { inner: `rgba(196, 158, 128, ${alpha * 0.45})`, outer: 'rgba(185, 145, 115, 0)' };
          case 'bleachedSand':
            return { inner: `rgba(248, 242, 232, ${alpha * 0.6})`, outer: 'rgba(235, 225, 210, 0)' };
          case 'softLinen':
            return { inner: `rgba(215, 198, 178, ${alpha * 0.48})`, outer: 'rgba(200, 182, 160, 0)' };
          case 'mutedSepia':
            return { inner: `rgba(160, 128, 102, ${alpha * 0.38})`, outer: 'rgba(145, 115, 90, 0)' };
        }
      }

      // Default: 'pearlLinen' (balanced warm biscuit + luminous shell pearl + bleached sand + gentle clay)
      switch (type) {
        case 'pearlLuminous':
          return { inner: `rgba(252, 248, 242, ${alpha * 0.45})`, outer: 'rgba(28, 22, 18, 0)' };
        case 'biscuitWarm':
          return { inner: `rgba(212, 190, 170, ${alpha * 0.52})`, outer: 'rgba(26, 20, 16, 0)' };
        case 'bakedClay':
          return { inner: `rgba(176, 134, 102, ${alpha * 0.46})`, outer: 'rgba(24, 18, 14, 0)' };
        case 'bleachedSand':
          return { inner: `rgba(242, 236, 225, ${alpha * 0.42})`, outer: 'rgba(25, 19, 15, 0)' };
        case 'softLinen':
          return { inner: `rgba(198, 174, 152, ${alpha * 0.45})`, outer: 'rgba(22, 17, 13, 0)' };
        case 'mutedSepia':
          return { inner: `rgba(132, 102, 80, ${alpha * 0.38})`, outer: 'rgba(18, 14, 11, 0)' };
      }
    };

    // Draw organic rough-edged blob with uneven smudged borders
    const drawHandmadeBlob = (
      blob: PigmentBlob,
      time: number,
      currentMood: string
    ) => {
      const { x, y, radius, roughness, colorType, baseAlpha, phase, frequency } = blob;
      
      // Multi-harmonic non-repeating breathing
      const dynamicAlpha = isAtmosphericDrift
        ? baseAlpha * (0.86 + 0.22 * Math.sin(time * frequency + phase) + 0.08 * Math.cos(time * frequency * 1.618 + phase))
        : baseAlpha;

      const currentRadius = isAtmosphericDrift
        ? radius * (0.93 + 0.12 * Math.cos(time * frequency * 0.75 + phase * 1.33))
        : radius;

      const colors = getColorStops(colorType, dynamicAlpha, currentMood);

      ctx.save();
      ctx.beginPath();

      const numPoints = roughness.length;
      const angleStep = (Math.PI * 2) / numPoints;

      // Generate organic, hand-brushed perimeter with natural brush tooth
      for (let i = 0; i <= numPoints; i++) {
        const idx = i % numPoints;
        const angle = i * angleStep;
        
        // Multi-frequency organic breathing noise
        const organicDisplacement =
          roughness[idx] +
          0.11 * Math.sin(time * 0.0006 + idx * 1.7 + phase) +
          0.07 * Math.cos(time * 0.0009 + idx * 2.3);

        const r = currentRadius * organicDisplacement;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          // Soft bezier curve smoothing along perimeter
          const prevIdx = (i - 1) % numPoints;
          const prevAngle = (i - 1) * angleStep;
          const prevR = currentRadius * roughness[prevIdx];
          const cpx = x + Math.cos(prevAngle + angleStep * 0.5) * ((prevR + r) * 0.52);
          const cpy = y + Math.sin(prevAngle + angleStep * 0.5) * ((prevR + r) * 0.52);
          ctx.quadraticCurveTo(cpx, cpy, px, py);
        }
      }

      ctx.closePath();

      // Create soft radial bleed gradient with luminous pearl core
      const gradient = ctx.createRadialGradient(
        x,
        y,
        currentRadius * 0.04,
        x,
        y,
        currentRadius * 1.06
      );
      gradient.addColorStop(0, colors.inner);
      gradient.addColorStop(0.48, colors.inner.replace(/[\d.]+\)$/, `${dynamicAlpha * 0.7})`));
      gradient.addColorStop(0.82, colors.inner.replace(/[\d.]+\)$/, `${dynamicAlpha * 0.22})`));
      gradient.addColorStop(1, colors.outer);

      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    };

    // Render interactive wet ink and pearl washes
    const drawInkDrops = () => {
      const activeDrops = inkDropsRef.current;
      for (let i = activeDrops.length - 1; i >= 0; i--) {
        const drop = activeDrops[i];
        drop.radius += (drop.maxRadius - drop.radius) * 0.035;
        drop.alpha *= 0.982;

        if (drop.alpha < 0.01) {
          activeDrops.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        const numPoints = drop.points.length;
        for (let j = 0; j <= numPoints; j++) {
          const pt = drop.points[j % numPoints];
          pt.distance += pt.speed;
          const px = drop.x + Math.cos(pt.angle) * (drop.radius * pt.distance);
          const py = drop.y + Math.sin(pt.angle) * (drop.radius * pt.distance);

          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();

        const grad = ctx.createRadialGradient(
          drop.x,
          drop.y,
          2,
          drop.x,
          drop.y,
          drop.radius * 1.15
        );
        grad.addColorStop(0, drop.color.replace('ALPHA', `${drop.alpha * 0.45}`));
        grad.addColorStop(0.65, drop.color.replace('ALPHA', `${drop.alpha * 0.16}`));
        grad.addColorStop(1, drop.color.replace('ALPHA', '0'));

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Base background tone matching the warm matte linen canvas
      if (canvasMood === 'bakedClay') {
        ctx.fillStyle = '#140e0a';
        ctx.fillRect(0, 0, width, height);
      } else if (canvasMood === 'bleachedSand') {
        ctx.fillStyle = '#18120e';
        ctx.fillRect(0, 0, width, height);
      } else {
        // Default warm pearl linen deep ground
        ctx.fillStyle = '#120e0b';
        ctx.fillRect(0, 0, width, height);
      }

      // Update positions with slow organic drifts
      if (isAtmosphericDrift) {
        blobs.forEach((blob) => {
          blob.x += blob.vx * (1 + Math.sin(time * 0.00025 + blob.phase) * 0.45);
          blob.y += blob.vy * (1 + Math.cos(time * 0.00032 + blob.phase) * 0.45);

          // Soft boundary bounce with natural cushion
          const pad = 140;
          if (blob.x < -pad) blob.vx = Math.abs(blob.vx);
          if (blob.x > width + pad) blob.vx = -Math.abs(blob.vx);
          if (blob.y < -pad) blob.vy = Math.abs(blob.vy);
          if (blob.y > height + pad) blob.vy = -Math.abs(blob.vy);
        });
      }

      // Render each pigment puddle
      blobs.forEach((blob) => {
        drawHandmadeBlob(blob, time, canvasMood);
      });

      // Render interactive capillary ink blooms
      drawInkDrops();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasMood, isAtmosphericDrift]);

  // Handle gentle cursor gesture for organic pigment dispersion
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const now = performance.now();
    const last = lastMousePosRef.current;
    const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);

    if (dist > 75 && now - last.time > 160) {
      lastMousePosRef.current = { x: e.clientX, y: e.clientY, time: now };

      // Colors for interactive pearl, biscuit & bleached sand washes
      const colors = [
        'rgba(252, 248, 242, ALPHA)', // Luminous pearl
        'rgba(212, 190, 170, ALPHA)', // Warm biscuit
        'rgba(176, 134, 102, ALPHA)', // Baked clay
        'rgba(242, 236, 225, ALPHA)'  // Bleached sand
      ];

      const chosenColor = colors[Math.floor(Math.random() * colors.length)];

      const newDrop: InkDrop = {
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 65 + Math.random() * 75,
        alpha: 0.55,
        color: chosenColor,
        points: Array.from({ length: 14 }, (_, i) => ({
          angle: (i * Math.PI * 2) / 14 + (Math.random() - 0.5) * 0.28,
          distance: 0.82 + Math.random() * 0.42,
          speed: (Math.random() - 0.5) * 0.018
        }))
      };

      inkDropsRef.current.push(newDrop);
      if (inkDropsRef.current.length > 8) {
        inkDropsRef.current.shift();
      }
    }
  };

  return (
    <div 
      onPointerMove={handlePointerMove}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* 1. SVG Filter Definitions for Deckled Edges & Raw Cotton Paper Tooth */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Deckled Edge Displacement */}
          <filter id="handmade-deckle-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.011 0.015" 
              numOctaves="4" 
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="38" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      {/* 2. Primary Procedural Handmade Watercolor & Pigment Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          filter: 'url(#handmade-deckle-filter) contrast(1.03) brightness(1.02)'
        }}
      />

      {/* 3. Hand-Crafted CSS Pigment Washes (Warm Biscuit, Luminous Pearl & Bleached Sand) */}
      <div className="absolute inset-0 opacity-65 mix-blend-screen pointer-events-none">
        
        {/* Soft Bleached-White & Luminous Pearl Sheen (Top-Left) */}
        <div 
          className="absolute -top-[14%] -left-[10%] w-[66vw] h-[66vw] max-w-[880px] max-h-[880px] rounded-[48%_52%_64%_36%/45%_55%_45%_55%] opacity-40 filter blur-[95px] animate-wash-1"
          style={{
            background: 'radial-gradient(ellipse at 42% 42%, rgba(254, 250, 244, 0.48) 0%, rgba(238, 225, 208, 0.3) 44%, rgba(198, 172, 145, 0.14) 72%, transparent 88%)'
          }}
        />

        {/* Baked Clay & Warm Biscuit Puddle (Bottom-Right) */}
        <div 
          className="absolute -bottom-[18%] -right-[12%] w-[70vw] h-[70vw] max-w-[950px] max-h-[950px] rounded-[58%_42%_38%_62%/52%_48%_52%_48%] opacity-45 filter blur-[110px] animate-wash-2"
          style={{
            background: 'radial-gradient(ellipse at 58% 58%, rgba(214, 184, 154, 0.44) 0%, rgba(178, 136, 102, 0.3) 45%, rgba(236, 222, 204, 0.16) 70%, transparent 88%)'
          }}
        />

        {/* Luminous Pearl Light Pool (Center Floating Drift) */}
        <div 
          className="absolute top-[28%] left-[24%] w-[56vw] h-[56vw] max-w-[780px] max-h-[780px] rounded-[38%_62%_46%_54%/58%_42%_58%_42%] opacity-42 filter blur-[90px] animate-wash-3 animate-pearl-glow"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 252, 246, 0.48) 0%, rgba(228, 212, 192, 0.28) 42%, rgba(168, 134, 106, 0.12) 68%, transparent 88%)'
          }}
        />

        {/* Sun-Faded Bleached Sand Horizon (Top-Right) */}
        <div 
          className="absolute -top-[8%] right-[8%] w-[46vw] h-[46vw] max-w-[620px] max-h-[620px] rounded-[46%_54%_34%_66%/54%_46%_54%_46%] opacity-38 filter blur-[85px] animate-wash-2"
          style={{
            background: 'radial-gradient(ellipse at 52% 44%, rgba(246, 240, 230, 0.45) 0%, rgba(212, 192, 170, 0.22) 50%, transparent 82%)'
          }}
        />
      </div>

      {/* 4. Natural Cotton Paper & Linen Grain Texture Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          tactileGrainIntensity === 'high' 
            ? 'opacity-[0.15]' 
            : tactileGrainIntensity === 'soft' 
            ? 'opacity-[0.06]' 
            : 'opacity-[0.10]'
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(248, 242, 232, 0.13) 1.2px, transparent 1.2px),
            repeating-linear-gradient(45deg, rgba(218, 196, 172, 0.035) 0px, rgba(218, 196, 172, 0.035) 1.5px, transparent 1.5px, transparent 4px),
            repeating-linear-gradient(-45deg, rgba(184, 148, 118, 0.025) 0px, rgba(184, 148, 118, 0.025) 1.5px, transparent 1.5px, transparent 4px)
          `,
          backgroundSize: '12px 12px, 8px 8px, 8px 8px'
        }}
      />

      {/* 5. Delicate Vignette of Warm Baked Terracotta & Soft Washed Chalk */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 38%, rgba(22, 16, 12, 0.4) 80%, rgba(14, 10, 7, 0.82) 100%)'
        }}
      />

      {/* 6. Hand-Crafted Tactile Canvas Controller (Bottom-Left Pill) */}
      <div className="fixed bottom-4 left-4 z-40 pointer-events-auto flex items-center gap-2">
        <div className="relative">
          {showControls && (
            <div className="absolute bottom-11 left-0 mb-2 w-76 rounded-2xl bg-[#1c1511]/95 border border-[#3d2e24] p-4 backdrop-blur-xl shadow-[0_16px_45px_rgba(0,0,0,0.65)] text-xs font-serif text-[#fcf8f2] space-y-3.5 transition-all animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between border-b border-[#33251c] pb-2.5">
                <span className="flex items-center gap-2 font-display text-base font-semibold text-[#fcf8f2] tracking-wide">
                  <Feather className="w-4 h-4 text-[#d4beaa]" />
                  <span>Handmade Paper Canvas</span>
                </span>
                <span className="text-[11px] font-calligraphy text-[#d4beaa] px-2 py-0.5 rounded bg-[#d4beaa]/10 border border-[#d4beaa]/25 text-sm">
                  Calligraphic
                </span>
              </div>

              {/* Palette Mood Selector */}
              <div>
                <div className="text-[12px] font-display text-[#d4beaa] mb-1.5 flex items-center justify-between">
                  <span>Natural Pigment Palette:</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 font-display text-xs">
                  <button
                    onClick={() => setCanvasMood('pearlLinen')}
                    className={`px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      canvasMood === 'pearlLinen'
                        ? 'bg-[#d4beaa]/25 border-[#d4beaa] text-[#fcf8f2] font-bold shadow-[0_0_10px_rgba(212,190,170,0.2)]'
                        : 'bg-[#150f0c] border-[#2d2018] text-[#c4ad98] hover:text-[#fcf8f2]'
                    }`}
                  >
                    Pearl Linen
                  </button>
                  <button
                    onClick={() => setCanvasMood('bakedClay')}
                    className={`px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      canvasMood === 'bakedClay'
                        ? 'bg-[#c47c5d]/25 border-[#c47c5d] text-[#fcf8f2] font-bold shadow-[0_0_10px_rgba(196,124,93,0.2)]'
                        : 'bg-[#150f0c] border-[#2d2018] text-[#c4ad98] hover:text-[#fcf8f2]'
                    }`}
                  >
                    Baked Clay
                  </button>
                  <button
                    onClick={() => setCanvasMood('bleachedSand')}
                    className={`px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      canvasMood === 'bleachedSand'
                        ? 'bg-[#eae0d2]/25 border-[#eae0d2] text-[#fcf8f2] font-bold shadow-[0_0_10px_rgba(234,224,210,0.2)]'
                        : 'bg-[#150f0c] border-[#2d2018] text-[#c4ad98] hover:text-[#fcf8f2]'
                    }`}
                  >
                    Bleach Sand
                  </button>
                </div>
              </div>

              {/* Paper Texture Tooth */}
              <div>
                <div className="text-[12px] font-display text-[#d4beaa] mb-1.5 flex items-center justify-between">
                  <span>Paper Texture Tooth:</span>
                  <span className="text-[#fcf8f2] font-semibold capitalize font-mono text-[11px]">{tactileGrainIntensity}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 font-display text-xs">
                  {(['soft', 'medium', 'high'] as const).map((intensity) => (
                    <button
                      key={intensity}
                      onClick={() => setTactileGrainIntensity(intensity)}
                      className={`px-2 py-1.5 rounded-lg border capitalize transition-all cursor-pointer ${
                        tactileGrainIntensity === intensity
                          ? 'bg-[#d4beaa]/25 border-[#d4beaa] text-[#fcf8f2] font-bold'
                          : 'bg-[#150f0c] border-[#2d2018] text-[#c4ad98] hover:text-[#fcf8f2]'
                      }`}
                    >
                      {intensity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Atmospheric Drift Dynamics */}
              <div className="flex items-center justify-between pt-1 border-t border-[#33251c]">
                <span className="text-[12px] font-display text-[#d4beaa]">Slow Organic Drift:</span>
                <button
                  onClick={() => setIsAtmosphericDrift(!isAtmosphericDrift)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-display transition-all cursor-pointer ${
                    isAtmosphericDrift
                      ? 'bg-[#d4beaa]/20 text-[#fcf8f2] border border-[#d4beaa]/40'
                      : 'bg-[#150f0c] text-[#a68f7b] border border-[#2d2018]'
                  }`}
                >
                  {isAtmosphericDrift ? 'Active Drift' : 'Still Canvas'}
                </button>
              </div>

              <div className="text-[11px] font-editorial italic text-[#c4ad98]/90 flex items-center gap-1.5 pt-0.5">
                <Droplet className="w-3.5 h-3.5 text-[#d4beaa] flex-shrink-0" />
                <span>Glide your pen or cursor to disperse warm pigment washes.</span>
              </div>
            </div>
          )}

          {/* Minimalist Tactile Trigger Pill */}
          <button
            onClick={() => setShowControls(!showControls)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1c1511]/90 hover:bg-[#261e18] border border-[#382b22] hover:border-[#d4beaa]/60 text-xs font-serif text-[#d4beaa] hover:text-[#fcf8f2] backdrop-blur-md transition-all shadow-[0_6px_20px_rgba(0,0,0,0.5)] cursor-pointer group"
            title="Adjust Handmade Calligraphic Canvas"
          >
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fcf8f2] border border-[#d4beaa]/40 shadow-[0_0_6px_rgba(252,248,242,0.6)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#d4beaa]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#a67b5b]" />
            </div>
            <span className="text-xs font-display tracking-wider">Handmade Canvas</span>
            <Sliders className="w-3.5 h-3.5 text-[#d4beaa] group-hover:rotate-45 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
