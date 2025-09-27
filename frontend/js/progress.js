// Progress tracking functionality
class ProgressTracker {
    constructor() {
        this.progressKey = 'careerAdvisorProgress';
        this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem(this.progressKey);
        this.progress = saved ? JSON.parse(saved) : {
            quizCompleted: false,
            careersExplored: [],
            skillsAssessed: false,
            roadmapGenerated: false
        };
    }

    saveProgress() {
        localStorage.setItem(this.progressKey, JSON.stringify(this.progress));
        this.updateProgressDisplay();
    }

    markQuizCompleted() {
        this.progress.quizCompleted = true;
        this.saveProgress();
    }

    markCareerExplored(careerId) {
        if (!this.progress.careersExplored.includes(careerId)) {
            this.progress.careersExplored.push(careerId);
            this.saveProgress();
        }
    }

    markSkillsAssessed() {
        this.progress.skillsAssessed = true;
        this.saveProgress();
    }

    markRoadmapGenerated() {
        this.progress.roadmapGenerated = true;
        this.saveProgress();
    }

    getCompletionPercentage() {
        const totalSteps = 4;
        const completedSteps = [
            this.progress.quizCompleted,
            this.progress.careersExplored.length > 0,
            this.progress.skillsAssessed,
            this.progress.roadmapGenerated
        ].filter(Boolean).length;

        return Math.round((completedSteps / totalSteps) * 100);
    }

    updateProgressDisplay() {
        const percentage = this.getCompletionPercentage();
        
        // Update progress circle
        const circle = document.getElementById('progress-circle');
        if (circle) {
            const circumference = 157;
            const offset = circumference - (percentage / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }

        // Update percentage text
        const percentElement = document.getElementById('progress-percent');
        if (percentElement) {
            percentElement.textContent = percentage + '%';
        }

        // Update steps count
        const stepsElement = document.getElementById('completed-steps');
        if (stepsElement) {
            const completed = Object.values(this.progress).filter(v => {
                if (Array.isArray(v)) return v.length > 0;
                return Boolean(v);
            }).length;
            stepsElement.textContent = completed + '/4';
        }
    }
}

// Initialize progress tracker
const progressTracker = new ProgressTracker();