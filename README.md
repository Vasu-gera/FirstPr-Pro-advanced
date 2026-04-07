# 🚀 FirstPR Pro

> **Find your first open-source contribution in seconds — not hours.**

**FirstPR Pro** is an AI-powered GitHub issue recommendation engine that helps developers discover beginner-friendly issues tailored to their skills.

It uses a **Python backend + AI (Gemini API)** to intelligently filter and rank issues so beginners can confidently make their first pull request.

---

## 🌟 Why FirstPR Pro?

> “I want to contribute to open source… but I don’t know where to start.”

GitHub has thousands of issues, but:
- Poor filtering by skill level  
- Misleading `good-first-issue` tags  
- Overwhelming results  

💡 **FirstPR Pro solves this using AI + ranking to show only the best issues for YOU.**

---

## 🧠 How It Works

1. User enters **skills & technologies**
2. Backend fetches issues using GitHub API
3. Python engine ranks issues
4. **Gemini AI filters the best matches**
5. Returns a **clean, curated list**

---

## ✨ Core Features

### 🤖 AI-Powered Filtering (Gemini API)
- Understands issue context deeply  
- Removes complex or irrelevant issues  
- Suggests best issues for your **first PR**  

### 🔹 Personalized Recommendations
- Skill-based matching  
- Beginner-friendly filtering  
- Clean results  

### 🔹 Ranking Engine
- Skill match score  
- Issue recency  
- Repo activity  

### 🔹 Real-Time Data
- GitHub REST API  
- Smart filtering pipeline  

---

## 🛠️ Tech Stack

### Frontend (client/)
- React.js  
- JavaScript (ES6)  
- CSS  

### Backend (server/)
- Python  
- REST APIs  

### AI Layer
- Google Gemini API  

### Database
- SQLite (`firstpr.db`)  

### Integrations
- GitHub REST API  

---

## 🏗️ Project Structure

```
FIRSTPR-PRO/
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│
├── server/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── requirements.txt
│   ├── firstpr.db
│   └── .env
│
├── README.md
└── .gitignore
```

---

## 🏗️ System Architecture

```
Frontend (React)
        ↓
Python Backend (API)
        ↓
GitHub API
        ↓
Ranking Engine (Python)
        ↓
Gemini AI Filtering
        ↓
Final Recommendations
        ↓
Frontend Display
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- Python 3.9+
- GitHub Token
- Gemini API Key

---

### 1. Clone Repo
```bash
git clone https://github.com/Vasu-gera/FirstPr-Pro-advanced.git
cd FirstPr-Pro-advanced
```

---

### 2. Setup Backend

```bash
cd server
pip install -r requirements.txt
```

Create `.env`:

```env
GITHUB_TOKEN=your_token
GEMINI_API_KEY=your_key
```

Run backend:

```bash
python main.py
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🚀 Usage

1. Open the app  
2. Enter skills  
3. Click **Find Issues**  
4. Get AI-filtered results  
5. Start contributing 🚀  

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/issues` | Fetch issues |
| POST | `/prefs` | Store preferences |
| GET | `/recommend` | AI-ranked issues |

---

## ⚠️ Edge Cases

- Empty input → validation  
- No results → fallback suggestion  
- API limit → handled gracefully  
- AI failure → fallback ranking  

---

## 🧩 Challenges

- GitHub API rate limits  
- Gemini prompt tuning  
- Python backend design  
- AI + ranking integration  

---

## 🔮 Future Improvements

- [ ] GitHub OAuth  
- [ ] AI “how to solve this issue” suggestions  
- [ ] Difficulty scoring  
- [ ] Chrome extension  

---

## 👨‍💻 Author

**Vasu Gera**  

---

## 💡 Vision

> Turning confusion into contribution.

Helping developers go from:
**“Where do I start?” → “I made my first PR 🚀”**

---

<div align="center">
  <b>Built to simplify open source onboarding 🚀</b>
</div>
