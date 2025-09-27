# 🎯 Career Path Advisor  

A full-stack web application that helps users **discover their ideal career path** through smart quizzes, personalized recommendations, and guided roadmaps.  

---

## ✨ Features  

- 🔍 **Career Quiz** – Answer tailored questions to find careers that match your skills & interests  
- 📊 **Skill Gap Analysis** – Identify skills you need to develop for your dream career  
- 🗺️ **Roadmaps** – Step-by-step guides for different career paths  
- 📈 **Progress Tracking** – Visualize your journey with a progress widget  
- 📱 **Responsive Design** – Works seamlessly on desktop and mobile  

---

## 🛠 Tech Stack  

### Frontend  
- **HTML5** – Structure  
- **CSS3** – Styling, responsive layouts  
- **JavaScript (ES6+)** – Interactivity and logic  
- Reusable components (navbar, footer, progress widget)  

### Backend  
- **Node.js** with **Express.js**  
- RESTful API routes  
- JSON-based mock data (for now, can extend to a database later)  

---

## 📂 Project Structure  

```bash
Career-Advisor/
│
├── backend/                # Backend server (Node.js + Express)
│   ├── controller/         # Business logic
│   ├── data/               # Mock data / JSON files
│   ├── routes/             # API routes
│   ├── server.js           # Entry point for backend
│   ├── package.json        # Backend dependencies
│   └── package-lock.json
│
├── frontend/               # Frontend (HTML, CSS, JS)
│   ├── components/         # Reusable UI components
│   │   ├── footer.html
│   │   ├── navbar.html
│   │   └── progress-widget.html
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   │   ├── career.js
│   │   ├── main.js
│   │   ├── progress.js
│   │   ├── quiz.js
│   │   └── roadmap.js
│   ├── career.html
│   ├── index.html
│   ├── login.html
│   ├── quiz.html
│   ├── roadmap.html
│   └── signup.html
│
└── README.md               # Project documentation
