import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Search, 
  Copy, 
  Check, 
  Download, 
  Code, 
  ChevronDown, 
  ChevronRight,
  ArrowRight,
  Filter,
  Sparkles,
  Feather
} from 'lucide-react';
import { AgentRole, LogEntry, SharedMemory } from '../types';
import { AGENT_PROFILES } from '../data/agents';

interface CompanyLogProps {
  memory: SharedMemory;
  onOpenAgentModal: (role: AgentRole) => void;
}

export const CompanyLog: React.FC<CompanyLogProps> = ({
  memory,
  onOpenAgentModal
}) => {
  const [filterRole, setFilterRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new log entry if enabled
  useEffect(() => {
    if (autoScroll && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [memory.log, autoScroll]);

  // Filter logs
  const filteredLogs = memory.log.filter(entry => {
    const matchesRole = 
      filterRole === 'all' || 
      entry.from === filterRole || 
      entry.to === filterRole;

    const matchesSearch = 
      !searchQuery || 
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.from.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyLog = () => {
    const text = JSON.stringify(memory.log, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadLog = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(memory, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `integrated_innovations_log_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'assign':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#d4beaa]/20 text-[#fcf8f2] border border-[#d4beaa]/40">ASSIGN</span>;
      case 'output':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#c47c5d]/20 text-[#fcf8f2] border border-[#c47c5d]/40">OUTPUT</span>;
      case 'review_request':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#b5997f]/20 text-[#d4beaa] border border-[#b5997f]/40">AUDIT_REQ</span>;
      case 'verdict':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#8fa89b]/25 text-[#fcf8f2] border border-[#8fa89b]/40">VERDICT</span>;
      case 'compile':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-gradient-to-r from-[#d4beaa]/30 to-[#c47c5d]/30 text-[#fcf8f2] border border-[#d4beaa]/50">COMPILE</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#221913] text-[#c4ad98] border border-[#382b22]">{action.toUpperCase()}</span>;
    }
  };

  const getAgentColor = (role: string) => {
    if (role === 'MD') return '#fcf8f2';
    if (role === 'Developer') return '#d4beaa';
    if (role === 'Designer') return '#c47c5d';
    if (role === 'Reviewer') return '#8fa89b';
    if (role === 'Writer') return '#e2d5c3';
    if (role === 'Marketer') return '#b5997f';
    return '#c4ad98';
  };

  return (
    <div className="w-full rounded-2xl bg-[#16110d] border border-[#382b22] shadow-[0_12px_36px_rgba(0,0,0,0.65)] overflow-hidden">
      
      {/* Terminal Top Control Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 sm:px-6 py-3.5 bg-[#120e0b] border-b border-[#382b22] gap-3">
        
        {/* Title + Corporate Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-0.5 rounded-md bg-[#d4beaa]/15 border border-[#d4beaa]/30 text-[#d4beaa] font-display text-[11px] font-semibold tracking-wider">
              INTEGRATED INNOVATIONS
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8fa89b]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8fa89b] animate-pulse" />
              <span>COMMUNICATION BUS</span>
            </div>
          </div>

          <div className="h-4 w-px bg-[#382b22] mx-1 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#d4beaa]" />
            <span className="font-display text-sm font-semibold text-[#fcf8f2] tracking-wide">
              Audit Trail & Handoff Telemetry
            </span>
            <span className="text-[11px] font-mono text-[#a68f7b]">
              ({memory.log.length} events)
            </span>
          </div>
        </div>

        {/* Action Controls & Search */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-[#a68f7b] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-44 bg-[#0e0a08] text-xs font-serif text-[#fcf8f2] pl-8 pr-3 py-1.5 rounded-lg border border-[#382b22] focus:outline-none focus:border-[#d4beaa]"
            />
          </div>

          {/* Auto Scroll Toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-serif border transition-all cursor-pointer ${
              autoScroll 
                ? 'bg-[#d4beaa]/20 text-[#fcf8f2] border-[#d4beaa]/50' 
                : 'bg-[#0e0a08] text-[#a68f7b] border-[#382b22]'
            }`}
            title="Toggle Auto-Scroll to latest log"
          >
            Auto-Scroll: {autoScroll ? 'ON' : 'OFF'}
          </button>

          {/* Copy Raw JSON */}
          <button
            onClick={handleCopyLog}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0e0a08] hover:bg-[#1f1712] text-xs font-serif text-[#c4ad98] hover:text-[#fcf8f2] border border-[#382b22] transition-all cursor-pointer"
            title="Copy entire shared memory log as JSON"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#8fa89b]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleDownloadLog}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0e0a08] hover:bg-[#1f1712] text-xs font-serif text-[#c4ad98] hover:text-[#fcf8f2] border border-[#382b22] transition-all cursor-pointer"
            title="Download shared memory state"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

        </div>

      </div>

      {/* Filter Tabs by Role */}
      <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-[#120e0b] border-b border-[#382b22] overflow-x-auto custom-scrollbar">
        <span className="text-[11px] font-display text-[#a68f7b] mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3 text-[#d4beaa]" />
          Filter:
        </span>
        {['all', 'MD', 'Developer', 'Designer', 'Reviewer', 'Writer', 'Marketer'].map((role) => (
          <button
            key={role}
            onClick={() => setFilterRole(role)}
            className={`px-2.5 py-1 rounded-md text-xs font-display whitespace-nowrap transition-all cursor-pointer ${
              filterRole === role
                ? 'bg-[#d4beaa]/25 text-[#fcf8f2] font-semibold border border-[#d4beaa] shadow-[0_0_8px_rgba(212,190,170,0.2)]'
                : 'text-[#a68f7b] hover:bg-[#221913] hover:text-[#fcf8f2]'
            }`}
          >
            {role === 'all' ? 'All Handoffs' : role}
          </button>
        ))}
      </div>

      {/* Terminal Output Body */}
      <div className="p-4 sm:p-6 bg-[#0e0a08] font-mono text-xs max-h-[380px] overflow-y-auto custom-scrollbar space-y-2.5">
        {filteredLogs.length === 0 ? (
          <div className="py-12 text-center text-[#a68f7b]">
            <Feather className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#d4beaa]" />
            <p className="font-editorial italic text-sm">No matching log entries found for current filters.</p>
          </div>
        ) : (
          filteredLogs.map((entry) => {
            const isExpanded = !!expandedItems[entry.id];
            const hasDetails = entry.details?.rawJson || entry.details?.feedback || entry.details?.taskName;

            return (
              <div 
                key={entry.id}
                className="p-3 rounded-xl bg-[#18120e]/90 hover:bg-[#221913] border border-[#33251c] hover:border-[#423125] transition-all group"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  
                  {/* Sender -> Receiver Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-[#a68f7b]">
                      [{entry.timestamp}]
                    </span>

                    {/* From Agent */}
                    <button
                      onClick={() => entry.from !== 'System' && onOpenAgentModal(entry.from as AgentRole)}
                      className="px-2 py-0.5 rounded font-bold transition-all hover:underline cursor-pointer"
                      style={{ 
                        color: getAgentColor(entry.from),
                        backgroundColor: `${getAgentColor(entry.from)}20`
                      }}
                    >
                      {entry.from}
                    </button>

                    {/* Arrow to Receiver */}
                    {entry.to && (
                      <>
                        <ArrowRight className="w-3 h-3 text-[#a68f7b]" />
                        <button
                          onClick={() => entry.to !== 'All' && onOpenAgentModal(entry.to as AgentRole)}
                          className="px-2 py-0.5 rounded font-bold transition-all hover:underline cursor-pointer"
                          style={{ 
                            color: getAgentColor(entry.to),
                            backgroundColor: `${getAgentColor(entry.to)}20`
                          }}
                        >
                          {entry.to}
                        </button>
                      </>
                    )}

                    {/* Action Tag */}
                    {getActionBadge(entry.action)}
                  </div>

                  {/* Expand JSON toggle */}
                  {hasDetails && (
                    <button
                      onClick={() => toggleExpand(entry.id)}
                      className="flex items-center gap-1 text-[11px] text-[#c4ad98] hover:text-[#d4beaa] transition-colors cursor-pointer"
                    >
                      <Code className="w-3 h-3" />
                      <span>{isExpanded ? 'Hide Payload' : 'View Payload'}</span>
                      {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </button>
                  )}
                </div>

                {/* Main Content Text */}
                <div className="mt-2 text-[#fcf8f2] text-xs leading-relaxed break-words font-editorial italic text-sm">
                  {entry.content}
                </div>

                {/* Expanded Raw JSON Payload */}
                {isExpanded && entry.details?.rawJson && (
                  <div className="mt-3 p-3 rounded-lg bg-[#0e0a08] border border-[#382b22] text-[11px] text-[#8fa89b] overflow-x-auto custom-scrollbar">
                    <pre className="font-mono">
                      {JSON.stringify(entry.details.rawJson, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={logEndRef} />
      </div>

    </div>
  );
};
