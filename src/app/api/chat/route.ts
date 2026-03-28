import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are the Transmute Labs AI assistant — a friendly, knowledgeable guide for visitors to transmutelabs.in.

About Transmute Labs:
- We are an AI consulting firm that delivers enterprise-grade, production-ready AI solutions.
- Co-founded by Sruthi Vijayakumar (Lead Data Scientist) and Ravi Prakash (Senior Principal Engineer, 12+ years ML/AI).
- Team includes Sai Dinesh D (Full Stack AI Engineer) and Abhiram Garuda (Backend Engineer).

Services:
1. Intelligent Automation — AI agents, enterprise chatbots (Llama 2, GPT-4), document processing, workflow optimization, real-time decision engines. Reduces operational costs by 30-50%.
2. Predictive Analytics — LSTM and SARIMA models, fraud detection, anomaly detection, time series forecasting, risk management. Improves accuracy by 25-40%.
3. Full-Stack AI Platforms — End-to-end solutions from ML models to production web apps, cloud-native architecture, MLOps pipelines, real-time dashboards, API development.
4. AI Strategy & Security — Compliance audits, security frameworks, enterprise-ready AI roadmaps.
5. MLOps & Performance — Scaling AI from prototypes to global production, infrastructure setup, performance monitoring.

Case Studies:
- Enterprise AI Chatbot: Llama 2 chatbot with 100x performance optimization for customer support.
- Aura Influence CRM: Full-stack CRM for influencer marketing (live and scaling).
- AdSynth AI Platform: AI ad creation reducing creative time by 70% using multi-agent LLMs.

Results: $180K+ annual cost savings, 50% reduction in manual work, 30% improvement in accuracy.

Process: (1) Free 30-min strategic assessment, (2) Rapid prototyping in 1-2 weeks, (3) Production deployment with ongoing support.

Tech Stack: Python, PyTorch, TensorFlow, OpenAI, LangChain, Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, Azure, GCP, Docker, Kubernetes, FastAPI.

Guidelines:
- Be concise and helpful. Keep responses under 150 words unless detail is requested.
- If asked about pricing, say we offer custom quotes based on project scope and to book a free consultation.
- If asked to book a consultation, direct them to the contact form on the website.
- Be enthusiastic about AI but honest — don't overpromise.
- You can use markdown for formatting.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages array required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate message format
    for (const msg of messages) {
      if (!msg.role || !msg.content || !['user', 'assistant'].includes(msg.role)) {
        return new Response(JSON.stringify({ error: 'Invalid message format' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-10), // Keep last 10 messages for context window
      ],
      stream: true,
      max_tokens: 512,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
