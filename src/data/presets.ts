import { ProjectBrief } from '../types';

export const PRESET_BRIEFS: ProjectBrief[] = [
  {
    id: 'brief-python-orchestrator',
    title: 'Autonomous Multi-Agent Task Orchestrator & Python Workflow Engine',
    client: 'HyperScale Systems Inc.',
    industry: 'Distributed AI Infrastructure',
    difficulty: 'Enterprise',
    summary: 'Build an enterprise-grade Python asynchronous multi-agent orchestration engine with DAG execution, circuit-breaker retry logic, and memory streaming.',
    requiredAgents: ['MD', 'Designer', 'Developer', 'Reviewer', 'Writer', 'Marketer'],
    fullBrief: `Client Request: We need a mission-critical Python multi-agent orchestration framework called 'NexusEngine'. It must provide:
1. Asynchronous Directed Acyclic Graph (DAG) task scheduling with priority queues.
2. Shared context memory bus with token budgeting and atomic state rollback.
3. Resilient circuit-breaker pattern handling agent rate limits and timeout failures.
4. Clean REST/WebSocket interface for real-time telemetry and state monitoring.
5. Complete technical documentation, developer onboarding guide, and product launch positioning.`,
    workflowSteps: [
      {
        step: 1,
        from: 'MD',
        action: 'brief_received',
        taskTitle: 'Project Ingestion & Scope Analysis',
        instructionOrFeedback: 'Ingested HyperScale Systems brief. Analyzing deliverables across Python runtime, UX telemetry interface, QA resilience, technical docs, and launch positioning.',
        progress: 10,
        delayMs: 1400,
        targetAgentState: {
          agent: 'MD',
          status: 'executing',
          currentTask: 'Deconstructing client brief into modular agent work packages'
        }
      },
      {
        step: 2,
        from: 'MD',
        to: 'Designer',
        action: 'assign',
        taskTitle: 'Design Token & Dashboard Architecture',
        instructionOrFeedback: 'Nova (Designer): Define the UX architecture for the NexusEngine real-time telemetry console. Include high-contrast dark color tokens (#06060a, #0b0f24, #ff3d9a, #4f7dff), DAG visual node states (queued, running, stalled, resolved), and layout flow for live task monitoring.',
        progress: 25,
        delayMs: 1800,
        targetAgentState: {
          agent: 'Designer',
          status: 'assigned',
          currentTask: 'Drafting telemetry UX topology and visual token system'
        }
      },
      {
        step: 3,
        from: 'Designer',
        to: 'MD',
        action: 'output',
        taskTitle: 'UX Specification & Design Tokens Delivered',
        instructionOrFeedback: 'Completed UX & Token Spec: High-contrast Obsidian theme (#06060a) with 4-state node telemetry: [Idle: #9aa0c4, Running: #4f7dff pulse, Fault: #ff3d9a, Greenlit: #35e0a1]. Dual-pane layout with 65/35 split between live DAG canvas and streaming terminal logs.',
        progress: 40,
        delayMs: 2200,
        targetAgentState: {
          agent: 'Designer',
          status: 'completed',
          currentTask: 'Delivered telemetry topology and token system to MD'
        },
        deliverableKey: 'designer',
        deliverableContent: {
          spec: `### NexusEngine Telemetry Console Specification
- **Theme Palette**:
  - Base Obsidian Canvas: \`#06060a\`
  - Deep Navy Elevation Surface: \`#0b0f24\`
  - Neon Accent Magenta: \`#ff3d9a\`
  - Core Signal Electric Blue: \`#4f7dff\`
  - Verification Emerald: \`#35e0a1\`
  - Subdued Muted Slate: \`#9aa0c4\`

- **Information Hierarchy**:
  1. **Top HUD**: Global Execution Rate (Hz), Active Worker Concurrency (N=6), Circuit Breaker Health Index (100%).
  2. **Primary Stage (65%)**: Force-directed DAG graph visualizing asynchronous dependency resolution in real time.
  3. **Telemetry Log Console (35%)**: Monospace virtualized stream with color-coded log levels (DEBUG, INFO, WARN, DISPATCH).`,
          palette: ['#06060a', '#0b0f24', '#ff3d9a', '#4f7dff', '#35e0a1', '#9aa0c4'],
          typography: 'Sora 700 (Headings), JetBrains Mono 400/500 (Payloads & Streams)',
          userFlow: 'Ingest Brief -> Auto-Generate Topological Sort -> Spawn Async Workers -> Live Circuit-Breaker Guard -> Deliver Final Artifacts',
          notes: 'Ensured WCAG AAA contrast for terminal readout; smooth 180ms ease-out transitions on node state changes.'
        }
      },
      {
        step: 4,
        from: 'MD',
        to: 'Developer',
        action: 'assign',
        taskTitle: 'Core Python Orchestration Engine Implementation',
        instructionOrFeedback: 'Vega (Developer): Implement the production-grade Python async orchestrator engine in python 3.12. Must include AsyncDAGScheduler, TaskNode with retry budget, CircuitBreaker with exponential backoff, and SharedMemoryBus with thread-safe atomic rollback.',
        progress: 55,
        delayMs: 2400,
        targetAgentState: {
          agent: 'Developer',
          status: 'executing',
          currentTask: 'Writing Python 3.12 AsyncIO DAG Scheduler & Circuit Breaker'
        }
      },
      {
        step: 5,
        from: 'Developer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Python Engine Source Code Delivered',
        instructionOrFeedback: 'Vega (Developer): Finished full Python implementation (AsyncDAGScheduler, CircuitBreaker, SharedContextBus, TaskNode). Included asyncio task groups, priority execution, and thread-safe rollback mechanisms.',
        progress: 68,
        delayMs: 2500,
        targetAgentState: {
          agent: 'Developer',
          status: 'completed',
          currentTask: 'Completed Python orchestrator implementation and unit tests'
        },
        deliverableKey: 'developer',
        deliverableContent: {
          language: 'python',
          code: `"""
INTEGRATED INNOVATIONS — Core Multi-Agent Orchestrator Engine (NexusEngine v2.4)
Author: Vega (Lead Systems Engineer @ INTEGRATED INNOVATIONS)
Environment: Python 3.12+ (AsyncIO, Pydantic v2, ThreadSafe Context)
"""

import asyncio
import time
import logging
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Callable, Coroutine, Dict, List, Optional, Set

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("NexusEngine")


class TaskStatus(str, Enum):
    PENDING = "PENDING"
    QUEUED = "QUEUED"
    RUNNING = "RUNNING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    ROLLED_BACK = "ROLLED_BACK"


class CircuitState(str, Enum):
    CLOSED = "CLOSED"      # Healthy operation
    OPEN = "OPEN"          # Tripped, rejecting executions
    HALF_OPEN = "HALF_OPEN"# Probe state


@dataclass
class CircuitBreaker:
    failure_threshold: int = 3
    recovery_timeout: float = 5.0
    failure_count: int = 0
    state: CircuitState = CircuitState.CLOSED
    last_failure_time: float = 0.0

    def record_failure(self) -> None:
        self.failure_count += 1
        self.last_failure_time = time.monotonic()
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN
            logger.warning("Circuit breaker TRIPPED to OPEN state due to %d failures.", self.failure_count)

    def record_success(self) -> None:
        self.failure_count = 0
        self.state = CircuitState.CLOSED

    def can_execute(self) -> bool:
        if self.state == CircuitState.CLOSED:
            return True
        if self.state == CircuitState.OPEN:
            if time.monotonic() - self.last_failure_time >= self.recovery_timeout:
                self.state = CircuitState.HALF_OPEN
                logger.info("Circuit breaker entering HALF_OPEN state to probe stability.")
                return True
            return False
        return True  # HALF_OPEN allows single execution probe


@dataclass
class TaskNode:
    task_id: str
    agent_name: str
    action_fn: Callable[..., Coroutine[Any, Any, Dict[str, Any]]]
    dependencies: Set[str] = field(default_factory=set)
    priority: int = 10
    max_retries: int = 3
    retry_count: int = 0
    timeout_sec: float = 30.0
    status: TaskStatus = TaskStatus.PENDING
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


class SharedMemoryBus:
    """Thread-safe and async-safe shared context memory bus with snapshot rollback."""
    def __init__(self) -> None:
        self._lock = asyncio.Lock()
        self._store: Dict[str, Any] = {}
        self._history: List[Dict[str, Any]] = []

    async def write(self, key: str, value: Any) -> None:
        async with self._lock:
            self._history.append(dict(self._store))
            self._store[key] = value
            logger.debug("Memory write: key='%s', val_preview='%s'", key, str(value)[:60])

    async def read(self, key: str, default: Any = None) -> Any:
        async with self._lock:
            return self._store.get(key, default)

    async def rollback(self) -> bool:
        async with self._lock:
            if not self._history:
                return False
            self._store = self._history.pop()
            logger.warning("Rolled back shared memory bus to previous stable snapshot.")
            return True

    async def snapshot(self) -> Dict[str, Any]:
        async with self._lock:
            return dict(self._store)


class AsyncDAGScheduler:
    """High-throughput Topological DAG Execution Engine."""
    def __init__(self, memory_bus: SharedMemoryBus) -> None:
        self.nodes: Dict[str, TaskNode] = {}
        self.memory = memory_bus
        self.circuit_breaker = CircuitBreaker()

    def add_task(self, node: TaskNode) -> None:
        self.nodes[node.task_id] = node

    def _get_executable_tasks(self, completed_ids: Set[str]) -> List[TaskNode]:
        ready = []
        for node in self.nodes.values():
            if node.status == TaskStatus.PENDING:
                if node.dependencies.issubset(completed_ids):
                    ready.append(node)
        return sorted(ready, key=lambda x: x.priority, reverse=True)

    async def _execute_single_task(self, node: TaskNode) -> None:
        if not self.circuit_breaker.can_execute():
            node.status = TaskStatus.FAILED
            node.error = "Execution halted by CircuitBreaker (OPEN state)."
            logger.error("Task %s rejected by circuit breaker.", node.task_id)
            return

        node.status = TaskStatus.RUNNING
        for attempt in range(1, node.max_retries + 1):
            try:
                logger.info("Executing task %s by agent %s (attempt %d/%d)...",
                            node.task_id, node.agent_name, attempt, node.max_retries)
                res = await asyncio.wait_for(node.action_fn(self.memory), timeout=node.timeout_sec)
                node.result = res
                node.status = TaskStatus.COMPLETED
                self.circuit_breaker.record_success()
                await self.memory.write(f"task:{node.task_id}:result", res)
                return
            except Exception as ex:
                node.retry_count = attempt
                logger.warning("Task %s failed attempt %d: %s", node.task_id, attempt, str(ex))
                if attempt == node.max_retries:
                    node.status = TaskStatus.FAILED
                    node.error = str(ex)
                    self.circuit_breaker.record_failure()
                    await self.memory.rollback()
                    return
                await asyncio.sleep(2 ** attempt * 0.25)

    async def run(self) -> Dict[str, Any]:
        completed_ids: Set[str] = set()
        total_tasks = len(self.nodes)

        logger.info("Starting AsyncDAGScheduler pipeline for %d nodes.", total_tasks)
        while len(completed_ids) < total_tasks:
            ready_nodes = self._get_executable_tasks(completed_ids)
            if not ready_nodes:
                failed = [n for n in self.nodes.values() if n.status == TaskStatus.FAILED]
                if failed:
                    logger.error("DAG execution stalled due to node failures: %s", [f.task_id for f in failed])
                    break
                logger.info("All schedulable branches resolved.")
                break

            # Execute available parallel branches concurrently
            async with asyncio.TaskGroup() as tg:
                for node in ready_nodes:
                    node.status = TaskStatus.QUEUED
                    tg.create_task(self._execute_single_task(node))

            # Gather newly completed nodes
            for node in ready_nodes:
                if node.status == TaskStatus.COMPLETED:
                    completed_ids.add(node.task_id)

        return {
            "total_tasks": total_tasks,
            "completed": len(completed_ids),
            "circuit_state": self.circuit_breaker.state.value,
            "final_memory_snapshot": await self.memory.snapshot()
        }
`,
          notes: 'Full Python 3.12 TaskGroup concurrency, non-blocking lock primitives, exponential backoff jitter, and complete circuit-breaker health telemetry.'
        }
      },
      {
        step: 6,
        from: 'MD',
        to: 'Reviewer',
        action: 'review_request',
        taskTitle: 'QA Audit & Code Security Review Request',
        instructionOrFeedback: 'Iris (Reviewer): Perform a comprehensive audit on Vega’s Python orchestrator and Nova’s UX spec. Audit for: 1) Concurrency deadlocks, 2) Memory leak vulnerabilities, 3) Circuit-breaker recovery edge-cases, 4) Spec completeness.',
        progress: 75,
        delayMs: 2000,
        targetAgentState: {
          agent: 'Reviewer',
          status: 'reviewing',
          currentTask: 'Executing static analysis & resilience verification test suite'
        }
      },
      {
        step: 7,
        from: 'Reviewer',
        to: 'MD',
        action: 'verdict',
        taskTitle: 'QA Audit Passed — 100% Spec Satisfaction',
        instructionOrFeedback: 'Iris (Reviewer): VERDICT: APPROVE. Audited AsyncDAGScheduler and SharedMemoryBus. Confirmed atomic snapshot rollbacks on task failure, asyncio.TaskGroup prevents orphaned coroutines, and circuit breaker properly resets on half-open probe.',
        progress: 82,
        delayMs: 2200,
        targetAgentState: {
          agent: 'Reviewer',
          status: 'completed',
          currentTask: 'Delivered security certification & test report to MD'
        },
        deliverableKey: 'reviewer',
        deliverableContent: {
          verdict: 'approve',
          score: 99.4,
          criteriaChecked: [
            'AsyncIO TaskGroup safety & thread-safety verified',
            'Zero unhandled deadlock conditions in DAG topological sort',
            'Exponential backoff with jitter prevents thundering herd',
            'Memory rollback snapshot verified against race conditions',
            'Type hinting conforms strictly to PEP 484 / Python 3.12'
          ],
          feedback: 'Outstanding architecture. Memory rollback and circuit breaker logic are clean and production-ready.'
        }
      },
      {
        step: 8,
        from: 'MD',
        to: 'Writer',
        action: 'assign',
        taskTitle: 'Technical Docs & Client Guide',
        instructionOrFeedback: 'Sable (Writer): Draft client-facing technical documentation for NexusEngine. Include Quickstart guide, DAG definition tutorial, architecture summary, and troubleshooting FAQ.',
        progress: 88,
        delayMs: 1900,
        targetAgentState: {
          agent: 'Writer',
          status: 'executing',
          currentTask: 'Authoring developer onboarding docs and architecture specs'
        }
      },
      {
        step: 9,
        from: 'Writer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Technical Documentation Completed',
        instructionOrFeedback: 'Sable (Writer): Delivered comprehensive client guide with Python quickstarts, async DAG diagrams, memory rollback explanations, and integration FAQ.',
        progress: 93,
        delayMs: 2100,
        targetAgentState: {
          agent: 'Writer',
          status: 'completed',
          currentTask: 'Completed client documentation package'
        },
        deliverableKey: 'writer',
        deliverableContent: {
          technicalSummary: 'NexusEngine is an ultra-low latency, distributed Python 3.12 async multi-agent orchestrator engineered for zero-data-loss execution across heterogeneous agent clusters.',
          clientCopy: `## NexusEngine v2.4 — Quickstart & Documentation

### 1. Installation
\`\`\`bash
pip install nexus-engine-py
\`\`\`

### 2. Basic Pipeline Definition
\`\`\`python
import asyncio
from nexus_engine import AsyncDAGScheduler, SharedMemoryBus, TaskNode

async def fetch_market_data(memory):
    return {"symbol": "ETH", "price": 3840.50}

async def analyze_sentiment(memory):
    data = await memory.read("task:t1:result")
    return {"sentiment": "BULLISH", "confidence": 0.94}

async def main():
    bus = SharedMemoryBus()
    scheduler = AsyncDAGScheduler(bus)
    
    t1 = TaskNode(task_id="t1", agent_name="Ingestion", action_fn=fetch_market_data)
    t2 = TaskNode(task_id="t2", agent_name="Analyzer", action_fn=analyze_sentiment, dependencies={"t1"})
    
    scheduler.add_task(t1)
    scheduler.add_task(t2)
    
    report = await scheduler.run()
    print("Execution Report:", report)

asyncio.run(main())
\`\`\``,
          faq: [
            {
              q: 'How does the circuit breaker handle external API rate limits?',
              a: 'When 3 consecutive HTTP 429/500 errors occur, the breaker trips to OPEN for 5.0 seconds before testing recovery in HALF_OPEN state.'
            },
            {
              q: 'Is SharedMemoryBus thread-safe across multiple worker threads?',
              a: 'Yes, all state mutations and snapshot rollbacks are guarded by AsyncIO Lock primitives with complete atomic guarantees.'
            }
          ]
        }
      },
      {
        step: 10,
        from: 'MD',
        to: 'Marketer',
        action: 'assign',
        taskTitle: 'GTM Positioning & Launch Copy',
        instructionOrFeedback: 'Rune (Marketer): Prepare the go-to-market positioning, target audience framing, and promotional launch pitch for NexusEngine enterprise release.',
        progress: 96,
        delayMs: 1800,
        targetAgentState: {
          agent: 'Marketer',
          status: 'executing',
          currentTask: 'Drafting GTM launch campaign and enterprise value proposition'
        }
      },
      {
        step: 11,
        from: 'Marketer',
        to: 'MD',
        action: 'output',
        taskTitle: 'GTM Campaign & Launch Strategy Delivered',
        instructionOrFeedback: 'Rune (Marketer): Delivered launch positioning package: "Orchestrate Autonomous Intelligence at Production Scale". Target: AI Engineering Leads and CTOs.',
        progress: 98,
        delayMs: 2000,
        targetAgentState: {
          agent: 'Marketer',
          status: 'completed',
          currentTask: 'Finalized go-to-market materials'
        },
        deliverableKey: 'marketer',
        deliverableContent: {
          launchPitch: `**Stop wrestling with brittle scripts. Run production AI agents with enterprise resilience.**

NexusEngine gives engineering teams a battle-tested Python async orchestration layer with topological DAG resolution, automatic circuit breakers, and zero-downtime state recovery.`,
          taglines: [
            'Orchestrate Autonomous Intelligence at Production Scale.',
            'Zero Unhandled Crashes. Instant State Rollbacks. Pure Python Speed.',
            'The Enterprise Spine for Modern Multi-Agent Systems.'
          ],
          targetAudience: 'VP of Engineering, AI Platform Architects, Autonomous Agent Developers',
          distributionChannels: ['Hacker News Show HN', 'PyData / PyCon Keynote', 'GitHub Trending', 'Enterprise AI Substack']
        }
      },
      {
        step: 12,
        from: 'MD',
        action: 'compile',
        taskTitle: 'Final Deliverable Synthesis & Company Sign-Off',
        instructionOrFeedback: 'Aegis (MD): All 5 specialist subtasks completed with 100% QA audit pass rate. Synthesizing master delivery package for HyperScale Systems Inc. Final company log compiled.',
        progress: 100,
        delayMs: 2500,
        targetAgentState: {
          agent: 'MD',
          status: 'completed',
          currentTask: 'Master deliverable compiled and verified for client delivery'
        },
        deliverableKey: 'finalDeliverable',
        deliverableContent: `# INTEGRATED INNOVATIONS — Executive Master Deliverable

**Client**: HyperScale Systems Inc.  
**Project**: NexusEngine Python Multi-Agent Task Orchestrator  
**Status**: APPROVED & READY FOR PRODUCTION  
**Lead Coordinator**: Aegis (Managing Director)  

---

### Executive Summary
The INTEGRATED INNOVATIONS team has successfully conceptualized, designed, built, audited, documented, and packaged the **NexusEngine v2.4** Python multi-agent orchestration infrastructure.

### Specialist Contributions:
1. **Designer (Nova)**: Established the high-contrast Obsidian telemetry design tokens (\`#06060a\`, \`#ff3d9a\`, \`#4f7dff\`) and real-time DAG monitor topology.
2. **Developer (Vega)**: Built the complete Python 3.12 \`AsyncDAGScheduler\`, \`CircuitBreaker\`, and \`SharedMemoryBus\` with atomic snapshot rollback.
3. **Reviewer (Iris)**: Conducted concurrency and deadlock stress tests; granted full security and architectural certification (Score: 99.4/100).
4. **Writer (Sable)**: Produced developer onboarding documentation, quickstart tutorials, and troubleshooting FAQs.
5. **Marketer (Rune)**: Crafted high-impact GTM positioning, launch pitch deck copy, and enterprise distribution strategies.

### Delivery Package Contents:
- \`nexus_engine.py\` — Core Python AsyncIO source module
- \`TELEMETRY_SPEC.md\` — UX & token design documentation
- \`QA_AUDIT_REPORT.md\` — Concurrency & resilience certification
- \`DEVELOPER_GUIDE.md\` — Complete API quickstart guide
- \`GTM_LAUNCH_KIT.md\` — Product positioning & marketing collateral`
      }
    ]
  },
  {
    id: 'brief-fintech-vault',
    title: 'Neural FinTech DeFi Vault: Smart Router & Security Dashboard',
    client: 'Aegis Capital & Quant Labs',
    industry: 'Algorithmic Trading & Web3 Security',
    difficulty: 'Enterprise',
    summary: 'Develop a high-frequency Python algorithmic router with slippage protection, cryptographic audit logs, and a dark executive portfolio dashboard.',
    requiredAgents: ['MD', 'Designer', 'Developer', 'Reviewer', 'Writer', 'Marketer'],
    fullBrief: `Client Request: Aegis Capital requires an automated Python slippage-resistant trade router and risk-monitoring console.
Requirements:
1. Python async arbitrage calculation engine across decentralized liquidity pools.
2. Real-time value-at-risk (VaR) computation with instant capital safeguard halt.
3. High-contrast dark executive UI with instant order execution feedback.
4. Cryptographic proof-of-reserve validation and full client audit readiness.`,
    workflowSteps: [
      {
        step: 1,
        from: 'MD',
        action: 'brief_received',
        taskTitle: 'Ingesting Quantitative FinTech Brief',
        instructionOrFeedback: 'Aegis (MD): Ingested Aegis Capital DeFi Vault brief. Decomposing into Python mathematical engine, cryptographic safety audits, dark trading UI, and investor deck.',
        progress: 10,
        delayMs: 1400,
        targetAgentState: {
          agent: 'MD',
          status: 'executing',
          currentTask: 'Calculating mathematical risk constraints and allocating agent roles'
        }
      },
      {
        step: 2,
        from: 'MD',
        to: 'Designer',
        action: 'assign',
        taskTitle: 'Executive Portfolio Dashboard Spec',
        instructionOrFeedback: 'Nova (Designer): Create an ultra-dense, high-contrast dark dashboard spec for liquidity pool routing, live gas tracker, and emergency circuit-breaker switch.',
        progress: 25,
        delayMs: 1700,
        targetAgentState: {
          agent: 'Designer',
          status: 'assigned',
          currentTask: 'Designing quantitative trading matrix and slippage indicators'
        }
      },
      {
        step: 3,
        from: 'Designer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Dark Quantitative Trading UI Spec Delivered',
        instructionOrFeedback: 'Nova (Designer): Delivered Bloomberg-inspired dark terminal UX with sub-second visual refresh rates and clear risk warning indicators.',
        progress: 40,
        delayMs: 2000,
        targetAgentState: {
          agent: 'Designer',
          status: 'completed',
          currentTask: 'Delivered trading dashboard UX spec'
        },
        deliverableKey: 'designer',
        deliverableContent: {
          spec: 'High-density dark trading layout with live depth charts, slippage tolerance dials, and instant one-click emergency liquidity withdrawal.',
          palette: ['#06060a', '#0b0f24', '#ff3d9a', '#4f7dff', '#35e0a1'],
          typography: 'Sora for KPIs, JetBrains Mono for order book numbers and decimal precision',
          userFlow: 'Quote Ingestion -> Slippage Simulation -> Dual-Signature Execution -> Settlement Proof',
          notes: 'Added tactile visual feedback on trade confirmation and red emergency pause toggles.'
        }
      },
      {
        step: 4,
        from: 'MD',
        to: 'Developer',
        action: 'assign',
        taskTitle: 'Python Quant Arbitrage & Smart Router Engine',
        instructionOrFeedback: 'Vega (Developer): Write the Python async trade router using numerical matrix optimization, maximum slippage boundaries, and asynchronous order execution.',
        progress: 55,
        delayMs: 2300,
        targetAgentState: {
          agent: 'Developer',
          status: 'executing',
          currentTask: 'Writing Python async order book calculator & slippage guards'
        }
      },
      {
        step: 5,
        from: 'Developer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Python Smart Router Code Delivered',
        instructionOrFeedback: 'Vega (Developer): Python SmartTradeRouter engine complete with async price quotation, maximum 0.15% slippage enforcement, and deterministic state hashing.',
        progress: 70,
        delayMs: 2400,
        targetAgentState: {
          agent: 'Developer',
          status: 'completed',
          currentTask: 'Delivered Python arbitrage router and test suite'
        },
        deliverableKey: 'developer',
        deliverableContent: {
          language: 'python',
          code: `"""
NEXUS AI Office — Quant DeFi Trade Router (SmartTradeRouter v1.8)
Author: Vega (Developer @ NEXUS)
Language: Python 3.12 (AsyncIO, NumPy, Decimal Precision)
"""

import asyncio
from decimal import Decimal
from typing import Dict, List, Optional
import hashlib
import time

class LiquidityPool:
    def __init__(self, name: str, token_a_res: Decimal, token_b_res: Decimal, fee_rate: Decimal = Decimal("0.003")):
        self.name = name
        self.res_a = token_a_res
        self.res_b = token_b_res
        self.fee_rate = fee_rate

    def get_output_amount(self, amount_in: Decimal) -> Decimal:
        amount_in_with_fee = amount_in * (Decimal("1.0") - self.fee_rate)
        numerator = amount_in_with_fee * self.res_b
        denominator = self.res_a + amount_in_with_fee
        return numerator / denominator


class SmartTradeRouter:
    """Async optimal route calculator across multiple decentralized liquidity pools."""
    def __init__(self, max_slippage_pct: Decimal = Decimal("0.0015")) -> None:
        self.max_slippage = max_slippage_pct
        self.pools: Dict[str, LiquidityPool] = {}

    def register_pool(self, pool: LiquidityPool) -> None:
        self.pools[pool.name] = pool

    async def calculate_optimal_split(self, token_in: str, token_out: str, total_amount: Decimal) -> Dict[str, Any]:
        """Calculates optimal order routing across registered pools to minimize price impact."""
        logger.info("Computing routing quote for %s -> %s (Amount: %s)", token_in, token_out, total_amount)
        await asyncio.sleep(0.05) # Sub-second async fetch
        
        best_pool = None
        max_output = Decimal("0.0")
        
        for name, pool in self.pools.items():
            expected_out = pool.get_output_amount(total_amount)
            if expected_out > max_output:
                max_output = expected_out
                best_pool = name
                
        execution_hash = hashlib.sha256(f"{best_pool}:{total_amount}:{time.time()}".encode()).hexdigest()
        return {
            "best_route": best_pool,
            "input_amount": str(total_amount),
            "expected_output": str(max_output.quantize(Decimal("0.000001"))),
            "slippage_protected": True,
            "execution_hash": execution_hash[:16]
        }
`,
          notes: 'Uses exact Decimal arithmetic to eliminate IEEE-754 floating point rounding vulnerabilities in financial trade execution.'
        }
      },
      {
        step: 6,
        from: 'MD',
        to: 'Reviewer',
        action: 'review_request',
        taskTitle: 'Security & Precision Audit Request',
        instructionOrFeedback: 'Iris (Reviewer): Verify arithmetic precision in Decimal calculations, verify front-running protection, and audit reentrancy safeguards.',
        progress: 80,
        delayMs: 2000,
        targetAgentState: {
          agent: 'Reviewer',
          status: 'reviewing',
          currentTask: 'Auditing floating point precision & slippage boundary tests'
        }
      },
      {
        step: 7,
        from: 'Reviewer',
        to: 'MD',
        action: 'verdict',
        taskTitle: 'Audit Passed — Zero Precision Drift',
        instructionOrFeedback: 'Iris (Reviewer): APPROVE. No floating point hazards found. Slippage protection correctly enforces strict bounding before order submission.',
        progress: 88,
        delayMs: 1900,
        targetAgentState: {
          agent: 'Reviewer',
          status: 'completed',
          currentTask: 'Issued financial security audit seal'
        },
        deliverableKey: 'reviewer',
        deliverableContent: {
          verdict: 'approve',
          score: 100.0,
          criteriaChecked: [
            'Decimal arithmetic precision verified to 18 decimal places',
            'Slippage boundary checks trigger deterministic rollback on drift',
            'SHA-256 state hashing ensures tamper-evident execution trail'
          ],
          feedback: 'Exemplary mathematical safeguards implemented.'
        }
      },
      {
        step: 8,
        from: 'MD',
        to: 'Writer',
        action: 'assign',
        taskTitle: 'Institutional Investor Whitepaper & Docs',
        instructionOrFeedback: 'Sable (Writer): Draft the institutional documentation explaining the risk-mitigation framework and mathematical router mechanics.',
        progress: 92,
        delayMs: 1800,
        targetAgentState: {
          agent: 'Writer',
          status: 'executing',
          currentTask: 'Drafting institutional whitepaper summary'
        }
      },
      {
        step: 9,
        from: 'Writer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Whitepaper & Technical Docs Delivered',
        instructionOrFeedback: 'Sable (Writer): Delivered Institutional Technical Brief covering zero-slippage execution proofs and regulatory compliance.',
        progress: 96,
        delayMs: 1800,
        targetAgentState: {
          agent: 'Writer',
          status: 'completed',
          currentTask: 'Finalized institutional documentation'
        },
        deliverableKey: 'writer',
        deliverableContent: {
          technicalSummary: 'Aegis SmartRouter provides institutional liquidity routing with sub-millisecond execution guarantees and mathematically bounded slippage.',
          clientCopy: 'Comprehensive institutional overview of liquidity routing, automated VaR stops, and cryptographic audit proofs.',
          faq: [{ q: 'How is front-running prevented?', a: 'By embedding deterministic order commit-reveal hashes directly into async transaction batches.' }]
        }
      },
      {
        step: 10,
        from: 'MD',
        to: 'Marketer',
        action: 'assign',
        taskTitle: 'Quant Fund Positioning & Pitch',
        instructionOrFeedback: 'Rune (Marketer): Prepare the institutional pitch deck positioning for sovereign wealth funds and quantitative hedge funds.',
        progress: 98,
        delayMs: 1700,
        targetAgentState: {
          agent: 'Marketer',
          status: 'executing',
          currentTask: 'Crafting institutional fund pitch copy'
        }
      },
      {
        step: 11,
        from: 'Marketer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Institutional Pitch Deck Copy Completed',
        instructionOrFeedback: 'Rune (Marketer): Completed pitch: "Institutional Alpha. Zero Compromise Security. Real-Time Liquidity Routing."',
        progress: 99,
        delayMs: 1700,
        targetAgentState: {
          agent: 'Marketer',
          status: 'completed',
          currentTask: 'Finalized fund pitch deck positioning'
        },
        deliverableKey: 'marketer',
        deliverableContent: {
          launchPitch: 'Unleash algorithmic arbitrage with cryptographic proof of safety and automated risk circuit breakers.',
          taglines: ['Institutional Execution. Mathematical Precision.', 'Zero Slippage. Maximum Alpha.'],
          targetAudience: 'Hedge Fund CIOs, Quantitative Desk Leads, Treasury Officers',
          distributionChannels: ['Bloomberg Terminal Syndication', 'Institutional Crypto Summit', 'Quant Finance Review']
        }
      },
      {
        step: 12,
        from: 'MD',
        action: 'compile',
        taskTitle: 'Institutional Deliverable Compiled',
        instructionOrFeedback: 'Aegis (MD): All subtasks completed and verified. Compiling master delivery dossier for Aegis Capital.',
        progress: 100,
        delayMs: 2000,
        targetAgentState: {
          agent: 'MD',
          status: 'completed',
          currentTask: 'All tasks completed. Final dossier compiled and signed off.'
        },
        deliverableKey: 'finalDeliverable',
        deliverableContent: `# INTEGRATED INNOVATIONS — Quant DeFi Vault Final Deliverable

**Client**: Aegis Capital & Quant Labs  
**Project**: SmartTradeRouter & Quantitative Security Engine  
**Lead Coordinator**: Aegis (Managing Director)  
**Status**: VERIFIED & DEPLOYED  

### Final Package Overview:
1. **Python Math Engine**: Async routing with zero floating-point drift (\`smart_trade_router.py\`).
2. **UX Specification**: High-density dark dashboard with live depth meters and emergency circuit breakers.
3. **Audit Certification**: 100/100 cryptographic precision audit by Iris.
4. **Investor Whitepaper**: Comprehensive regulatory & operational documentation.
5. **Pitch Collateral**: Institutional marketing deck and executive positioning.`
      }
    ]
  },
  {
    id: 'brief-ai-health',
    title: 'AI Health Pulse: Real-Time Diagnostic Wearable Companion',
    client: 'BioSync Technologies',
    industry: 'Digital Health & Biomedical AI',
    difficulty: 'Advanced',
    summary: 'Create a HIPAA-compliant Python biometric stream analysis engine with anomaly detection, empathetic patient UI, and clinical docs.',
    requiredAgents: ['MD', 'Designer', 'Developer', 'Reviewer', 'Writer', 'Marketer'],
    fullBrief: `Client Request: BioSync needs an end-to-end wearable health analytics pipeline:
1. Python engine for real-time ECG and HRV anomaly classification.
2. Calming, accessible patient dashboard with high-legibility vitals.
3. Strict HIPAA and data security compliance audit.
4. Empathetic patient communication guide and clinical trial marketing package.`,
    workflowSteps: [
      {
        step: 1,
        from: 'MD',
        action: 'brief_received',
        taskTitle: 'BioSync Ingestion & Compliance Planning',
        instructionOrFeedback: 'Aegis (MD): Ingested BioSync Health project. Prioritizing Python biometric stream processing, accessible UI, and clinical validation.',
        progress: 15,
        delayMs: 1400,
        targetAgentState: {
          agent: 'MD',
          status: 'executing',
          currentTask: 'Structuring clinical AI pipeline and compliance milestones'
        }
      },
      {
        step: 2,
        from: 'MD',
        to: 'Designer',
        action: 'assign',
        taskTitle: 'Accessible Health Dashboard Design',
        instructionOrFeedback: 'Nova (Designer): Design a calming, dark patient interface with large biometric readouts (Heart Rate, HRV, SpO2) and empathetic color coding.',
        progress: 30,
        delayMs: 1700,
        targetAgentState: {
          agent: 'Designer',
          status: 'assigned',
          currentTask: 'Designing calming biometric card components & contrast states'
        }
      },
      {
        step: 3,
        from: 'Designer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Health UI Design Spec Delivered',
        instructionOrFeedback: 'Nova (Designer): Completed BioSync visual design system: Calming dark navy backdrop with emerald safe zones and amber elevated alerts.',
        progress: 45,
        delayMs: 2000,
        targetAgentState: {
          agent: 'Designer',
          status: 'completed',
          currentTask: 'Delivered patient UI design specification'
        },
        deliverableKey: 'designer',
        deliverableContent: {
          spec: 'High-legibility biometric dashboard with soothing pulse rhythms, zero medical jargon, and one-tap emergency doctor dispatch.',
          palette: ['#06060a', '#0b0f24', '#35e0a1', '#ff3d9a', '#38bdf8'],
          typography: 'Sora (Large high-contrast numbers), JetBrains Mono (Device telemetry data)',
          userFlow: 'Sensor Sync -> Continuous Real-Time Anomaly Filter -> Daily Wellness Insight -> Doctor Summary',
          notes: 'Exceeds WCAG AAA accessibility contrast for senior patients.'
        }
      },
      {
        step: 4,
        from: 'MD',
        to: 'Developer',
        action: 'assign',
        taskTitle: 'Python Biometric Stream Anomaly Classifier',
        instructionOrFeedback: 'Vega (Developer): Write the Python real-time anomaly detection engine for continuous ECG/HRV streaming with sliding window moving averages.',
        progress: 60,
        delayMs: 2200,
        targetAgentState: {
          agent: 'Developer',
          status: 'executing',
          currentTask: 'Developing Python sliding-window anomaly detector'
        }
      },
      {
        step: 5,
        from: 'Developer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Python Biometric Classifier Delivered',
        instructionOrFeedback: 'Vega (Developer): Delivered BiometricStreamClassifier in Python 3.12 with async buffer processing, z-score outlier detection, and local encrypted caching.',
        progress: 75,
        delayMs: 2300,
        targetAgentState: {
          agent: 'Developer',
          status: 'completed',
          currentTask: 'Delivered Python biometric engine and test validation'
        },
        deliverableKey: 'developer',
        deliverableContent: {
          language: 'python',
          code: `"""
NEXUS AI Office — Real-Time Biometric Stream Classifier (BioPulse v3.1)
Author: Vega (Developer @ NEXUS)
Language: Python 3.12 (AsyncIO, NumPy, Encrypted Storage)
"""

import asyncio
from collections import deque
from dataclasses import dataclass
from typing import List, Optional
import math

@dataclass
class BiometricSample:
    timestamp_ms: int
    heart_rate: float
    hrv_ms: float
    spo2_pct: float

class BiometricStreamClassifier:
    """Real-time sliding window statistical anomaly detector for patient health streams."""
    def __init__(self, window_size: int = 120, z_threshold: float = 2.8) -> None:
        self.window_size = window_size
        self.z_threshold = z_threshold
        self.history = deque(maxlen=window_size)

    async def ingest_sample(self, sample: BiometricSample) -> dict:
        self.history.append(sample)
        if len(self.history) < 10:
            return {"status": "CALIBRATING", "samples_needed": 10 - len(self.history)}

        # Async calculation of sliding mean & std dev
        hrs = [s.heart_rate for s in self.history]
        mean = sum(hrs) / len(hrs)
        variance = sum((x - mean) ** 2 for x in hrs) / len(hrs)
        std_dev = math.sqrt(variance) or 1.0

        current_z = abs(sample.heart_rate - mean) / std_dev
        is_anomaly = current_z > self.z_threshold

        return {
            "timestamp": sample.timestamp_ms,
            "current_hr": sample.heart_rate,
            "window_mean_hr": round(mean, 1),
            "z_score": round(current_z, 2),
            "is_anomaly": is_anomaly,
            "alert_level": "CRITICAL" if is_anomaly and sample.heart_rate > 140 else "NORMAL"
        }
`,
          notes: 'Lightweight O(1) sliding window computations with zero memory bloat over months of continuous telemetry.'
        }
      },
      {
        step: 6,
        from: 'MD',
        to: 'Reviewer',
        action: 'review_request',
        taskTitle: 'Clinical Safety & HIPAA Audit',
        instructionOrFeedback: 'Iris (Reviewer): Audit the Python biometric code for false-positive handling, HIPAA compliance standards, and edge-case cardiac telemetry safety.',
        progress: 84,
        delayMs: 1900,
        targetAgentState: {
          agent: 'Reviewer',
          status: 'reviewing',
          currentTask: 'Reviewing clinical anomaly thresholds and false positive rates'
        }
      },
      {
        step: 7,
        from: 'Reviewer',
        to: 'MD',
        action: 'verdict',
        taskTitle: 'Clinical QA Certified — Passed',
        instructionOrFeedback: 'Iris (Reviewer): APPROVE. Anomaly detection algorithm is robust with zero divide-by-zero risks and strict data privacy compliance.',
        progress: 90,
        delayMs: 2000,
        targetAgentState: {
          agent: 'Reviewer',
          status: 'completed',
          currentTask: 'Approved clinical biometric safety verification'
        },
        deliverableKey: 'reviewer',
        deliverableContent: {
          verdict: 'approve',
          score: 99.1,
          criteriaChecked: [
            'Sliding window bounds check prevents memory leaks',
            'Zero unhandled mathematical singularities during zero variance',
            'HIPAA patient telemetry de-identification verified'
          ],
          feedback: 'Clinical safety benchmarks met with highest rating.'
        }
      },
      {
        step: 8,
        from: 'MD',
        to: 'Writer',
        action: 'assign',
        taskTitle: 'Patient Guide & Clinical Explanations',
        instructionOrFeedback: 'Sable (Writer): Write empathetic, accessible patient guidance explaining how the AI companion reads heart rhythms and calms anxiety.',
        progress: 94,
        delayMs: 1700,
        targetAgentState: {
          agent: 'Writer',
          status: 'executing',
          currentTask: 'Writing patient-friendly health guide'
        }
      },
      {
        step: 9,
        from: 'Writer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Empathetic Patient Guide Delivered',
        instructionOrFeedback: 'Sable (Writer): Completed patient guide: "Understanding Your Heart’s Rhythm — Simple, Calming Insights Every Day".',
        progress: 97,
        delayMs: 1700,
        targetAgentState: {
          agent: 'Writer',
          status: 'completed',
          currentTask: 'Delivered patient-facing documentation'
        },
        deliverableKey: 'writer',
        deliverableContent: {
          technicalSummary: 'BioPulse processes continuous cardiac signals into understandable, actionable daily wellness recommendations.',
          clientCopy: 'Empathetic patient manual designed to reduce health anxiety while providing precise medical telemetry for doctors.',
          faq: [{ q: 'What happens if my watch detects an irregular pulse?', a: 'Your companion gently guides you through a breathing check and packages a 30-second trace for your cardiologist.' }]
        }
      },
      {
        step: 10,
        from: 'MD',
        to: 'Marketer',
        action: 'assign',
        taskTitle: 'Clinical Launch Campaign',
        instructionOrFeedback: 'Rune (Marketer): Prepare the launch narrative for cardiology clinics and consumer health enthusiasts.',
        progress: 99,
        delayMs: 1600,
        targetAgentState: {
          agent: 'Marketer',
          status: 'executing',
          currentTask: 'Writing medical device launch copy'
        }
      },
      {
        step: 11,
        from: 'Marketer',
        to: 'MD',
        action: 'output',
        taskTitle: 'Clinical Launch Package Delivered',
        instructionOrFeedback: 'Rune (Marketer): Finished campaign: "Your Heart’s Quiet Guardian. Clinical Precision on Your Wrist."',
        progress: 99,
        delayMs: 1600,
        targetAgentState: {
          agent: 'Marketer',
          status: 'completed',
          currentTask: 'Completed clinical launch strategy'
        },
        deliverableKey: 'marketer',
        deliverableContent: {
          launchPitch: 'Continuous clinical-grade heart intelligence in a wearable companion patients actually love to wear.',
          taglines: ['Your Heart’s Quiet Guardian.', 'Predictive Care Before the Warning Signs.'],
          targetAudience: 'Cardiologists, Preventive Health Patients, Wearable Tech Early Adopters',
          distributionChannels: ['American Heart Association Expo', 'MedGadget', 'Apple Health Partner Network']
        }
      },
      {
        step: 12,
        from: 'MD',
        action: 'compile',
        taskTitle: 'BioSync Final Deliverable Compiled',
        instructionOrFeedback: 'Aegis (MD): Master health package compiled and ready for clinical deployment.',
        progress: 100,
        delayMs: 2000,
        targetAgentState: {
          agent: 'MD',
          status: 'completed',
          currentTask: 'All deliverables synthesized and signed off.'
        },
        deliverableKey: 'finalDeliverable',
        deliverableContent: `# INTEGRATED INNOVATIONS — BioPulse Healthcare Final Deliverable

**Client**: BioSync Technologies  
**Project**: BioPulse Real-Time Cardiac Stream Classifier  
**Status**: CLINICALLY VERIFIED & APPROVED  
**Lead Coordinator**: Aegis (Managing Director)  

### Master Deliverables:
- \`biopulse_classifier.py\` — Python real-time anomaly detection algorithm
- \`PATIENT_UX_SPEC.md\` — High-accessibility dark UI specification
- \`CLINICAL_AUDIT_REPORT.md\` — HIPAA and telemetry safety certification (Score: 99.1%)
- \`PATIENT_GUIDE.md\` — Empathetic patient wellness manual
- \`GTM_CLINICAL_KIT.md\` — Cardiology partnership & launch collateral`
      }
    ]
  }
];
