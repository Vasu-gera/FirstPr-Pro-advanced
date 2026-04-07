# 🚀 FirstPR Pro

> **Find your first open-source contribution in seconds — not hours.**

**FirstPR Pro** is an AI-powered GitHub issue recommendation engine that helps developers discover beginner-friendly issues tailored to their skills, making it easier to start contributing to open source with confidence.

---

## 🌟 Why FirstPR Pro?

One of the biggest challenges for new developers is:

> “I want to contribute to open source… but I don’t know where to start.”

Even though GitHub provides tags like `good-first-issue`, beginners still face:
- Irrelevant or outdated issues  
- Poor filtering by skill level  
- Overwhelming search results  

💡 **FirstPR Pro solves this by using AI as a smart recommendation layer on top of GitHub.**

---

## 🧠 How It Works

1. You enter your **skills & technologies**
2. The system fetches issues from GitHub
3. A custom **Python ranking engine** scores them
4. **Google Gemini AI** filters and refines the best matches
5. You get a **highly curated list of issues you can actually solve**

---

## ✨ Core Features

### 🤖 AI-Powered Filtering (Gemini API)
- Deep contextual understanding of issue requirements vs your skills  
- Filters out misleading `good-first-issue` tags  
- Ensures high-quality recommendations  

### 🔹 Personalized Recommendations
- Matches issues with your **skills and tech stack**  
- Filters by `good-first-issue` and `help-wanted`  
- Reduces noise → only relevant issues  

### 🔹 Intelligent Ranking Engine
- Skill matching score  
- Issue recency  
- Repository activity level  
- Relevance-based sorting  

### 🔹 Real-Time Data Fetching
- GitHub REST API integration  
- Puppeteer fallback scraping  

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6)

### Backend
- Node.js, Express.js

### Ranking & AI Logic
- Python (custom scoring algorithm)  
- Google Gemini API (AI contextual filtering)

### Integrations
- GitHub REST API  
- Puppeteer  

---

## 🏗️ System Architecture

```text
User Input (Skills)
        ↓
Frontend (HTML/CSS/JS)
        ↓
Node.js Backend (Express)
        ↓
GitHub API + Scraper
        ↓
Python Ranking Engine
        ↓
Gemini AI API (Contextual Filtering)
        ↓
Ranked & Verified Issues Response
        ↓
Frontend Display
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- Python 3.9+
- GitHub Personal Access Token
- Gemini API Key

---

### 1. Clone the Repository
```bash
git clone https://github.com/Vasu-gera/FirstPr-Pro-advanced.git
cd FirstPr-Pro-advanced
```

### 2. Install Dependencies
```bash
npm install
pip install -r requirements.txt
```

---

### 3. Environment Variables

Create a `.env` file:

```env
GITHUB_TOKEN=your_github_token
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

---

### 4. Run Backend
```bash
node server.js
```

---

### 5. Run Frontend
```bash
npx serve frontend
```

---

## 🚀 Usage

1. Open the application  
2. Enter your skills (e.g., `JavaScript`, `Python`)  
3. Click **Find Issues**  
4. Browse AI-ranked GitHub issues  
5. Start contributing 🎉  

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/issues` | Fetch raw issues |
| POST | `/prefs` | Store user preferences |
| GET | `/recommend` | Get AI-ranked issues |

---

## 📁 Project Structure

```
FirstPr-Pro-advanced/
├── frontend/
├── backend/
├── ranking/
├── package.json
├── requirements.txt
└── README.md
```

---

## ⚠️ Edge Case Handling

- Empty input → Validation warnings  
- No results → Helpful fallback messaging  
- API rate limits → Puppeteer fallback  
- AI/Ranking failure → Default sorting  

---

## 🧩 Challenges

- Handling GitHub API rate limits  
- Fine-tuning Gemini API prompts  
- Node.js ↔ Python integration  
- Maintaining real-time performance  

---

## 🔮 Future Improvements

- [ ] 🔐 GitHub OAuth login  
- [ ] 🤖 AI-generated “How to start” summaries  
- [ ] 📬 Weekly personalized issue digest  
- [ ] 🌐 Browser extension  

---

## 🤝 Contributing

Contributions are welcome!

```bash
git checkout -b feature/your-feature
git commit -m "Add feature"
git push origin feature/your-feature
```

Then open a Pull Request 🚀

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Vasu Gera**  
Backend Developer & System Designer  
Focused on building developer tools & scalable systems  

---

## 💡 Vision

> FirstPR Pro is not just a tool — it's a bridge.

A bridge between:
- Learning → Contributing  
- Beginners → Open Source  
- Confusion → Action  

---

<div align="center">
  <b>Helping developers make their first PR 🚀</b>
</div>
