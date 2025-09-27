// career.js - Careers page functionality

// Comprehensive career data
const careersData = [
    {
        id: 1,
        title: "Software Developer",
        description: "Design, develop, and test software applications for various platforms. Work with programming languages like JavaScript, Python, and Java to create innovative solutions.",
        salary: 95000,
        salaryRange: "$85,000 - $120,000",
        category: "technology",
        demand: "high",
        skills: ["JavaScript", "Python", "Problem Solving", "Team Collaboration"],
        growth: "22% (Much faster than average)",
        education: "Bachelor's degree",
        experience: "0-2 years for entry level",
        responsibilities: [
            "Write clean, efficient code",
            "Collaborate with cross-functional teams",
            "Test and debug software",
            "Maintain and improve existing software"
        ],
        companies: ["Google", "Microsoft", "Amazon", "Startups"],
        satisfaction: 4.5
    },
    {
        id: 2,
        title: "Data Scientist",
        description: "Analyze complex data to extract insights and support business decisions. Use machine learning and statistical methods to solve problems.",
        salary: 120000,
        salaryRange: "$95,000 - $150,000",
        category: "technology",
        demand: "high",
        skills: ["Python", "Machine Learning", "Statistics", "Data Visualization"],
        growth: "31% (Much faster than average)",
        education: "Master's degree preferred",
        experience: "2-4 years",
        responsibilities: [
            "Analyze large datasets",
            "Build predictive models",
            "Create data visualizations",
            "Communicate insights to stakeholders"
        ],
        companies: ["Facebook", "Netflix", "Uber", "Research Institutions"],
        satisfaction: 4.6
    },
    {
        id: 3,
        title: "Registered Nurse",
        description: "Provide patient care, educate patients about health conditions, and support physicians in medical procedures.",
        salary: 75000,
        salaryRange: "$65,000 - $95,000",
        category: "healthcare",
        demand: "high",
        skills: ["Patient Care", "Medical Knowledge", "Empathy", "Critical Thinking"],
        growth: "12% (Faster than average)",
        education: "Bachelor's degree in Nursing",
        experience: "Clinical training required",
        responsibilities: [
            "Administer medications",
            "Monitor patient health",
            "Educate patients and families",
            "Maintain medical records"
        ],
        companies: ["Hospitals", "Clinics", "Schools", "Home Healthcare"],
        satisfaction: 4.3
    },
    {
        id: 4,
        title: "UX/UI Designer",
        description: "Create user-friendly interfaces and engaging user experiences for digital products. Focus on user research and design principles.",
        salary: 85000,
        salaryRange: "$70,000 - $110,000",
        category: "creative",
        demand: "growing",
        skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
        growth: "18% (Much faster than average)",
        education: "Bachelor's degree in Design",
        experience: "1-3 years",
        responsibilities: [
            "Conduct user research",
            "Create wireframes and prototypes",
            "Design user interfaces",
            "Test and iterate designs"
        ],
        companies: ["Apple", "Adobe", "Design Agencies", "Tech Startups"],
        satisfaction: 4.4
    },
    {
        id: 5,
        title: "Financial Analyst",
        description: "Analyze financial data to help businesses make investment decisions and improve financial performance.",
        salary: 85000,
        salaryRange: "$70,000 - $110,000",
        category: "business",
        demand: "medium",
        skills: ["Financial Modeling", "Excel", "Analytical Thinking", "Communication"],
        growth: "8% (As fast as average)",
        education: "Bachelor's degree in Finance",
        experience: "1-3 years",
        responsibilities: [
            "Analyze financial statements",
            "Create financial models",
            "Prepare investment recommendations",
            "Monitor economic trends"
        ],
        companies: ["Banks", "Investment Firms", "Corporations", "Consulting"],
        satisfaction: 4.2
    },
    {
        id: 6,
        title: "Marketing Manager",
        description: "Plan and execute marketing campaigns to promote products and services. Analyze market trends and customer behavior.",
        salary: 135000,
        salaryRange: "$110,000 - $160,000",
        category: "marketing",
        demand: "medium",
        skills: ["Digital Marketing", "Strategy", "Analytics", "Leadership"],
        growth: "10% (As fast as average)",
        education: "Bachelor's degree in Marketing",
        experience: "5+ years",
        responsibilities: [
            "Develop marketing strategies",
            "Manage marketing campaigns",
            "Analyze campaign performance",
            "Lead marketing team"
        ],
        companies: ["Procter & Gamble", "Coca-Cola", "Tech Companies", "Agencies"],
        satisfaction: 4.3
    },
    {
        id: 7,
        title: "Mechanical Engineer",
        description: "Design, develop, and test mechanical devices and systems. Work on everything from small components to large machinery.",
        salary: 90000,
        salaryRange: "$75,000 - $115,000",
        category: "engineering",
        demand: "medium",
        skills: ["CAD Software", "Physics", "Problem Solving", "Project Management"],
        growth: "7% (As fast as average)",
        education: "Bachelor's degree in Mechanical Engineering",
        experience: "0-2 years for entry level",
        responsibilities: [
            "Design mechanical systems",
            "Conduct testing and analysis",
            "Create technical documentation",
            "Collaborate with engineering teams"
        ],
        companies: ["Automotive", "Aerospace", "Manufacturing", "Energy"],
        satisfaction: 4.1
    },
    {
        id: 8,
        title: "Data Analyst",
        description: "Collect, process, and analyze data to help organizations make data-driven decisions. Create reports and visualizations.",
        salary: 70000,
        salaryRange: "$60,000 - $90,000",
        category: "technology",
        demand: "high",
        skills: ["SQL", "Excel", "Tableau", "Statistical Analysis"],
        growth: "25% (Much faster than average)",
        education: "Bachelor's degree",
        experience: "0-2 years",
        responsibilities: [
            "Collect and clean data",
            "Create reports and dashboards",
            "Identify trends and patterns",
            "Support decision-making"
        ],
        companies: ["All Industries", "Tech Companies", "Consulting", "Government"],
        satisfaction: 4.4
    }
];

let currentView = 'grid';
let displayedCareers = 8;
const careersPerLoad = 8;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Careers page loaded');
    loadCareers();
    setupEventListeners();
});

function loadCareers() {
    const container = document.getElementById('careers-container');
    const resultsCount = document.getElementById('results-count');
    
    if (!container) {
        console.error('Careers container not found!');
        return;
    }

    // Show loading initially
    container.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading career opportunities...</p>
        </div>
    `;

    // Simulate API call delay
    setTimeout(() => {
        const careersToShow = careersData.slice(0, displayedCareers);
        displayCareers(careersToShow);
        updateResultsCount(careersToShow.length);
    }, 1000);
}

function displayCareers(careers) {
    const container = document.getElementById('careers-container');
    
    if (!careers || careers.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No careers found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }

    const careersHTML = careers.map(career => `
        <div class="career-card ${currentView === 'list' ? 'list-view' : ''}" onclick="showCareerDetail(${career.id})">
            <div class="career-content">
                <h3>${career.title}</h3>
                <p>${career.description}</p>
                <div class="career-meta">
                    <span class="salary">${career.salaryRange}</span>
                    <span class="demand ${career.demand}">
                        <i class="fas fa-${getDemandIcon(career.demand)}"></i>
                        ${getDemandText(career.demand)}
                    </span>
                </div>
                <div class="career-features">
                    <span class="category-tag">${career.category}</span>
                    <span class="feature">
                        <i class="fas fa-graduation-cap"></i> ${career.edducation || "Bachelor's"}
                    </span>
                    <span class="feature">
                        <i class="fas fa-chart-line"></i> ${career.growth.split(' ')[0]} growth
                    </span>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = careersHTML;
    setupCareerCardInteractions();
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('career-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchCareers, 300));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchCareers();
        });
    }

    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const salaryFilter = document.getElementById('salary-filter');
    const demandFilter = document.getElementById('demand-filter');
    
    if (categoryFilter) categoryFilter.addEventListener('change', filterCareers);
    if (salaryFilter) salaryFilter.addEventListener('change', filterCareers);
    if (demandFilter) demandFilter.addEventListener('change', filterCareers);

    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('career-modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function setupCareerCardInteractions() {
    const careerCards = document.querySelectorAll('.career-card');
    careerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function searchCareers() {
    const searchTerm = document.getElementById('career-search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const salary = document.getElementById('salary-filter').value;
    const demand = document.getElementById('demand-filter').value;
    
    const filteredCareers = careersData.filter(career => {
        const matchesSearch = career.title.toLowerCase().includes(searchTerm) || 
                            career.description.toLowerCase().includes(searchTerm) ||
                            career.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        
        const matchesCategory = category === 'all' || career.category === category;
        const matchesDemand = demand === 'all' || career.demand === demand;
        
        let matchesSalary = true;
        if (salary !== 'all') {
            if (salary === 'entry') matchesSalary = career.salary <= 50000;
            else if (salary === 'mid') matchesSalary = career.salary > 50000 && career.salary <= 80000;
            else if (salary === 'senior') matchesSalary = career.salary > 80000 && career.salary <= 120000;
            else if (salary === 'executive') matchesSalary = career.salary > 120000;
        }
        
        return matchesSearch && matchesCategory && matchesSalary && matchesDemand;
    });
    
    displayedCareers = Math.min(filteredCareers.length, careersPerLoad);
    displayCareers(filteredCareers.slice(0, displayedCareers));
    updateResultsCount(filteredCareers.length);
    updateLoadMoreButton(filteredCareers.length);
}

function filterCareers() {
    searchCareers(); // Reuse search logic for filtering
}

function sortCareers() {
    const sortBy = document.getElementById('sort-by').value;
    const currentCareers = getCurrentDisplayedCareers();
    
    let sortedCareers = [...currentCareers];
    
    switch (sortBy) {
        case 'name':
            sortedCareers.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'salary-desc':
            sortedCareers.sort((a, b) => b.salary - a.salary);
            break;
        case 'salary-asc':
            sortedCareers.sort((a, b) => a.salary - b.salary);
            break;
        case 'demand':
            const demandOrder = { high: 3, growing: 2, medium: 1 };
            sortedCareers.sort((a, b) => demandOrder[b.demand] - demandOrder[a.demand]);
            break;
    }
    
    displayCareers(sortedCareers);
}

function setView(view) {
    currentView = view;
    
    // Update view buttons
    document.getElementById('grid-view').classList.toggle('active', view === 'grid');
    document.getElementById('list-view').classList.toggle('active', view === 'list');
    
    // Update careers display
    const container = document.getElementById('careers-container');
    container.classList.toggle('list-view', view === 'list');
    
    const careerCards = container.querySelectorAll('.career-card');
    careerCards.forEach(card => {
        card.classList.toggle('list-view', view === 'list');
    });
}

function showCareerDetail(careerId) {
    const career = careersData.find(c => c.id === careerId);
    if (!career) return;

    const modalContent = document.getElementById('career-modal-content');
    const modal = document.getElementById('career-modal');
    
    modalContent.innerHTML = `
        <div class="career-detail">
            <div class="detail-header">
                <h2>${career.title}</h2>
                <div class="detail-meta">
                    <span class="salary">${career.salaryRange}</span>
                    <span class="demand ${career.demand}">${getDemandText(career.demand)}</span>
                    <span class="category-tag">${career.category}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-info-circle"></i> Overview</h3>
                <p>${career.description}</p>
            </div>
            
            <div class="detail-grid">
                <div class="detail-item">
                    <h4><i class="fas fa-graduation-cap"></i> Education</h4>
                    <p>${career.education}</p>
                </div>
                <div class="detail-item">
                    <h4><i class="fas fa-briefcase"></i> Experience</h4>
                    <p>${career.experience}</p>
                </div>
                <div class="detail-item">
                    <h4><i class="fas fa-chart-line"></i> Job Growth</h4>
                    <p>${career.growth}</p>
                </div>
                <div class="detail-item">
                    <h4><i class="fas fa-star"></i> Job Satisfaction</h4>
                    <p>${career.satisfaction}/5.0</p>
                </div>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-tasks"></i> Key Responsibilities</h3>
                <ul>
                    ${career.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-code"></i> Required Skills</h3>
                <div class="skills-list">
                    ${career.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-building"></i> Typical Employers</h3>
                <p>${career.companies.join(', ')}</p>
            </div>
            
            <div class="detail-actions">
                <button class="btn-primary" onclick="saveCareer(${career.id})">
                    <i class="fas fa-bookmark"></i> Save Career
                </button>
                <button class="btn-secondary" onclick="takeQuizForCareer('${career.title}')">
                    <i class="fas fa-clipboard-list"></i> Take Assessment
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('career-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function loadMoreCareers() {
    displayedCareers += careersPerLoad;
    searchCareers(); // This will apply current filters and show more results
}

function updateResultsCount(count) {
    const resultsElement = document.getElementById('results-count');
    if (resultsElement) {
        resultsElement.textContent = `${count} career${count !== 1 ? 's' : ''} found`;
    }
}

function updateLoadMoreButton(totalCount) {
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        if (displayedCareers >= totalCount) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.innerHTML = `<i class="fas fa-plus"></i> Load More (${totalCount - displayedCareers} remaining)`;
        }
    }
}

function getCurrentDisplayedCareers() {
    const searchTerm = document.getElementById('career-search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const salary = document.getElementById('salary-filter').value;
    const demand = document.getElementById('demand-filter').value;
    
    return careersData.filter(career => {
        const matchesSearch = !searchTerm || career.title.toLowerCase().includes(searchTerm) || 
                            career.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || career.category === category;
        const matchesDemand = demand === 'all' || career.demand === demand;
        
        let matchesSalary = true;
        if (salary !== 'all') {
            if (salary === 'entry') matchesSalary = career.salary <= 50000;
            else if (salary === 'mid') matchesSalary = career.salary > 50000 && career.salary <= 80000;
            else if (salary === 'senior') matchesSalary = career.salary > 80000 && career.salary <= 120000;
            else if (salary === 'executive') matchesSalary = career.salary > 120000;
        }
        
        return matchesSearch && matchesCategory && matchesSalary && matchesDemand;
    });
}

function getDemandIcon(demand) {
    const icons = { high: 'rocket', growing: 'seedling', medium: 'chart-line' };
    return icons[demand] || 'chart-line';
}

function getDemandText(demand) {
    const texts = { high: 'High Demand', growing: 'Growing Field', medium: 'Medium Demand' };
    return texts[demand] || demand;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Additional utility functions
function saveCareer(careerId) {
    const career = careersData.find(c => c.id === careerId);
    if (career) {
        alert(`Saved ${career.title} to your favorites!`);
        // In a real app, this would save to localStorage or backend
    }
}

function takeQuizForCareer(careerTitle) {
    alert(`Starting assessment for ${careerTitle}!`);
    // window.location.href = `quiz.html?career=${encodeURIComponent(careerTitle)}`;
}