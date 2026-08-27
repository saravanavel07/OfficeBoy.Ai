import React from 'react';
import { 
  Code2, 
  Palette, 
  ShieldAlert, 
  BookOpen, 
  Megaphone, 
  CheckCircle, 
  Eye, 
  Activity,
  Terminal,
  Cpu,
  Target,
  Layers,
  Feather
} from 'lucide-react';
import { AGENT_PROFILES } from '../data/agents';
import { AgentRole, AgentStatus, SimulationState } from '../types';

interface EmployeeCardProps {
  role: AgentRole;
  state: SimulationState;
  onOpenAgentModal: (role: AgentRole) => void;
  onOpenDeliverableModal: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  role,
  state,
  onOpenAgentModal,
  onOpenDeliverableModal
}) => {
  const profile = AGENT_PROFILES[role];
  const agentState = state.activeAgents[role];
  const roleAllocation = state.allocatedPositions?.[role];

  const hasDeliverable = !!(
    (role === 'Developer' && state.memory.deliverables.developer) ||
    (role === 'Designer' && state.memory.deliverables.designer) ||
    (role === 'Reviewer' && state.memory.deliverables.reviewer) ||
    (role === 'Writer' && state.memory.deliverables.writer) ||
    (role === 'Marketer' && state.memory.deliverables.marketer)
  );

  // Role Icons in Warm Neutral Palettes
  const getRoleIcon = () => {
    switch (role) {
      case 'Developer':
        return <Code2 className="w-4 h-4 text-[#d4beaa]" />;
      case 'Designer':
        return <Palette className="w-4 h-4 text-[#c47c5d]" />;
      case 'Reviewer':
        return <ShieldAlert className="w-4 h-4 text-[#8fa89b]" />;
      case 'Writer':
        return <BookOpen className="w-4 h-4 text-[#e2d5c3]" />;
      case 'Marketer':
        return <Megaphone className="w-4 h-4 text-[#b5997f]" />;
      default:
        return <Cpu className="w-4 h-4 text-[#d4beaa]" />;
    }
  };

  // Status Styling & Label
  const getStatusConfig = (status: AgentStatus) => {
    switch (status) {
      case 'executing':
        return {
          label: 'In Sprint',
          badgeClass: 'bg-[#d4beaa]/20 text-[#fcf8f2] border-[#d4beaa]/50 shadow-[0_0_12px_rgba(212,190,170,0.25)]',
          dotClass: 'bg-[#d4beaa] animate-ping',
          cardBorder: 'border-[#d4beaa]/60 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
        };
      case 'reviewing':
        return {
          label: 'Auditing',
          badgeClass: 'bg-[#8fa89b]/25 text-[#fcf8f2] border-[#8fa89b]/50 shadow-[0_0_12px_rgba(143,168,155,0.25)]',
          dotClass: 'bg-[#8fa89b] animate-ping',
          cardBorder: 'border-[#8fa89b]/60 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
        };
      case 'assigned':
        return {
          label: 'Mandate Assigned',
          badgeClass: 'bg-[#c47c5d]/20 text-[#fcf8f2] border-[#c47c5d]/40',
          dotClass: 'bg-[#c47c5d] animate-pulse',
          cardBorder: 'border-[#c47c5d]/50'
        };
      case 'completed':
        return {
          label: 'Artifact Delivered',
          badgeClass: 'bg-[#8fa89b]/20 text-[#d4beaa] border-[#8fa89b]/35',
          dotClass: 'bg-[#8fa89b]',
          cardBorder: 'border-[#382b22]'
        };
      default:
        return {
          label: 'Standing By',
          badgeClass: 'bg-[#1c1612] text-[#a68f7b] border-[#2e231b]',
          dotClass: 'bg-[#8e7663]',
          cardBorder: 'border-[#2d221a]'
        };
    }
  };

  const statusConfig = getStatusConfig(agentState.status);

  return (
    <div 
      className={`relative flex flex-col justify-between rounded-2xl bg-[#1a1410]/95 p-4 sm:p-5 border transition-all duration-300 ${statusConfig.cardBorder} hover:border-[#d4beaa]/60 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] group`}
    >
      {/* Top Details & Avatar */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          
          {/* Avatar + Name */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onOpenAgentModal(role)}
              className="relative cursor-pointer flex-shrink-0"
              title="Inspect Specialist Mandates & Directives"
            >
              <div 
                className="w-12 h-12 rounded-xl p-[1.5px] transition-all group-hover:scale-105 shadow-sm"
                style={{ background: `linear-gradient(135deg, ${profile.color}, #1a1410)` }}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>

              {/* Status Dot */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#120e0b] flex items-center justify-center border border-[#382b22]">
                <span className={`w-2 h-2 rounded-full ${statusConfig.dotClass}`} />
                <span className={`absolute w-2 h-2 rounded-full ${statusConfig.dotClass.replace('animate-ping', '')}`} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-semibold text-lg text-[#fcf8f2] group-hover:text-white transition-colors">
                  {profile.name}
                </h3>
                <span className="text-[10px] text-[#c4ad98] font-calligraphy text-sm font-normal px-1.5 py-0.5 rounded bg-[#221913] border border-[#382b22]">
                  {profile.role}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {getRoleIcon()}
                <span className="text-[11px] font-serif text-[#d4beaa] italic truncate max-w-[150px]">
                  {roleAllocation?.department || profile.specialty.split(',')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-display uppercase tracking-wider font-semibold ${statusConfig.badgeClass} flex-shrink-0`}>
            {statusConfig.label}
          </div>
        </div>

        {/* Dynamically Allocated Position Banner */}
        <div className="p-2.5 rounded-xl bg-[#120e0b] border border-[#33251c] mb-3">
          <div className="text-[10px] font-display uppercase tracking-wider text-[#a68f7b] flex items-center gap-1 mb-0.5">
            <Feather className="w-3 h-3 text-[#d4beaa]" />
            <span>Project Allocated Position:</span>
          </div>
          <div className="text-xs font-display font-medium text-[#fcf8f2] leading-snug">
            {roleAllocation?.position || profile.title}
          </div>
          {roleAllocation?.kpi && (
            <div className="text-[10px] font-serif text-[#8fa89b] mt-1 flex items-center gap-1 truncate">
              <Target className="w-3 h-3 flex-shrink-0 text-[#d4beaa]" />
              <span className="truncate">KPI: {roleAllocation.kpi}</span>
            </div>
          )}
        </div>

        {/* Current Activity Line */}
        <div className="bg-[#150f0c]/90 rounded-xl p-2.5 border border-[#33251c] mb-3">
          <div className="flex items-center justify-between text-[11px] font-display text-[#c4ad98] mb-1">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#d4beaa]" />
              Active Sprint Directive
            </span>
            {agentState.status === 'executing' && (
              <span className="text-[#d4beaa] animate-pulse text-[10px] font-bold">ACTIVE</span>
            )}
          </div>
          <p className="text-xs font-editorial italic text-[#fcf8f2] line-clamp-2 leading-relaxed">
            {agentState.currentTask}
          </p>
        </div>
      </div>

      {/* Progress Bar & Actions */}
      <div className="mt-2 pt-3 border-t border-[#33251c]">
        
        {/* Animated Progress Bar */}
        <div className="flex items-center justify-between text-[11px] font-display text-[#c4ad98] mb-1.5">
          <span>Sprint Delivery</span>
          <span className="text-[#fcf8f2] font-semibold font-mono">{agentState.progress}%</span>
        </div>

        <div className="w-full h-2 bg-[#120e0b] rounded-full overflow-hidden border border-[#33251c] mb-3">
          <div 
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${agentState.progress}%`,
              background: `linear-gradient(90deg, #d4beaa, #c47c5d)`
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2">
          
          <button
            onClick={() => onOpenAgentModal(role)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-[#221913] hover:bg-[#2e221a] text-[#c4ad98] hover:text-[#fcf8f2] border border-[#382b22] text-xs font-display transition-all cursor-pointer"
          >
            <Terminal className="w-3 h-3 text-[#d4beaa]" />
            <span>Role Directives</span>
          </button>

          {hasDeliverable ? (
            <button
              onClick={onOpenDeliverableModal}
              className="flex items-center gap-1 py-1.5 px-3 rounded-xl bg-[#d4beaa]/20 hover:bg-[#d4beaa]/30 text-[#fcf8f2] border border-[#d4beaa]/40 text-xs font-display font-semibold transition-all cursor-pointer shadow-[0_0_10px_rgba(212,190,170,0.25)]"
              title="Inspect Output Deliverable"
            >
              <CheckCircle className="w-3 h-3 text-[#8fa89b]" />
              <span>Deliverable</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-[#120e0b]/60 text-[#a68f7b]/60 border border-[#2d221a] text-xs font-serif italic">
              <span>Standby</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
