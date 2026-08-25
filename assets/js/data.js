/* ============================================================
   ai.engineer — shared site data
   Edit this file to update content across the whole site.
   ============================================================ */

const SITE = {
  brand: "ai.engineer",
  email: "ravurisrinu989@gmail.com",
  github: "https://github.com/Srinuravuri",
  linkedin: "https://www.linkedin.com/in/srinu-ravuri-84722b290",
  twitter: "https://x.com/srinuravuri", // TODO: verify your handle
  tagline: "AI Engineer building production LLM products: RAG systems, autonomous agents, and automation workflows.",
  copyrightYear: new Date().getFullYear(),
};

const PROJECTS = [
  {
    title: "Data Professional Survey Dashboard",
    metric: "630 survey responses",
    description: "Power BI dashboard analyzing data professional salaries, job satisfaction, geography, and career insights.",
    tags: ["Power BI", "Data Analysis", "DAX"],
    category: "AI Products",
    link: "https://github.com/Srinuravuri/data-professional-survey-dashboard",
  },
  {
    title: "RAG Knowledge Base",
    metric: "98% answer accuracy",
    description: "Enterprise document Q&A with semantic search — ingests PDFs and internal docs, answers with citations.",
    tags: ["LangChain", "Pinecone", "Next.js"],
    category: "AI Products",
    link: "https://github.com/Srinuravuri",
  },
  {
    title: "Autonomous Agent",
    metric: "10x faster task execution",
    description: "Multi-step task execution with tool calling — plans, calls tools, and verifies results without human steps.",
    tags: ["OpenAI", "LangGraph", "Python"],
    category: "AI Products",
    link: "https://github.com/Srinuravuri",
  },
  {
    title: "Resume Chatbot",
    metric: "Live demo",
    description: "Interactive chatbot that answers questions about experience, skills, and projects — try it in the AI Lab.",
    tags: ["React", "LLM", "RAG"],
    category: "AI Products",
    link: "ai-lab.html",
  },
  {
    title: "Contact Form → n8n → Email",
    metric: "Production automation",
    description: "The form on this site: submissions POST to an n8n webhook, which emails the owner in real time.",
    tags: ["n8n", "Webhook", "Gmail"],
    category: "Automations",
    link: "contact.html",
  },
  {
    title: "Content Automation Suite",
    metric: "Saves hours weekly",
    description: "n8n + OpenAI workflows that draft, schedule, and post social content from a single prompt queue.",
    tags: ["n8n", "OpenAI", "Zapier"],
    category: "Automations",
    link: "https://github.com/Srinuravuri",
  },
  {
    title: "Code Explainer",
    metric: "Live demo",
    description: "Paste any snippet and get a plain-English explanation with complexity notes — try it in the AI Lab.",
    tags: ["LLM", "Web app"],
    category: "AI Products",
    link: "ai-lab.html",
  },
];

const POSTS = [
  {
    slug: "rag-systems-in-production",
    title: "Building Production RAG Systems That Actually Work",
    category: "AI",
    date: "Jul 2026",
    readTime: "8 min",
    excerpt: "Most RAG demos fail in production. Here's what I learned shipping real retrieval systems: chunking strategy, reranking, and evaluation before launch.",
    body: [
      ["p", "RAG is easy to demo and hard to ship. In this post I'll walk through the failures I hit and the patterns that fixed them."],
      ["h3", "1. Chunking is a product decision"],
      ["p", "Fixed-size chunks ignore document structure. Use headings and tables as boundaries — chunk by section, not by character count. Keep an eye on token budgets per chunk relative to your model context."],
      ["h3", "2. Rerank before you answer"],
      ["p", "Vector similarity alone surfaces decent candidates but poor answers. A small cross-encoder reranker between retrieval and generation lifts answer accuracy dramatically — I've measured 5–8 points on internal benchmarks."],
      ["h3", "3. Evaluate before you launch"],
      ["p", "Build a golden set of 100–200 real questions with expected answers, and run it on every change. Without this, every prompt tweak is a gamble."],
      ["h3", "4. Show citations or it didn't happen"],
      ["p", "Users trust grounded answers. Return source references with every answer so failures are auditable."],
      ["p", "Ship retrieval last — first solve ingestion, storage, and a clean query interface. The model is the easy part."],
    ],
  },
  {
    slug: "automation-stack-2026",
    title: "The Automation Stack Every AI Engineer Needs",
    category: "Automation",
    date: "Jun 2026",
    readTime: "6 min",
    excerpt: "n8n, Zapier, Make — which one to pick for AI workflows in 2026, and the mental model I use to choose.",
    body: [
      ["p", "You don't need more tools. You need the right trigger-to-action pipeline. Here's how I decide."],
      ["h3", "n8n: self-hosted power"],
      ["p", "n8n wins when you need full control: webhooks, custom code, on-prem data, and a single node that calls any API. Everything on this site's contact form runs through an n8n webhook."],
      ["h3", "Zapier / Make: speed over control"],
      ["p", "If the integration is a well-trodden path (Gmail → Sheets → Slack) and you don't want to run infrastructure, a managed platform is the pragmatic choice."],
      ["h3", "The decision rule"],
      ["p", "Ask: does this workflow ever need custom logic, private data, or heavy AI calls? If yes, n8n. Otherwise, managed. My default stack: n8n + OpenAI nodes + webhooks."],
    ],
  },
  {
    slug: "prompt-engineering-patterns",
    title: "Prompt Patterns That Survive Production",
    category: "AI",
    date: "May 2026",
    readTime: "7 min",
    excerpt: "Six prompt patterns I reuse across products — role scoping, structured output, chain-of-thought, few-shot, guardrails, and eval loops.",
    body: [
      ["p", "Prompts are code. They should be versioned, tested, and reviewed like any other piece of a system."],
      ["h3", "1. Role + goal + constraints"],
      ["p", "Open with who the model is, what it must accomplish, and hard constraints. This single change stabilizes output more than anything else."],
      ["h3", "2. Structured output"],
      ["p", "Ask for JSON with a defined schema and validate it with a parser. Never trust free-form text as an API contract."],
      ["h3", "3. Few-shot examples"],
      ["p", "Two or three examples beat paragraphs of instructions for format-sensitive tasks. Show the shape of the answer, not just the rules."],
      ["h3", "4. Guardrails and fallbacks"],
      ["p", "Wrap every call with retries, timeouts, and a rule-based fallback so the product degrades gracefully when the model misbehaves."],
    ],
  },
  {
    slug: "developer-to-ai-engineer",
    title: "From Developer to AI Engineer: My Path",
    category: "Career",
    date: "Apr 2026",
    readTime: "12 min",
    excerpt: "The roadmap I wish I had when transitioning into AI engineering — and the projects that actually built the skills.",
    body: [
      ["p", "Three years ago I was shipping web apps. Today I build LLM products. The transition wasn't about learning every paper — it was about shipping."],
      ["h3", "Phase 1: Build the basics"],
      ["p", "Learn the API layer first: chat completions, embeddings, structured output. Then retrieval: vector stores and chunking. Then agents: tool calling and loops."],
      ["h3", "Phase 2: Ship one real product"],
      ["p", "The gap between tutorial and production is where the learning happens. My RAG knowledge base was the project that taught me evaluation, latency, and cost control."],
      ["h3", "Phase 3: Automation mindset"],
      ["p", "AI engineers who also automate workflows are worth more than either skill alone. Learn n8n or similar, and wire AI into real business processes."],
      ["p", "The throughline: solve a real problem end to end. Everything else follows."],
    ],
  },
  {
    slug: "learning-ai-2026",
    title: "Learning AI in 2026: What Actually Matters",
    category: "Learning",
    date: "Mar 2026",
    readTime: "7 min",
    excerpt: "Skip the hype, learn the fundamentals: context, tokens, embeddings, evals, and cost. A practical curriculum.",
    body: [
      ["p", "The AI field moves fast, but the fundamentals move slowly. Here's the curriculum I recommend to anyone starting."],
      ["h3", "Foundations (2 weeks)"],
      ["p", "Tokens, context windows, temperature, embeddings, and the difference between training and inference. No math required to start."],
      ["h3", "Build (1 month)"],
      ["p", "Ship two small products: a RAG chatbot over your own notes, and an automation that uses tool calling. Post them publicly."],
      ["h3", "Evaluate (ongoing)"],
      ["p", "Learn evals early: golden sets, metrics, and A/B tests. Everyone can demo; few can measure. Measurement is the career skill."],
      ["p", "Ignore the daily noise. The models change every month, but systems thinking compounds."],
    ],
  },
];

const TIMELINE = [
  { year: "2022", title: "Started coding journey", detail: "Built first web apps with React and Node.js." },
  { year: "2023", title: "Discovered AI/ML", detail: "Built ML models and explored deep learning fundamentals." },
  { year: "2024", title: "Went all-in on LLMs", detail: "Shipped AI products using GPT-4, Claude, and LangChain." },
  { year: "2025", title: "Automation & Agents", detail: "Focused on autonomous agents and end-to-end n8n workflows." },
  { year: "2026", title: "Building for production", detail: "Shipping AI products that scale — with real users and real evaluation." },
];

const RESUME = {
  name: "Srinu Ravuri",
  title: "Data Analyst",
  contact: "ravurisrinu989@gmail.com",
  location: "Vijayawada, AP",
  summary: "B.Tech Information Technology graduate with hands-on data analysis experience in Python (pandas, matplotlib), Excel, and SQL, plus a background in machine learning and cloud computing (AWS, Azure). Built end-to-end retail sales analysis and Power BI dashboards. Published research on NLP-based accessibility tools. Seeking a data analytics internship to apply analytical and technical skills to real business problems.",
  skills: ["Python (pandas, NumPy, matplotlib)", "MS Excel", "SQL", "Power BI", "EDA & Data Cleaning", "Dashboarding & Insights", "Statistical Analysis", "AWS / Azure Cloud", "Machine Learning", "Git/GitHub"],
  experience: [
    { role: "Front-End Development Intern", org: "VAWE Global Technologies", period: "", points: ["Built responsive, dynamic web solutions, honing front-end development skills in a real-world product environment.", "Contributed to web application development projects for startups and academic ventures."] },
    { role: "AI/ML Intern", org: "Eduskills (Virtual)", period: "Sep 2023 – Nov 2023", points: ["Developed and deployed machine learning models for pattern analysis and optimization.", "Collaborated with a team to refine AI algorithms, improving scalability and efficiency."] },
    { role: "Cloud Computing Trainee", org: "AWS & Azure", period: "Jul 2023", points: ["Delivered scalable solutions using AWS compute, database, and analytics services for ML workloads.", "Supported hybrid cloud solutions integrating Azure AI, ML, and DevOps practices."] }
  ],
  projects: [
    { name: "Data Professional Survey Dashboard", detail: "Power BI dashboard analyzing 630 data professional survey responses: salary, job satisfaction, geography & career insights." },
    { name: "Indian Retail Sales Analysis", detail: "End-to-end analysis of 3 years of Indian retail sales: data cleaning, EDA, KPIs, charts, dashboard & insights report (pandas + matplotlib)." },
    { name: "AgriVoice", detail: "Multilingual voice-based AI platform for farmers — bridging literacy barriers. Presented at ICECCT Conference 2024." }
  ]
};
