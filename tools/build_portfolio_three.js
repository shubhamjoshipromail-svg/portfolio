// PORTFOLIO SET - the three resumes the personal site offers as downloads.
// Rebuilt 2026-09-10 in HIS standard docx format (Calibri, black, ruled headers,
// right-tabbed dates, named hyperlinks), replacing the reportlab/blue variants.
//
// The old set had a real defect: "Applied AI" and "Forward Deployed" shared the same
// projects and the same bullets, so they read as near-duplicates. Fixed by giving each
// a different SPINE:
//   ai  -> PROJECTS lead. Engineering identity: build it, ship it, prove it.
//   ds  -> EXPERIENCE leads with ACHP econometrics. Statistics identity.
//   fd  -> EXPERIENCE leads with client delivery. In-the-room identity; AgentDock is proof.
// Different summaries, different skill groupings, different bullet selection, different
// project order. No two documents share a summary sentence.
//
// Every number from verified_stats.md (2026-09-02) and direct repo inspection (2026-09-10):
//   totals    508 commits | 92,448 lines | 11 public repos | 8 live deployments
//   AgentDock 225 commits | 35,539 lines | 11,013 test lines | 66 test files | 33 API routes
//             | 26 migrations | 24 design docs in docs/
//   Vibe Cur. 104 commits | 19,913 lines | 3 form factors
// NOT claimed: millions of users, published Chrome Web Store listing, R, Stata, CUDA,
// distributed training, Kubernetes, deep RL beyond coursework, any studio revenue figure.
const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat, BorderStyle, ExternalHyperlink, TabStopType } = require("docx");

const OUT = "/sessions/charming-nice-ramanujan/mnt/outputs/";
const F = "Calibri", SZ = 18, SZ_SM = 17, K = "000000", LINK = "0B4CA3", RIGHT = 11000;

const t = (text, o = {}) => new TextRun({ text, font: F, size: o.size ?? SZ, bold: !!o.b, italics: !!o.i, color: o.color ?? K });
const lk = (text, url, o = {}) => new ExternalHyperlink({ link: url,
  children: [new TextRun({ text, font: F, size: o.size ?? SZ, color: LINK, underline: {} })] });
const line = (children, o = {}) => new Paragraph({
  spacing: { after: o.after ?? 10, before: o.before ?? 0 },
  alignment: o.center ? AlignmentType.CENTER : AlignmentType.LEFT,
  tabStops: o.tab ? [{ type: TabStopType.RIGHT, position: RIGHT }] : undefined, children });
const h = (text) => new Paragraph({ spacing: { before: 7, after: 3 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: K } }, children: [t(text, { b: true })] });
const bullet = (text) => new Paragraph({ numbering: { reference: "b", level: 0 }, spacing: { after: 2 }, children: [t(text)] });
const role = (title, company, location, dates) =>
  line([t(title + ", ", { b: true }), t(company + " - " + location), t("\t"), t(dates)], { tab: true, after: 2, before: 6 });
const proj = (name, links) => {
  const kids = [t(name, { b: true }), t("\t")];
  links.forEach(([label, url], i) => {
    if (i) kids.push(t("  |  ", { size: SZ_SM }));
    kids.push(lk(label, url, { size: SZ_SM }));
  });
  return line(kids, { tab: true, after: 2, before: 7 });
};
const skill = (label, body) => line([t(label + ": ", { b: true }), t(body)], { after: 2 });

const GH = "https://github.com/shubhamjoshipromail-svg";
const U = {
  agentdock: "https://web-production-e123b.up.railway.app",
  demo: "https://www.youtube.com/watch?v=NdwP83VBurU",
  deck: "https://agentdock-pitch-deck-production.up.railway.app",
  vibe: "https://vibe-curator-production.up.railway.app",
  rx: "https://pharmacy-production-f226.up.railway.app",
  nimbus: "https://nimbus-web-production.up.railway.app",
  fridge: "https://fride-project-production.up.railway.app",
  portfolio: "https://portfolio-production-9040.up.railway.app",
  hf: "https://huggingface.co/shubhamjoshipro",
  model: "https://huggingface.co/shubhamjoshipro/opspilot-routing-modernbert-base-clean-v1",
  paper: GH + "/rxcheck/tree/research/journal-ready-paper",
  tableau: "https://public.tableau.com/views/SalesPerformanceAnalyticsDashboard/Story1",
  li: "https://www.linkedin.com/in/shubham-joshi1",
};

const EDU = (extraCourse, certs) => [
  h("EDUCATION"),
  line([t("Johns Hopkins University, Carey Business School", { b: true }), t(" - MS, Business Analytics and Artificial Intelligence, STEM designated, Dean's Scholarship"), t("\t"), t("Aug 2026")], { tab: true, after: 2, before: 6 }),
  line([t("Nagoya University of Commerce and Business", { b: true }), t(" - BBA in Management, "), t("GPA 3.63", { b: true }), t(" (WES evaluated), Dean's Scholar honors, Monash exchange"), t("\t"), t("2025")], { tab: true, after: 2 }),
  line([t("Coursework: ", { b: true }), t(extraCourse + "  ", { size: SZ_SM }), t("Certifications: ", { b: true }), t(certs + "  ", { size: SZ_SM }), t("Languages: ", { b: true }), t("English, Japanese, Nepali, Hindi.", { size: SZ_SM })], { after: 0 }),
];

const header = (title, links) => [
  line([t("SHUBHAM JOSHI", { b: true, size: 30 })], { center: true, after: 12 }),
  line([t(title + "  |  San Francisco, CA  |  (202) 440-8445  |  shubhamjoshipro.mail@gmail.com", { size: SZ_SM })], { center: true, after: 6 }),
  line(links.flatMap(([l, u], i) => (i ? [t("  |  ", { size: SZ_SM })] : []).concat([lk(l, u, { size: SZ_SM })])), { center: true, after: 6 }),
];

// ─────────────────────────────────────────────────────────────── AI ENGINEER
const AI = () => [
  ...header("AI Engineer", [["Live agent platform", U.agentdock], ["Product demo", U.demo], ["Live model", U.hf], ["Portfolio", U.portfolio], ["github.com/shubhamjoshipromail-svg", GH], ["linkedin.com/in/shubham-joshi1", U.li]]),
  h("SUMMARY"),
  line([t("AI engineer who builds intelligent applications on top of foundation models, ships them to real users, then makes them reliable enough to keep running. I design the agent behaviour, write the backend, build the interface, fine tune the model when the model is the problem, and write the evaluation that decides whether it works. In the last year: 508 commits and 92,448 lines of code across 11 public repositories, 8 deployed and live right now, a fine tuned transformer on Hugging Face, and 40 technical specifications totaling 6,700 lines. I build the whole thing, then I try to break it, and I report what broke.")], { after: 4 }),
  h("SKILLS"),
  skill("Agentic AI, LLMs and Emerging Technologies", "Agentic AI systems and agent architectures; Large Language Models and foundation models (Anthropic Claude, OpenAI GPT and Codex, Google Gemini); designing agent behaviour end to end: prompt engineering, reasoning and planning, tool and function calling, multi agent orchestration, Model Context Protocol servers and clients, retrieval and context engineering, structured output, multi provider routing and cost control; AI powered development with Cursor, Claude Code and Codex; familiarity with the frontier of applied AI, developing and contributing reusable tooling to the broader open source ecosystem"),
  skill("Evaluation, Guardrails and AI Safety", "Evaluation harnesses and benchmark design, prespecified protocols with frozen fixtures, scenario and regression testing, adversarial and red team testing including prompt injection defense, deny by default permissions, human in the loop approval gates, secure credential handling, audit trails, confidence gating and abstention, honest reporting of negative results, responsible AI"),
  skill("Machine Learning and Deep Learning", "PyTorch, Transformers and Hugging Face, transformer fine tuning and public model deployment (ModernBERT), scikit-learn, LightGBM, XGBoost, leakage safe splits, calibration, drift monitoring, SHAP and LIME interpretability, error analysis, taxonomy and label design, model selection under cost and latency budgets"),
  skill("Applied Computer Science and Software Engineering", "Applied computer science and programming: Python, TypeScript, JavaScript, SQL; Next.js, React, Node, FastAPI, PostgreSQL, Prisma, REST APIs, system design, streaming over server sent events, durable job queues, idempotency, crash recovery, concurrency control, observability, performance profiling, cost tracking, automated testing, Docker, Git, CI/CD, services deployed and operated in production on Railway, Chrome extension and Tauri packaging; comfortable embedded in an unfamiliar codebase picking up new tasks"),
  skill("Collaboration and Communication", "Cross-functional collaboration: collaborate with engineers, designers and non technical stakeholders, partner directly with clients to identify problems worth solving and develop integrated solutions that drive measurable impact, contribute to shared tooling and support colleagues, strong written and spoken communication skills, technical documentation, presenting findings, teaching and mentorship, continuous improvement"),
  h("PROJECTS"),
  proj("AgentDock, Agent Platform That Takes Real Actions", [["Live app", U.agentdock], ["Demo", U.demo], ["Pitch deck", U.deck], ["Code", GH + "/AgentDock"]]),
  bullet("Designed how the agent thinks and built all of it solo: model backed planning compiling a plain language goal into a validated multi step workflow, a reasoning and tool call layer executing over the real Model Context Protocol wire, and four first party connectors for Gmail, Calendar, Docs and Search. Rather than hardcode a tool list it syncs and classifies the official MCP registry by category, risk and verification, so the catalog grows with the ecosystem, not with my releases."),
  bullet("Solved what actually blocks agents from touching a real account, which is trust rather than capability: permissions resolve and clamp server side so prompt text can request capability but never grant it, every outbound action passes an approval gate, credentials are encrypted and budgets capped, and I wrote the adversarial suite proving prompt injection through tool output cannot fire an unapproved send."),
  bullet("Engineered it for production: 225 commits and 35,539 lines in two months with 11,000 lines of tests across 66 test files, 33 API routes, 26 migrations, a PostgreSQL job queue with lease and heartbeat crash recovery, idempotent external actions, concurrency caps, live run streaming, and 24 design documents written before the code."),
  proj("Vibe Curator, Generative AI Product in Three Form Factors", [["Live app", U.vibe], ["Code and releases", GH + "/vibe-curator"]]),
  bullet("Built a real time creative environment across 104 commits and 19,913 lines where four providers land in one editable scene model, so a generation is starting material rather than a flattened file: OpenAI for images, Anthropic for shaders, Gemini Veo for video, ElevenLabs for music. It ships three ways at once: a live web app, a Chrome extension with Web Store release assets, and a signed Tauri desktop build for macOS."),
  bullet("Made unreliable generation dependable by treating the model as an untrusted code author, the general lesson for any code generation feature: model written GLSL clears a static guard and a real compile pass before it renders, and line numbered compiler errors feed back so repairs converge within 3 attempts."),
  proj("OpsPilot and RxCheck, Fine Tuned and Evaluated AI", [["Live model", U.model], ["Live app", U.rx], ["Research report", U.paper]]),
  bullet("Fine tuned and published a ModernBERT ticket router on 23,747 leakage safe examples, diagnosing instead of scaling: baselines put TF-IDF at 44 and ModernBERT at 52.3 percent, so the labels were the ceiling, and rebuilding ten labels into seven queues lifted accuracy to 73.1 percent, shipped with abstention that auto routes 62.3 percent at 85.5 percent accuracy."),
  bullet("RxCheck reviews 152,416 records where the database decides and the model only explains, passing 26 of 26 scenarios even with every external service failing, and its research report is where I published the results that made me look bad: my own validator accepted 15 malformed outputs of 30, and an official external benchmark passed only 22 of 30."),
  h("EXPERIENCE"),
  role("Analytics Consultant", "Johns Hopkins University, Client: Alliance of Community Health Plans", "Washington, DC", "Jul 2025 - Jul 2026"),
  bullet("Led technical execution for a six person team on a national client engagement, building the Python and SQL pipeline that reconciled four inconsistent federal sources into a 138,263 row dataset, catching a twelvefold enrollment overcount before it reached a model, and presenting in person to leadership, who said it would change where the organization spent its resources."),
  role("Co-Founder and Vice President", "Business Analytics and AI Organization, Johns Hopkins University", "Washington, DC", "Jan 2026 - Present"),
  bullet("Co-founded and lead a 100 member organization alongside my degree, delivering a 3 hour hands on workshop on agents and modern AI development to 35 registrants and publishing the guide open source."),
  role("Founder", "Digital Marketing and Web Studio, self-employed", "Nagoya, Japan", "Jan 2021 - May 2025"),
  bullet("Ran a studio single handed for four years for international clients in a third language, owning scoping, pricing, delivery and reporting."),
  ...EDU("Generative AI, Practical Machine Learning, Sequential Decision Making, Responsible AI, Statistical Analysis.", "Anthropic Claude 101, Anthropic AI Fluency, Azure AI-900."),
];

// ──────────────────────────────────────────── DATA SCIENTIST / ML ENGINEER
const DS = () => [
  ...header("Data Scientist and Machine Learning Engineer", [["Live model", U.model], ["Research report", U.paper], ["Tableau exhibits", U.tableau], ["Portfolio", U.portfolio], ["github.com/shubhamjoshipromail-svg", GH], ["linkedin.com/in/shubham-joshi1", U.li]]),
  h("SUMMARY"),
  line([t("Data scientist who turns unreliable data and ambiguous labels into defensible decisions and deployed models. On a year long client engagement I reconciled four inconsistent federal sources, caught a twelvefold error that nothing had flagged, isolated a policy effect at p below 0.001 with robust standard errors, and presented the implications in person to a national organization's leadership. I fine tuned and published a transformer that went from 52.3 to 73.1 percent by fixing the labels rather than the model, and I ship what I build: 508 commits and 92,448 lines of code across 11 public repositories with 8 applications deployed and live. Analytical integrity matters more to me than a flattering result, and I publish the numbers that are not flattering.")], { after: 4 }),
  h("SKILLS"),
  skill("Data Science, Statistics and Experimentation", "Data science across healthcare, financial services and consumer settings; econometric analysis, OLS and logistic regression, HC3 robust standard errors, causal impact and attribution, hypothesis testing and significance interpretation, experimental and quasi experimental design, A/B testing, cross validation, ROC-AUC and macro and weighted F1, forecasting, clustering and segmentation, Monte Carlo simulation, mixed integer linear programming, leakage prevention, error analysis, statistical communication; identifying the key concepts and processes that drive an outcome, and understanding where a model stops being trustworthy"),
  skill("Machine Learning and Deep Learning", "Python (pandas, NumPy, scikit-learn, statsmodels, PyTorch), Transformers and Hugging Face, transformer fine tuning and public model deployment (ModernBERT), LightGBM, XGBoost, CatBoost, H2O AutoML, Optuna, SMOTE and class imbalance handling, feature engineering, Platt calibration, PSI drift monitoring, SHAP and LIME interpretability, fairness and equity auditing, cost based threshold tuning, confidence gating and abstention"),
  skill("Data Engineering, Tools and Development", "Applied computer science and programming; SQL (PostgreSQL, Oracle; complex joins, CTEs, window functions), multi source reconciliation across inconsistent schemas and geographic grains, ETL and ELT pipeline design, data quality validation and error detection, data dictionaries and documentation, reproducible pipelines and version control with Git, FastAPI, Prisma, Docker, CI/CD, Railway and Hugging Face deployment, large and complex datasets; designing and developing innovative analytical tools and reusable solutions as deployed services rather than notebooks"),
  skill("Analysis, Visualization and Communication", "Framing an ambiguous business question, translating analysis into business implications, Tableau dashboards and exhibits, tables, charts and figures, written research reports with prespecified evaluation protocols, memos and documentation, executive and client readouts delivered in person, explaining technical findings to non technical audiences, collaborating in small analytical teams while working independently"),
  h("EXPERIENCE"),
  role("Analytics Consultant", "Johns Hopkins University, Client: Alliance of Community Health Plans", "Washington, DC", "Jul 2025 - Jul 2026"),
  bullet("Led most of the analytical work in a six person team on a year long engagement for a national organization representing nonprofit health plans, answering an economic question about a federal reimbursement change that nobody had managed to measure."),
  bullet("Built the dataset the question required: a four stage Python and SQL pipeline reconciling four federal sources published on different schedules and geographic grains into 138,263 matched plan county records across 208 variables, and caught a twelvefold enrollment overcount caused by mismatched geography before it reached a single model or slide."),
  bullet("Isolated the causal cost impact with OLS and HC3 robust standard errors controlling for enrollment and quality rating, finding premiums higher by 2.8 dollars and maximum out of pocket higher by 97 dollars, both significant at p below 0.001, plus a five fold stratified logistic model at 0.642 cross validated AUC forecasting market exit and k-means segmentation validated three ways."),
  bullet("Delivered it as things people could act on: a competitive benchmark establishing a client cost advantage in 493 of 875 counties, Tableau exhibits, a data dictionary and a written report presented in person to leadership. The client said it would change where the organization spent its resources; the team placed top three school wide."),
  role("Co-Founder and Vice President", "Business Analytics and AI Organization, Johns Hopkins University", "Washington, DC", "Jan 2026 - Present"),
  bullet("Co-founded and lead a 100 member organization alongside my degree, recruiting the founding team and successor leadership, and delivering a 3 hour hands on analytics and machine learning workshop to 35 registrants with the guide published open source."),
  role("Founder", "Digital Marketing and Web Studio, self-employed", "Nagoya, Japan", "Jan 2021 - May 2025"),
  bullet("Ran a studio single handed for four years for international clients in a third language, owning scoping, pricing, delivery and reporting, including audience research and A/B testing on live campaigns."),
  h("MODELING PROJECTS"),
  proj("OpsPilot, Fine Tuned Transformer Deployed with Abstention", [["Live model", U.model], ["Code", GH + "/opspilot-ai"]]),
  bullet("Fine tuned and published a ModernBERT ticket router on 23,747 leakage safe examples and made the judgment call that mattered: baselines put TF-IDF at 44 and ModernBERT at 52.3 percent, so the label space was the ceiling, not the model, and rebuilding ten overlapping labels into seven operational queues lifted validation accuracy to 73.1 percent at weighted F1 0.713. Confidence gating auto routes 62.3 percent of tickets at 85.5 percent accuracy; unstable DeBERTa runs were rejected rather than reported as gains."),
  proj("Credit Risk, Propensity and Valuation Modeling", [["Code", GH]]),
  bullet("Modeled borrower default risk for a consumer lending portfolio at 0.6857 out of fold ROC-AUC against a 0.5041 baseline, with Platt calibration so scores read as probabilities, PSI drift monitoring, an equity audit and a decision threshold set on expected cost rather than accuracy. Separately placed 7th of 59 teams competing individually on a financial services propensity model at 0.8285 ROC-AUC and 19th on a property valuation regression at 8.708 MAE, both scored on held out data."),
  proj("RxCheck, Research Report with a Prespecified Evaluation Protocol", [["Live app", U.rx], ["Research report", U.paper]]),
  bullet("Normalized 152,416 drug interaction records with exact, brand, fuzzy and NDC matching, kept detection deterministic and restricted the model to grounded explanation, then wrote a full research report with seven prespecified evidence packages and published the unfavourable findings as prominently as the favourable: my own validator accepted 15 malformed outputs of 30, an official benchmark passed only 22 of 30, and the literature review led me to narrow my novelty claim and record a decision not to submit."),
  ...EDU("Statistical Analysis, Advanced Business Analytics, Practical Machine Learning, Generative AI, Simulation, Data Visualization.", "SAS SQL Essentials, SAS AI Foundations, Azure AI-900, Anthropic Claude 101."),
];

// ─────────────────────────────────────────── FORWARD DEPLOYED AI ENGINEER
const FD = () => [
  ...header("Forward Deployed AI Engineer", [["Live agent platform", U.agentdock], ["Product demo", U.demo], ["Pitch deck", U.deck], ["Portfolio", U.portfolio], ["github.com/shubhamjoshipromail-svg", GH], ["linkedin.com/in/shubham-joshi1", U.li]]),
  h("SUMMARY"),
  line([t("Client facing AI engineer who sits with the customer, turns an ambiguous workflow into a working system, and stays until they actually adopt it. I have been the person in the room for five years: four running my own studio where I found the clients, scoped and priced the work and answered when a campaign underperformed, and a year on a national client engagement that ended with me presenting in person to their leadership, who changed where the organization spent its resources. I pair that with deep hands on building, 508 commits and 92,448 lines of code in the last year with 8 applications deployed and live, including an agent platform that takes real actions on real accounts behind a permission layer I designed and then attacked myself. Willing to travel, and comfortable being the only technical person at the table.")], { after: 4 }),
  h("SKILLS"),
  skill("Client Delivery and Discovery", "Consultative technical discovery with business and non technical stakeholders, partnering directly with companies from startups to national organizations, turning ambiguous business challenges into scoped technical solutions I then design, build and deploy myself, requirements gathering and goal clarification, rapid prototyping in front of a customer, live demos and walkthroughs, written specifications and implementation documentation, launch runbooks and explicit release boundaries, executive and client readouts delivered in person, workshop design and enablement, teaching and mentorship, pricing and scoping ownership, developing long term customer relationships, relentless initiative, willing to travel to customer sites"),
  skill("Agentic AI and LLM Systems", "Designing agent behaviour end to end: prompt engineering, reasoning and planning, tool calling and function calling, multi agent orchestration, Model Context Protocol servers and clients, retrieval and context engineering, structured output, multi provider routing and cost control; Large Language Models from Anthropic Claude, OpenAI GPT and Codex, and Google Gemini; AI powered development with Cursor, Claude Code and Codex"),
  skill("Applied Computer Science and Software Engineering", "Applied computer science and software development across emerging technologies: Python, TypeScript, JavaScript, SQL; Next.js, React, Node, FastAPI, PostgreSQL and Prisma, REST API design, system design, real time streaming over server sent events, durable job queues, idempotency, crash recovery, concurrency control, observability and per run cost tracking, automated testing, Docker, Git, CI/CD, deploying and operating software in production on Railway, Chrome extension and Tauri desktop packaging, PyTorch and transformer fine tuning with a model deployed publicly"),
  skill("Evaluation, Trust and Deployment Safety", "Evaluation harnesses and benchmark design, scenario and regression testing, adversarial and red team testing including prompt injection defense, deny by default permissions, human in the loop approval gates, encrypted credentials and budget caps, audit trails, confidence gating and abstention, failure mode analysis, honest reporting of negative results, the judgment to say what a system cannot do"),
  h("EXPERIENCE"),
  role("Analytics Consultant", "Johns Hopkins University, Client: Alliance of Community Health Plans", "Washington, DC", "Jul 2025 - Jul 2026"),
  bullet("Embedded with a national organization representing nonprofit health plans for a year, ran the discovery that turned a vague concern about a federal reimbursement change into a measurable economic question, and led technical execution for a six person team."),
  bullet("Built and deployed the solution end to end: a four stage Python and SQL pipeline reconciling four inconsistent federal sources into 138,263 matched records across 208 variables, an econometric model isolating the consumer cost impact at p below 0.001, and a competitive benchmark across 875 county markets. Caught a twelvefold enrollment overcount before it reached a single reported figure."),
  bullet("Closed the loop the way a deployment has to close: Tableau exhibits, a data dictionary so the client could run it without me, and a written report presented in person to their leadership. The client said it would change where the organization directed its advocacy, and the team placed top three school wide."),
  role("Founder", "Digital Marketing and Web Studio, self-employed", "Nagoya, Japan", "Jan 2021 - May 2025"),
  bullet("Ran a studio single handed for four years for international clients in a third language and carried the entire commercial loop myself: found the clients, ran discovery, scoped and priced the work, delivered websites and campaigns, reported on performance, and answered for the result when something underperformed. Four years of being the person the customer calls is where I learned to run a room and say no to the wrong scope."),
  role("Co-Founder and Vice President", "Business Analytics and AI Organization, Johns Hopkins University", "Washington, DC", "Jan 2026 - Present"),
  bullet("Co-founded and lead a 100 member organization alongside my degree, a part time role built on enablement, which is the same skill as driving adoption: recruited the founding team and successor leadership, and designed and delivered a 3 hour hands on workshop on agents and modern AI development to 35 registrants, publishing the guide open source so it outlived the session."),
  h("PROJECTS"),
  proj("AgentDock, Agent Platform That Takes Real Actions on Real Accounts", [["Live app", U.agentdock], ["Demo", U.demo], ["Pitch deck", U.deck], ["Code", GH + "/AgentDock"]]),
  bullet("Built the whole product solo: model backed planning that compiles a plain language goal into a validated multi step workflow over the real Model Context Protocol wire, first party connectors for Gmail, Calendar, Docs and Search, and a catalog that syncs and classifies the official MCP registry so new tools drop in without a rebuild. 225 commits and 35,539 lines in two months with 11,000 lines of tests across 66 test files."),
  bullet("Solved the thing that actually blocks a customer from letting an agent near their account: permissions resolve and clamp server side so prompt text can request capability but never grant it, every outbound action passes a human approval gate, credentials are encrypted and budgets capped, and I wrote the adversarial suite proving prompt injection arriving through tool output cannot fire an unapproved send."),
  proj("Vibe Curator, Nimbus and FridgeChef, Products Shipped to Users", [["Vibe Curator", U.vibe], ["Nimbus", U.nimbus], ["FridgeChef", U.fridge]]),
  bullet("Vibe Curator is a generative product across 104 commits and 19,913 lines shipping three ways at once as a web app, a Chrome extension and a signed macOS desktop build, taken to an invited beta on a written runbook that names the release boundary and what is deliberately out of scope. Nimbus is an AI companion for student burnout that answers with one useful next step instead of a dashboard, and FridgeChef turns a fridge photo into a personalized recipe streamed live."),
  ...EDU("Generative AI, Practical Machine Learning, AI-Driven Sequential Decision Making, Analytics Consulting Project, Responsible AI.", "Anthropic Claude 101, Anthropic AI Fluency, Azure AI-900, SAS SQL Essentials."),
];

const SPECS = [
  ["Shubham_Joshi_Resume_AppliedAi", AI, "AI Engineer"],
  ["Shubham_Joshi_Resume_DataScience", DS, "Data Scientist and Machine Learning Engineer"],
  ["Shubham_Joshi_Resume_ForwardDeployed", FD, "Forward Deployed AI Engineer"],
];

(async () => {
  for (const [name, body, title] of SPECS) {
    const doc = new Document({
      numbering: { config: [{ reference: "b", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 250, hanging: 150 } } } }] }] },
      styles: { default: { document: { run: { font: F, size: SZ, color: K } } } },
      title: "Shubham Joshi - " + title, description: "Resume",
      sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 165, bottom: 5, left: 478, right: 478 } } }, children: body() }],
    });
    fs.writeFileSync(OUT + name + ".docx", await Packer.toBuffer(doc));
    console.log("wrote " + name);
  }
})();
