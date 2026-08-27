import { 
  ActionType, 
  AgentRole, 
  AgentStatus, 
  CompanyStage,
  LogEntry, 
  ProjectBrief, 
  SharedMemory, 
  SimulationState 
} from '../types';
import { PRESET_BRIEFS } from '../data/presets';
import { getDefaultAllocationsForIndustry } from '../data/rfpQueue';

export function getStageForStep(stepIndex: number, totalSteps: number): CompanyStage {
  const ratio = (stepIndex + 1) / totalSteps;
  if (stepIndex === 0) return 'strategy_delegation';
  if (ratio <= 0.45) return 'engineering_design_sprint';
  if (ratio <= 0.65) return 'qa_compliance_gate';
  if (ratio <= 0.90) return 'documentation_gtm';
  return 'executive_signoff';
}

export function createInitialState(brief: ProjectBrief = PRESET_BRIEFS[0]): SimulationState {
  const allocatedPositions = brief.allocatedPositions || getDefaultAllocationsForIndustry(brief.industry, brief.title);
  
  const initialMemory: SharedMemory = {
    briefId: brief.id,
    briefTitle: brief.title,
    briefContent: brief.fullBrief,
    clientName: brief.client,
    industry: brief.industry,
    budget: brief.budget || '$125,000 USD',
    startedAt: new Date().toLocaleTimeString(),
    currentStepIndex: 0,
    totalSteps: brief.workflowSteps.length,
    currentStage: 'strategy_delegation',
    log: [
      {
        id: 'log-init',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        from: 'System',
        to: 'MD',
        action: 'brief_received',
        stage: 'intake_triage',
        content: `Inbound Client Contract Approved: "${brief.title}" for ${brief.client}. Department roles assigned.`,
        details: {
          taskName: 'Contract Ingestion & Role Allocation',
          rawJson: {
            client: brief.client,
            industry: brief.industry,
            difficulty: brief.difficulty,
            positionsAllocated: Object.entries(allocatedPositions).map(([role, info]) => ({
              agent: role,
              position: info.position,
              department: info.department
            }))
          }
        }
      }
    ],
    deliverables: {},
    finalDeliverable: null
  };

  const initialAgents: Record<AgentRole, {
    status: AgentStatus;
    currentTask: string;
    progress: number;
    tasksCompleted: number;
    lastActiveTimestamp?: string;
    isHighlighted: boolean;
  }> = {
    MD: {
      status: 'idle',
      currentTask: `Mandate: ${allocatedPositions.MD.mandate}`,
      progress: 0,
      tasksCompleted: 0,
      isHighlighted: false
    },
    Developer: {
      status: 'idle',
      currentTask: `Assigned Position: ${allocatedPositions.Developer.position}`,
      progress: 0,
      tasksCompleted: 0,
      isHighlighted: false
    },
    Designer: {
      status: 'idle',
      currentTask: `Assigned Position: ${allocatedPositions.Designer.position}`,
      progress: 0,
      tasksCompleted: 0,
      isHighlighted: false
    },
    Reviewer: {
      status: 'idle',
      currentTask: `Assigned Position: ${allocatedPositions.Reviewer.position}`,
      progress: 0,
      tasksCompleted: 0,
      isHighlighted: false
    },
    Writer: {
      status: 'idle',
      currentTask: `Assigned Position: ${allocatedPositions.Writer.position}`,
      progress: 0,
      tasksCompleted: 0,
      isHighlighted: false
    },
    Marketer: {
      status: 'idle',
      currentTask: `Assigned Position: ${allocatedPositions.Marketer.position}`,
      progress: 0,
      tasksCompleted: 0,
      isHighlighted: false
    }
  };

  return {
    isRunning: false,
    isPaused: false,
    speedMultiplier: 1,
    currentBrief: brief,
    currentStepIndex: 0,
    progress: 0,
    currentStage: 'strategy_delegation',
    allocatedPositions,
    activeAgents: initialAgents,
    memory: initialMemory
  };
}

export function executeStep(state: SimulationState): SimulationState {
  const { currentBrief, currentStepIndex, memory, activeAgents } = state;
  const steps = currentBrief.workflowSteps;

  if (currentStepIndex >= steps.length) {
    return {
      ...state,
      isRunning: false,
      isPaused: false,
      progress: 100,
      currentStage: 'executive_signoff'
    };
  }

  const step = steps[currentStepIndex];
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const stage = step.stage || getStageForStep(currentStepIndex, steps.length);

  // Create new log entry
  const newLogEntry: LogEntry = {
    id: `log-${Date.now()}-${currentStepIndex}`,
    timestamp: now,
    from: step.from,
    to: step.to,
    action: step.action,
    stage: stage,
    content: step.instructionOrFeedback,
    details: {
      taskName: step.taskTitle,
      rawJson: step.deliverableContent
    }
  };

  // Update memory deliverables if this step generated output
  const updatedDeliverables = { ...memory.deliverables };
  let updatedFinalDeliverable = memory.finalDeliverable;

  if (step.deliverableKey) {
    if (step.deliverableKey === 'finalDeliverable') {
      updatedFinalDeliverable = step.deliverableContent;
    } else {
      updatedDeliverables[step.deliverableKey] = step.deliverableContent;
    }
  }

  const updatedMemory: SharedMemory = {
    ...memory,
    currentStepIndex: currentStepIndex + 1,
    currentStage: stage,
    log: [...memory.log, newLogEntry],
    deliverables: updatedDeliverables,
    finalDeliverable: updatedFinalDeliverable,
    completedAt: currentStepIndex + 1 === steps.length ? now : memory.completedAt
  };

  // Update active agents
  const updatedAgents = { ...activeAgents };

  // Reset highlight states
  (Object.keys(updatedAgents) as AgentRole[]).forEach(role => {
    updatedAgents[role] = {
      ...updatedAgents[role],
      isHighlighted: false
    };
  });

  // Apply step's target agent state
  if (step.targetAgentState) {
    const target = step.targetAgentState.agent;
    const currentCompleted = updatedAgents[target].tasksCompleted;
    const isCompletedNow = step.targetAgentState.status === 'completed';

    updatedAgents[target] = {
      ...updatedAgents[target],
      status: step.targetAgentState.status,
      currentTask: step.targetAgentState.currentTask,
      progress: isCompletedNow ? 100 : step.progress,
      tasksCompleted: isCompletedNow ? currentCompleted + 1 : currentCompleted,
      lastActiveTimestamp: now,
      isHighlighted: true
    };
  }

  // Also update the sender agent state if different
  if (step.from && updatedAgents[step.from]) {
    updatedAgents[step.from] = {
      ...updatedAgents[step.from],
      lastActiveTimestamp: now,
      isHighlighted: true
    };
  }

  const nextStepIndex = currentStepIndex + 1;
  const isFinished = nextStepIndex >= steps.length;

  return {
    ...state,
    currentStepIndex: nextStepIndex,
    progress: Math.min(100, Math.round((nextStepIndex / steps.length) * 100)),
    isRunning: !isFinished,
    isPaused: false,
    currentStage: isFinished ? 'executive_signoff' : stage,
    activeAgents: updatedAgents,
    memory: updatedMemory
  };
}


/**
 * Generate a dynamic custom 12-step project brief from any user custom prompt.
 */
export function generateCustomBrief(promptText: string, clientName: string = 'Custom Client Corp'): ProjectBrief {
  const title = promptText.length > 50 ? `${promptText.slice(0, 48)}...` : promptText;
  const sanitizedPrompt = promptText.trim() || 'Build a custom Python multi-agent system with UI';

  return {
    id: `custom-brief-${Date.now()}`,
    title: title,
    client: clientName,
    industry: 'Autonomous Software Engineering',
    difficulty: 'Advanced',
    summary: `Custom specification for: ${sanitizedPrompt}`,
    requiredAgents: ['MD', 'Designer', 'Developer', 'Reviewer', 'Writer', 'Marketer'],
    fullBrief: `Client Custom Request:\n${sanitizedPrompt}\n\nDeliverables requested: High-performance Python core, modern dark UI/UX spec, automated QA audit, comprehensive documentation, and GTM strategy.`,
    workflowSteps: [
      {
        step: 1,
        from: 'MD',
        action: 'brief_received',
        taskTitle: 'Custom Brief Ingestion & Subtask Decomposition',
        instructionOrFeedback: `Aegis (MD): Ingested client brief: "${title}". Analyzing requirements across technical Python stack, visual ergonomics, QA verification, documentation, and market launch.`,
        progress: 10,
        delayMs: 1500,
        targetAgentState: {
          agent: 'MD',
          status: 'executing',
          currentTask: 'Formulating specialized work streams for Developer, Designer, Reviewer, Writer, and Marketer'
        }
      },
      {
        step: 2,
        from: 'MD',
        to: 'Designer',
        action: 'assign',
        taskTitle: 'Design Token & Interface Architecture',
        instructionOrFeedback: `Nova (Designer): Create the visual and UX direction for: "${title}". Must feature dark theme tokens (#06060a, #0b0f24, #ff3d9a, #4f7dff), ergonomic component hierarchy, and responsive layout.`,
        progress: 25,
        delayMs: 1800,
        targetAgentState: {
          agent: 'Designer',
          status: 'assigned',
          currentTask: 'Drafting visual hierarchy and interaction models'
        }
      },
      {
        step: 3,
        from: 'Designer',
        to: 'MD',
        action: 'output',
        taskTitle: 'UI/UX Specification Completed',
        instructionOrFeedback: 'Nova (Designer): Delivered interface design system with high-contrast palette, ergonomic state transitions, and responsive multi-column layout.',
        progress: 40,
        delayMs: 2000,
        targetAgentState: {
          agent: 'Designer',
          status: 'completed',
          currentTask: 'Delivered interface specification and design tokens'
        },
        deliverableKey: 'designer',
        deliverableContent: {
          spec: `### UI Architecture for ${title}
- **Canvas Base**: #06060a (Deep Black)
- **Panel Surface**: #0b0f24 (Navy Elevation)
- **Primary Accents**: #ff3d9a (Pink) & #4f7dff (Electric Blue)
- **Status Indicators**: #35e0a1 (Success), #9aa0c4 (Muted)
- **Ergonomics**: Responsive mobile/desktop layout with low visual fatigue.`,
          palette: ['#06060a', '#0b0f24', '#ff3d9a', '#4f7dff', '#35e0a1'],
          typography: 'Sora 700 / JetBrains Mono 500',
          userFlow: 'Ingest Input -> Process Asynchronously -> Display Real-Time Telemetry -> Export Artifact',
          notes: 'High readability with 16px minimum body sizing and balanced negative space.'
        }
      },
      {
        step: 4,
        from: 'MD',
        to: 'Developer',
        action: 'assign',
        taskTitle: 'Python Architecture & Algorithmic Implementation',
        instructionOrFeedback: `Vega (Developer): Implement the core solution in Python 3.12 for: "${title}". Use asynchronous coroutines, type hints, robust exception handling, and modular structure.`,
        progress: 55,
        delayMs: 2400,
        targetAgentState: {
          agent: 'Developer',
          status: 'executing',
          currentTask: 'Writing Python 3.12 core engine and async workers'
        }
      },
      {
        step: 5,
        from: 'Developer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Python Production Code Delivered',
        instructionOrFeedback: 'Vega (Developer): Completed production Python 3.12 module with AsyncIO execution pipeline, atomic memory isolation, and comprehensive error trapping.',
        progress: 70,
        delayMs: 2400,
        targetAgentState: {
          agent: 'Developer',
          status: 'completed',
          currentTask: 'Delivered Python code package and unit tests'
        },
        deliverableKey: 'developer',
        deliverableContent: {
          language: 'python',
          code: `"""
NEXUS AI Office — Custom Solution Module
Project: ${title}
Author: Vega (Developer @ NEXUS)
Language: Python 3.12+ (AsyncIO, Dataclasses, TypeHints)
"""

import asyncio
import logging
from dataclasses import dataclass, field
from typing import Dict, Any, List, Optional
import time

logger = logging.getLogger("NexusCustomEngine")

@dataclass
class ExecutionContext:
    session_id: str
    created_at: float = field(default_factory=time.time)
    metadata: Dict[str, Any] = field(default_factory=dict)
    state: Dict[str, Any] = field(default_factory=dict)

class NexusServiceEngine:
    """Async Core Engine delivering client requirements for '${title}'."""
    
    def __init__(self, context: ExecutionContext) -> None:
        self.ctx = context
        self.is_active = True
        self.metrics: Dict[str, float] = {"ops_count": 0, "avg_latency_ms": 0.0}

    async def initialize(self) -> bool:
        logger.info("Initializing core service for session %s", self.ctx.session_id)
        await asyncio.sleep(0.05)
        self.ctx.state["status"] = "READY"
        return True

    async def process_payload(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Processes incoming data through async non-blocking pipeline."""
        start = time.perf_counter()
        logger.info("Processing payload with keys: %s", list(payload.keys()))
        
        # Simulated async workload
        await asyncio.sleep(0.1)
        
        elapsed_ms = (time.perf_counter() - start) * 1000.0
        self.metrics["ops_count"] += 1
        self.metrics["avg_latency_ms"] = round(elapsed_ms, 2)
        
        result = {
            "session_id": self.ctx.session_id,
            "processed": True,
            "latency_ms": elapsed_ms,
            "payload_summary": f"Processed {len(payload)} items successfully",
            "output_state": "VERIFIED_OK"
        }
        return result

async def main():
    ctx = ExecutionContext(session_id="nexus-custom-01")
    engine = NexusServiceEngine(ctx)
    await engine.initialize()
    res = await engine.process_payload({"query": "${sanitizedPrompt.replace(/"/g, "'")}"})
    print("Engine Result:", res)

if __name__ == "__main__":
    asyncio.run(main())
`,
          notes: 'Built with strict type annotations, async safety, and O(1) resource allocations.'
        }
      },
      {
        step: 6,
        from: 'MD',
        to: 'Reviewer',
        action: 'review_request',
        taskTitle: 'Code Review & Security Audit Request',
        instructionOrFeedback: 'Iris (Reviewer): Review Vega’s Python code and Nova’s design spec. Check for safety, edge-case exceptions, and spec compliance.',
        progress: 80,
        delayMs: 2000,
        targetAgentState: {
          agent: 'Reviewer',
          status: 'reviewing',
          currentTask: 'Running security benchmarks and edge case tests'
        }
      },
      {
        step: 7,
        from: 'Reviewer',
        to: 'MD',
        action: 'verdict',
        taskTitle: 'Audit Passed — Code Approved',
        instructionOrFeedback: 'Iris (Reviewer): VERDICT: APPROVE. Code passes PEP 8 and Python 3.12 typing constraints. Latency metrics and async isolation are verified.',
        progress: 86,
        delayMs: 2000,
        targetAgentState: {
          agent: 'Reviewer',
          status: 'completed',
          currentTask: 'Issued QA compliance certificate'
        },
        deliverableKey: 'reviewer',
        deliverableContent: {
          verdict: 'approve',
          score: 98.8,
          criteriaChecked: [
            'Python 3.12 async coroutine lifecycle safety',
            'Exception handling on invalid payloads',
            'Memory encapsulation & thread-safe state store'
          ],
          feedback: 'Code is clean, concise, and satisfies all requirements.'
        }
      },
      {
        step: 8,
        from: 'MD',
        to: 'Writer',
        action: 'assign',
        taskTitle: 'Documentation & Client Manual',
        instructionOrFeedback: `Sable (Writer): Write clear, client-facing documentation and integration instructions for: "${title}".`,
        progress: 90,
        delayMs: 1800,
        targetAgentState: {
          agent: 'Writer',
          status: 'executing',
          currentTask: 'Writing integration manual and user documentation'
        }
      },
      {
        step: 9,
        from: 'Writer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Client Documentation Delivered',
        instructionOrFeedback: 'Sable (Writer): Delivered comprehensive client manual with step-by-step installation, architecture diagram, and FAQ.',
        progress: 94,
        delayMs: 1900,
        targetAgentState: {
          agent: 'Writer',
          status: 'completed',
          currentTask: 'Delivered complete documentation package'
        },
        deliverableKey: 'writer',
        deliverableContent: {
          technicalSummary: `Documentation suite for ${title}. Highlights async performance, clean REST/CLI interfaces, and easy setup.`,
          clientCopy: `## Quickstart Guide for ${title}

1. Clone or download repository
2. Install Python dependencies: \`pip install -r requirements.txt\`
3. Run service: \`python main.py\`
4. Monitor telemetry in real time via dashboard`,
          faq: [
            {
              q: 'How are async errors handled?',
              a: 'All exceptions are caught gracefully and routed to the logging telemetry bus without crashing worker threads.'
            }
          ]
        }
      },
      {
        step: 10,
        from: 'MD',
        to: 'Marketer',
        action: 'assign',
        taskTitle: 'Positioning & Marketing Pitch',
        instructionOrFeedback: `Rune (Marketer): Prepare the product positioning, target market framing, and launch copy for: "${title}".`,
        progress: 97,
        delayMs: 1700,
        targetAgentState: {
          agent: 'Marketer',
          status: 'executing',
          currentTask: 'Formulating value proposition and marketing copy'
        }
      },
      {
        step: 11,
        from: 'Marketer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Product Pitch & Marketing Strategy Delivered',
        instructionOrFeedback: 'Rune (Marketer): Completed marketing campaign with high-impact value propositions and targeted distribution channels.',
        progress: 99,
        delayMs: 1800,
        targetAgentState: {
          agent: 'Marketer',
          status: 'completed',
          currentTask: 'Finalized go-to-market launch collateral'
        },
        deliverableKey: 'marketer',
        deliverableContent: {
          launchPitch: `Accelerate your operations with ${title} — automated, verified, and engineered for high-throughput reliability.`,
          taglines: [
            `Next-Gen Automation for ${title}`,
            'Engineered by Autonomous AI Specialists.',
            'Production Ready from Day One.'
          ],
          targetAudience: 'Engineering Leaders, Product Managers, Innovation Heads',
          distributionChannels: ['Developer Communities', 'Direct Executive Outreach', 'Industry Tech Portals']
        }
      },
      {
        step: 12,
        from: 'MD',
        action: 'compile',
        taskTitle: 'Master Deliverable Compilation & Final Sign-Off',
        instructionOrFeedback: `Aegis (MD): All 5 specialists have completed their deliverables with full review approval. Synthesizing master delivery package for "${title}".`,
        progress: 100,
        delayMs: 2200,
        targetAgentState: {
          agent: 'MD',
          status: 'completed',
          currentTask: 'Master deliverable compiled and verified for client delivery'
        },
        deliverableKey: 'finalDeliverable',
        deliverableContent: `# INTEGRATED INNOVATIONS — Executive Master Deliverable

**Client**: ${clientName}  
**Project**: ${title}  
**Status**: COMPLETE & VERIFIED  
**Lead Coordinator**: Aegis (Managing Director)  

---

### Delivery Overview
All 5 specialist agents (Developer, Designer, Reviewer, Writer, Marketer) under the direction of Managing Director Aegis have delivered their respective deliverables for **${title}**.

### Delivered Assets:
1. **Developer (Vega)**: Production Python 3.12 source code module with async pipelines.
2. **Designer (Nova)**: High-contrast Obsidian design tokens & UI specification.
3. **Reviewer (Iris)**: Quality assurance audit report with 98.8% compliance score.
4. **Writer (Sable)**: Developer guide, installation documentation, and user FAQ.
5. **Marketer (Rune)**: GTM positioning strategy, taglines, and outreach channel roadmap.`
      }
    ]
  };
}
