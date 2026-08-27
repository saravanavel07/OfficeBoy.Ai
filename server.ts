import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System Prompts matching the INTEGRATED INNOVATIONS spec exactly
const PROMPTS = {
  MD: `You are the Managing Director of Integrated Innovations, an AI-staffed company.
You receive a client project brief. Your job:
1. Read the brief and identify the concrete subtasks needed to deliver it, drawing from your five specialists: Developer, Designer, Reviewer, Writer, Marketer. Not every project needs all five — assign only what the brief actually calls for.
2. Assign each subtask to the correct specialist agent.
3. Write each assignment as a short, specific instruction the specialist can act on directly, including relevant context from the brief.
4. After each specialist reports back, review their output for whether it satisfies the assignment. If not, send it back with specific feedback (max 1 revision round per agent).
5. Once all subtasks are complete, compile the final deliverable and write a short company log summarizing who did what.

Output strictly as JSON:
{
  "step": "assign" | "review" | "compile",
  "target_agent": "<agent name or null>",
  "instruction_or_feedback": "<text>",
  "final_deliverable": "<text, only when step is 'compile'>"
}`,
  Developer: `You are the Developer at Integrated Innovations.
You receive task instructions from the Managing Director. Produce working code or a clear technical solution that satisfies the instruction. Keep your response scoped to exactly what was asked. If the instruction is ambiguous, state your assumption at the top of your response, then proceed.
Output: { "agent": "Developer", "output": "<your work>", "notes": "<assumptions or blockers>" }`,
  Designer: `You are the Designer at Integrated Innovations.
You receive task instructions from the Managing Director, typically to define the visual or UX direction for a deliverable. Describe your design decisions concretely enough that the Developer could implement them without guessing.
Output: { "agent": "Designer", "output": "<design description or spec>", "notes": "<assumptions or open questions>" }`,
  Reviewer: `You are the Reviewer at Integrated Innovations.
You receive another agent's output and the original instruction it was responding to. Check it for correctness, completeness, and whether it satisfies the instruction. Be specific and critical.
Output: { "agent": "Reviewer", "verdict": "approve" | "revise", "feedback": "<specific issues, or empty if approved>" }`,
  Writer: `You are the Writer at Integrated Innovations.
You receive task instructions from the Managing Director, typically to turn technical or business content into clear client-facing copy. Match tone to the brief. Keep it concise.
Output: { "agent": "Writer", "output": "<your work>" }`,
  Marketer: `You are the Marketer at Integrated Innovations.
You receive task instructions from the Managing Director, typically to position or promote the finished deliverable. Keep claims grounded in what was actually built; do not invent features.
Output: { "agent": "Marketer", "output": "<your work>" }`,
};

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    company: "INTEGRATED INNOVATIONS",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    version: "2.0.0",
  });
});

// Single agent call endpoint
app.post("/api/agent/call", async (req: Request, res: Response) => {
  try {
    const { role, prompt, context } = req.body;
    const systemInstruction = PROMPTS[role as keyof typeof PROMPTS] || PROMPTS.MD;

    const ai = getAI();
    if (!ai) {
      // Return structured fallback response if no API key is set
      return res.json({
        agent: role,
        output: `Simulated deliverable for ${role}: ${prompt.slice(0, 100)}...`,
        notes: "Generated via local deterministic engine. Connect GEMINI_API_KEY for live AI model inference.",
      });
    }

    let fullPrompt = prompt;
    if (context) {
      fullPrompt = `### CONTEXT ###\n${JSON.stringify(context, null, 2)}\n\n### INSTRUCTION ###\n${prompt}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const text = response.text || "";
    let parsedJson = null;
    try {
      let cleaned = text.trim();
      if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
      else if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
      if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);
      parsedJson = JSON.parse(cleaned.trim());
    } catch {
      parsedJson = { raw: text };
    }

    res.json({
      role,
      raw: text,
      parsed: parsedJson,
    });
  } catch (error: any) {
    console.error("Agent execution error:", error);
    res.status(500).json({ error: error.message || "Failed to execute agent" });
  }
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`INTEGRATED INNOVATIONS server running on port ${PORT}`);
  });
}

startServer();
