import React from 'react';
import { X, Sparkles, Terminal, CheckCircle2, Shield, Layers, Award } from 'lucide-react';
import { AgentRole, SimulationState } from '../types';
import { AGENT_PROFILES } from '../data/agents';

interface AgentDetailModalProps {
  role: AgentRole | null;
  onClose: () => void;
  state: SimulationState;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({
  role,
  onClose,
  state
}) => {
  if (!role) return null;

  const profile = AGENT_PROFILES[role];
  const agentState = state.activeAgents[role];
  const logsForAgent = state.memory.log.filter(l => l.from === role || l.to === role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#06060a]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-[#0b0f24] border border-[#1f2852] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080c1e] border-b border-[#161c3a]">
          <div className="flex items-center gap-3.5">
            <div 
              className="w-12 h-12 rounded-xl p-[2px] shadow-lg"
              style={{ background: `linear-gradient(135deg, ${profile.color}, #0b0f24)` }}
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-sora text-[#f5f6ff]">
                  {profile.name}
                </h3>
                <span 
                  className="px-2 py-0.5 rounded text-xs font-mono font-bold uppercase"
                  style={{ backgroundColor: `${profile.color}20`, color: profile.color }}
                >
                  {profile.role}
                </span>
              </div>
              <p className="text-xs text-[#9aa0c4] font-mono">
                {profile.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9aa0c4] hover:text-[#f5f6ff] hover:bg-[#161c3a] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-4 font-mono text-xs">
          
          {/* Current State Indicator */}
          <div className="p-3.5 rounded-xl bg-[#06060a] border border-[#161c3a] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: profile.color }} />
              <span className="text-[#9aa0c4]">Current Status:</span>
              <span className="text-[#f5f6ff] font-bold uppercase">{agentState.status}</span>
            </div>
            <div className="text-[#9aa0c4]">
              Completed Tasks: <span className="text-[#f5f6ff] font-bold">{agentState.tasksCompleted}</span>
            </div>
          </div>

          {/* Current Activity Line */}
          <div className="p-3 rounded-xl bg-[#080c20] border border-[#161c3a]">
            <p className="text-[#9aa0c4] mb-1 font-bold">Active Directive:</p>
            <p className="text-[#f5f6ff]">{agentState.currentTask}</p>
          </div>

          {/* Core Specialization */}
          <div>
            <h4 className="font-bold text-[#f5f6ff] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: profile.color }} />
              Domain Specialization
            </h4>
            <p className="text-[#9aa0c4] leading-relaxed bg-[#080c20] p-3 rounded-lg border border-[#161c3a]">
              {profile.specialty}
            </p>
          </div>

          {/* Skill Badges */}
          <div>
            <h4 className="font-bold text-[#f5f6ff] mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" style={{ color: profile.color }} />
              Specialized Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#111736] border border-[#1d2650] text-[#f5f6ff] text-[11px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* System Prompt Instruction */}
          <div>
            <h4 className="font-bold text-[#f5f6ff] mb-1.5 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" style={{ color: profile.color }} />
              Agent Core System Prompt
            </h4>
            <pre className="p-3.5 rounded-xl bg-[#04060d] border border-[#161c3a] text-[#9aa0c4] whitespace-pre-wrap leading-relaxed">
              {profile.systemPrompt}
            </pre>
          </div>

          {/* Agent-specific Log History */}
          <div>
            <h4 className="font-bold text-[#f5f6ff] mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#4f7dff]" />
              Agent Memory Timeline ({logsForAgent.length} entries)
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-[#04060d] rounded-xl border border-[#161c3a]">
              {logsForAgent.length === 0 ? (
                <p className="text-center py-4 text-[#9aa0c4]">No direct handoffs recorded yet.</p>
              ) : (
                logsForAgent.map(l => (
                  <div key={l.id} className="p-2 rounded bg-[#0b0f24] border border-[#161c3a] text-[11px]">
                    <div className="flex items-center justify-between text-[#9aa0c4] mb-1">
                      <span>[{l.timestamp}] {l.action.toUpperCase()}</span>
                      <span>{l.from} → {l.to || 'Bus'}</span>
                    </div>
                    <p className="text-[#f5f6ff] truncate">{l.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
