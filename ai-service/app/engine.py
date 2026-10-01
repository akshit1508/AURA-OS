"""
AURA Intelligent Query Processing Engine
Combines an LLM provider integration with a rich local knowledge retrieval engine.
"""

import json
import os
import re
import urllib.request
import urllib.error
from .knowledge import PORTFOLIO_KNOWLEDGE, SYSTEM_PROMPT

def call_llm_provider(user_message: str) -> str | None:
    """
    Attempt calling an LLM provider if configured via environment variables.
    Supports Groq, OpenAI, Google Gemini, or generic OpenAI-compatible APIs using urllib.
    """
    # 1. Check Gemini
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
            payload = {
                "system_instruction": {
                    "parts": [{"text": SYSTEM_PROMPT}]
                },
                "contents": [
                    {
                        "role": "user",
                        "parts": [{"text": user_message}]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.4,
                    "maxOutputTokens": 600
                }
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode("utf-8"))
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        return parts[0].get("text", "").strip()
        except Exception as e:
            print("Gemini API call failed, falling back to knowledge engine:", e)

    # 2. Check Groq / OpenAI / OpenAI-compatible API
    groq_key = os.getenv("GROQ_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    api_key = groq_key or openai_key
    base_url = "https://api.groq.com/openai/v1/chat/completions" if groq_key else "https://api.openai.com/v1/chat/completions"
    model = "llama-3.1-8b-instant" if groq_key else "gpt-4o-mini"

    custom_url = os.getenv("LLM_BASE_URL")
    if custom_url:
        base_url = custom_url
    custom_model = os.getenv("LLM_MODEL")
    if custom_model:
        model = custom_model

    if api_key:
        try:
            payload = {
                "model": model,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_message}
                ],
                "temperature": 0.4,
                "max_tokens": 500
            }
            req = urllib.request.Request(
                base_url,
                data=json.dumps(payload).encode("utf-8"),
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}"
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode("utf-8"))
                choices = data.get("choices", [])
                if choices:
                    return choices[0].get("message", {}).get("content", "").strip()
        except Exception as e:
            print("LLM API call failed, falling back to knowledge engine:", e)

    return None


def get_knowledge_response(query: str) -> str:
    """
    Intelligent semantic intent and knowledge-retrieval engine.
    Delivers detailed, accurate responses about Akshit's projects, skills,
    experience, education, and achievements.
    """
    q = query.lower().strip()

    # --- 1. Project Specific: MESSO ---
    if any(k in q for k in ["messo", "mess management", "hostel", "student feedback", "mess platform"]):
        messo = next(p for p in PORTFOLIO_KNOWLEDGE["projects"] if p["id"] == "messo")
        features = "\n".join([f"- {f}" for f in messo["key_features"]])
        return (
            f"**{messo['title']}**\n\n"
            f"{messo['summary']}\n\n"
            f"**Tech Stack:** {', '.join(messo['technologies'])}\n\n"
            f"**Key Highlights:**\n{features}\n\n"
            f"**Impact:** {messo['impact']}"
        )

    # --- 2. Project Specific: Medi-Vault ---
    if any(k in q for k in ["medi-vault", "medivault", "medical store", "pharmacy", "medicine", "expiry alert"]):
        medivault = next(p for p in PORTFOLIO_KNOWLEDGE["projects"] if p["id"] == "medivault")
        features = "\n".join([f"- {f}" for f in medivault["key_features"]])
        return (
            f"**{medivault['title']}**\n\n"
            f"{medivault['summary']}\n\n"
            f"**Tech Stack:** {', '.join(medivault['technologies'])}\n\n"
            f"**Key Highlights:**\n{features}\n\n"
            f"**Achievements:** Awarded Government of India Copyright and Runner-up position at ICI3-2024 International Conference."
        )

    # --- 3. Project Specific: Project-AURA / AURA OS ---
    if any(k in q for k in ["aura os", "this portfolio", "operating system", "3d assistant", "avatar", "robot"]) or (
        "aura" in q and any(k in q for k in ["what is", "about", "project", "build", "tech"])
    ):
        aura = next(p for p in PORTFOLIO_KNOWLEDGE["projects"] if p["id"] == "aura_os")
        features = "\n".join([f"- {f}" for f in aura["key_features"]])
        return (
            f"**{aura['title']}**\n\n"
            f"{aura['summary']}\n\n"
            f"**Architecture & Tech Stack:**\n"
            f"- **Frontend:** Next.js 15, React 19, Tailwind CSS, Three.js / React Three Fiber (3D interactive avatar)\n"
            f"- **Backend Gateway:** Spring Boot 3.x REST APIs with MySQL\n"
            f"- **AI Microservice:** Python FastAPI & Uvicorn for intelligent conversation and retrieval\n\n"
            f"**Features:**\n{features}"
        )

    # --- 4. All Projects Overview ---
    if any(k in q for k in ["projects", "project", "work", "built", "portfolio", "applications"]):
        projects = PORTFOLIO_KNOWLEDGE["projects"]
        lines = ["Here are Akshit's featured engineering projects:\n"]
        for idx, p in enumerate(projects, 1):
            lines.append(f"**{idx}. {p['title']}** ({p['category']})")
            lines.append(f"{p['summary']}")
            lines.append(f"*Tech Stack:* {', '.join(p['technologies'])}\n")
        lines.append("Feel free to ask me for specific details about **MESSO**, **Medi-Vault**, or **AURA OS**!")
        return "\n".join(lines)

    # --- 5. Work Experience / Internship ---
    if any(k in q for k in ["experience", "internship", "tech-coupling", "company", "work history", "job"]):
        exp = PORTFOLIO_KNOWLEDGE["experience"][0]
        points = "\n".join([f"- {h}" for h in exp["highlights"]])
        return (
            f"**Professional Experience:**\n\n"
            f"**{exp['role']}** at **{exp['company']}** ({exp['timeline']})\n"
            f"Location: {exp['location']}\n\n"
            f"**Key Contributions:**\n{points}"
        )

    # --- 6. Backend & Java Skills ---
    if any(k in q for k in ["backend", "java", "spring", "spring boot", "hibernate", "rest api", "microservices"]):
        backend_skills = ", ".join(PORTFOLIO_KNOWLEDGE["skills"]["backend"])
        return (
            f"**Backend Engineering Expertise:**\n\n"
            f"Akshit has extensive hands-on experience in Java Backend Development:\n"
            f"- **Frameworks & Architecture:** {backend_skills}\n"
            f"- **Databases:** MySQL schema design, query optimization, indexing, and Hibernate ORM.\n"
            f"- **Architecture Pattern:** Controller-Service-DAO layered architecture and RESTful microservices.\n\n"
            f"He has built high-scale systems including **MESSO**, **Medi-Vault**, and production APIs at **Tech-Coupling**."
        )

    # --- 7. AI & Python Skills ---
    if any(k in q for k in ["python", "ai", "machine learning", "ml", "data science", "llm", "deep learning", "numpy", "pandas"]):
        ai_data = ", ".join(PORTFOLIO_KNOWLEDGE["skills"]["ai_data"])
        ai_tools = ", ".join(PORTFOLIO_KNOWLEDGE["skills"]["ai_tools"])
        return (
            f"**AI & Data Science Capabilities:**\n\n"
            f"Akshit is actively building intelligent AI systems combining Python with backend architecture:\n"
            f"- **Core AI & Data:** {ai_data}\n"
            f"- **AI Tools & Experimentation:** {ai_tools}\n"
            f"- **Integration:** Python FastAPI AI microservices connected to full-stack applications (like this AURA system!)."
        )

    # --- 8. Frontend Skills ---
    if any(k in q for k in ["frontend", "react", "next", "tailwind", "ui", "ux", "css", "html", "javascript"]):
        frontend_skills = ", ".join(PORTFOLIO_KNOWLEDGE["skills"]["frontend"])
        return (
            f"**Frontend Engineering Skills:**\n\n"
            f"Akshit creates sleek, modern, and interactive user interfaces:\n"
            f"- **Technologies:** {frontend_skills}\n"
            f"- **Specialties:** Component-driven design, responsive layouts with Tailwind CSS, and 3D visual experiences using Three.js and React Three Fiber."
        )

    # --- 9. All Skills Overview ---
    if any(k in q for k in ["skills", "technologies", "tech stack", "stack", "know", "tools"]):
        skills = PORTFOLIO_KNOWLEDGE["skills"]
        return (
            f"**Akshit Bhandari's Technical Skill Set:**\n\n"
            f"- **Languages:** {', '.join(skills['languages'])}\n"
            f"- **Backend Systems:** {', '.join(skills['backend'])}\n"
            f"- **Frontend:** {', '.join(skills['frontend'])}\n"
            f"- **AI & Data Science:** {', '.join(skills['ai_data'])}\n"
            f"- **Engineering Tools:** {', '.join(skills['tools_devops'])}\n"
            f"- **Core CS Foundations:** {', '.join(skills['core_concepts'])}"
        )

    # --- 10. Education & Background ---
    if any(k in q for k in ["education", "college", "degree", "university", "acropolis", "cgpa", "btech", "b.tech", "study"]):
        edu = PORTFOLIO_KNOWLEDGE["profile"]["education"]
        return (
            f"**Academic Background:**\n\n"
            f"- **Degree:** {edu['degree']}\n"
            f"- **Institution:** {edu['institution']}\n"
            f"- **Timeline:** {edu['duration']}\n"
            f"- **CGPA:** {edu['cgpa']}\n\n"
            f"Strong foundations in Data Structures & Algorithms, Object-Oriented Programming, DBMS, Computer Networks, and Operating Systems."
        )

    # --- 11. Achievements & Awards ---
    if any(k in q for k in ["achievements", "awards", "copyright", "conference", "certifications", "certificate", "nptel"]):
        achievements = "\n".join([f"- {a}" for a in PORTFOLIO_KNOWLEDGE["achievements"]])
        return (
            f"**Key Achievements & Honors:**\n\n{achievements}"
        )

    # --- 12. Contact & Hiring ---
    if any(k in q for k in ["contact", "hire", "email", "phone", "linkedin", "github", "reach", "message"]):
        prof = PORTFOLIO_KNOWLEDGE["profile"]
        return (
            f"**Get in Touch with Akshit Bhandari:**\n\n"
            f"- **Email:** [{prof['email']}](mailto:{prof['email']})\n"
            f"- **LinkedIn:** [linkedin.com/in/akshit-bhandari-dev]({prof['linkedin']})\n"
            f"- **GitHub:** [github.com/akshit1508]({prof['github']})\n"
            f"- **Phone:** {prof['phone']}\n"
            f"- **Location:** {prof['location']}\n\n"
            f"You can also use the contact form at the bottom of the portfolio page to send him a message directly!"
        )

    # --- 13. Resume / CV ---
    if any(k in q for k in ["resume", "cv"]):
        return (
            f"You can view and download Akshit Bhandari's complete resume directly in this portfolio! "
            f"Click on the **Resume** button in the navigation bar or head to `/resume` to explore his full qualifications, "
            f"projects (**MESSO**, **Medi-Vault**), work experience at **Tech-Coupling**, and certifications."
        )

    # --- 14. Greetings & Introduction ---
    if any(re.search(rf"\b{g}\b", q) for g in ["hi", "hello", "hey", "hola", "greetings"]) or q in [
        "who are you", "who are you?", "what is aura", "what is aura?", "who is akshit", "who is akshit?"
    ]:
        prof = PORTFOLIO_KNOWLEDGE["profile"]
        return (
            f"Hello! I am **AURA**, personal AI assistant for **{prof['name']}**.\n\n"
            f"Akshit is an **{prof['role']}** based in {prof['location']}. "
            f"I can answer any questions you have about his:\n"
            f"- Featured Projects (**MESSO**, **Medi-Vault**, **AURA OS**)\n"
            f"- Technical Skills (Java, Spring Boot, Python, React, MySQL, AI/ML)\n"
            f"- Work Experience & Internship at **Tech-Coupling**\n"
            f"- Education, Achievements, and Contact Information\n\n"
            f"What would you like to know?"
        )

    # --- 15. Default Intelligent Summary ---
    prof = PORTFOLIO_KNOWLEDGE["profile"]
    return (
        f"I'm AURA, the AI assistant for {prof['name']}'s portfolio.\n\n"
        f"{prof['bio']}\n\n"
        f"Feel free to ask me questions such as:\n"
        f"- *'Tell me about MESSO project'*\n"
        f"- *'What is Medi-Vault and what did it achieve?'*\n"
        f"- *'What are Akshit's backend and Java skills?'*\n"
        f"- *'What experience does Akshit have?'*\n"
        f"- *'How can I contact or hire Akshit?'*"
    )


def generate_aura_response(message: str) -> str:
    """
    Main response generation pipeline:
    Tries the configured LLM provider; falls back instantly to the high-fidelity
    portfolio knowledge engine.
    """
    cleaned = message.strip()
    if not cleaned:
        return "Please feel free to ask any question about Akshit's projects, skills, or experience!"

    # Try LLM first if provider is configured and available
    llm_output = call_llm_provider(cleaned)
    if llm_output:
        return llm_output

    # Intelligent knowledge base retrieval
    return get_knowledge_response(cleaned)
