import React, { useState } from 'react';
import { X, Sparkles, Plus, FileText, ArrowRight, Wand2 } from 'lucide-react';
import { ProjectBrief } from '../types';
import { PRESET_BRIEFS } from '../data/presets';

interface NewBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitCustomBrief: (promptText: string, clientName: string) => void;
  onSelectPreset: (brief: ProjectBrief) => void;
}

export const NewBriefModal: React.FC<NewBriefModalProps> = ({
  isOpen,
  onClose,
  onSubmitCustomBrief,
  onSelectPreset
}) => {
  const [clientName, setClientName] = useState<string>('OmniCore Technologies');
  const [promptText, setPromptText] = useState<string>(
    'Develop an automated Python invoice processing and audit engine with async OCR extraction, fraud risk scoring, and a high-contrast dark dashboard for financial controllers.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    onSubmitCustomBrief(promptText, clientName || 'Client Corp');
    onClose();
  };

  const sampleIdeas = [
    'Python Async Web Scraper & Real-Time Price Arbitrage Engine with Telegram Alerts',
    'Enterprise Kubernetes Log Anomaly Detector in Python 3.12 with Incident War Room UI',
    'Autonomous Python Coding Assistant with AST Syntax Auditing & Refactoring Benchmarks'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#06060a]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl flex flex-col rounded-2xl bg-[#0b0f24] border border-[#1f2852] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080c1e] border-b border-[#161c3a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff3d9a] to-[#4f7dff] p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0b0f24] rounded-[7px] flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-[#ff3d9a]" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold font-sora text-[#f5f6ff]">
                Submit Client Project Brief
              </h3>
              <p className="text-xs font-mono text-[#9aa0c4]">
                Aegis (MD) will decompose and delegate to all 5 specialist agents
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

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-mono text-xs">
          
          {/* Client Name Input */}
          <div>
            <label className="block text-[#9aa0c4] font-bold mb-1.5">
              Client Company / Organization Name:
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Acme Quantum Corp"
              className="w-full bg-[#06060a] text-[#f5f6ff] px-3.5 py-2.5 rounded-xl border border-[#1c244b] focus:outline-none focus:border-[#4f7dff]"
              required
            />
          </div>

          {/* Project Brief Textarea */}
          <div>
            <label className="block text-[#9aa0c4] font-bold mb-1.5">
              Client Project Scope & Deliverable Requirements:
            </label>
            <textarea
              rows={4}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Describe the software, system architecture, UI tokens, QA criteria, and marketing goals..."
              className="w-full bg-[#06060a] text-[#f5f6ff] p-3.5 rounded-xl border border-[#1c244b] focus:outline-none focus:border-[#4f7dff] leading-relaxed resize-none"
              required
            />
          </div>

          {/* Quick Preset Prompts */}
          <div>
            <span className="text-[11px] text-[#9aa0c4] mb-1.5 block">Quick Inspiration Presets:</span>
            <div className="space-y-1.5">
              {sampleIdeas.map((idea, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setPromptText(idea)}
                  className="w-full text-left p-2 rounded-lg bg-[#06060a] hover:bg-[#111736] text-[#9aa0c4] hover:text-[#f5f6ff] border border-[#161c3a] transition-all truncate text-[11px]"
                >
                  💡 {idea}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#161c3a]">
            <button
              type="button"
              onClick={() => {
                onSelectPreset(PRESET_BRIEFS[0]);
                onClose();
              }}
              className="text-[#9aa0c4] hover:text-[#f5f6ff] text-xs font-mono"
            >
              Reset to Default Brief
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#111736] text-[#9aa0c4] hover:text-[#f5f6ff] text-xs font-mono"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff3d9a] to-[#4f7dff] hover:opacity-95 text-white font-sora font-bold text-xs shadow-[0_0_15px_rgba(255,61,154,0.3)] transition-all"
              >
                <span>Dispatch to INTEGRATED INNOVATIONS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
