import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Code2, 
  Palette, 
  ShieldCheck, 
  FileText, 
  Megaphone,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SharedMemory, ProjectBrief } from '../types';

interface FinalDeliverableModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: SharedMemory;
  brief: ProjectBrief;
}

export const FinalDeliverableModal: React.FC<FinalDeliverableModalProps> = ({
  isOpen,
  onClose,
  memory,
  brief
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'developer' | 'designer' | 'reviewer' | 'writer' | 'marketer'>('overview');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && memory.finalDeliverable) {
      // Fire subtle celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff3d9a', '#4f7dff', '#35e0a1', '#7928ca']
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isOpen, memory.finalDeliverable]);

  if (!isOpen) return null;

  const handleCopyCurrent = () => {
    let content = '';
    if (activeTab === 'overview') content = memory.finalDeliverable || 'No final deliverable compiled yet.';
    else if (activeTab === 'developer') content = memory.deliverables.developer?.code || 'No code generated.';
    else if (activeTab === 'designer') content = memory.deliverables.designer?.spec || 'No design spec generated.';
    else if (activeTab === 'reviewer') content = JSON.stringify(memory.deliverables.reviewer, null, 2);
    else if (activeTab === 'writer') content = memory.deliverables.writer?.clientCopy || 'No documentation generated.';
    else if (activeTab === 'marketer') content = memory.deliverables.marketer?.launchPitch || 'No marketing copy generated.';

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDeliverable = () => {
    const fullDocument = `
# INTEGRATED INNOVATIONS — Executive Master Deliverable Package
Project: ${brief.title}
Client: ${brief.client}
Generated: ${new Date().toLocaleString()}

=========================================
1. EXECUTIVE SYNTHESIS (Aegis, MD)
=========================================
${memory.finalDeliverable || 'Pipeline in progress'}

=========================================
2. PYTHON SOURCE CODE (Vega, Developer)
=========================================
${memory.deliverables.developer?.code || 'Pending'}

=========================================
3. UI/UX SPECIFICATION (Nova, Designer)
=========================================
${memory.deliverables.designer?.spec || 'Pending'}

=========================================
4. QA AUDIT & VERIFICATION (Iris, Reviewer)
=========================================
Verdict: ${memory.deliverables.reviewer?.verdict || 'Pending'}
Score: ${memory.deliverables.reviewer?.score || 'N/A'}/100
Feedback: ${memory.deliverables.reviewer?.feedback || 'None'}

=========================================
5. CLIENT DOCUMENTATION (Sable, Writer)
=========================================
${memory.deliverables.writer?.clientCopy || 'Pending'}

=========================================
6. GO-TO-MARKET STRATEGY (Rune, Marketer)
=========================================
${memory.deliverables.marketer?.launchPitch || 'Pending'}
    `;

    const blob = new Blob([fullDocument], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `INTEGRATED_INNOVATIONS_Deliverable_${brief.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#06060a]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0b0f24] border border-[#1f2852] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080c1e] border-b border-[#161c3a]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff3d9a] to-[#4f7dff] p-[1.5px]">
              <div className="w-full h-full bg-[#0b0f24] rounded-[9px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#ff3d9a]" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold font-sora text-[#f5f6ff]">
                Project Deliverable Suite
              </h2>
              <p className="text-xs font-mono text-[#9aa0c4]">
                {brief.title} • {brief.client}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCurrent}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111736] hover:bg-[#19224d] text-xs font-mono text-[#f5f6ff] border border-[#1f2852] transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#35e0a1]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Tab'}</span>
            </button>

            <button
              onClick={handleDownloadDeliverable}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ff3d9a]/20 hover:bg-[#ff3d9a]/30 text-xs font-mono text-[#ff3d9a] border border-[#ff3d9a]/40 transition-all font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Bundle</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9aa0c4] hover:text-[#f5f6ff] hover:bg-[#161c3a] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-[#090d22] border-b border-[#161c3a] overflow-x-auto custom-scrollbar">
          {[
            { id: 'overview', label: 'Executive Synthesis (MD)', icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3d9a]" /> },
            { id: 'developer', label: 'Python Source (Vega)', icon: <Code2 className="w-3.5 h-3.5 text-[#4f7dff]" /> },
            { id: 'designer', label: 'UI/UX Spec (Nova)', icon: <Palette className="w-3.5 h-3.5 text-[#d946ef]" /> },
            { id: 'reviewer', label: 'QA Audit (Iris)', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#35e0a1]" /> },
            { id: 'writer', label: 'Client Docs (Sable)', icon: <FileText className="w-3.5 h-3.5 text-[#38bdf8]" /> },
            { id: 'marketer', label: 'Marketing Pitch (Rune)', icon: <Megaphone className="w-3.5 h-3.5 text-[#fb7185]" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#182046] text-[#f5f6ff] font-semibold border border-[#4f7dff]/50 shadow-[0_0_10px_rgba(79,125,255,0.2)]'
                  : 'text-[#9aa0c4] hover:bg-[#111736] hover:text-[#f5f6ff]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Deliverable Tab Content Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-[#06060a] font-mono text-xs text-[#f5f6ff]">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0b0f24] border border-[#1d2650]">
                <h3 className="text-sm font-sora font-bold text-[#ff3d9a] mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Managing Director Synthesis
                </h3>
                <div className="whitespace-pre-line leading-relaxed text-[#f5f6ff]">
                  {memory.finalDeliverable || (
                    <div className="text-[#9aa0c4] py-8 text-center">
                      <p>Simulation pipeline currently in progress.</p>
                      <p className="mt-1 text-xs text-[#4f7dff]">Complete all specialist steps to generate master synthesis.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Developer Python Tab */}
          {activeTab === 'developer' && (
            <div>
              {memory.deliverables.developer ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#9aa0c4] bg-[#0b0f24] p-3 rounded-lg border border-[#161c3a]">
                    <span>Language: Python 3.12 (AsyncIO, Architecture Modules)</span>
                    <span className="text-[#35e0a1] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Clean Build
                    </span>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#04060d] border border-[#1d2650] text-[#f5f6ff] overflow-x-auto leading-relaxed">
                    {memory.deliverables.developer.code}
                  </pre>
                  {memory.deliverables.developer.notes && (
                    <div className="p-3 rounded-lg bg-[#0b0f24] border border-[#161c3a] text-[#9aa0c4]">
                      <strong className="text-[#4f7dff]">Developer Notes:</strong> {memory.deliverables.developer.notes}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-[#9aa0c4]">
                  Developer output has not been dispatched yet.
                </div>
              )}
            </div>
          )}

          {/* Designer Tab */}
          {activeTab === 'designer' && (
            <div>
              {memory.deliverables.designer ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#0b0f24] border border-[#1d2650]">
                    <h4 className="text-sm font-sora font-bold text-[#d946ef] mb-2">
                      Design System & Color Tokens
                    </h4>
                    <div className="flex flex-wrap gap-3 my-3">
                      {memory.deliverables.designer.palette?.map((color, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[#06060a] border border-[#161c3a]">
                          <span className="w-5 h-5 rounded-md border border-white/20" style={{ backgroundColor: color }} />
                          <span className="font-mono text-[11px] text-[#f5f6ff]">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0b0f24] border border-[#1d2650] whitespace-pre-line">
                    {memory.deliverables.designer.spec}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#9aa0c4]">
                  Designer specification has not been dispatched yet.
                </div>
              )}
            </div>
          )}

          {/* Reviewer QA Tab */}
          {activeTab === 'reviewer' && (
            <div>
              {memory.deliverables.reviewer ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#0b0f24] border border-[#1d2650] flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-sora font-bold text-[#35e0a1]">
                        Quality & Security Certification
                      </h4>
                      <p className="text-xs text-[#9aa0c4] mt-0.5">
                        Audit Verdict: <span className="text-[#35e0a1] font-bold uppercase">{memory.deliverables.reviewer.verdict}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold font-sora text-[#35e0a1]">
                        {memory.deliverables.reviewer.score}/100
                      </span>
                      <p className="text-[10px] text-[#9aa0c4]">Compliance Score</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0b0f24] border border-[#1d2650]">
                    <h5 className="font-bold text-[#f5f6ff] mb-2">Audited Criteria:</h5>
                    <ul className="space-y-2">
                      {memory.deliverables.reviewer.criteriaChecked?.map((c, i) => (
                        <li key={i} className="flex items-center gap-2 text-[#9aa0c4]">
                          <CheckCircle2 className="w-4 h-4 text-[#35e0a1] flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-[#04060d] border border-[#161c3a] text-[#f5f6ff]">
                    <strong className="text-[#35e0a1]">Auditor Summary:</strong> {memory.deliverables.reviewer.feedback}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#9aa0c4]">
                  Reviewer verification has not run yet.
                </div>
              )}
            </div>
          )}

          {/* Writer Tab */}
          {activeTab === 'writer' && (
            <div>
              {memory.deliverables.writer ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#0b0f24] border border-[#1d2650]">
                    <h4 className="text-sm font-sora font-bold text-[#38bdf8] mb-2">
                      Executive Overview
                    </h4>
                    <p className="text-[#f5f6ff] leading-relaxed">
                      {memory.deliverables.writer.technicalSummary}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0b0f24] border border-[#1d2650] whitespace-pre-line">
                    {memory.deliverables.writer.clientCopy}
                  </div>

                  {memory.deliverables.writer.faq && (
                    <div className="p-4 rounded-xl bg-[#0b0f24] border border-[#1d2650] space-y-3">
                      <h4 className="text-sm font-sora font-bold text-[#38bdf8]">
                        Client Integration FAQ
                      </h4>
                      {memory.deliverables.writer.faq.map((item, i) => (
                        <div key={i} className="border-t border-[#161c3a] pt-2">
                          <p className="font-semibold text-[#f5f6ff]">Q: {item.q}</p>
                          <p className="text-[#9aa0c4] mt-1">A: {item.a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-[#9aa0c4]">
                  Writer documentation has not been dispatched yet.
                </div>
              )}
            </div>
          )}

          {/* Marketer Tab */}
          {activeTab === 'marketer' && (
            <div>
              {memory.deliverables.marketer ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#0b0f24] border border-[#1d2650]">
                    <h4 className="text-sm font-sora font-bold text-[#fb7185] mb-2">
                      Launch Pitch & Positioning
                    </h4>
                    <p className="text-[#f5f6ff] leading-relaxed whitespace-pre-line">
                      {memory.deliverables.marketer.launchPitch}
                    </p>
                  </div>

                  {memory.deliverables.marketer.taglines && (
                    <div className="p-4 rounded-xl bg-[#0b0f24] border border-[#1d2650]">
                      <h5 className="font-bold text-[#fb7185] mb-2">Campaign Taglines:</h5>
                      <ul className="space-y-1.5">
                        {memory.deliverables.marketer.taglines.map((t, i) => (
                          <li key={i} className="text-[#f5f6ff] font-sora font-semibold">
                            “{t}”
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="p-3 rounded-lg bg-[#0b0f24] border border-[#161c3a] text-[#9aa0c4]">
                    <strong className="text-[#fb7185]">Target Audience:</strong> {memory.deliverables.marketer.targetAudience}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#9aa0c4]">
                  Marketing positioning has not been dispatched yet.
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
