// Quiz page specific functionality
class QuizManager {
    constructor() {
        this.quizAnswers = [];
        this.currentQuestion = 0;
        this.questions = this.getQuizQuestions();
        this.init();
    }

    init() {
        console.log('Quiz Manager Initialized');
    }

    startQuiz() {
        console.log('Starting quiz...');
        document.getElementById('quiz-intro').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        document.getElementById('quiz-results').classList.add('hidden');
        
        this.quizAnswers = [];
        this.currentQuestion = 0;
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.completeQuiz();
            return;
        }

        const question = this.questions[this.currentQuestion];
        document.getElementById('quiz-question').textContent = question.text;
        
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = question.options.map(option => `
            <button class="btn btn-outline quiz-option" onclick="quizManager.handleAnswer('${option.value}')">
                ${option.text}
            </button>
        `).join('');
        
        this.updateProgressBar();
    }

    handleAnswer(value) {
        console.log('Answer selected:', value);
        this.quizAnswers.push(value);
        this.currentQuestion++;
        this.loadQuestion();
    }

    updateProgressBar() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('quiz-progress').style.width = progress + '%';
        document.getElementById('quiz-status').textContent = 
            `Question ${this.currentQuestion + 1} of ${this.questions.length}`;
    }

    async completeQuiz() {
        console.log('Quiz completed with answers:', this.quizAnswers);
        
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('quiz-results').classList.remove('hidden');
        
        if (window.careerManager) {
            const recommendations = await window.careerManager.getRecommendations(this.quizAnswers);
            this.displayResults(recommendations);
        }
    }

    displayResults(recommendations) {
        const container = document.getElementById('recommendations-container');
        container.innerHTML = recommendations.map((career, index) => `
            <div class="recommendation-card ${index === 0 ? 'top-match' : ''}">
                <div class="match-badge">${career.matchPercentage}% Match</div>
                <h3>${career.title}</h3>
                <p>${career.description}</p>
                <div class="career-stats">
                    <span class="salary">$${career.salaryRange.min}K - $${career.salaryRange.max}K</span>
                    <span class="demand ${career.demand.toLowerCase()}">${career.demand}</span>
                </div>
                <div class="recommendation-actions">
                    <button class="btn-outline" onclick="careerManager.viewCareerDetails('${career.id}')">View Details</button>
                    <button class="btn-primary" onclick="viewRoadmapForCareer('${career.id}')">Get Learning Path</button>
                </div>
            </div>
        `).join('');
    }

    getQuizQuestions() {
        return [
            {
                text: "What type of work environment do you prefer?",
                options: [
                    { value: "A", text: "Fast-paced tech company" },
                    { value: "B", text: "Research or analytical setting" },
                    { value: "C", text: "Creative agency or studio" },
                    { value: "D", text: "Stable corporate environment" }
                ]
            },
            // ... include all 5 questions
        ];
    }
}

// Global functions for quiz page
function startQuiz() {
    if (window.quizManager) {
        window.quizManager.startQuiz();
    }
}

function restartQuiz() {
    if (window.quizManager) {
        window.quizManager.startQuiz();
    }
}

function viewDetailedAnalysis() {
    alert('Detailed analysis feature coming soon!');
}

function viewRoadmapForCareer(careerId) {
    window.location.href = `roadmap.html?career=${careerId}`;
}

// Initialize quiz manager
document.addEventListener('DOMContentLoaded', function() {
    window.quizManager = new QuizManager();
});