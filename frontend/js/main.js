// Main application logic - Multi-page version
class CareerAdvisorApp {
    constructor() {
        this.currentUser = null;
        this.userProgress = JSON.parse(localStorage.getItem('userProgress')) || {};
        this.apiBaseUrl = "http://localhost:5000"; // backend API
        this.init();
    }

    init() {
        console.log('Career Advisor App Initializing...');
        this.loadComponents().then(() => {
            this.setupEventListeners();
            this.loadUserProgress();
            this.checkAuthentication();
            this.initializePageSpecificFeatures();
            console.log('Career Advisor App Ready!');
        });
    }

    async loadComponents() {
        console.log('Loading components...');
        try {
            await this.loadComponent('navbar', 'components/navbar.html');
            await this.loadComponent('footer', 'components/footer.html');
            console.log('Components loaded successfully');
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }

    async loadComponent(elementId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component ${elementId}:`, error);
        }
    }

    initializePageSpecificFeatures() {
        const currentPage = this.getCurrentPage();
        console.log('Current page:', currentPage);

        switch(currentPage) {
            case 'careers.html':
                this.protectPage();
                this.initializeCareersPage();
                break;
            case 'quiz.html':
                this.protectPage();
                this.initializeQuizPage();
                break;
            case 'roadmap.html':
                this.protectPage();
                this.initializeRoadmapPage();
                break;
            case 'login.html':
                this.initializeLoginPage();
                break;
            case 'signup.html':
                this.initializeSignupPage();
                break;
            case 'index.html':
                this.initializeHomePage();
                break;
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1);
    }

    initializeHomePage() {
        console.log('Initializing home page features');
    }

    initializeCareersPage() {
        console.log('Initializing careers page');
        if (window.careerManager) {
            window.careerManager.loadAndDisplayCareers();
        }
    }

    initializeQuizPage() {
        console.log('Initializing quiz page');
    }

    initializeRoadmapPage() {
        console.log('Initializing roadmap page');
        if (window.roadmapManager) {
            window.roadmapManager.initializeRoadmapPage();
        }
    }

    // 🚀 NEW: Initialize Login
    initializeLoginPage() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                const res = await fetch(`${this.apiBaseUrl}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const result = await res.json();
                if (result.token) {
                    localStorage.setItem("authToken", result.token);
                    localStorage.setItem("userData", JSON.stringify({ email }));
                    alert("Login successful!");
                    window.location.href = "dashboard.html";
                } else {
                    alert(result.message);
                }
            });
        }
    }

    // 🚀 NEW: Initialize Signup
    initializeSignupPage() {
        const form = document.getElementById('signupForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                const res = await fetch(`${this.apiBaseUrl}/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                const result = await res.json();
                alert(result.message);
                if (res.ok) {
                    window.location.href = "login.html";
                }
            });
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-link')) {
                e.preventDefault();
                const link = e.target.closest('.nav-link');
                this.handleNavigation(link);
            }
            if (e.target.id === "logoutBtn") {
                this.logout();
            }
        });
    }

    handleNavigation(link) {
        const href = link.getAttribute('href');
        console.log('Navigation to:', href);
        if (href && href !== '#') {
            window.location.href = href;
        }
    }

    checkAuthentication() {
        const token = localStorage.getItem('authToken');
        if (token) {
            this.currentUser = JSON.parse(localStorage.getItem('userData'));
            this.updateUIForAuthState(true);
        } else {
            this.updateUIForAuthState(false);
        }
    }

    updateUIForAuthState(isLoggedIn) {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        if (isLoggedIn) {
            navbar.innerHTML += `<button id="logoutBtn">Logout</button>`;
        } else {
            // Could add Login/Signup links if needed
        }
        console.log('Auth state updated:', isLoggedIn);
    }

    // 🚀 NEW: Logout
    logout() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        alert("Logged out successfully!");
        window.location.href = "index.html";
    }

    // 🚀 Protect restricted pages
    protectPage() {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in first!");
            window.location.href = "login.html";
        }
    }

    saveUserProgress() {
        localStorage.setItem('userProgress', JSON.stringify(this.userProgress));
    }

    loadUserProgress() {
        const progress = JSON.parse(localStorage.getItem('userProgress')) || {};
        this.userProgress = progress;
    }
}

// Global navigation functions
function navigateTo(page) {
    window.location.href = page;
}

function startQuiz() {
    window.location.href = 'quiz.html';
}

function viewCareers() {
    window.location.href = 'careers.html';
}

function viewRoadmap() {
    window.location.href = 'roadmap.html';
}

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing app...');
    window.careerApp = new CareerAdvisorApp();
});
