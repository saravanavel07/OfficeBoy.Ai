export type AgentRole = 'MD' | 'Developer' | 'Designer' | 'Reviewer' | 'Writer' | 'Marketer';

export type AgentName = 'Aegis' | 'Vega' | 'Nova' | 'Iris' | 'Sable' | 'Rune';

export type AgentStatus = 'idle' | 'assigned' | 'executing' | 'reviewing' | 'completed' | 'revising';

export type ActionType = 
  | 'brief_received'
  | 'assign'
  | 'execute'
  | 'output'
  | 'review_request'
  | 'verdict'
  | 'feedback'
  | 'compile'
  | 'completed';

export type CompanyStage = 
  | 'intake_triage'
  | 'strategy_delegation'
  | 'engineering_design_sprint'
  | 'qa_compliance_gate'
  | 'documentation_gtm'
  | 'executive_signoff';

export interface AllocatedRoleInfo {
  position: string;
  department: string;
  mandate: string;
  kpi: string;
}

export interface AgentProfile {
  id: AgentRole;
  name: AgentName;
  role: AgentRole;
  title: string;
  avatar: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  specialty: string;
  systemPrompt: string;
  skills: string[];
}

export interface ThirdPartyRFP {
  id: string;
  title: string;
  client: string;
  clientAvatar?: string;
  industry: string;
  budget: string;
  urgency: 'Immediate (24h)' | 'High (3-5 Days)' | 'Standard (2 Weeks)' | 'Enterprise Sprint';
  feasibilityScore: number; // 0-100
  submittedAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'in_execution' | 'delivered';
  summary: string;
  fullRequirements: string;
  techStack: string[];
  allocatedTeamRoles: Record<AgentRole, AllocatedRoleInfo>;
  brief: ProjectBrief;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  from: AgentRole | 'System';
  to?: AgentRole | 'All';
  action: ActionType;
  content: string;
  stage?: CompanyStage;
  details?: {
    taskName?: string;
    verdict?: 'approve' | 'revise';
    feedback?: string;
    notes?: string;
    codeLanguage?: string;
    rawJson?: Record<string, any>;
    metrics?: {
      linesOfCode?: number;
      words?: number;
      durationMs?: number;
    };
  };
}

export interface SharedMemory {
  briefId: string;
  briefTitle: string;
  briefContent: string;
  clientName: string;
  industry: string;
  budget?: string;
  startedAt: string;
  completedAt?: string;
  currentStepIndex: number;
  totalSteps: number;
  currentStage: CompanyStage;
  log: LogEntry[];
  deliverables: {
    developer?: {
      code: string;
      notes: string;
      language: string;
    };
    designer?: {
      spec: string;
      palette: string[];
      typography: string;
      userFlow: string;
      notes: string;
    };
    reviewer?: {
      verdict: 'approve' | 'revise';
      feedback: string;
      criteriaChecked: string[];
      score: number;
    };
    writer?: {
      clientCopy: string;
      technicalSummary: string;
      faq: { q: string; a: string }[];
    };
    marketer?: {
      launchPitch: string;
      taglines: string[];
      targetAudience: string;
      distributionChannels: string[];
    };
  };
  finalDeliverable: string | null;
  mdReviewNotes?: string;
}

export interface ProjectBrief {
  id: string;
  title: string;
  client: string;
  industry: string;
  budget?: string;
  summary: string;
  fullBrief: string;
  difficulty: 'Standard' | 'Advanced' | 'Enterprise';
  requiredAgents: AgentRole[];
  allocatedPositions?: Record<AgentRole, AllocatedRoleInfo>;
  workflowSteps: {
    step: number;
    stage?: CompanyStage;
    from: AgentRole;
    to?: AgentRole;
    action: ActionType;
    taskTitle: string;
    instructionOrFeedback: string;
    progress: number;
    delayMs?: number;
    targetAgentState?: {
      agent: AgentRole;
      status: AgentStatus;
      currentTask: string;
    };
    deliverableKey?: 'developer' | 'designer' | 'reviewer' | 'writer' | 'marketer' | 'finalDeliverable';
    deliverableContent?: any;
  }[];
}

export interface SimulationState {
  isRunning: boolean;
  isPaused: boolean;
  speedMultiplier: number; // 1x, 2x, 5x, 10x
  currentBrief: ProjectBrief;
  currentStepIndex: number;
  progress: number;
  currentStage: CompanyStage;
  allocatedPositions: Record<AgentRole, AllocatedRoleInfo>;
  activeAgents: Record<AgentRole, {
    status: AgentStatus;
    currentTask: string;
    progress: number;
    tasksCompleted: number;
    lastActiveTimestamp?: string;
    isHighlighted: boolean;
  }>;
  memory: SharedMemory;
}

