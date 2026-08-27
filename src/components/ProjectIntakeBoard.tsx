import React, { useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  PlusCircle, 
  FileText, 
  Zap, 
  Layers, 
  Cpu, 
  Briefcase,
  AlertCircle,
  TrendingUp,
  Filter,
  Check,
  X,
  Feather
} from 'lucide-react';
import { AgentRole, ProjectBrief, ThirdPartyRFP } from '../types';
import { AGENT_PROFILES } from '../data/agents';
import { getDefaultAllocationsForIndustry } from '../data/rfpQueue';
import { generateCustomBrief } from '../services/agentEngine';

interface ProjectIntakeBoardProps {
  rfpQueue: ThirdPartyRFP[];
  activeBriefId: string;
  onAcceptRFP: (rfp: ThirdPartyRFP) => void;
  onRejectRFP: (rfpId: string) => void;
  onAddNewRFP: (newRfp: ThirdPartyRFP) => void;
  onSelectInspectRFP?: (rfp: ThirdPartyRFP) => void;
}

export const ProjectIntakeBoard: React.FC<ProjectIntakeBoardProps> = ({
  rfpQueue,
  activeBriefId,
  onAcceptRFP,
  onRejectRFP,
  onAddNewRFP,
  onSelectInspectRFP
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'active' | 'delivered'>('all');
  const [inspectRFP, setInspectRFP] = useState<ThirdPartyRFP | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states for creating new RFP
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    industry: 'Fintech & Risk Infrastructure',
    budget: '$150,000 USD',
    urgency: 'High (3-5 Days)' as ThirdPartyRFP['urgency'],
    summary: '',
    fullRequirements: '',
    techStack: 'Python 3.12, AsyncIO, WebSocket, Tailwind'
  });

  const filteredRFPs = rfpQueue.filter(rfp => {
    if (activeFilter === 'pending') return rfp.status === 'pending';
    if (activeFilter === 'active') return rfp.status === 'in_execution' || rfp.status === 'accepted';
    if (activeFilter === 'delivered') return rfp.status === 'delivered';
    return true;
  });

  const pendingCount = rfpQueue.filter(r => r.status === 'pending').length;
  const activeCount = rfpQueue.filter(r => r.status === 'in_execution' || r.status === 'accepted').length;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.client.trim()) return;

    const customBrief = generateCustomBrief(
      `${formData.title}\n\n${formData.summary}\n\nRequirements:\n${formData.fullRequirements}`,
      formData.client
    );
    customBrief.budget = formData.budget;
    customBrief.industry = formData.industry;
    customBrief.title = formData.title;

    const allocations = getDefaultAllocationsForIndustry(formData.industry, formData.title);
    customBrief.allocatedPositions = allocations;

    const newRFP: ThirdPartyRFP = {
      id: `rfp-${Date.now()}`,
      title: formData.title,
      client: formData.client,
      industry: formData.industry,
      budget: formData.budget,
      urgency: formData.urgency,
      feasibilityScore: Math.floor(Math.random() * 8) + 92, // 92-99%
      submittedAt: 'Just now',
      status: 'pending',
      summary: formData.summary || formData.title,
      fullRequirements: formData.fullRequirements || formData.summary,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
      allocatedTeamRoles: allocations,
      brief: customBrief
    };

    onAddNewRFP(newRFP);
    setShowCreateModal(false);
    setFormData({
      title: '',
      client: '',
      industry: 'Fintech & Risk Infrastructure',
      budget: '$150,000 USD',
      urgency: 'High (3-5 Days)',
      summary: '',
      fullRequirements: '',
      techStack: 'Python 3.12, AsyncIO, WebSocket, Tailwind'
    });
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Top Banner & Metric HUD */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1c1511] via-[#221a14] to-[#140e0b] border border-[#382b22] p-5 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.65)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-2 rounded-xl bg-[#d4beaa]/15 border border-[#d4beaa]/30 text-[#d4beaa]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold tracking-wide text-[#fcf8f2] flex items-baseline gap-2">
                <span>Third-Party Project Intake</span>
                <span className="font-calligraphy text-xl sm:text-2xl text-[#d4beaa] font-normal italic">
                  Decision Column
                </span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-serif font-semibold bg-[#c47c5d]/20 text-[#fcf8f2] border border-[#c47c5d]/40">
                {pendingCount} Pending Decision
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#c4ad98] font-editorial italic max-w-3xl leading-relaxed">
              Evaluate incoming commercial proposals from enterprise clients. Review feasibility assessments, budget parameters, and dynamic employee role allocations before accepting contracts for live execution.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4beaa] to-[#c47c5d] text-[#120e0b] font-display font-semibold text-xs sm:text-sm hover:opacity-95 transition-all shadow-[0_4px_16px_rgba(212,190,170,0.3)] cursor-pointer w-full sm:w-auto font-bold"
            >
              <PlusCircle className="w-4 h-4 text-[#120e0b]" />
              <span>Submit Inbound RFP</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 pt-5 border-t border-[#382b22] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-medium transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#d4beaa] text-[#120e0b] font-bold shadow-[0_2px_10px_rgba(212,190,170,0.3)]'
                  : 'bg-[#221913] text-[#c4ad98] hover:text-[#fcf8f2] border border-[#382b22]'
              }`}
            >
              All Inbound RFPs ({rfpQueue.length})
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-medium transition-all cursor-pointer ${
                activeFilter === 'pending'
                  ? 'bg-[#c47c5d] text-[#fcf8f2] font-bold shadow-[0_2px_10px_rgba(196,124,93,0.3)]'
                  : 'bg-[#221913] text-[#c4ad98] hover:text-[#fcf8f2] border border-[#382b22]'
              }`}
            >
              Pending Decision ({pendingCount})
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-medium transition-all cursor-pointer ${
                activeFilter === 'active'
                  ? 'bg-[#8fa89b] text-[#120e0b] font-bold shadow-[0_2px_10px_rgba(143,168,155,0.3)]'
                  : 'bg-[#221913] text-[#c4ad98] hover:text-[#fcf8f2] border border-[#382b22]'
              }`}
            >
              In Execution ({activeCount})
            </button>
          </div>

          <div className="text-xs font-serif text-[#c4ad98] flex items-center gap-2">
            <Feather className="w-3.5 h-3.5 text-[#d4beaa]" />
            <span className="italic">Autonomous Role Assignment Engine Ready</span>
          </div>
        </div>
      </div>

      {/* Grid of Inbound RFP Proposals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredRFPs.map((rfp) => {
          const isActive = rfp.brief.id === activeBriefId || rfp.status === 'in_execution';
          const isPending = rfp.status === 'pending';
          const isRejected = rfp.status === 'rejected';

          return (
            <div
              key={rfp.id}
              className={`relative rounded-2xl bg-[#1a1410] border transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between ${
                isActive
                  ? 'border-[#8fa89b] shadow-[0_0_25px_rgba(143,168,155,0.2)] bg-gradient-to-b from-[#1c1612] to-[#151a16]'
                  : isPending
                  ? 'border-[#382b22] hover:border-[#d4beaa]/60 hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
                  : 'border-[#2d221a] opacity-70'
              }`}
            >
              {/* Card Header: Client & Budget */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a1f18] to-[#150f0c] border border-[#3d2e24] flex items-center justify-center text-[#d4beaa] font-bold font-display">
                      {rfp.client.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-display uppercase tracking-wider text-[#c4ad98]">
                        {rfp.client}
                      </h4>
                      <span className="text-[11px] text-[#d4beaa] font-serif italic">
                        {rfp.industry}
                      </span>
                    </div>
                  </div>

                  {/* Status / Urgency Pill */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#8fa89b]/15 text-[#fcf8f2] border border-[#8fa89b]/35">
                      {rfp.budget}
                    </span>
                    <span className="text-[10px] font-serif text-[#c4ad98] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#d4beaa]" />
                      {rfp.urgency}
                    </span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-base sm:text-lg font-display font-semibold text-[#fcf8f2] mb-2 leading-snug">
                  {rfp.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-[#c4ad98] font-editorial italic leading-relaxed mb-4 line-clamp-2">
                  {rfp.summary}
                </p>

                {/* Feasibility & Tech Badges */}
                <div className="p-3 rounded-xl bg-[#120e0b] border border-[#33251c] mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-serif">
                    <span className="text-[#c4ad98] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8fa89b]" />
                      Feasibility Index
                    </span>
                    <span className="text-[#8fa89b] font-bold font-mono">{rfp.feasibilityScore}% Ready</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#221913] overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#d4beaa] to-[#8fa89b]"
                      style={{ width: `${rfp.feasibilityScore}%` }}
                    />
                  </div>
                </div>

                {/* Allocated Team Roles Preview */}
                <div className="space-y-1.5 mb-5">
                  <div className="text-[11px] font-display uppercase tracking-wider text-[#c4ad98] flex items-center gap-1.5">
                    <Feather className="w-3 h-3 text-[#d4beaa]" />
                    <span>Project Role Staffing:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <div className="p-2 rounded-lg bg-[#150f0c] border border-[#33251c] text-[11px]">
                      <span className="font-bold text-[#d4beaa]">Vega (Dev): </span>
                      <span className="text-[#fcf8f2] line-clamp-1">{rfp.allocatedTeamRoles.Developer.position}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#150f0c] border border-[#33251c] text-[11px]">
                      <span className="font-bold text-[#c47c5d]">Nova (UI): </span>
                      <span className="text-[#fcf8f2] line-clamp-1">{rfp.allocatedTeamRoles.Designer.position}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#150f0c] border border-[#33251c] text-[11px]">
                      <span className="font-bold text-[#8fa89b]">Iris (QA): </span>
                      <span className="text-[#fcf8f2] line-clamp-1">{rfp.allocatedTeamRoles.Reviewer.position}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#150f0c] border border-[#33251c] text-[11px]">
                      <span className="font-bold text-[#e2d5c3]">Sable (Doc): </span>
                      <span className="text-[#fcf8f2] line-clamp-1">{rfp.allocatedTeamRoles.Writer.position}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#33251c] flex items-center justify-between gap-3">
                <button
                  onClick={() => setInspectRFP(rfp)}
                  className="px-3 py-2 rounded-xl bg-[#221913] hover:bg-[#2e221a] text-[#c4ad98] hover:text-[#fcf8f2] text-xs font-display font-medium transition-all flex items-center gap-1.5 cursor-pointer border border-[#382b22]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#d4beaa]" />
                  <span>Inspect Scope</span>
                </button>

                <div className="flex items-center gap-2">
                  {isPending && (
                    <button
                      onClick={() => onRejectRFP(rfp.id)}
                      className="px-3 py-2 rounded-xl bg-[#c47c5d]/15 hover:bg-[#c47c5d]/25 text-[#fcf8f2] text-xs font-display font-medium transition-all flex items-center gap-1 cursor-pointer border border-[#c47c5d]/30"
                      title="Decline proposal"
                    >
                      <X className="w-3.5 h-3.5 text-[#c47c5d]" />
                      <span>Decline</span>
                    </button>
                  )}

                  <button
                    onClick={() => onAcceptRFP(rfp)}
                    disabled={isActive}
                    className={`px-4 py-2 rounded-xl text-xs font-display font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#8fa89b]/25 text-[#fcf8f2] border border-[#8fa89b]/50 cursor-default font-bold'
                        : 'bg-gradient-to-r from-[#d4beaa] to-[#c47c5d] text-[#120e0b] hover:opacity-95 shadow-[0_2px_12px_rgba(212,190,170,0.3)] font-bold'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8fa89b]" />
                        <span>Active in Sprint</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Accept & Allocate</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal: Full RFP Scope & Role Mandate Inspector */}
      {inspectRFP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-[#16110d] border border-[#3d2e24] p-6 shadow-2xl overflow-y-auto custom-scrollbar flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-display uppercase text-[#d4beaa]">
                    {inspectRFP.client} | {inspectRFP.industry}
                  </span>
                  <h3 className="text-xl font-display font-semibold text-[#fcf8f2] mt-1">
                    {inspectRFP.title}
                  </h3>
                </div>
                <button
                  onClick={() => setInspectRFP(null)}
                  className="p-2 rounded-lg bg-[#221913] text-[#c4ad98] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#100c09] border border-[#33251c] mb-5 text-xs font-serif">
                <div>
                  <span className="text-[#a68f7b] block">Contract Value</span>
                  <span className="text-[#8fa89b] font-bold font-mono">{inspectRFP.budget}</span>
                </div>
                <div>
                  <span className="text-[#a68f7b] block">Delivery SLA</span>
                  <span className="text-[#d4beaa] font-bold">{inspectRFP.urgency}</span>
                </div>
                <div>
                  <span className="text-[#a68f7b] block">Feasibility</span>
                  <span className="text-[#fcf8f2] font-bold font-mono">{inspectRFP.feasibilityScore}% High</span>
                </div>
              </div>

              {/* Requirements & Brief */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[#a68f7b] mb-1.5">
                    Client Problem & Requirements:
                  </h4>
                  <div className="p-4 rounded-xl bg-[#120e0b] border border-[#33251c] text-xs text-[#fcf8f2] font-editorial italic text-sm leading-relaxed">
                    {inspectRFP.fullRequirements}
                  </div>
                </div>

                {/* Team Role Allocations for this Project */}
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[#a68f7b] mb-1.5">
                    Specialist Department Allocations:
                  </h4>
                  <div className="space-y-2">
                    {(Object.keys(inspectRFP.allocatedTeamRoles) as AgentRole[]).map((role) => {
                      const alloc = inspectRFP.allocatedTeamRoles[role];
                      const profile = AGENT_PROFILES[role];
                      return (
                        <div key={role} className="p-3 rounded-xl bg-[#120e0b] border border-[#33251c] flex items-start gap-3">
                          <img 
                            src={profile.avatar} 
                            alt={profile.name}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-display font-bold text-[#fcf8f2]">{profile.name} ({role})</span>
                              <span className="text-[11px] font-serif text-[#a68f7b]">{alloc.department}</span>
                            </div>
                            <div className="text-xs text-[#d4beaa] font-medium">{alloc.position}</div>
                            <div className="text-[11px] text-[#c4ad98] font-editorial italic mt-0.5">{alloc.mandate}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#33251c] flex items-center justify-end gap-3">
              <button
                onClick={() => setInspectRFP(null)}
                className="px-4 py-2 rounded-xl bg-[#221913] text-[#c4ad98] hover:text-white text-xs font-display font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onAcceptRFP(inspectRFP);
                  setInspectRFP(null);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#d4beaa] to-[#c47c5d] text-[#120e0b] font-display font-bold text-xs hover:opacity-95 shadow-[0_2px_12px_rgba(212,190,170,0.3)] flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Accept Contract & Allocate Team</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Submit Custom Third-Party RFP */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl max-h-[90vh] rounded-2xl bg-[#16110d] border border-[#3d2e24] p-6 shadow-2xl overflow-y-auto custom-scrollbar">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-display font-semibold text-[#fcf8f2]">
                  Ingest New Third-Party Client RFP
                </h3>
                <p className="text-xs text-[#c4ad98] font-editorial italic">
                  Submit a custom commercial project brief into the company decision queue.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg bg-[#221913] text-[#c4ad98] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-display uppercase text-[#a68f7b] mb-1">
                  Client / Organization Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Bank, Quantum Medical, Horizon Labs"
                  value={formData.client}
                  onChange={e => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a08] border border-[#382b22] text-[#fcf8f2] text-xs font-serif focus:border-[#d4beaa] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-display uppercase text-[#a68f7b] mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Real-Time High-Frequency Algorithmic Risk Shield"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a08] border border-[#382b22] text-[#fcf8f2] text-xs font-serif focus:border-[#d4beaa] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-display uppercase text-[#a68f7b] mb-1">
                    Industry Sector
                  </label>
                  <select
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0e0a08] border border-[#382b22] text-[#fcf8f2] text-xs font-serif focus:border-[#d4beaa] focus:outline-none cursor-pointer"
                  >
                    <option value="Fintech & Risk Infrastructure">Fintech & Risk Infrastructure</option>
                    <option value="Healthcare Technology & Life Sciences">Healthcare Technology & Life Sciences</option>
                    <option value="Cybersecurity & Defense Intelligence">Cybersecurity & Defense Intelligence</option>
                    <option value="Supply Chain & Industrial Logistics">Supply Chain & Industrial Logistics</option>
                    <option value="Distributed AI Infrastructure">Distributed AI Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-display uppercase text-[#a68f7b] mb-1">
                    Target Budget
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a08] border border-[#382b22] text-[#fcf8f2] text-xs font-serif focus:border-[#d4beaa] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display uppercase text-[#a68f7b] mb-1">
                  Client Brief & Technical Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the problem, deliverables, architecture requirements, and standards..."
                  value={formData.fullRequirements}
                  onChange={e => setFormData({ ...formData, fullRequirements: e.target.value, summary: e.target.value.slice(0, 120) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a08] border border-[#382b22] text-[#fcf8f2] text-xs font-editorial italic text-sm focus:border-[#d4beaa] focus:outline-none custom-scrollbar"
                />
              </div>

              <div className="pt-3 border-t border-[#33251c] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#221913] text-[#c4ad98] text-xs font-display cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#d4beaa] to-[#c47c5d] text-[#120e0b] font-display font-bold text-xs shadow-[0_2px_12px_rgba(212,190,170,0.3)] cursor-pointer"
                >
                  Submit to Intake Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
