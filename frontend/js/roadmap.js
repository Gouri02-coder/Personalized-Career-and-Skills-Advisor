// roadmap.js - Learning Path functionality

// Sample learning paths data
const learningPaths = [
    {
        id: 1,
        title: "Full Stack Web Development",
        description: "Learn to build complete web applications from frontend to backend",
        difficulty: "beginner",
        duration: "medium",
        estimatedHours: 200,
        skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Database"],
        steps: [
            {
                step: 1,
                title: "HTML & CSS Fundamentals",
                description: "Learn the building blocks of web development",
                resources: [
                    { type: "course", name: "HTML/CSS Crash Course", link: "#" },
                    { type: "book", name: "HTML & CSS: Design and Build Websites", link: "#" }
                ],
                estimatedTime: "2 weeks"
            },
            {
                step: 2,
                title: "JavaScript Essentials",
                description: "Master JavaScript programming fundamentals",
                resources: [
                    { type: "course", name: "JavaScript Basics", link: "#" },
                    { type: "practice", name: "Codecademy Exercises", link: "#" }
                ],
                estimatedTime: "3 weeks"
            },
            {
                step: 3,
                title: "React Framework",
                description: "Build dynamic user interfaces with React",
                resources: [
                    { type: "course", name: "React Official Tutorial", link: "#" },
                    { type: "project", name: "Build a Todo App", link: "#" }
                ],
                estimatedTime: "4 weeks"
            }
        ],
        progress: 25
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        description: "Master data analysis, visualization, and machine learning basics",
        difficulty: "intermediate",
        duration: "long",
        estimatedHours: 300,
        skills: ["Python", "Pandas", "Matplotlib", "Machine Learning"],
        steps: [
            {
                step: 1,
                title: "Python for Data Science",
                description: "Learn Python programming and data manipulation",
                resources: [
                    { type: "course", name: "Python Data Science", link: "#" },
                    { type: "book", name: "Python for Data Analysis", link: "#" }
                ],
                estimatedTime: "4 weeks"
            },
            {
                step: 2,
                title: "Data Analysis with Pandas",
                description: "Master data manipulation and analysis techniques",
                resources: [
                    { type: "course", name: "Pandas Mastery", link: "#" },
                    { type: "project", name: "Analyze Dataset", link: "#" }
                ],
                estimatedTime: "3 weeks"
            }
        ],
        progress: 10
    },
    {
        id: 3,
        title: "UX/UI Design",
        description: "Learn user experience and interface design principles",
        difficulty: "beginner",
        duration: "short",
        estimatedHours: 120,
        skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
        steps: [
            {
                step: 1,
                title: "Design Principles",
                description: "Understand fundamental design concepts",
                resources: [
                    { type: "course", name: "UX Design Fundamentals", link: "#" },
                    { type: "book", name: "Don't Make Me Think", link: "#" }
                ],
                estimatedTime: "2 weeks"
            }
        ],
        progress: 0
    }
];

// User progress data (in real app, this would come from backend)
let userProgress = {
    startedPaths: 2,
    completedPaths: 0,
    totalHours: 45,
    currentPaths: [1, 2]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadLearningPaths();
    loadUserProgress();
    setupEventListeners();
});

function loadLearningPaths() {
    const container = document.getElementById('paths-container');
    
    if (!container) {
        console.error('Paths container not found!');
        return;
    }

    const pathsHTML = learningPaths.map(path => `
        <div class="path-card" onclick="showPathDetail(${path.id})">
            <h3>${path.title}</h3>
            <p>${path.description}</p>
            <div class="path-meta">
                <span class="difficulty ${path.difficulty}">${path.difficulty}</span>
                <span class="duration">${getDurationText(path.duration)}</span>
            </div>
            <div class="path-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${path.progress}%"></div>
                </div>
                <div class="progress-text">${path.progress}% Complete</div>
            </div>
            <button onclick="event.stopPropagation(); startPath(${path.id})">
                ${path.progress > 0 ? 'Continue Path' : 'Start Path'}
            </button>
        </div>
    `).join('');

    container.innerHTML = pathsHTML;
}

function loadUserProgress() {
    // Update stats
    document.getElementById('started-paths').textContent = userProgress.startedPaths;
    document.getElementById('completed-paths').textContent = userProgress.completedPaths;
    document.getElementById('total-hours').textContent = userProgress.totalHours;

    // Load current paths
    const currentPathsContainer = document.getElementById('current-paths');
    const currentPaths = learningPaths.filter(path => userProgress.currentPaths.includes(path.id));
    
    if (currentPaths.length === 0) {
        currentPathsContainer.innerHTML = '<p>You haven\'t started any paths yet.</p>';
        return;
    }

    const currentPathsHTML = currentPaths.map(path => `
        <div class="current-path-item">
            <div>
                <h4>${path.title}</h4>
                <p>Progress: ${path.progress}%</p>
            </div>
            <button onclick="continuePath(${path.id})">Continue</button>
        </div>
    `).join('');

    currentPathsContainer.innerHTML = currentPathsHTML;
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('path-search');
    if (searchInput) {
        searchInput.addEventListener('input', searchPaths);
    }

    // Filter functionality
    const difficultyFilter = document.getElementById('difficulty-filter');
    const durationFilter = document.getElementById('duration-filter');
    
    if (difficultyFilter) difficultyFilter.addEventListener('change', filterPaths);
    if (durationFilter) durationFilter.addEventListener('change', filterPaths);
}

function searchPaths() {
    const searchTerm = document.getElementById('path-search').value.toLowerCase();
    const pathCards = document.querySelectorAll('.path-card');
    
    pathCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterPaths() {
    const difficulty = document.getElementById('difficulty-filter').value;
    const duration = document.getElementById('duration-filter').value;
    const pathCards = document.querySelectorAll('.path-card');
    
    pathCards.forEach(card => {
        const pathDifficulty = card.querySelector('.difficulty').classList[1];
        const pathDuration = card.querySelector('.duration').textContent.toLowerCase();
        
        const matchesDifficulty = difficulty === 'all' || pathDifficulty === difficulty;
        const matchesDuration = duration === 'all' || pathDuration.includes(duration);
        
        if (matchesDifficulty && matchesDuration) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function showPathDetail(pathId) {
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return;

    const modalContent = document.getElementById('path-detail-content');
    const modal = document.getElementById('path-detail-modal');
    
    const stepsHTML = path.steps.map(step => `
        <div class="step-item ${step.step <= 2 ? 'completed' : ''}">
            <div class="step-number">${step.step}</div>
            <div class="step-content">
                <h4>${step.title}</h4>
                <p>${step.description} • Estimated: ${step.estimatedTime}</p>
                <div class="resources-list">
                    ${step.resources.map(resource => `
                        <div class="resource-item">
                            <span class="resource-type">${resource.type}</span>
                            <span>${resource.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

    modalContent.innerHTML = `
        <h2>${path.title}</h2>
        <p><strong>Difficulty:</strong> <span class="difficulty ${path.difficulty}">${path.difficulty}</span></p>
        <p><strong>Estimated Duration:</strong> ${getDurationText(path.duration)} (${path.estimatedHours} hours)</p>
        <p><strong>Skills You'll Learn:</strong> ${path.skills.join(', ')}</p>
        
        <div class="path-steps">
            <h3>Learning Path Steps</h3>
            ${stepsHTML}
        </div>
        
        <button style="width: 100%; padding: 12px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;"
                onclick="startPath(${path.id})">
            ${path.progress > 0 ? 'Continue Learning Path' : 'Start Learning Path'}
        </button>
    `;
    
    modal.classList.remove('hidden');
}

function closePathModal() {
    const modal = document.getElementById('path-detail-modal');
    modal.classList.add('hidden');
}

function startPath(pathId) {
    // In a real app, this would save to backend
    if (!userProgress.currentPaths.includes(pathId)) {
        userProgress.currentPaths.push(pathId);
        userProgress.startedPaths++;
    }
    
    alert(`Starting learning path! This would redirect to the first lesson.`);
    // window.location.href = `path-lesson.html?path=${pathId}&lesson=1`;
}

function continuePath(pathId) {
    alert(`Continuing path ${pathId}`);
    // window.location.href = `path-lesson.html?path=${pathId}`;
}

function getDurationText(duration) {
    const durations = {
        'short': '1-3 months',
        'medium': '3-6 months',
        'long': '6+ months'
    };
    return durations[duration] || duration;
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('path-detail-modal');
    if (event.target === modal) {
        closePathModal();
    }
});