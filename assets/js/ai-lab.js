/* AI Lab: tabs, chatbot demo, prompt generator, summarizer */
(function () {
  "use strict";

  /* ---------- Tabs ---------- */
  var tabs = document.querySelectorAll("#lab-tabs button");
  var panels = document.querySelectorAll("[data-panel]");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      panels.forEach(function (p) {
        p.style.display = p.dataset.panel === tab.dataset.tool ? "" : "none";
      });
    });
  });

  /* ---------- Chatbot demo ---------- */
  var box = document.getElementById("chat-box");
  var input = document.getElementById("chat-input");
  var send = document.getElementById("chat-send");

  function addMsg(text, who) {
    var div = document.createElement("div");
    div.className = "msg " + who;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  var ANSWERS = [
    { re: /project|ship|built|product/i, a: "I've shipped RAG knowledge bases, autonomous agents with tool calling, and n8n automation pipelines. The projects page covers the highlights, and you can try a demo chatbot right here in the AI Lab." },
    { re: /skill|tech|stack|tool/i, a: "Core stack: LLM APIs (OpenAI, Anthropic), RAG with Pinecone/Qdrant, LangChain/LangGraph for agents, n8n for automation, and React/TypeScript for the frontend. Full list is on the Resume page." },
    { re: /experience|work|career|background/i, a: "Started coding in 2022 with React and Node.js, went all-in on LLMs in 2024, and now ship production AI products plus end-to-end automations. The Journey page has the timeline." },
    { re: /contact|hire|reach|email/i, a: "Easiest way is the Contact page — it posts straight into my n8n workflow and emails me. Or email ravurisrinu989@gmail.com directly." },
    { re: /price|cost|rate/i, a: "Every project is different, so I scope per project after a quick call. Tell me the problem on the Contact page and I'll get back to you within 24 hours." },
    { re: /thank|great|nice|awesome/i, a: "You're welcome! Anything else you'd like to know?" },
  ];
  var FALLBACK = "Good question. I don't have a canned answer for that one in demo mode — ask me about my projects, skills, experience, or how to get in touch.";

  function botReply(question) {
    for (var i = 0; i < ANSWERS.length; i++) {
      if (ANSWERS[i].re.test(question)) return ANSWERS[i].a;
    }
    return FALLBACK;
  }

  function sendQuestion() {
    var q = input.value.trim();
    if (!q) return;
    addMsg(q, "user");
    input.value = "";
    send.disabled = true;
    setTimeout(function () {
      addMsg(botReply(q), "bot");
      send.disabled = false;
      input.focus();
    }, 550);
  }

  if (send) send.addEventListener("click", sendQuestion);
  if (input) {
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") sendQuestion(); });
  }
  document.querySelectorAll(".chat-quick button").forEach(function (b) {
    b.addEventListener("click", function () {
      input.value = b.dataset.q;
      sendQuestion();
    });
  });

  /* ---------- Prompt generator ---------- */
  var PROMPTS = {
    rag: "You are a helpful assistant answering questions about the provided documents.\n\nRules:\n- Answer ONLY from the context below.\n- If the context doesn't contain the answer, say \"I couldn't find that in the documents.\"\n- Cite sources as [1], [2] after each claim.\n- Keep answers under 200 words.\n\nContext:\n{context}\n\nQuestion: {question}",
    agent: "You are an autonomous agent. Complete the task below by choosing and calling tools.\n\nRules:\n- Plan the steps first, one per line.\n- Call tools one at a time and use their results.\n- Never invent tool results — if a call fails, retry once or report the error.\n- Stop when the task is done and summarize what you did.\n\nTask: {task}",
    summarize: "Summarize the text below in {target_length} sentences.\n\nRequirements:\n- Preserve key numbers, names, and conclusions.\n- Use plain language.\n- No new information or opinions.\n\nText:\n{text}",
  };

  var promptOutput = document.getElementById("prompt-output");
  var promptButtons = document.querySelectorAll('#panel-prompt .segmented button');
  var promptKey = "rag";

  function renderPrompt() {
    promptOutput.value = PROMPTS[promptKey];
  }
  if (promptOutput) {
    promptButtons.forEach(function (b) {
      b.addEventListener("click", function () {
        promptButtons.forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        promptKey = b.dataset.prompt;
        renderPrompt();
      });
    });
    renderPrompt();
  }

  var copyBtn = document.getElementById("prompt-copy");
  if (copyBtn && promptOutput) {
    copyBtn.addEventListener("click", function () {
      promptOutput.select();
      navigator.clipboard.writeText(promptOutput.value).then(function () {
        copyBtn.textContent = "Copied!";
        setTimeout(function () { copyBtn.textContent = "Copy to clipboard"; }, 1500);
      });
    });
  }

  /* ---------- Summarizer (extractive demo) ---------- */
  var runBtn = document.getElementById("summary-run");
  var sumInput = document.getElementById("summary-input");
  var sumOutput = document.getElementById("summary-output");

  function summarize(text, n) {
    var sentences = text.split(/(?<=[.!?])\s+/).filter(function (s) { return s.trim().length > 20; });
    if (sentences.length <= n) return sentences.join(" ");
    var words = text.toLowerCase().split(/\W+/).filter(function (w) { return w.length > 3; });
    var freq = {};
    words.forEach(function (w) { freq[w] = (freq[w] || 0) + 1; });
    var scored = sentences.map(function (s, i) {
      var score = 0;
      s.toLowerCase().split(/\W+/).forEach(function (w) { if (freq[w] > 1) score += freq[w]; });
      return { s: s, score: score, i: i };
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    var top = scored.slice(0, n).sort(function (a, b) { return a.i - b.i; });
    return top.map(function (t) { return t.s; }).join(" ");
  }

  if (runBtn) {
    runBtn.addEventListener("click", function () {
      var text = (sumInput && sumInput.value || "").trim();
      if (text.length < 60) {
        sumOutput.textContent = "Paste at least a short paragraph (60+ characters) to summarize.";
        return;
      }
      sumOutput.textContent = summarize(text, 3);
    });
  }
})();
