/**
 * INTEGRATED INNOVATIONS — Live Dashboard Real-Time Updater
 * Listens to Server-Sent Events (SSE) from /api/events and updates DOM dynamically.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveStream();
});

let eventSource = null;
let lastRenderedEventCount = 0;

function initLiveStream() {
  if (window.EventSource) {
    eventSource = new EventSource('/api/events');

    eventSource.onmessage = (event) => {
      try {
        const state = JSON.parse(event.data);
        renderState(state);
      } catch (err) {
        console.error('Error parsing SSE payload:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.warn('SSE disconnected, falling back to polling every 1.5s', err);
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
      setInterval(pollState, 1500);
    };
  } else {
    setInterval(pollState, 1500);
  }
}

async function pollState() {
  try {
    const res = await fetch('/api/state');
    if (res.ok) {
      const state = await res.json();
      renderState(state);
    }
  } catch (err) {
    console.error('Polling error:', err);
  }
}

function renderState(state) {
  if (!state) return;

  // 1. Global Status Pill
  const statusPill = document.getElementById('global-status-text');
  if (statusPill) {
    statusPill.textContent = (state.status || 'ONLINE').toUpperCase();
  }

  // 2. MD Card Updates
  const mdData = state.active_agents?.MD || {};
  const mdTask = document.getElementById('md-task');
  const mdStatus = document.getElementById('md-status');
  const mdProgress = document.getElementById('md-progress');
  const mdProgressText = document.getElementById('md-progress-text');

  if (mdTask && mdData.task) mdTask.textContent = mdData.task;
  if (mdStatus && mdData.status) mdStatus.textContent = mdData.status.toUpperCase();
  if (mdProgress) mdProgress.style.width = `${state.progress || 10}%`;
  if (mdProgressText) mdProgressText.textContent = `${state.progress || 10}%`;

  // 3. Specialist Agents Updates
  const roleMapping = {
    Developer: { task: 'dev-task', progress: 'dev-progress' },
    Designer: { task: 'designer-task', progress: 'designer-progress' },
    Reviewer: { task: 'reviewer-task', progress: 'reviewer-progress' },
    Writer: { task: 'writer-task', progress: 'writer-progress' },
    Marketer: { task: 'marketer-task', progress: 'marketer-progress' }
  };

  for (const [role, elementIds] of Object.entries(roleMapping)) {
    const agent = state.active_agents?.[role];
    if (agent) {
      const taskEl = document.getElementById(elementIds.task);
      const progressEl = document.getElementById(elementIds.progress);
      if (taskEl && agent.task) taskEl.textContent = agent.task;
      if (progressEl) progressEl.style.width = `${agent.progress || 0}%`;
    }
  }

  // 4. Live Events in Terminal Log
  const events = state.events || [];
  const eventBadge = document.getElementById('event-count-badge');
  const terminal = document.getElementById('log-terminal');

  if (eventBadge) eventBadge.textContent = `${events.length} EVENTS`;

  if (terminal && events.length > lastRenderedEventCount) {
    // Append new events
    for (let i = lastRenderedEventCount; i < events.length; i++) {
      const ev = events[i];
      const entry = document.createElement('div');
      entry.className = 'log-entry';

      const tagClass = getTagClass(ev.from);
      entry.innerHTML = `
        <span class="log-time">[${ev.timestamp || '00:00:00'}]</span>
        <span class="log-tag ${tagClass}">${ev.from || 'SYSTEM'}</span>
        <span class="log-msg">${escapeHtml(ev.content)}</span>
      `;
      terminal.appendChild(entry);
    }
    lastRenderedEventCount = events.length;
    terminal.scrollTop = terminal.scrollHeight;
  }
}

function getTagClass(role) {
  switch (role) {
    case 'MD': return 'tag-md';
    case 'Developer': return 'tag-dev';
    case 'Designer': return 'tag-designer';
    case 'Reviewer': return 'tag-reviewer';
    case 'Writer': return 'tag-writer';
    case 'Marketer': return 'tag-marketer';
    default: return 'tag-system';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function openNewBriefModal() {
  const brief = prompt(
    "Enter Client Project Scope for Integrated Innovations:",
    "Develop an automated Python invoice processing and audit engine with async OCR extraction, fraud risk scoring, and a high-contrast dark dashboard."
  );
  if (brief && brief.trim()) {
    fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief: brief.trim(), client: 'Client Enterprise Corp' })
    })
    .then(r => r.json())
    .then(data => {
      console.log('Project started:', data);
    })
    .catch(err => console.error('Failed to trigger project:', err));
  }
}
