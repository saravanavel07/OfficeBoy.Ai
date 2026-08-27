import React from 'react';
import { 
  Workflow, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Building2,
  DollarSign,
  TrendingUp,
  FileCheck,
  Feather
} from 'lucide-react';
import { AGENT_PROFILES } from '../data/agents';
import { SimulationState, AgentRole, CompanyStage } from '../types';

interface ManagerCardProps {
  state: SimulationState;
  onOpenAgentModal: (role: AgentRole) => void;
  onOpenDeliverableModal: () => void;
}

const STAGES: { id: CompanyStage; name: string; short: string; phase: string }[] = [
  { id: 'strategy_delegation', name: 'Executive Strategy & Mandates', short: 'Strategy & Staffing', phase: 'Stage I' },
  { id: 'engineering_design_sprint', name: 'Architecture & Design Sprint', short: 'Systems & UX Sprint', phase: 'Stage II' },
  { id: 'qa_compliance_gate', name: 'Quality Assurance & Audit Gate', short: 'QA & Compliance Audit', phase: 'Stage III' },
  { id: 'documentation_gtm', name: 'Client Documentation & GTM', short: 'Docs & Product GTM', phase: 'Stage IV' },
  { id: 'executive_signoff', name: 'Executive Certification & Handover', short: 'Executive Sign-Off', phase: 'Stage V' }
];

export const ManagerCard: React.FC<ManagerCardProps> = ({
  state,
  onOpenAgentModal,
  onOpenDeliverableModal
}) => {
  const profile = AGENT_PROFILES.MD;
  const currentStep = state.currentBrief.workflowSteps[state.currentStepIndex - 1] || null;
  const isFinished = state.currentStepIndex >= state.currentBrief.workflowSteps.length;
  const activeAgent = currentStep?.targetAgentState?.agent || (state.isRunning ? 'MD' : null);

  const mdAllocation = state.allocatedPositions?.MD || {
    position: 'Managing Director & Strategic Orchestrator',
    department: 'Executive Governance & Capital Strategy',
    mandate: 'Structure regulatory compliance, institutional SLAs, and capital protection protocols.',
    kpi: '100% on-time milestone delivery with executive sign-off'
  };

  // Status mapping
  const getStatusText = () => {
    if (isFinished) return 'Contract Completed & Certified';
    if (!state.isRunning && state.currentStepIndex === 0) return 'Contract Ingested • Ready';
    if (state.isPaused) return 'Sprint Paused';
    if (currentStep?.action === 'assign') return `Directing -> ${currentStep.to}`;
    if (currentStep?.action === 'review_request') return `Requesting Audit -> ${currentStep.to}`;
    if (currentStep?.action === 'compile') return 'Compiling Certified Project Dossier';
    return 'Active Sprint Execution';
  };

  const getStatusBadgeStyle = () => {
    if (isFinished) return 'bg-[#8fa89b]/20 text-[#fcf8f2] border-[#8fa89b]/50';
    if (state.isRunning) return 'bg-[#d4beaa]/20 text-[#fcf8f2] border-[#d4beaa]/50 shadow-[0_0_12px_rgba(212,190,170,0.2)]';
    return 'bg-[#221a14] text-[#c4ad98] border-[#382b22]';
  };

  return (
    <div className="w-full relative rounded-2xl bg-gradient-to-b from-[#1c1511] to-[#140e0b] border border-[#382b22] hover:border-[#d4beaa]/50 transition-all duration-300 p-5 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.65)] backdrop-blur-xl overflow-hidden group">
      
      {/* Warm Ambient Pearl & Biscuit Glow Ribbon */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-r from-[#d4beaa]/15 via-[#c47c5d]/15 to-[#fcf8f2]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left: Avatar + Manager Identity */}
        <div className="flex items-start sm:items-center gap-4.5 sm:gap-5 w-full lg:w-auto">
          
          {/* Avatar with Warm Sheen */}
          <div 
            onClick={() => onOpenAgentModal('MD')}
            className="relative cursor-pointer group/avatar flex-shrink-0"
            title="Inspect Aegis (MD) Directives & Executive Mandate"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-[2px] bg-gradient-to-tr from-[#d4beaa] via-[#a67b5b] to-[#fcf8f2] shadow-[0_4px_20px_rgba(212,190,170,0.3)] group-hover/avatar:shadow-[0_4px_28px_rgba(212,190,170,0.45)] transition-all">
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            
            {/* Status Dot */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#120e0b] flex items-center justify-center border border-[#382b22]">
              <span className={`w-2.5 h-2.5 rounded-full ${isFinished ? 'bg-[#8fa89b]' : state.isRunning ? 'bg-[#d4beaa] animate-ping' : 'bg-[#c4ad98]'}`} />
              <span className={`absolute w-2.5 h-2.5 rounded-full ${isFinished ? 'bg-[#8fa89b]' : state.isRunning ? 'bg-[#d4beaa]' : 'bg-[#c4ad98]'}`} />
            </div>
          </div>

          {/* Info & Title */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5 mb-1">
              <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-wide text-[#fcf8f2] flex items-center gap-2">
                <span>{profile.name}</span>
                <span className="font-calligraphy text-xl sm:text-2xl text-[#d4beaa] font-normal italic">
                  Managing Director
                </span>
              </h2>
              
              {/* Dynamic Status Badge */}
              <div className={`flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-serif border ${getStatusBadgeStyle()} transition-all`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span>{getStatusText()}</span>
              </div>
            </div>

            {/* Dynamic Project Role Allocation */}
            <div className="text-xs sm:text-sm font-display font-medium text-[#fcf8f2] mb-1">
              <span className="text-[#d4beaa] font-serif italic">Allocated Position: </span>
              <span>{mdAllocation.position}</span>
            </div>

            <p className="text-xs text-[#c4ad98] font-editorial italic max-w-2xl line-clamp-1">
              {mdAllocation.mandate}
            </p>

            {/* Active Contract Info */}
            <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs font-serif text-[#c4ad98]">
              <span className="flex items-center gap-1 text-[#fcf8f2] font-medium bg-[#221913] px-2.5 py-0.5 rounded-lg border border-[#382b22]">
                <Building2 className="w-3.5 h-3.5 text-[#d4beaa]" />
                Client: {state.currentBrief.client}
              </span>
              <span className="flex items-center gap-1 text-[#d4beaa] bg-[#d4beaa]/10 px-2.5 py-0.5 rounded-lg border border-[#d4beaa]/25 font-mono">
                <DollarSign className="w-3.5 h-3.5" />
                {state.currentBrief.budget || '$125,000 USD'}
              </span>
              <span className="flex items-center gap-1 text-[#c47c5d] bg-[#c47c5d]/10 px-2.5 py-0.5 rounded-lg border border-[#c47c5d]/25">
                <ShieldCheck className="w-3.5 h-3.5" />
                {state.currentBrief.industry}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Stage Progress Meter */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between w-full lg:w-72 gap-3 bg-[#150f0c]/90 p-3.5 rounded-xl border border-[#382b22]">
          <div className="w-full flex items-center justify-between text-xs font-display">
            <span className="text-[#c4ad98]">Sprint Progress</span>
            <span className="text-[#fcf8f2] font-bold font-mono">
              {state.progress}% Complete
            </span>
          </div>

          {/* Progress Bar with Warm Natural Gradient */}
          <div className="w-full h-2.5 bg-[#221a14] rounded-full overflow-hidden border border-[#382b22]">
            <div 
              className="h-full bg-gradient-to-r from-[#d4beaa] via-[#c47c5d] to-[#8fa89b] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(212,190,170,0.4)]"
              style={{ width: `${state.progress}%` }}
            />
          </div>

          <div className="w-full flex items-center justify-between text-[11px] font-serif text-[#c4ad98]">
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3 text-[#d4beaa]" />
              Step {state.currentStepIndex} of {state.currentBrief.workflowSteps.length}
            </span>
            {isFinished ? (
              <button 
                onClick={onOpenDeliverableModal}
                className="text-[#d4beaa] hover:underline flex items-center gap-1 font-display font-semibold cursor-pointer"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Inspect Deliverable</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <span className="text-[#d4beaa] font-display tracking-wide uppercase text-[10px]">
                {state.currentStage.replace(/_/g, ' ')}
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Enterprise Company Operating Workflow Stage Tracker */}
      <div className="mt-5 pt-4 border-t border-[#382b22]">
        <div className="flex items-center justify-between gap-2 mb-2.5 text-[11px] font-display uppercase tracking-wider text-[#c4ad98]">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#d4beaa]" />
            Operating Workflow Stages:
          </span>
          <span className="text-[#d4beaa] font-bold">
            {isFinished ? '✓ All Stages Certified' : `Current: Stage ${STAGES.findIndex(s => s.id === state.currentStage) + 1 || 1} of 5`}
          </span>
        </div>

        {/* 5 Real Company Workflow Stage Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {STAGES.map((st, idx) => {
            const currentIdx = STAGES.findIndex(s => s.id === state.currentStage);
            const isCompletedStage = isFinished || (currentIdx > idx);
            const isCurrentStage = !isFinished && (currentIdx === idx);

            return (
              <div 
                key={st.id}
                className={`p-2.5 rounded-xl border transition-all text-xs font-serif ${
                  isCurrentStage
                    ? 'bg-[#d4beaa]/20 border-[#d4beaa] text-[#fcf8f2] shadow-[0_0_12px_rgba(212,190,170,0.25)]'
                    : isCompletedStage
                    ? 'bg-[#8fa89b]/15 border-[#8fa89b]/35 text-[#d4beaa]'
                    : 'bg-[#150f0c] border-[#2d221a] text-[#8e7663] opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#c4ad98]">{st.phase}</span>
                  {isCompletedStage ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8fa89b]" />
                  ) : isCurrentStage ? (
                    <span className="w-2 h-2 rounded-full bg-[#d4beaa] animate-ping" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8e7663]" />
                  )}
                </div>
                <div className="font-display font-medium truncate text-[11px]">{st.short}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Live Directive Bar */}
      <div className="mt-4 pt-3.5 border-t border-[#382b22] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[#d4beaa]/15 text-[#d4beaa] flex-shrink-0 border border-[#d4beaa]/30">
            <Feather className="w-3.5 h-3.5" />
          </div>
          
          <div className="font-editorial text-sm text-[#fcf8f2] truncate flex items-center gap-1.5 w-full">
            <span className="text-[#d4beaa] font-display font-semibold flex-shrink-0">Executive Directive:</span>
            <span className="text-[#c4ad98] italic truncate">
              {currentStep ? currentStep.instructionOrFeedback : state.activeAgents.MD.currentTask}
            </span>
            <span className="inline-block w-2 h-4 bg-[#d4beaa] animate-cursor flex-shrink-0 ml-1" />
          </div>
        </div>

        {/* Assigned Specialist Callout */}
        {activeAgent && activeAgent !== 'MD' && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#221a14] border border-[#382b22] text-xs font-serif text-[#d4beaa] flex-shrink-0">
            <span className="text-[#c4ad98] font-editorial italic">Active Specialist:</span>
            <span className="font-display font-semibold text-[#fcf8f2]">{activeAgent}</span>
          </div>
        )}
      </div>

    </div>
  );
};
