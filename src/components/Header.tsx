import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  StepForward, 
  Zap, 
  PlusCircle, 
  FileCheck2, 
  Briefcase,
  Layers,
  Code2,
  Inbox,
  LayoutDashboard,
  Feather,
  Bot
} from 'lucide-react';
import { ProjectBrief, SimulationState } from '../types';
import { MarkIILogo } from './MarkIILogo';
import { OfficeBoyLogo } from './OfficeBoyLogo';

interface HeaderProps {
  state: SimulationState;
  activeView: 'workspace' | 'intake';
  pendingRFPCount: number;
  onViewChange: (view: 'workspace' | 'intake') => void;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onOpenNewBriefModal: () => void;
  onOpenDeliverableModal: () => void;
  onOpenPythonModal: () => void;
  onOpenLogoStudio?: () => void;
  onOpenOfficeBoyStudio?: () => void;
  onSelectPreset: (brief: ProjectBrief) => void;
  presets: ProjectBrief[];
}

export const Header: React.FC<HeaderProps> = ({
  state,
  activeView,
  pendingRFPCount,
  onViewChange,
  onPlay,
  onPause,
  onStep,
  onReset,
  onSpeedChange,
  onOpenNewBriefModal,
  onOpenDeliverableModal,
  onOpenPythonModal,
  onOpenLogoStudio,
  onOpenOfficeBoyStudio,
  onSelectPreset,
  presets
}) => {
  const isFinished = state.currentStepIndex >= state.currentBrief.workflowSteps.length;

  return (
    <header className="relative z-10 w-full border-b border-[#382b22] bg-[#120e0b]/90 backdrop-blur-md px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        
        {/* Brand & Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full xl:w-auto">
          {/* Brand with OfficeBoy Live Motion Silver Robot Logo */}
          <div 
            onClick={onOpenOfficeBoyStudio}
            className="flex items-center gap-3 group cursor-pointer"
            title="Inspect OfficeBoy.ai Live Motion Silver Robot Logo Studio"
          >
            {/* Live Animated OfficeBoy Silver Robot Mascot */}
            <div className="relative flex items-center justify-center p-1 rounded-2xl bg-gradient-to-b from-[#1e232b] to-[#0f1216] border border-[#333d4b] group-hover:border-[#e2e8f0]/80 shadow-[0_4px_16px_rgba(0,0,0,0.65)] transition-all duration-300 group-hover:scale-105">
              <OfficeBoyLogo
                size="sm"
                animated={true}
                intensity="calm"
                showAtmosphere={true}
              />
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-[#f8fafc] flex items-baseline">
                  <span>OfficeBoy</span>
                  <span className="text-[#94a3b8] font-mono text-base sm:text-lg font-normal ml-0.5 group-hover:text-[#ffffff] transition-colors">
                    .ai
                  </span>
                </h1>

                {/* Silver Assistant Badge */}
                <span className="px-2 py-0.5 rounded-full bg-[#f1f5f9]/15 text-[#e2e8f0] border border-[#f1f5f9]/30 text-[10px] font-mono uppercase tracking-wider hidden sm:inline-block">
                  Silver Mascot
                </span>

                {/* Live Pulsing Pill in Platinum Silver / Warm Sage */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#cbd5e1]/15 border border-[#cbd5e1]/30 shadow-[0_0_8px_rgba(203,213,225,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-[#f8fafc] animate-pulse" />
                  <span className="text-[10px] font-mono font-medium tracking-wide text-[#e2e8f0] uppercase">
                    {state.isRunning ? 'Active Sprint' : isFinished ? 'Delivered' : 'Standby'}
                  </span>
                </div>
              </div>
              <p className="text-[12px] text-[#94a3b8] font-editorial italic flex items-center gap-1.5">
                <span>Autonomous AI Office Assistant Operating System</span>
                <span className="text-[#64748b] text-[10px] group-hover:text-[#cbd5e1] transition-colors hidden sm:inline">
                  • Click to inspect Live Robot Logo
                </span>
              </p>
            </div>
          </div>

          {/* Primary View Mode Switcher */}
          <div className="flex items-center p-1 bg-[#14171d] rounded-xl border border-[#2b3340]">
            <button
              onClick={() => onViewChange('workspace')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all cursor-pointer ${
                activeView === 'workspace'
                  ? 'bg-gradient-to-r from-[#e2e8f0] to-[#94a3b8] text-[#0f172a] shadow-[0_2px_10px_rgba(226,232,240,0.3)] font-bold'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Sprint Workspace</span>
            </button>

            <button
              onClick={() => onViewChange('intake')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all cursor-pointer ${
                activeView === 'intake'
                  ? 'bg-gradient-to-r from-[#64748b] to-[#475569] text-[#ffffff] shadow-[0_2px_10px_rgba(100,116,139,0.3)] font-bold'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Project Intake & RFPs</span>
              {pendingRFPCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#f8fafc] text-[10px] text-[#0f172a] font-bold ml-0.5">
                  {pendingRFPCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Project Selector & Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto justify-start xl:justify-end">
          {/* Preset Selector Dropdown */}
          <div className="relative inline-flex items-center">
            <Briefcase className="w-3.5 h-3.5 text-[#c4ad98] absolute left-3 pointer-events-none" />
            <select
              value={state.currentBrief.id}
              onChange={(e) => {
                const found = presets.find(p => p.id === e.target.value);
                if (found) onSelectPreset(found);
              }}
              className="bg-[#1a1410] text-[#fcf8f2] text-xs font-serif pl-8 pr-7 py-2 rounded-xl border border-[#382b22] hover:border-[#d4beaa]/60 focus:outline-none focus:border-[#d4beaa] cursor-pointer max-w-[190px] sm:max-w-[220px] truncate transition-colors"
            >
              {presets.map(preset => (
                <option key={preset.id} value={preset.id} className="bg-[#1a1410] text-[#fcf8f2]">
                  {preset.title}
                </option>
              ))}
            </select>
          </div>

          {/* New Brief Button */}
          <button
            onClick={onOpenNewBriefModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1a1410] hover:bg-[#251d17] border border-[#382b22] hover:border-[#d4beaa]/60 text-xs font-serif text-[#fcf8f2] transition-all cursor-pointer"
            title="Create Custom Client Brief"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#d4beaa]" />
            <span className="font-display font-medium">New RFP</span>
          </button>

          {/* Python Project Code Button */}
          <button
            onClick={onOpenPythonModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1a1410] hover:bg-[#251d17] border border-[#382b22] hover:border-[#d4beaa]/60 text-xs font-serif text-[#fcf8f2] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3)] cursor-pointer"
            title="Inspect & Download Complete Python Multi-Agent Codebase"
          >
            <Code2 className="w-3.5 h-3.5 text-[#d4beaa]" />
            <span className="font-display font-medium">Python Core</span>
            <span className="px-1.5 py-0.2 rounded bg-[#d4beaa]/20 text-[#d4beaa] text-[9px] font-mono font-bold">
              .py
            </span>
          </button>

          {/* View Deliverable Button */}
          <button
            onClick={onOpenDeliverableModal}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-display font-semibold transition-all cursor-pointer ${
              isFinished || state.memory.finalDeliverable || Object.keys(state.memory.deliverables).length > 0
                ? 'bg-gradient-to-r from-[#d4beaa]/25 to-[#c47c5d]/25 hover:from-[#d4beaa]/35 hover:to-[#c47c5d]/35 border border-[#d4beaa]/50 text-[#fcf8f2] shadow-[0_2px_12px_rgba(212,190,170,0.25)]'
                : 'bg-[#1a1410] border border-[#382b22] text-[#c4ad98] hover:text-[#fcf8f2]'
            }`}
          >
            <FileCheck2 className={`w-3.5 h-3.5 ${isFinished ? 'text-[#8fa89b]' : 'text-[#d4beaa]'}`} />
            <span>Deliverables</span>
            {Object.keys(state.memory.deliverables).length > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#c47c5d] text-[10px] text-white flex items-center justify-center font-bold">
                {Object.keys(state.memory.deliverables).length}
              </span>
            )}
          </button>

          {/* Simulation Controls Group */}
          <div className="flex items-center bg-[#1a1410] border border-[#382b22] rounded-xl p-1 gap-1">
            
            {/* Play/Pause */}
            {state.isRunning ? (
              <button
                onClick={onPause}
                className="p-1.5 rounded-lg bg-[#c47c5d]/20 hover:bg-[#c47c5d]/30 text-[#c47c5d] transition-all cursor-pointer"
                title="Pause Sprint"
              >
                <Pause className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onPlay}
                disabled={isFinished}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  isFinished 
                    ? 'opacity-40 text-[#c4ad98] cursor-not-allowed' 
                    : 'bg-[#8fa89b]/25 hover:bg-[#8fa89b]/35 text-[#d4beaa]'
                }`}
                title="Execute Company Sprint Live"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
            )}

            {/* Step Forward */}
            <button
              onClick={onStep}
              disabled={isFinished || state.isRunning}
              className={`p-1.5 rounded-lg hover:bg-[#251d17] text-[#c4ad98] hover:text-[#fcf8f2] transition-all cursor-pointer ${
                isFinished || state.isRunning ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              title="Step Forward One Directive"
            >
              <StepForward className="w-4 h-4" />
            </button>

            {/* Reset */}
            <button
              onClick={onReset}
              className="p-1.5 rounded-lg hover:bg-[#251d17] text-[#c4ad98] hover:text-[#fcf8f2] transition-all cursor-pointer"
              title="Reset Company State"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed Multiplier */}
            <div className="h-4 w-px bg-[#382b22] mx-0.5" />
            
            <div className="flex items-center gap-0.5">
              {[1, 2, 5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => onSpeedChange(speed)}
                  className={`px-1.5 py-0.5 text-[11px] font-mono rounded transition-all cursor-pointer ${
                    state.speedMultiplier === speed
                      ? 'bg-[#d4beaa] text-[#120e0b] font-bold shadow-sm'
                      : 'text-[#c4ad98] hover:text-[#fcf8f2]'
                  }`}
                >
                  {speed}x
                </button>
              ))}
              <button
                onClick={() => onSpeedChange(100)}
                className={`px-1.5 py-0.5 text-[11px] font-mono rounded flex items-center gap-0.5 transition-all cursor-pointer ${
                  state.speedMultiplier === 100
                    ? 'bg-[#c47c5d] text-white font-bold'
                    : 'text-[#c4ad98] hover:text-[#c47c5d]'
                }`}
                title="Instant Execution"
              >
                <Zap className="w-3 h-3" />
                <span>Max</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
