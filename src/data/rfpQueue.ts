import { AgentRole, AllocatedRoleInfo, ProjectBrief, ThirdPartyRFP } from '../types';
import { PRESET_BRIEFS } from './presets';

export function getDefaultAllocationsForIndustry(
  industry: string, 
  title: string
): Record<AgentRole, AllocatedRoleInfo> {
  const ind = (industry + ' ' + title).toLowerCase();

  if (ind.includes('fintech') || ind.includes('crypto') || ind.includes('payment') || ind.includes('fraud') || ind.includes('banking') || ind.includes('defi')) {
    return {
      MD: {
        position: 'Managing Partner & Global Fintech Practice Director',
        department: 'Executive Governance & Capital Strategy',
        mandate: 'Structure regulatory compliance, institutional SLAs, and capital protection protocols.',
        kpi: 'Zero-slippage execution & 100% SEC/PCI-DSS audit compliance'
      },
      Developer: {
        position: 'Lead High-Frequency Payments & Cryptographic Systems Engineer',
        department: 'Quantitative Engineering & Distributed Ledgers',
        mandate: 'Author sub-millisecond anomaly detection and zero-knowledge transaction verifiers.',
        kpi: '<5ms latency on transaction validation pipelines'
      },
      Designer: {
        position: 'Principal Financial Terminal & Trading Interface Architect',
        department: 'Product Ergonomics & Data Visualization',
        mandate: 'Craft high-density candlestick telemetry, order book depth charts, and alert surfaces.',
        kpi: 'WCAG AAA contrast & sub-second visual cognitive load'
      },
      Reviewer: {
        position: 'Chief Compliance, Smart-Contract & Fraud Security Auditor',
        department: 'Risk Governance & Penetration Auditing',
        mandate: 'Audit re-entrancy vectors, flash-loan vulnerabilities, and transaction sanitization.',
        kpi: '100% formal vulnerability sign-off'
      },
      Writer: {
        position: 'Fintech Protocols & Institutional API Documentarian',
        department: 'Technical Governance & Client Relations',
        mandate: 'Author institutional integration guides, webhook specs, and settlement documentation.',
        kpi: 'Comprehensive endpoint documentation with idempotency patterns'
      },
      Marketer: {
        position: 'Institutional Product Strategist & GTM Director',
        department: 'Commercial Growth & Market Positioning',
        mandate: 'Position zero-loss guarantees and institutional liquidity narratives for Tier-1 banks.',
        kpi: 'Enterprise Tier-1 inbound conversion positioning'
      }
    };
  }

  if (ind.includes('health') || ind.includes('med') || ind.includes('clinical') || ind.includes('bio') || ind.includes('pharma')) {
    return {
      MD: {
        position: 'Executive Director of Healthcare Technology & Life Sciences',
        department: 'Executive Governance & Regulatory Strategy',
        mandate: 'Align medical device compliance, HIPAA encryption mandates, and clinical outcomes.',
        kpi: 'FDA 21 CFR Part 11 & HIPAA certification compliance'
      },
      Developer: {
        position: 'Lead Clinical Systems & HIPAA Data Pipelines Architect',
        department: 'Biomedical Informatics & Distributed Architecture',
        mandate: 'Engineer secure HL7/FHIR ingest streams and differential privacy models.',
        kpi: '100% PHI de-identification and fault-tolerant ingestion'
      },
      Designer: {
        position: 'Principal Medical Workflow & Accessible UI/UX Designer',
        department: 'Human Factors & Clinical Ergonomics',
        mandate: 'Design high-clarity diagnostic views and zero-fatigue clinical triage workflows.',
        kpi: 'Zero mis-click error rate on emergency triage controls'
      },
      Reviewer: {
        position: 'Head of Medical Device Compliance & Clinical Safety QA',
        department: 'Clinical Risk & Regulatory Verification',
        mandate: 'Perform rigorous safety verification, clinical edge-case fuzzing, and compliance audit.',
        kpi: 'Zero critical clinical safety violations'
      },
      Writer: {
        position: 'Clinical Protocol & Medical SOP Documentarian',
        department: 'Regulatory Documentation & Medical Writing',
        mandate: 'Publish FDA-compliant submission briefs, clinician quickstarts, and patient data SOPs.',
        kpi: 'Peer-reviewed clinical documentation standard'
      },
      Marketer: {
        position: 'Healthcare Solutions & Hospital Systems GTM Director',
        department: 'Life Sciences Commercialization',
        mandate: 'Frame clinical efficacy benchmarks and physician adoption campaigns.',
        kpi: 'Provider trust score & hospital pilot procurement'
      }
    };
  }

  if (ind.includes('cyber') || ind.includes('security') || ind.includes('zero-trust') || ind.includes('threat') || ind.includes('auth')) {
    return {
      MD: {
        position: 'Managing Director of Cyber Defense & Threat Intelligence',
        department: 'Executive Governance & Information Security',
        mandate: 'Oversee defensive cyber posture, containment SLAs, and executive forensics briefs.',
        kpi: 'Zero undetected zero-day exploit vectors'
      },
      Developer: {
        position: 'Lead Exploit Analysis & Zero-Trust Architecture Engineer',
        department: 'Offensive / Defensive Security Engineering',
        mandate: 'Implement continuous memory-scanning, eBPF kernel probes, and cryptographic attestation.',
        kpi: 'Microsecond anomaly detection on kernel system calls'
      },
      Designer: {
        position: 'Principal SOC Operations & Threat Visualization Designer',
        department: 'Security Ergonomics & Threat Topologies',
        mandate: 'Map dynamic threat attack graphs, blast radius maps, and urgent remediation triggers.',
        kpi: '1-second threat containment actionable UX clarity'
      },
      Reviewer: {
        position: 'Principal Zero-Trust & Penetration Security Auditor',
        department: 'Red Team Auditing & Code Hardening',
        mandate: 'Execute adversarial fuzzing, privilege escalation tests, and memory leak analysis.',
        kpi: '100% CVE mitigation and zero unauthenticated paths'
      },
      Writer: {
        position: 'Incident Response & Security Protocols Documentarian',
        department: 'Security Standards & Compliance Publishing',
        mandate: 'Author SOC-2 Type II audit manuals, breach runbooks, and developer hardening guides.',
        kpi: 'Audit-ready compliance artifacts'
      },
      Marketer: {
        position: 'Enterprise CISO Advisory & Cybersecurity GTM Lead',
        department: 'Enterprise Security Brand & Positioning',
        mandate: 'Position breach indemnity guarantees and enterprise board-level security metrics.',
        kpi: 'CISO executive advisory engagement'
      }
    };
  }

  if (ind.includes('logistics') || ind.includes('supply') || ind.includes('robotics') || ind.includes('warehouse') || ind.includes('fleet')) {
    return {
      MD: {
        position: 'Executive Director of Autonomous Supply Chain & Industrial Robotics',
        department: 'Industrial Systems Governance',
        mandate: 'Coordinate autonomous fleet dispatch, warehouse throughput SLAs, and safety protocols.',
        kpi: '99.99% supply chain uptime & zero collision incidents'
      },
      Developer: {
        position: 'Lead Fleet Routing & Real-Time Telemetry Systems Architect',
        department: 'Spatial Computing & High-Concurrency Systems',
        mandate: 'Write A* pathfinding with dynamic obstacle avoidance and sensor fusion pipelines.',
        kpi: 'Sub-10ms path re-calculation for 1,000+ AGVs'
      },
      Designer: {
        position: 'Principal Warehouse Dispatch & Spatial UI Architect',
        department: 'Industrial Telemetry & Operational UX',
        mandate: 'Design 3D digital-twin warehouse heatmaps and live telemetry dashboards.',
        kpi: 'Real-time 60fps spatial map rendering'
      },
      Reviewer: {
        position: 'Industrial Safety & Hardware Redundancy Auditor',
        department: 'Hardware-in-the-Loop & Safety Verification',
        mandate: 'Verify watchdog timers, sensor failover triggers, and ISO 13849 safety compliance.',
        kpi: 'Fail-safe emergency stop verification across all edge nodes'
      },
      Writer: {
        position: 'Industrial Operations & Fleet Maintenance Documentarian',
        department: 'Operations Publishing & Standard Operating Procedures',
        mandate: 'Create field technician repair manuals, telemetry schemas, and driver dispatch SOPs.',
        kpi: 'Zero-ambiguity field maintenance runbooks'
      },
      Marketer: {
        position: 'Enterprise Logistics & Industrial Robotics GTM Lead',
        department: 'Global Supply Chain Commercialization',
        mandate: 'Position 40% warehouse efficiency gains and carbon-negative fleet logistics narratives.',
        kpi: 'Enterprise 3PL contract positioning'
      }
    };
  }

  // Default: Distributed Systems / AI Infrastructure Enterprise
  return {
    MD: {
      position: 'Managing Director & Enterprise Systems Practice Lead',
      department: 'Executive Governance & Strategy',
      mandate: 'Coordinate multi-agent task DAGs, resource budgets, and client deliverables.',
      kpi: '100% on-time milestone delivery with executive sign-off'
    },
    Developer: {
      position: 'Lead Distributed Systems & Core Engine Architect',
      department: 'Software Architecture & Scalable Systems',
      mandate: 'Implement high-concurrency async runtimes, circuit breakers, and state persistence.',
      kpi: 'P99 latency < 25ms and zero unhandled exceptions'
    },
    Designer: {
      position: 'Principal Product & Interaction Systems Designer',
      department: 'Product Ergonomics & Design Tokens',
      mandate: 'Define spatial dark UI hierarchies, component tokens, and responsive telemetry.',
      kpi: '100% design system token consistency'
    },
    Reviewer: {
      position: 'Head of Quality Assurance, Security & Code Verification',
      department: 'Audit & Resilience Engineering',
      mandate: 'Enforce edge-case testing, security hardening, and specification verification.',
      kpi: '100% automated test coverage on critical paths'
    },
    Writer: {
      position: 'Lead Technical Communications & Client Documentarian',
      department: 'Technical Governance & Knowledge Base',
      mandate: 'Craft developer onboarding guides, API specifications, and executive handover dossiers.',
      kpi: 'Complete self-serve technical handoff'
    },
    Marketer: {
      position: 'VP of Product Strategy & Enterprise Go-To-Market',
      department: 'Commercial Growth & Product Positioning',
      mandate: 'Frame technical capabilities into value propositions and launch playbooks.',
      kpi: 'High-conversion market positioning collateral'
    }
  };
}

export const INITIAL_THIRD_PARTY_RFPS: ThirdPartyRFP[] = [
  {
    id: 'rfp-001',
    title: 'Autonomous Multi-Agent Task Orchestrator & Python Workflow Engine',
    client: 'HyperScale Systems Inc.',
    clientAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    industry: 'Distributed AI Infrastructure',
    budget: '$125,000 USD',
    urgency: 'Immediate (24h)',
    feasibilityScore: 98,
    submittedAt: '12 mins ago',
    status: 'in_execution',
    summary: 'Build an enterprise-grade Python asynchronous multi-agent orchestration engine with DAG execution, circuit-breaker retry logic, and memory streaming.',
    fullRequirements: 'Client requires a zero-dependency async DAG task engine, circuit breaker failovers, token-budgeted memory bus, live WebSocket monitoring console, and executive documentation.',
    techStack: ['Python 3.12', 'AsyncIO', 'FastAPI', 'DAG Scheduler', 'WebSocket'],
    allocatedTeamRoles: getDefaultAllocationsForIndustry('Distributed AI Infrastructure', 'Autonomous Multi-Agent Task Orchestrator'),
    brief: PRESET_BRIEFS[0]
  },
  {
    id: 'rfp-002',
    title: 'Real-Time Fraud & Anomaly Defense Engine with WebSocket Streaming',
    client: 'Aegis Capital & Global Fintech Partners',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    industry: 'Fintech & Risk Infrastructure',
    budget: '$165,000 USD',
    urgency: 'High (3-5 Days)',
    feasibilityScore: 94,
    submittedAt: '45 mins ago',
    status: 'pending',
    summary: 'Sub-millisecond payment anomaly detector analyzing $40M daily volume with automated risk categorization and PCI-DSS compliance verification.',
    fullRequirements: 'Real-time WebSocket event ingestion, Isolation Forest / Z-Score statistical anomaly engine, Dark-mode fraud dashboard with instant quarantine triggers, QA penetration audit, and executive compliance report.',
    techStack: ['Python 3.12', 'NumPy', 'SciPy', 'WebSocket', 'Tailwind', 'PCI-DSS'],
    allocatedTeamRoles: getDefaultAllocationsForIndustry('Fintech & Risk Infrastructure', 'Real-Time Fraud Defense Engine'),
    brief: PRESET_BRIEFS[1]
  },
  {
    id: 'rfp-003',
    title: 'HIPAA-Compliant Clinical AI Triage & Diagnostic Workflow Assistant',
    client: 'Vanguard Medical & BioHealth Consortium',
    clientAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80',
    industry: 'Healthcare Technology & Life Sciences',
    budget: '$180,000 USD',
    urgency: 'Enterprise Sprint',
    feasibilityScore: 91,
    submittedAt: '2 hours ago',
    status: 'pending',
    summary: 'Clinical emergency triage engine automating patient symptom classification, vital sign trend anomaly detection, and physician decision support.',
    fullRequirements: 'FHIR / HL7 standard interoperability, zero-leakage local PHI encryption, triage priority scoring matrix, hospital UI with high-stress ergonomic contrast, clinical QA validation, and physician onboarding handbook.',
    techStack: ['Python 3.12', 'HL7/FHIR', 'Fernet Encryption', 'WCAG AAA UI', 'Medical QA'],
    allocatedTeamRoles: getDefaultAllocationsForIndustry('Healthcare Technology & Life Sciences', 'Clinical AI Triage Assistant'),
    brief: PRESET_BRIEFS[2]
  },
  {
    id: 'rfp-004',
    title: 'Zero-Trust SOC Threat Detection & Automated Incident Response Matrix',
    client: 'CyberShield Defense Alliance',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    industry: 'Cybersecurity & Defense Intelligence',
    budget: '$140,000 USD',
    urgency: 'High (3-5 Days)',
    feasibilityScore: 96,
    submittedAt: '3 hours ago',
    status: 'pending',
    summary: 'Autonomous security operations center (SOC) telemetry analyzer performing continuous behavioral auditing, zero-trust privilege attestation, and containment actions.',
    fullRequirements: 'Kernel event capture, MITRE ATT&CK taxonomy mapping, automated quarantine trigger rules, attack graph spatial visualization, zero-trust penetration audit, and CISO incident runbook.',
    techStack: ['Python 3.12', 'MITRE ATT&CK', 'eBPF Probes', 'Zero-Trust Auth', 'Security QA'],
    allocatedTeamRoles: getDefaultAllocationsForIndustry('Cybersecurity & Defense Intelligence', 'Zero-Trust Threat Response'),
    brief: PRESET_BRIEFS[3]
  },
  {
    id: 'rfp-005',
    title: 'Autonomous Multi-Warehouse Fleet Telemetry & Dynamic Dispatch Engine',
    client: 'Apex Global Logistics & Autonomous Freight',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    industry: 'Supply Chain & Industrial Logistics',
    budget: '$95,000 USD',
    urgency: 'Standard (2 Weeks)',
    feasibilityScore: 93,
    submittedAt: '5 hours ago',
    status: 'pending',
    summary: 'Autonomous automated guided vehicle (AGV) routing engine optimizing 50,000 parcel movements per hour across 4 regional fulfillment centers.',
    fullRequirements: 'A* spatial routing with dynamic obstacle penalty fields, battery depletion scheduling, 3D fulfillment center map visualizer, ISO 13849 safety audit, and warehouse operator manual.',
    techStack: ['Python 3.12', 'A* Pathfinding', 'Spatial Geometry', 'Hardware Watchdog', 'Operations Guide'],
    allocatedTeamRoles: getDefaultAllocationsForIndustry('Supply Chain & Industrial Logistics', 'Autonomous Fleet Dispatch Engine'),
    brief: PRESET_BRIEFS[4]
  }
];

export const INITIAL_RFP_QUEUE = INITIAL_THIRD_PARTY_RFPS;

