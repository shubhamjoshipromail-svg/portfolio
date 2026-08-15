from pathlib import Path

from reportlab.lib.colors import HexColor, black
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf"
ASSETS = ROOT / "assets" / "resumes"
OUT.mkdir(parents=True, exist_ok=True)
ASSETS.mkdir(parents=True, exist_ok=True)

BLUE = HexColor("#1457d9")
MUTED = HexColor("#353535")


def styles():
    return {
        "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=18, leading=19, alignment=TA_CENTER, spaceAfter=2),
        "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=7.7, leading=9.4, alignment=TA_CENTER, textColor=MUTED, spaceAfter=3),
        "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=9.2, leading=10.6, alignment=TA_CENTER, textColor=BLUE, spaceAfter=4),
        "summary": ParagraphStyle("summary", fontName="Helvetica", fontSize=8.25, leading=10.25, spaceAfter=3),
        "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=9.25, leading=10, spaceBefore=2.5, spaceAfter=1.5),
        "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=8.45, leading=9.7, spaceBefore=1.3, spaceAfter=.5),
        "meta": ParagraphStyle("meta", fontName="Helvetica-Oblique", fontSize=7.45, leading=8.5, textColor=MUTED, spaceAfter=.4),
        "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=7.75, leading=9.4, leftIndent=9, firstLineIndent=-6, bulletIndent=1, spaceAfter=.65),
        "skills": ParagraphStyle("skills", fontName="Helvetica", fontSize=7.5, leading=9.15, spaceAfter=.6),
        "education": ParagraphStyle("education", fontName="Helvetica", fontSize=7.8, leading=9.25, spaceAfter=.7),
    }


def link(label, url):
    return f'<link href="{url}" color="#1457d9">{label}</link>'


CONTACT = " &nbsp;|&nbsp; ".join([
    "(202) 440-8445",
    link("Email", "mailto:shubhamjoshipro.mail@gmail.com"),
    link("Portfolio", "https://portfolio-production-9040.up.railway.app/"),
    link("GitHub", "https://github.com/shubhamjoshipromail-svg"),
    link("LinkedIn", "https://www.linkedin.com/in/shubham-joshi1/"),
    link("Hugging Face", "https://huggingface.co/shubhamjoshipro"),
])


COMMON = {
    "AgentDock": {
        "meta": "TypeScript, Next.js, Prisma, PostgreSQL, Anthropic/OpenAI, MCP · " + link("GitHub", "https://github.com/shubhamjoshipromail-svg/AgentDock") + " · " + link("Demo", "https://www.youtube.com/watch?v=NdwP83VBurU"),
        "bullets": [
            "Built a governed agent control plane that compiles natural-language goals into validated multi-step tool workflows with scoped permissions, approval gates, cost/step limits, and an append-only audit trail.",
            "Engineered durable execution with a PostgreSQL job queue, worker leases, crash recovery, idempotent external actions, step-cursor resume, SSE events, encrypted BYO keys, and approval-gated Gmail sends.",
            "Created 61 test files covering policy integrity, tenant ownership, approval semantics, crash recovery, MCP execution, and tool-registration security boundaries.",
        ],
    },
    "OpsPilot": {
        "meta": "Python, PyTorch, ModernBERT, Transformers, FastAPI, PostgreSQL · " + link("Model", "https://huggingface.co/shubhamjoshipro/opspilot-routing-modernbert-base-clean-v1") + " · " + link("GitHub", "https://github.com/shubhamjoshipromail-svg/opspilot-ai/tree/codex/ticket-intelligence"),
        "bullets": [
            "Fine-tuned and published a ModernBERT support-ticket router on 23,747 leakage-safe examples; raised validation accuracy from 52.3% to 73.1% (weighted-F1 0.713) by redesigning ten overlapping labels into seven operational queues.",
            "Built confidence-gated routing that auto-routes 62.3% of tickets at 85.5% accuracy and returns uncertain cases for human review; rejected numerically unstable DeBERTa runs instead of reporting invalid gains.",
        ],
    },
    "Vibe Curator": {
        "meta": "TypeScript, WebGL/GLSL, Pixi, OpenAI, Anthropic, ElevenLabs, Gemini Veo · " + link("GitHub", "https://github.com/shubhamjoshipromail-svg/vibe-curator"),
        "bullets": [
            "Built an editable generative-media environment that combines generated images, music, video, motion analysis, and parameterized shaders in one persistent, source-aware scene graph.",
            "Made generated graphics code dependable with static GPU-loop guards, real compilation checks, and compiler-error feedback; shared one WebGL/audio runtime across creation, exploration, and full-screen playback.",
        ],
    },
    "ACHP": {
        "meta": "Analytics Consultant · Johns Hopkins capstone · Alliance of Community Health Plans · 2025-2026",
        "bullets": [
            "Led most analytical work on a six-person client engagement; built a reproducible pipeline joining changing CMS schemas into a documented 138,263-row, 208-column master dataset and caught a 12x enrollment overcount before modeling.",
            "Used enrollment-weighted comparisons, OLS with HC3 robust errors, validated segmentation, county scoring, and plan-exit analysis; showed ACHP held the stronger cost position in 493 of 875 scored counties.",
            "Presented directly to ACHP leadership on a top-three schoolwide team; the client said the work would change where the organization focused its time.",
        ],
    },
    "RxCheck": {
        "meta": "Python, FastAPI, PostgreSQL, React, deterministic retrieval, structured model output · " + link("GitHub", "https://github.com/shubhamjoshipromail-svg/Pharmacy"),
        "bullets": [
            "Imported and normalized 152,416 drug-interaction records with exact, brand, fuzzy, and NDC matching; kept detection deterministic while restricting the model to grounded explanations. Passed 26/26 formative scenarios.",
        ],
    },
}


VARIANTS = {
    "applied-ai": {
        "title": "APPLIED AI ENGINEER",
        "summary": "AI engineer who builds the difficult parts between a model demo and a usable system: governed agents, trained models, evaluation, human review, durable execution, and product interfaces. Built AgentDock, deployed a fine-tuned ModernBERT model, and created a multi-provider generative environment end to end.",
        "projects": ["AgentDock", "OpsPilot", "Vibe Curator"],
        "experience": ["ACHP"],
        "skills": [
            "<b>AI/ML:</b> PyTorch, TensorFlow, Transformers, ModernBERT, scikit-learn, fine-tuning, NLP, RAG, model evaluation, confidence calibration, structured outputs, human-in-the-loop",
            "<b>Agents & systems:</b> Anthropic/OpenAI APIs, MCP, tool execution, policy gates, memory controls, PostgreSQL queues, workers, idempotency, crash recovery, SSE, testing",
            "<b>Product engineering:</b> Python, TypeScript, JavaScript, React, Next.js, FastAPI, Node.js, PostgreSQL, Prisma, SQLAlchemy, WebGL/GLSL, Git, CI/CD, Railway, Hugging Face",
        ],
    },
    "forward-deployed": {
        "title": "FORWARD-DEPLOYED AI ENGINEER",
        "summary": "Client-facing AI engineer who turns ambiguous workflows into working systems, validates the failure modes, and makes the result understandable to the people who must adopt it. Combines deep product engineering in AgentDock with decision-grade analytics delivered directly to ACHP leadership.",
        "projects": ["AgentDock", "OpsPilot", "Vibe Curator"],
        "experience": ["ACHP"],
        "skills": [
            "<b>Delivery:</b> workflow discovery, rapid prototyping, requirements translation, stakeholder readouts, technical demos, implementation documentation, cross-functional communication",
            "<b>AI systems:</b> agents, MCP, Anthropic/OpenAI APIs, tool calling, RAG, structured outputs, evaluation, guardrails, approvals, human-in-the-loop, auditability",
            "<b>Engineering & data:</b> Python, TypeScript, React, Next.js, FastAPI, PostgreSQL, Prisma, SQL, ETL, OLS, Tableau, REST APIs, SSE, testing, CI/CD, Railway",
        ],
    },
    "data-science": {
        "title": "DATA SCIENTIST / APPLIED ML ENGINEER",
        "summary": "Data scientist who turns unreliable data and ambiguous labels into defensible decisions and deployed models. Led the analytical core of a national healthcare engagement, caught a 12x data error, and improved a fine-tuned routing model from 52.3% to 73.1% through error analysis and task redesign.",
        "projects": ["OpsPilot", "RxCheck", "AgentDock"],
        "experience": ["ACHP"],
        "skills": [
            "<b>Modeling:</b> Python, pandas, NumPy, scikit-learn, PyTorch, TensorFlow, Transformers, XGBoost, LightGBM, Optuna, regression, classification, clustering, calibration, SHAP/LIME",
            "<b>Statistics & evaluation:</b> OLS/logistic regression, HC3 robust errors, hypothesis testing, cross-validation, ROC-AUC, macro/weighted F1, error analysis, leakage prevention, confidence thresholds",
            "<b>Data & delivery:</b> PostgreSQL, SQL, ETL/ELT, multi-source integration, data quality, FastAPI, Tableau, Git, testing, CI/CD, Hugging Face, stakeholder communication",
        ],
    },
}


def section(story, s, title):
    story.append(Paragraph(title, s["section"]))
    story.append(HRFlowable(width="100%", thickness=.65, color=black, spaceBefore=0, spaceAfter=1.8))


def project_block(s, name, max_bullets=None):
    item = COMMON[name]
    bullets = item["bullets"] if max_bullets is None else item["bullets"][:max_bullets]
    parts = [Paragraph(name, s["role"]), Paragraph(item["meta"], s["meta"])]
    parts.extend(Paragraph(text, s["bullet"], bulletText="•") for text in bullets)
    return KeepTogether(parts)


def build(slug, spec):
    s = styles()
    target = OUT / f"Shubham_Joshi_Resume_{slug.replace('-', '_').title().replace('_', '')}.pdf"
    doc = SimpleDocTemplate(
        str(target), pagesize=letter,
        leftMargin=.43 * inch, rightMargin=.43 * inch,
        topMargin=.30 * inch, bottomMargin=.28 * inch,
        title=f"Shubham Joshi - {spec['title'].title()}", author="Shubham Joshi",
        subject="Resume", creator="Shubham Joshi portfolio",
    )
    story = [
        Paragraph("SHUBHAM JOSHI", s["name"]),
        Paragraph(CONTACT, s["contact"]),
        Paragraph(spec["title"], s["title"]),
        Paragraph(spec["summary"], s["summary"]),
    ]
    section(story, s, "SELECTED WORK")
    for index, name in enumerate(spec["projects"]):
        # AgentDock stays deep when it leads; it is compact supporting evidence in DS.
        cap = 2 if (name == "AgentDock" and index > 0) else None
        story.append(project_block(s, name, cap))
    section(story, s, "CLIENT DELIVERY")
    story.append(project_block(s, "ACHP"))
    section(story, s, "LEADERSHIP & ADDITIONAL EXPERIENCE")
    story.extend([
        Paragraph("Co-Founder & Vice President · Business Analytics & AI Organization, Johns Hopkins · 2025-2026", s["role"]),
        Paragraph("Co-led a 100+ member organization; designed and delivered a three-hour applied-AI workshop and translated agents, RAG, evaluation, safety, and human oversight for mixed technical audiences.", s["bullet"], bulletText="•"),
        Paragraph("Founder · Digital Marketing & Web Studio · Japan / Remote · 2021-2025", s["role"]),
        Paragraph("Shipped websites and campaigns for international clients, owning delivery, client communication, audience research, A/B testing, and performance reporting across time zones.", s["bullet"], bulletText="•"),
    ])
    section(story, s, "TECHNICAL SKILLS")
    story.extend(Paragraph(x, s["skills"]) for x in spec["skills"])
    section(story, s, "EDUCATION & CREDENTIALS")
    story.extend([
        Paragraph("<b>Johns Hopkins University, Carey Business School</b> · M.S., Business Analytics &amp; Artificial Intelligence · Completed July 2026 · Dean's Scholarship", s["education"]),
        Paragraph("<b>Nagoya University of Commerce &amp; Business</b> · B.B.A., Global Business Administration · 2025 · Dean's Scholar · Exchange: Monash University", s["education"]),
        Paragraph("<b>Certifications:</b> Microsoft Azure AI Fundamentals (AI-900) · SAS SQL Essentials · SAS AI Foundations &nbsp; <b>Languages:</b> English, Japanese, Nepali (native) · Hindi (fluent)", s["education"]),
    ])
    doc.build(story)
    asset = ASSETS / target.name
    asset.write_bytes(target.read_bytes())
    return target, asset


if __name__ == "__main__":
    for slug, spec in VARIANTS.items():
        out, asset = build(slug, spec)
        print(out)
        print(asset)
