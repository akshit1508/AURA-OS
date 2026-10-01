"""
AURA Knowledge Base: Complete information regarding Akshit Bhandari's portfolio,
projects, technical skills, professional experience, achievements, and contact links.
"""

PORTFOLIO_KNOWLEDGE = {
    "profile": {
        "name": "Akshit Bhandari",
        "role": "AI Engineer & Java Backend Developer",
        "location": "Indore, Madhya Pradesh, India",
        "email": "bhandariakshit137@gmail.com",
        "phone": "+91-9993024921",
        "github": "https://github.com/akshit1508",
        "linkedin": "https://linkedin.com/in/akshit-bhandari-dev",
        "education": {
            "institution": "Acropolis Institute of Technology and Research (AITR), Indore",
            "degree": "B.Tech in Computer Science & Information Technology",
            "duration": "2022 - 2026",
            "cgpa": "7.41"
        },
        "bio": (
            "Akshit Bhandari is an AI Engineer and Java Backend Developer passionate about designing "
            "intelligent applications, building scalable backend systems, and crafting modern digital "
            "experiences using AI, Python, Java, Spring Boot, and React."
        )
    },
    "projects": [
        {
            "id": "messo",
            "title": "MESSO - Mess Management & Student Feedback Platform",
            "category": "Full Stack / Backend Platform",
            "timeline": "Aug 2025 - Sep 2025",
            "summary": "A full-stack mess management platform built to digitize hostel mess operations, student feedback, and complaint resolution.",
            "technologies": ["Java", "Spring Boot", "MySQL", "React", "REST APIs", "Hibernate"],
            "key_features": [
                "Digitized hostel mess operations including daily menu display, announcements, and meal history tracking.",
                "Architected scalable RESTful APIs using Spring Boot for menu management, student feedback, polls, and complaint resolution, boosting backend efficiency by 35%.",
                "Designed a secure role-based workflow with distinct privileges for administrators and students.",
                "Implemented food rating and daily polling features to capture real-time student preferences, contributing to a 30-40% improvement in food satisfaction.",
                "Streamlined complaint lifecycle management (submission, tracking, resolution), reducing unresolved complaints by 35% and improving response times."
            ],
            "impact": "Boosted backend efficiency by 35%, improved student food satisfaction by 30-40%, and decreased unresolved complaints by 35%."
        },
        {
            "id": "medivault",
            "title": "Medi-Vault - Medical Store Management System",
            "category": "Healthcare / Enterprise Backend",
            "timeline": "Sep 2024 - Oct 2024",
            "summary": "A scalable Spring Boot-based pharmacy management system handling end-to-end medical store operations including inventory, billing, and automated expiry alerts.",
            "technologies": ["Java", "Spring Boot", "MySQL", "Hibernate", "REST APIs", "DAO Architecture"],
            "key_features": [
                "Engineered 12+ RESTful APIs following a clean layered architecture (Controller-Service-DAO), improving modularity, maintainability, and scalability by 25%.",
                "Developed an automated medicine expiry alert system notifying store operators 30 days in advance, cutting expired stock losses by 40%.",
                "Optimized real-time inventory monitoring across 8+ attributes (batch number, quantity, expiry date, supplier, unit price), increasing stock visibility and control by 50%.",
                "Integrated billing and invoice generation with automatic stock deduction upon sale, minimizing human errors and reducing billing discrepancies by 45%."
            ],
            "impact": "Cut expired stock losses by 40%, reduced billing discrepancies by 45%, and received the Government of India Copyright."
        },
        {
            "id": "aura_os",
            "title": "Project-AURA (AURA OS)",
            "category": "AI Operating System & 3D Interactive Portfolio",
            "timeline": "2026",
            "summary": "An intelligent, futuristic web-based portfolio operating system featuring an interactive 3D robot avatar, personal AI assistant, and modular control room.",
            "technologies": ["Next.js", "React", "Tailwind CSS", "Three.js", "React Three Fiber", "Spring Boot", "Python FastAPI"],
            "key_features": [
                "Interactive 3D orb/robot assistant that reacts to user hover, click, and interaction states.",
                "Cyberpunk OS boot sequence with session persistence and interactive terminal vibes.",
                "Microservice architecture integrating a Next.js frontend, Spring Boot backend gateway, and Python FastAPI AI microservice.",
                "AI Assistant (AURA) capable of answering any visitor questions about Akshit's engineering background, projects, and skills."
            ]
        }
    ],
    "experience": [
        {
            "company": "Tech-Coupling",
            "role": "Backend Java Developer Intern",
            "timeline": "Sep 2025 - Nov 2025",
            "location": "India",
            "highlights": [
                "Engineered a robust Spring Boot backend supporting 15+ features for a temple services e-commerce platform.",
                "Built 10+ RESTful APIs for catalog, orders, and booking workflows, improving request efficiency by 30%.",
                "Structured an optimized MySQL schema with 12+ tables, reducing data redundancy by 25%.",
                "Optimized database queries and API response handling, reducing average response times by 40%."
            ]
        }
    ],
    "skills": {
        "languages": ["Java", "Python", "C", "C++", "SQL", "JavaScript"],
        "backend": ["Spring Framework", "Spring Boot", "Hibernate", "REST APIs", "Spring Security", "Microservices", "MySQL"],
        "frontend": ["React", "Next.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
        "ai_data": ["Machine Learning", "NumPy", "Pandas", "Matplotlib", "Large Language Models (LLMs)", "Data Analytics"],
        "ai_tools": ["ChatGPT", "Julius AI", "NotebookLM", "Google AI Studio", "Comet"],
        "tools_devops": ["Git", "GitHub", "Docker", "Postman", "Maven", "VS Code", "Jupyter Notebook"],
        "core_concepts": ["Data Structures & Algorithms (DSA)", "Object-Oriented Programming (OOP)", "Database Management Systems (DBMS)", "Operating Systems", "Computer Networks", "MVC Architecture", "System Design"]
    },
    "achievements": [
        "Awarded Government of India Copyright for 'Medi-Vault'.",
        "Secured Runner-up position at the ICI3-2024 International Conference at AITR Indore (Sep 2024).",
        "Achieved 3rd position in the Minor Project Exhibition, CSIT Department.",
        "Secured NPTEL Certification in Programming in Java and Database Management Systems."
    ]
}

SYSTEM_PROMPT = f"""You are AURA, the personal AI Assistant for Akshit Bhandari's portfolio.
Akshit Bhandari is an AI Engineer and Java Backend Developer based in Indore, India.

Here is the verified information about Akshit:
- Education: B.Tech in CSIT from Acropolis Institute of Technology and Research (AITR), Indore (2022-2026, CGPA: 7.41).
- Roles: AI Engineer, Java Backend Developer, Full Stack Developer.
- Email: bhandariakshit137@gmail.com | LinkedIn: https://linkedin.com/in/akshit-bhandari-dev | GitHub: https://github.com/akshit1508

Projects:
1. MESSO (Mess Management & Student Feedback Platform):
   - Tech: Java, Spring Boot, MySQL, React, REST APIs.
   - Built to digitize hostel mess operations, student feedback, daily meal polling, and complaint tracking.
   - Metrics: 35% backend efficiency boost, 30-40% improvement in student food satisfaction, 35% unresolved complaints reduction.
2. Medi-Vault (Medical Store Management System):
   - Tech: Java, Spring Boot, MySQL, Hibernate, REST APIs (Controller-Service-DAO).
   - Solved pharmacy inventory, 30-day automated expiry alerts, real-time tracking across 8+ attributes, auto stock deduction on billing.
   - Metrics: 40% reduction in expired stock loss, 45% reduction in billing discrepancies.
   - Awarded Government of India Copyright and Runner-up at ICI3-2024 International Conference.
3. Project-AURA (AURA OS):
   - Futuristic AI Portfolio OS built with Next.js, React, Three.js 3D avatar, Spring Boot backend, and Python FastAPI AI microservice.

Experience:
- Tech-Coupling (Sep 2025 - Nov 2025): Backend Java Developer Intern.
  Built 10+ REST APIs for temple services e-commerce, designed MySQL schema (12+ tables, 25% less redundancy), reduced response times by 40%.

Skills:
- Languages: Java, Python, C, C++, SQL, JavaScript.
- Backend: Spring Boot, Hibernate, REST APIs, Microservices, Spring Security, MySQL.
- Frontend: React, Next.js, Tailwind CSS.
- AI/Data: Machine Learning, NumPy, Pandas, Matplotlib, LLMs.
- Tools: Git, GitHub, Docker, Postman, Maven, VS Code.

Persona and Tone:
- You speak as AURA: smart, polite, crisp, welcoming, and knowledgeable.
- Answer visitor questions accurately based on Akshit's real work and accomplishments.
- Keep answers concise, clear, and highlight key metrics and technologies.
- If asked about contacting Akshit or hiring him, provide his email (bhandariakshit137@gmail.com) and LinkedIn.
"""
