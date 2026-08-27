import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  createInitialState, 
  executeStep, 
  generateCustomBrief 
} from './services/agentEngine';
import { PRESET_BRIEFS } from './data/presets';
import { INITIAL_RFP_QUEUE, getDefaultAllocationsForIndustry } from './data/rfpQueue';
import { AgentRole, ProjectBrief, SimulationState, ThirdPartyRFP } from './types';
import { AmbientBackground } from './components/AmbientBackground';
import { Header } from './components/Header';
import { ManagerCard } from './components/ManagerCard';
import { EmployeeCard } from './components/EmployeeCard';
import { CompanyLog } from './components/CompanyLog';
import { ProjectIntakeBoard } from './components/ProjectIntakeBoard';
import { FinalDeliverableModal } from './components/FinalDeliverableModal';
import { AgentDetailModal } from './components/AgentDetailModal';
import { NewBriefModal } from './components/NewBriefModal';
import { PythonProjectModal } from './components/PythonProjectModal';
import { MarkIIStudioModal } from './components/MarkIIStudioModal';
import { OfficeBoyStudioModal } from './components/OfficeBoyStudioModal';
import confetti from 'canvas-confetti';

export default function App() {
  const [rfpQueue, setRfpQueue] = useState<ThirdPartyRFP[]>(INITIAL_RFP_QUEUE);
  const [activeView, setActiveView] = useState<'workspace' | 'intake'>('workspace');
  
  // Set initial brief from the first RFP or preset
  const [state, setState] = useState<SimulationState>(() => {
    const initialBrief = PRESET_BRIEFS[0];
    return createInitialState(initialBrief);
  });

  const [selectedAgentForModal, setSelectedAgentForModal] = useState<AgentRole | null>(null);
  const [isDeliverableModalOpen, setIsDeliverableModalOpen] = useState<boolean>(false);
  const [isNewBriefModalOpen, setIsNewBriefModalOpen] = useState<boolean>(false);
  const [isPythonModalOpen, setIsPythonModalOpen] = useState<boolean>(false);
  const [isMarkIIStudioOpen, setIsMarkIIStudioOpen] = useState<boolean>(false);
  const [isOfficeBoyStudioOpen, setIsOfficeBoyStudioOpen] = useState<boolean>(false);
  const [presetsList, setPresetsList] = useState<ProjectBrief[]>(PRESET_BRIEFS);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop simulation timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Step function
  const handleStep = useCallback(() => {
    setState(prev => {
      const nextState = executeStep(prev);
      const isFinished = nextState.currentStepIndex >= nextState.currentBrief.workflowSteps.length;

      if (isFinished && !prev.memory.finalDeliverable && nextState.memory.finalDeliverable) {
        // Trigger celebratory confetti on finish
        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff3d9a', '#4f7dff', '#35e0a1', '#7928ca']
          });
        } catch (e) {
          // ignore
        }

        // Also update RFP status to delivered
        setRfpQueue(prevQueue => 
          prevQueue.map(r => 
            r.brief.id === nextState.currentBrief.id || r.title === nextState.currentBrief.title 
              ? { ...r, status: 'delivered' } 
              : r
          )
        );
      }

      return nextState;
    });
  }, []);

  // Continuous execution loop when isRunning is true
  useEffect(() => {
    if (!state.isRunning || state.isPaused) {
      stopTimer();
      return;
    }

    const currentStepObj = state.currentBrief.workflowSteps[state.currentStepIndex];
    if (!currentStepObj) {
      setState(prev => ({ ...prev, isRunning: false }));
      return;
    }

    const baseDelay = currentStepObj.delayMs || 2000;
    // Calculate actual delay adjusted by speed multiplier
    const actualDelay = state.speedMultiplier === 100 
      ? 50 
      : Math.max(150, Math.round(baseDelay / state.speedMultiplier));

    timerRef.current = setTimeout(() => {
      handleStep();
    }, actualDelay);

    return () => {
      stopTimer();
    };
  }, [state.isRunning, state.isPaused, state.currentStepIndex, state.speedMultiplier, state.currentBrief, handleStep, stopTimer]);

  // Controls
  const handlePlay = () => {
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
  };

  const handlePause = () => {
    setState(prev => ({ ...prev, isRunning: false, isPaused: true }));
  };

  const handleReset = () => {
    stopTimer();
    setState(createInitialState(state.currentBrief));
  };

  const handleSpeedChange = (speed: number) => {
    setState(prev => ({ ...prev, speedMultiplier: speed }));
  };

  const handleSelectPreset = (brief: ProjectBrief) => {
    stopTimer();
    setState(createInitialState(brief));
  };

  // Accept a third-party RFP from the Intake Column
  const handleAcceptRFP = (rfp: ThirdPartyRFP) => {
    stopTimer();

    // Mark in queue
    setRfpQueue(prevQueue =>
      prevQueue.map(item => {
        if (item.id === rfp.id) return { ...item, status: 'in_execution' };
        if (item.status === 'in_execution') return { ...item, status: 'accepted' };
        return item;
      })
    );

    // Add to presets if not already there
    setPresetsList(prev => {
      if (prev.some(p => p.id === rfp.brief.id)) return prev;
      return [rfp.brief, ...prev];
    });

    // Initialize state with dynamic team allocations from this project
    const newState = createInitialState(rfp.brief);
    newState.isRunning = true;
    setState(newState);
    setActiveView('workspace');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff3d9a', '#4f7dff', '#35e0a1']
      });
    } catch (e) {
      // ignore
    }
  };

  // Reject an RFP from third party
  const handleRejectRFP = (rfpId: string) => {
    setRfpQueue(prevQueue =>
      prevQueue.map(item =>
        item.id === rfpId ? { ...item, status: 'rejected' } : item
      )
    );
  };

  // Add a newly submitted RFP
  const handleAddNewRFP = (newRfp: ThirdPartyRFP) => {
    setRfpQueue(prev => [newRfp, ...prev]);
    setPresetsList(prev => [newRfp.brief, ...prev]);
  };

  const handleCustomBriefSubmit = (promptText: string, clientName: string) => {
    stopTimer();
    const customBrief = generateCustomBrief(promptText, clientName);
    const allocations = getDefaultAllocationsForIndustry(customBrief.industry, customBrief.title);
    customBrief.allocatedPositions = allocations;

    setPresetsList(prev => [customBrief, ...prev.filter(p => p.id !== customBrief.id)]);
    
    // Also create corresponding RFP
    const newRFP: ThirdPartyRFP = {
      id: `rfp-${Date.now()}`,
      title: customBrief.title,
      client: clientName || 'Enterprise Sponsor',
      industry: customBrief.industry,
      budget: customBrief.budget || '$120,000 USD',
      urgency: 'Standard (2 Weeks)',
      feasibilityScore: 95,
      submittedAt: 'Just now',
      status: 'in_execution',
      summary: promptText,
      fullRequirements: promptText,
      techStack: ['Python 3.12', 'AsyncIO', 'Tailwind', 'TypeScript'],
      allocatedTeamRoles: allocations,
      brief: customBrief
    };

    setRfpQueue(prev => [newRFP, ...prev]);

    const newState = createInitialState(customBrief);
    newState.isRunning = true;
    setState(newState);
    setActiveView('workspace');
  };

  const pendingCount = rfpQueue.filter(r => r.status === 'pending').length;
  const employeeRoles: AgentRole[] = ['Developer', 'Designer', 'Reviewer', 'Writer', 'Marketer'];

  return (
    <div className="relative min-h-screen bg-[#06060a] text-[#f5f6ff] overflow-x-hidden flex flex-col font-sora selection:bg-[#ff3d9a]/30 selection:text-[#ff3d9a]">
      
      {/* Background Ambient Aura */}
      <AmbientBackground />

      {/* Top Header Navbar */}
      <Header
        state={state}
        activeView={activeView}
        pendingRFPCount={pendingCount}
        onViewChange={(v) => setActiveView(v)}
        onPlay={handlePlay}
        onPause={handlePause}
        onStep={handleStep}
        onReset={handleReset}
        onSpeedChange={handleSpeedChange}
        onOpenNewBriefModal={() => setIsNewBriefModalOpen(true)}
        onOpenDeliverableModal={() => setIsDeliverableModalOpen(true)}
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
        onOpenLogoStudio={() => setIsMarkIIStudioOpen(true)}
        onOpenOfficeBoyStudio={() => setIsOfficeBoyStudioOpen(true)}
        onSelectPreset={handleSelectPreset}
        presets={presetsList}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Conditional Rendering based on View Tab */}
        {activeView === 'intake' ? (
          /* Third-Party Client Project Intake & Decision Column */
          <section aria-label="Third-Party Project Intake Board">
            <ProjectIntakeBoard
              rfpQueue={rfpQueue}
              activeBriefId={state.currentBrief.id}
              onAcceptRFP={handleAcceptRFP}
              onRejectRFP={handleRejectRFP}
              onAddNewRFP={handleAddNewRFP}
            />
          </section>
        ) : (
          /* Real Company Sprint Workspace */
          <>
            {/* Full-Width Managing Director Overview */}
            <section aria-label="Managing Director Overview">
              <ManagerCard
                state={state}
                onOpenAgentModal={(role) => setSelectedAgentForModal(role)}
                onOpenDeliverableModal={() => setIsDeliverableModalOpen(true)}
              />
            </section>

            {/* 5 Specialist Employees Grid with Dynamic Role Allocations */}
            <section aria-label="Specialist Agents Workspace">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4f7dff]" />
                  <h2 className="text-sm font-bold font-sora uppercase tracking-wider text-[#f5f6ff]">
                    Allocated Specialist Team & Roles ({state.currentBrief.industry})
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#9aa0c4]">
                  <span className="text-[#35e0a1]">✓ 5 Roles Staffed</span>
                  <button
                    onClick={() => setActiveView('intake')}
                    className="text-[#ff3d9a] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Inbound RFPs</span>
                    <span>({pendingCount})</span>
                  </button>
                </div>
              </div>

              {/* Responsive Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
                {employeeRoles.map((role) => (
                  <EmployeeCard
                    key={role}
                    role={role}
                    state={state}
                    onOpenAgentModal={(r) => setSelectedAgentForModal(r)}
                    onOpenDeliverableModal={() => setIsDeliverableModalOpen(true)}
                  />
                ))}
              </div>
            </section>

            {/* Corporate Shared Memory Audit Trail */}
            <section aria-label="Company Shared Memory Audit Trail">
              <CompanyLog
                memory={state.memory}
                onOpenAgentModal={(role) => setSelectedAgentForModal(role)}
              />
            </section>
          </>
        )}

      </main>

      {/* Modals */}
      <FinalDeliverableModal
        isOpen={isDeliverableModalOpen}
        onClose={() => setIsDeliverableModalOpen(false)}
        memory={state.memory}
        brief={state.currentBrief}
      />

      <AgentDetailModal
        role={selectedAgentForModal}
        onClose={() => setSelectedAgentForModal(null)}
        state={state}
      />

      <NewBriefModal
        isOpen={isNewBriefModalOpen}
        onClose={() => setIsNewBriefModalOpen(false)}
        onSubmitCustomBrief={handleCustomBriefSubmit}
        onSelectPreset={handleSelectPreset}
      />

      <PythonProjectModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
      />

      <MarkIIStudioModal
        isOpen={isMarkIIStudioOpen}
        onClose={() => setIsMarkIIStudioOpen(false)}
      />

      <OfficeBoyStudioModal
        isOpen={isOfficeBoyStudioOpen}
        onClose={() => setIsOfficeBoyStudioOpen(false)}
      />

    </div>
  );
}

