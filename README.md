# 🛡️ CodeGuard AI

CodeGuard AI is an AI-powered code review and analysis tool built to help developers understand code issues, review diagnostics, generate fixes, and apply suggested changes directly inside a Monaco-based editor.

The project combines **ASP.NET Core Web API**, **Roslyn static analysis**, **React**, **Monaco Editor**, and AI provider integration.

---

## ✨ Features

### 🔍 Code Analysis

- Upload source files
- Paste code directly into the editor
- ZIP/project scanning
- GitHub repository scanning
- C# static analysis using Roslyn
- Error and warning detection
- File-level issue reporting
- Line and column information
- Issue filtering by severity
- File explorer and project scanning
- Analysis progress/status feedback

### 🤖 AI-Powered Code Review

- Generate an AI fix for a selected issue
- Show original and suggested code
- Explain code issues
- Generate minimal fixes
- Generate optimized code suggestions
- Apply suggested fixes directly to Monaco Editor
- Re-analyze code after applying a fix
- Configurable AI provider and model
- Temperature and maximum-token settings

### 🧠 AI Provider Architecture

CodeGuard AI currently supports:

1. **OpenRouter**
2. **Google Gemini**

Providers and available models can be discovered dynamically through the backend and selected from the AI Settings dialog.

The current default AI configuration uses **OpenRouter with Qwen3-Coder**. Users can change the provider and model through AI Settings.

---

## 🏗️ Architecture

```text
                         CodeGuard AI
                              │
                ┌─────────────┴─────────────┐
                │                           │
             Frontend                    Backend
                │                           │
        React + Vite                 ASP.NET Core Web API
                │                           │
        Monaco Editor                     C#
                │                           │
        Zustand State                 Service Layer
                │                           │
             Axios                     Project Scanner
                │                           │
                └─────────────┬─────────────┘
                              │
                       Code Analysis
                              │
                           Roslyn
                              │
                    Diagnostics / Issues
                              │
                         AI Review
                              │
                   ┌──────────┴──────────┐
                   │                     │
               OpenRouter             Gemini
                   │
              Qwen3-Coder
```

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- Zustand
- Monaco Editor
- Axios
- Lucide React

### Backend

- ASP.NET Core Web API
- .NET 8
- C#
- Roslyn
- Service-based architecture
- HttpClient
- Swagger / OpenAPI

### AI

- OpenRouter
- Google Gemini
- Dynamically discovered models
- Qwen3-Coder as the current default OpenRouter model

---

## 🔄 Application Flow

```text
Upload / Paste Code
        │
        ▼
Frontend
        │
        ▼
ASP.NET Core API
        │
        ├── File / Project Scanner
        │
        ├── Roslyn Analyzer
        │
        ▼
Diagnostics
        │
        ▼
Issues Dashboard
        │
        ▼
User selects an issue
        │
        ▼
AI Fix
        │
        ▼
Selected AI Provider
        │
        ▼
Suggested Code
        │
        ▼
Apply Suggested Fix
        │
        ▼
Monaco Editor
        │
        ▼
Re-analysis
```

---

## 📂 Project Structure

The repository contains both frontend and backend projects:

```text
CodeGuard-AI/
│
├── backend/
│   ├── CodeGuard.API.sln
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── screenshots/
│   └── ...
│
├── .gitignore
└── README.md
```

The backend can be developed and run using Visual Studio, while the frontend can be developed and run using VS Code.

---

## 🚀 Getting Started

### Prerequisites

Install:

- .NET 8 SDK
- Visual Studio 2022 or later
- Node.js
- npm
- Git

---

## ⚙️ Backend Setup

Open the backend solution in Visual Studio or open a terminal in the backend directory.

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

Swagger is enabled for the development environment.

The frontend should be configured to use the API URL exposed by the backend.

---

## 💻 Frontend Setup

Open a terminal in the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server normally runs on:

```text
http://localhost:5173
```

---

## 🤖 AI Provider Configuration

AI provider configuration should be kept local and must never contain real API keys in the public repository.

### OpenRouter

```json
{
  "ApiKey": "YOUR_OPENROUTER_API_KEY",
  "BaseUrl": "https://openrouter.ai/api/v1/"
}
```

### Google Gemini

```json
{
  "ApiKey": "YOUR_GEMINI_API_KEY",
  "BaseUrl": "https://generativelanguage.googleapis.com/v1beta/"
}
```

### Default AI

The current application uses **OpenRouter with Qwen3-Coder as the default AI model**. The selected provider and model can be changed from the AI Settings dialog.

---

## 🔐 Security

**Never commit API keys, tokens, passwords, or other secrets to GitHub.**

Use local configuration for development secrets.

If an API key has ever been committed to a public repository, revoke it and generate a new key.

---

## 📊 Current V1 Scope

CodeGuard AI V1 focuses on the complete developer workflow:

- Source code input
- File upload
- ZIP scanning
- GitHub repository scanning
- Project scanning
- C# Roslyn analysis
- Errors and warnings
- Issue filtering
- AI provider selection
- Dynamic model selection
- AI-powered issue fixes
- Suggested code
- Monaco Editor integration
- Apply Suggested Fix
- Re-analysis
- Responsive dashboard
- Dark theme

---

## 🔮 Future Improvements

Potential future improvements include:

- Additional language analyzers
- Advanced code-smell detection
- More accurate time and space complexity analysis
- Project-wide AI suggestions
- Better cross-file context for AI fixes
- Analysis history
- More AI providers
- Advanced architecture recommendations
- Automated test generation
- Improved fix validation

---

## 📸 Screenshots

Add application screenshots to a `screenshots` directory.

Recommended screenshots:

```text
screenshots/
├── dashboard.png
├── code-analysis.png
├── ai-settings.png
├── issue-details.png
└── ai-fix.png
```

Example:

```markdown
![CodeGuard AI Dashboard](screenshots/dashboard.png)

![AI Settings](screenshots/ai-settings.png)

![AI Fix](screenshots/ai-fix.png)
```

---

## 👨‍💻 Author

**Prathamesh Jadhav**

Software Engineer

### Project

**CodeGuard AI — AI-Powered Code Review and Analysis Tool**

---

## ⭐ Project Goal

CodeGuard AI was created as a practical developer tool that combines traditional static analysis with AI-assisted development.

The goal is to help developers move from:

**Detect → Understand → Fix → Apply → Re-analyze**

within a single development workspace.
