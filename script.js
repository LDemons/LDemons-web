// ========================================
// BOOT SCREEN & INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('boot-screen');
    const mainInterface = document.getElementById('main-interface');
    
    // Boot sequence
    setTimeout(() => {
        document.addEventListener('keypress', initSystem, { once: true });
        document.addEventListener('click', initSystem, { once: true });
    }, 2500);
    
    function initSystem() {
        bootScreen.classList.remove('active');
        setTimeout(() => {
            mainInterface.classList.add('active');
            startUptime();
        }, 500);
    }
});

// ========================================
// NAVIGATION SYSTEM
// ========================================
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetSection = item.getAttribute('data-section');
        
        // Remove active class from all nav items and sections
        navItems.forEach(nav => nav.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked nav item and corresponding section
        item.classList.add('active');
        document.getElementById(targetSection).classList.add('active');
        
        // Optional glitch effect on section change
        triggerGlitch();
    });
});

// ========================================
// GLITCH EFFECT
// ========================================
function triggerGlitch() {
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
        activeSection.style.animation = 'none';
        setTimeout(() => {
            activeSection.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }
}

// ========================================
// UPTIME COUNTER
// ========================================
let uptimeSeconds = 0;

function startUptime() {
    setInterval(() => {
        uptimeSeconds++;
        updateUptimeDisplay();
    }, 1000);
}

function updateUptimeDisplay() {
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = uptimeSeconds % 60;
    
    const display = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement) {
        uptimeElement.textContent = display;
    }
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

// ========================================
// TERMINAL FUNCTIONALITY
// ========================================
const terminalForm = document.getElementById('terminal-form');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
    email: {
        response: '> Opening email client...\n> Email: ignacio88gg@gmail.com\n> Status: Ready to send',
        action: () => window.location.href = 'mailto:ignacio88gg@gmail.com'
    },
    github: {
        response: '> Connecting to GitHub...\n> Profile: github.com/LDemons\n> Status: Redirecting...',
        action: () => window.open('https://github.com/LDemons', '_blank')
    },
    youtube: {
        response: '> Connecting to YouTube...\n> Channel: @ldemonsavi\n> Status: Redirecting...',
        action: () => window.open('https://www.youtube.com/@ldemonsavi', '_blank')
    },
    spotify: {
        response: '> Connecting to Spotify...\n> Profile: LuckyDemon\n> Status: Redirecting...',
        action: () => window.open('https://open.spotify.com/user/3c8u00p07i0fw0mcz6lhstfmc', '_blank')
    },
    phone: {
        response: '> Phone: +56 9 6831 8229\n> Status: Ready to call',
        action: () => window.location.href = 'tel:+56968318229'
    },
    help: {
        response: '> Available commands:\n  - email\n  - github\n  - youtube\n  - spotify\n  - phone\n  - clear\n  - help'
    },
    clear: {
        response: '',
        action: () => {
            terminalOutput.innerHTML = '<p class="terminal-line">$ system.contact --init</p>' +
                '<p class="terminal-line success">Connection established.</p>' +
                '<p class="terminal-line">Available commands: email, github, youtube, spotify, phone</p>' +
                '<p class="terminal-line prompt">$<span class="cursor">_</span></p>';
        }
    }
};

if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const command = terminalInput.value.trim().toLowerCase();
        
        if (command === '') return;
        
        // Add command to output
        addTerminalLine(`$ ${command}`, 'command');
        
        // Execute command
        if (commands[command]) {
            const cmd = commands[command];
            
            if (cmd.response) {
                addTerminalLine(cmd.response, 'success');
            }
            
            if (cmd.action) {
                setTimeout(cmd.action, 500);
            }
        } else {
            addTerminalLine(`Command not found: ${command}\nType 'help' for available commands.`, 'error');
        }
        
        // Clear input
        terminalInput.value = '';
        
        // Scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    });
}

function addTerminalLine(text, type = '') {
    const lines = text.split('\n');
    const cursor = terminalOutput.querySelector('.cursor');
    const promptLine = terminalOutput.querySelector('.prompt');
    
    if (promptLine) {
        promptLine.remove();
    }
    
    lines.forEach(line => {
        const p = document.createElement('p');
        p.className = `terminal-line ${type}`;
        p.textContent = line;
        terminalOutput.appendChild(p);
    });
    
    // Re-add prompt
    const newPrompt = document.createElement('p');
    newPrompt.className = 'terminal-line prompt';
    newPrompt.innerHTML = '$<span class="cursor">_</span>';
    terminalOutput.appendChild(newPrompt);
}

// ========================================
// STATS ANIMATION ON SCROLL
// ========================================
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats(entry.target);
        }
    });
}, observerOptions);

// Observe all skill progress bars
document.querySelectorAll('.skill-progress-fill, .stat-fill').forEach(bar => {
    observer.observe(bar);
});

function animateStats(element) {
    element.style.width = '0';
    setTimeout(() => {
        if (element.classList.contains('stat-fill')) {
            element.style.width = element.style.getPropertyValue('--stat-value');
        } else if (element.classList.contains('skill-progress-fill')) {
            element.style.width = element.style.getPropertyValue('--skill');
        }
    }, 100);
}

// ========================================
// GLITCH TEXT HOVER ENHANCEMENT
// ========================================
document.querySelectorAll('.glitch-text').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = '';
        }, 10);
    });
});

// ========================================
// RANDOM GLITCH INTERVALS (SUBTLE)
// ========================================
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
    
    if (randomElement) {
        randomElement.style.animation = 'none';
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 50);
    }
}

// Trigger random glitch every 8-15 seconds
setInterval(() => {
    if (Math.random() > 0.5) {
        randomGlitch();
    }
}, Math.random() * 7000 + 8000);

// ========================================
// PARTICLE/DECORATION SYSTEM (OPTIONAL)
// ========================================
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'var(--color-primary)';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    particle.style.opacity = Math.random();
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 3000 + 2000;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            particle.style.top = (progress * window.innerHeight) + 'px';
            particle.style.opacity = (1 - progress) * Math.random();
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

// Spawn particles occasionally (very subtle)
setInterval(() => {
    if (Math.random() > 0.7) {
        createParticle();
    }
}, 2000);

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus terminal
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (terminalInput) {
            terminalInput.focus();
        }
    }
    
    // ESC to clear terminal input
    if (e.key === 'Escape' && terminalInput) {
        terminalInput.value = '';
        terminalInput.blur();
    }
    
    // Number keys 1-5 for quick navigation
    if (e.key >= '1' && e.key <= '5' && !e.ctrlKey && !e.metaKey) {
        const target = document.activeElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
            const navIndex = parseInt(e.key) - 1;
            const navItem = navItems[navIndex];
            if (navItem) {
                navItem.click();
            }
        }
    }
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c[ SYSTEM INITIALIZED ]', 'color: #00ff41; font-size: 20px; font-family: monospace;');
console.log('%cWelcome, traveler.', 'color: #ffffff; font-size: 14px; font-family: monospace;');
console.log('%cYou found the developer console! 🎮', 'color: #ff00ff; font-size: 12px; font-family: monospace;');
console.log('%c\nInterested in the code? Check it out on GitHub!', 'color: #00ffff; font-size: 12px; font-family: monospace;');
