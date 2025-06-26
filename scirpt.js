// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupEventListeners();
    fetchGitHubData();
});

// 애니메이션 초기화
function initializeAnimations() {
    // 숫자 카운팅 애니메이션
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateGitHubStats();
                observer.disconnect();
            }
        });
    });

    const statsSection = document.querySelector('.github-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// 숫자 카운팅 애니메이션 함수
function animateNumber(element, target, duration = 1500) {
    let current = 0;
    const increment = target / (duration / 16); // 60fps 기준
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// GitHub 통계 애니메이션 실행
function animateGitHubStats() {
    const repos = document.getElementById('repos');
    const commits = document.getElementById('commits');
    const stars = document.getElementById('stars');
    const followers = document.getElementById('followers');

    if (repos) animateNumber(repos, 25);
    if (commits) animateNumber(commits, 450);
    if (stars) animateNumber(stars, 89);
    if (followers) animateNumber(followers, 32);
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 스킬 카드 클릭 이벤트
    setupSkillCardEvents();
    
    // 프로젝트 카드 호버 이벤트
    setupProjectCardEvents();
    
    // 부드러운 스크롤 이벤트
    setupSmoothScroll();
    
    // 소셜 링크 클릭 이벤트
    setupSocialLinks();
}

// 스킬 카드 이벤트
function setupSkillCardEvents() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            // 3D 회전 효과
            this.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                this.style.transform = 'rotateY(0deg)';
            }, 600);
        });

        // 마우스 오버 효과
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        });
    });
}

// 프로젝트 카드 이벤트
function setupProjectCardEvents() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '8px';
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '5px';
            this.style.transform = 'translateY(0) scale(1)';
        });

        // 클릭 이벤트 (프로젝트 상세 정보 표시)
        card.addEventListener('click', function() {
            const title = this.querySelector('.project-title').textContent;
            showProjectDetails(title);
        });
    });
}

// 프로젝트 상세 정보 표시
function showProjectDetails(projectTitle) {
    const projectDetails = {
        'GitHub 연동 포트폴리오': {
            description: '완전한 반응형 포트폴리오 웹사이트로, GitHub Pages를 통해 자동 배포됩니다.',
            features: ['반응형 디자인', 'GitHub API 연동', '자동 배포', 'SEO 최적화'],
            demo: 'https://yourusername.github.io'
        },
        'React 대시보드': {
            description: 'GitHub API를 활용한 실시간 프로젝트 관리 도구입니다.',
            features: ['실시간 데이터', '차트 시각화', 'API 연동', '반응형 UI'],
            demo: 'https://github.com/yourusername/react-dashboard'
        },
        '자동화 도구': {
            description: 'GitHub Actions를 통한 CI/CD 파이프라인 구축 도구입니다.',
            features: ['자동 테스트', '코드 품질 검사', 'Docker 배포', 'AWS 연동'],
            demo: 'https://github.com/yourusername/automation-tool'
        }
    };

    const project = projectDetails[projectTitle];
    if (project) {
        alert(`${projectTitle}\n\n${project.description}\n\n주요 기능:\n• ${project.features.join('\n• ')}\n\n데모: ${project.demo}`);
    }
}

// 부드러운 스크롤 설정
function setupSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 소셜 링크 이벤트
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-btn');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 외부 링크 클릭 시 확인
            if (this.href.startsWith('http')) {
                const confirmed = confirm(`${this.textContent} 페이지로 이동하시겠습니까?`);
                if (!confirmed) {
                    e.preventDefault();
                }
            }
        });

        // 호버 효과 강화
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// GitHub API 연동
async function fetchGitHubData() {
    const username = 'yourusername'; // 실제 사용자명으로 변경
    
    try {
        // GitHub API 호출 (실제 사용시 주석 해제)
        /*
        const [userResponse, reposResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);

        const userData = await userResponse.json();
        const reposData = await reposResponse.json();

        // 실제 데이터로 업데이트
        updateGitHubStats({
            repos: userData.public_repos,
            followers: userData.followers,
            stars: reposData.reduce((total, repo) => total + repo.stargazers_count, 0),
            commits: await getTotalCommits(username, reposData)
        });
        */

        console.log('GitHub API 연동 준비 완료');
        
        // 데모용 데이터 업데이트
        setTimeout(() => {
            updateGitHubStats({
                repos: 25,
                commits: 450,
                stars: 89,
                followers: 32
            });
        }, 1000);

    } catch (error) {
        console.error('GitHub API 호출 오류:', error);
        // 기본값 사용
        updateGitHubStats({
            repos: 25,
            commits: 450,
            stars: 89,
            followers: 32
        });
    }
}

// GitHub 통계 업데이트
function updateGitHubStats(stats) {
    const elements = {
        repos: document.getElementById('repos'),
        commits: document.getElementById('commits'),
        stars: document.getElementById('stars'),
        followers: document.getElementById('followers')
    };

    Object.keys(stats).forEach(key => {
        if (elements[key]) {
            elements[key].textContent = stats[key];
        }
    });
}

// 총 커밋 수 계산 (실제 API 사용시)
async function getTotalCommits(username, repos) {
    let totalCommits = 0;
    
    for (const repo of repos.slice(0, 10)) { // 최근 10개 저장소만 확인
        try {
            const response = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`);
            const commits = response.headers.get('Link');
            if (commits) {
                const match = commits.match(/page=(\d+)>; rel="last"/);
                if (match) {
                    totalCommits += parseInt(match[1]);
                }
            }
        } catch (error) {
            console.error(`커밋 수 조회 오류 (${repo.name}):`, error);
        }
    }
    
    return totalCommits;
}

// 페이지 성능 최적화
function optimizePerformance() {
    // 이미지 지연 로딩
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 테마 변경 기능 (다크모드)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 페이지 로드 시 테마 적용
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// 스크롤 기반 헤더 효과
function setupScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const header = document.querySelector('header');
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // 스크롤 다운
            header.style.transform = 'translateY(-100%)';
        } else {
            // 스크롤 업
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// 초기화 시 추가 기능 실행
document.addEventListener('DOMContentLoaded', function() {
    applyTheme();
    optimizePerformance();
    setupScrollEffects();
});
