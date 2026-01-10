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
// AGE CALCULATOR
// ========================================
function calculateAge() {
    const birthDate = new Date('2004-02-18'); // 18 de febrero de 2004
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Si aún no ha cumplido años este año, restar 1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = age;
    }
}

// Calcular edad al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    calculateAge();
});

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
    glados: {
        response: '> "This was a triumph..."\n> Initializing Aperture Science Protocol...\n> Status: Still Alive',
        action: () => activateGLaDOSMode()
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

const animatedElements = new Set();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animatedElements.has(entry.target)) {
            animateStats(entry.target);
            animatedElements.add(entry.target);
            observer.unobserve(entry.target);
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
// Deshabilitado temporalmente para evitar problemas con el scroll
/*
setInterval(() => {
    if (Math.random() > 0.5) {
        randomGlitch();
    }
}, Math.random() * 7000 + 8000);
*/

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
// Deshabilitado temporalmente para evitar problemas con el scroll
/*
setInterval(() => {
    if (Math.random() > 0.7) {
        createParticle();
    }
}, 2000);
*/

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
// CONSOLE EASTER EGG
// ========================================
console.log('%c[ SYSTEM INITIALIZED ]', 'color: #00ff41; font-size: 20px; font-family: monospace;');

// ========================================
// GLADOS EASTER EGG MODE
// ========================================
let gladosMode = false;
let audioPlayer = null;
let playerWidget = null;
let lyricsInterval = null;

// Letra completa dividida en secciones con timestamps (en segundos)
const stillAliveLyrics = [
    { time: 7.9, text: '> This was a triumph.', style: '' },
    { time: 11.58, text: '> I\'m making a note here:', style: '' },
    { time: 13.68, text: '> HUGE SUCCESS.', style: 'success' },
    { time: 16.72, text: '> it\'s hard to overstate', style: '' },
    { time: 19.15, text: '> my satisfaction.', style: '' },
    { time: 23.96, text: '> Aperture Science,', style: 'success' },
    { time: 27.19, text: '> we do what we must', style: '' },
    { time: 29.29, text: '> because we can.', style: '' },
    { time: 32.7, text: '> for the good of all of us.', style: '' },
    { time: 36.15, text: '> except the ones who are dead.', style: 'error' },
    { time: 38.48, text: '> But there\'s no sense crying', style: '' },
    { time: 40.51, text: '> over every mistake.', style: '' },
    { time: 42.42, text: '> you just keep on trying till', style: '' },
    { time: 44.72, text: '> you run out of cake.', style: '' },
    { time: 46.51, text: '> And the science gets done.', style: '' },
    { time: 48.53, text: '> and you make a neat gun for', style: '' },
    { time: 50.7, text: '> the people who are', style: '' },
    { time: 52.05, text: '> still alive.', style: 'success' },
    { time: 59.78, text: '> I\'m not even angry.', style: '' },
    { time: 63.45, text: '> I\'m being so sincere', style: '' },
    { time: 66.18, text: '> right now,', style: '' },
    { time: 68.94, text: '> even though you broke my', style: '' },
    { time: 71.74, text: '> heart and killed me.', style: 'error' },
    { time: 75.33, text: '> And tore me to pieces,', style: 'error' },
    { time: 79.22, text: '> and threw every piece', style: 'error' },
    { time: 81.3, text: '> into a fire.', style: 'error' },
    { time: 84.94, text: '> As they burned it', style: '' },
    { time: 86.92, text: '> hurt because,', style: '' },
    { time: 88.26, text: '> I was so happy for you.', style: '' },
    { time: 90.42, text: '> Now these points of data', style: '' },
    { time: 92.43, text: '> make a beautiful line,', style: '' },
    { time: 94.51, text: '> and we\'re out of beta,', style: '' },
    { time: 96.47, text: '> we\'re releasing on time.', style: 'success' },
    { time: 98.44, text: '> So I\'m glad I got burned,', style: '' },
    { time: 100.47, text: '> think of all the things we', style: '' },
    { time: 101.97, text: '> learned for the people', style: '' },
    { time: 103.325, text: '> who are still alive.', style: 'success' },
    { time: 111.96, text: '> Go ahead and leave me,', style: '' },
    { time: 115.11, text: '> I think I prefer', style: '' },
    { time: 117.31, text: '> to stay inside.', style: '' },
    { time: 120.58, text: '> Maybe you\'ll find someone', style: '' },
    { time: 123.8, text: '> else to help you.', style: '' },
    { time: 128.02, text: '> Maybe Black Mesa.', style: '' },
    { time: 132, text: '> That was a joke,', style: '' },
    { time: 133.935, text: '> fat chance. Anyway,', style: 'error' },
    { time: 138.46, text: '> this cake is great,', style: '' },
    { time: 140.2, text: '> it\'s so delicious and moist.', style: '' },
    { time: 142.46, text: '> Look at me still talking when', style: '' },
    { time: 144.65, text: '> there\'s science to do,', style: '' },
    { time: 146.49, text: '> when I look out there it makes', style: '' },
    { time: 148.67, text: '> me glad I\'m not you.I\'ve', style: '' },
    { time: 150.705, text: '> experiments to run,', style: '' },
    { time: 152.46, text: '> there is research to be done', style: '' },
    { time: 154.52, text: '> on the people who', style: '' },
    { time: 155.66, text: '> are still alive.', style: 'success' },
    { time: 158.21, text: '> And believe me I', style: 'success' },
    { time: 159.72, text: '> am still alive.', style: 'success' },
    { time: 162.11, text: '> I\'m doing science and', style: 'success' },
    { time: 163.81, text: '> I\'m still alive.', style: 'success' },
    { time: 166.07, text: '> I feel fantastic and', style: 'success' },
    { time: 167.77, text: '> I\'m still alive.', style: 'success' },
    { time: 170.43, text: '> While you\'re dying I\'ll', style: 'error' },
    { time: 171.77, text: '> be still alive.', style: 'success' },
    { time: 174.22, text: '> and when you\'re dead I will be', style: 'error' },
    { time: 176.04, text: '> still alive. Still alive.', style: 'success' },
    { time: 180.06, text: '> Still alive.', style: 'success' }
];

function activateGLaDOSMode() {
    if (gladosMode) {
        // Desactivar modo GLaDOS
        deactivateGLaDOSMode();
        return;
    }
    
    gladosMode = true;
    
    // Cambiar colores a tema Aperture Science
    document.documentElement.style.setProperty('--color-primary', '#ff9900');
    document.documentElement.style.setProperty('--color-secondary', '#ffaa00');
    document.documentElement.style.setProperty('--color-accent', '#ffcc33');
    
    // Crear y configurar audio
    if (!audioPlayer) {
        audioPlayer = document.createElement('audio');
        audioPlayer.src = 'src/audio/Portal - \'Still Alive\' - OTG.mp3';
        audioPlayer.volume = 0.5;
        audioPlayer.loop = false;
        document.body.appendChild(audioPlayer);
    }
    
    // Mostrar reproductor
    playerWidget = document.getElementById('glados-player');
    if (playerWidget) {
        playerWidget.classList.add('active');
        setupPlayerControls();
    }
    
    // Limpiar terminal y mostrar barra de carga
    const terminalOutput = document.getElementById('terminal-output');
    if (terminalOutput) {
        terminalOutput.innerHTML = '<p class="terminal-line success">[ GLaDOS PROTOCOL ACTIVATED ]</p>' +
            '<p class="terminal-line">Playing: Still Alive - Jonathan Coulton</p>' +
            '<p class="terminal-line">---</p>';
        
        // Mostrar barra de carga
        showLoadingBar(terminalOutput);
    }
    
    // Iniciar reproducción y sincronización de letras
    audioPlayer.play().catch(err => {
        console.log('Audio playback failed:', err);
        addTerminalLine('> Audio playback requires user interaction', 'error');
    });
    
    // Iniciar sincronización de letras después de la barra de carga
    setTimeout(() => {
        startLyricsSync();
    }, 7000); // Esperar 7 segundos para la barra de carga
}

function deactivateGLaDOSMode() {
    gladosMode = false;
    
    // Resetear bandera del logo
    window.apertureLogoShown = false;
    
    // Restaurar colores originales
    document.documentElement.style.setProperty('--color-primary', '#ff1493');
    document.documentElement.style.setProperty('--color-secondary', '#ff00ff');
    document.documentElement.style.setProperty('--color-accent', '#ff69b4');
    
    // Ocultar reproductor
    if (playerWidget) {
        playerWidget.classList.remove('active');
    }
    
    // Pausar audio
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    
    // Detener sincronización de letras
    if (lyricsInterval) {
        clearInterval(lyricsInterval);
        lyricsInterval = null;
    }
    
    // Restaurar terminal
    const terminalOutput = document.getElementById('terminal-output');
    if (terminalOutput) {
        terminalOutput.innerHTML = '<p class="terminal-line">$ system.contact --init</p>' +
            '<p class="terminal-line success">Connection established.</p>' +
            '<p class="terminal-line">Available commands: email, github, youtube, spotify, phone</p>' +
            '<p class="terminal-line prompt">$<span class="cursor">_</span></p>';
    }
}

function startLyricsSync() {
    let currentLyricIndex = 0;
    
    lyricsInterval = setInterval(() => {
        if (!audioPlayer || audioPlayer.paused) {
            return;
        }
        
        const currentTime = audioPlayer.currentTime;
        
        // Encontrar la letra que corresponde al tiempo actual
        while (currentLyricIndex < stillAliveLyrics.length && 
               stillAliveLyrics[currentLyricIndex].time <= currentTime) {
            
            const lyric = stillAliveLyrics[currentLyricIndex];
            
            if (lyric.text.trim() !== '') {
                displayLyric(lyric.text, lyric.style);
            } else {
                displayLyric(' ', '');
            }
            
            currentLyricIndex++;
        }
        
        // Si la canción terminó
        if (currentTime >= audioPlayer.duration - 1 && !window.apertureLogoShown) {
            window.apertureLogoShown = true;
            clearInterval(lyricsInterval);
            
            // Mostrar logo 1 segundo después
            setTimeout(() => {
                displayLyric(' ', '');
                displayCakeArt();
                
                // Mensaje de fin después del logo
                setTimeout(() => {
                    displayLyric(' ', '');
                    displayLyric('> [END OF TRANSMISSION]', 'success');
                }, 3000);
            }, 1000);
        }
    }, 100);
    
    // Resetear índice cuando la canción termine
    audioPlayer.addEventListener('ended', () => {
        currentLyricIndex = 0;
        if (lyricsInterval) {
            clearInterval(lyricsInterval);
        }
    });
}

function showLoadingBar(terminalOutput) {
    const loadingLine = document.createElement('p');
    loadingLine.className = 'terminal-line';
    loadingLine.style.color = '#ff9900';
    loadingLine.textContent = '> Initializing: [';
    terminalOutput.appendChild(loadingLine);
    
    let progress = 0;
    const totalBars = 20;
    const loadInterval = setInterval(() => {
        progress++;
        const filled = '█'.repeat(progress);
        const empty = '░'.repeat(totalBars - progress);
        loadingLine.textContent = `> Initializing: [${filled}${empty}] ${Math.floor((progress / totalBars) * 100)}%`;
        
        if (progress >= totalBars) {
            clearInterval(loadInterval);
            setTimeout(() => {
                loadingLine.textContent = '> Initialization complete.';
            }, 200);
        }
    }, 300);
}

function displayLyric(text, style = '') {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    
    // Remover cursor temporal
    const cursor = terminalOutput.querySelector('.cursor');
    const promptLine = terminalOutput.querySelector('.prompt');
    if (promptLine) {
        promptLine.remove();
    }
    
    // Agregar línea de letra
    const p = document.createElement('p');
    p.className = `terminal-line ${style}`;
    p.textContent = ''; // Empezar vacío
    terminalOutput.appendChild(p);
    
    // Efecto de escritura tipo máquina de escribir
    let charIndex = 0;
    const typingSpeed = 30; // Velocidad en milisegundos por carácter
    
    function typeChar() {
        if (charIndex < text.length) {
            p.textContent += text.charAt(charIndex);
            charIndex++;
            
            // Scroll suave solo al final del contenedor, no forzado en cada carácter
            if (terminalOutput.scrollHeight - terminalOutput.scrollTop - terminalOutput.clientHeight < 50) {
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
            
            setTimeout(typeChar, typingSpeed);
        }
    }
    
    // Iniciar efecto de escritura
    typeChar();
    
    // Mantener máximo 25 líneas visibles
    const lines = terminalOutput.querySelectorAll('.terminal-line');
    if (lines.length > 25) {
        lines[0].remove();
    }
}

function displayCakeArt() {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    
    const cakeArt = [
        '            ,:/+/-',
        '            /M/              .,-=;//;-',
        '       .:/= ;MH/,    ,=/+%$XH@MM#@:',
        '      -$##@+$###@H@MMM#######H:.    -/H#',
        ' .,H@H@ X######@ -H#####@+-     -+H###@X',
        '  .,@##H;      +XM##M/,     =%@###@X;-',
        'X%-  :M##########$.    .:%M###@%:',
        'M##H,   +H@@@$/-.  ,;$M###@%,          -',
        'M####M=,,---,.-%%H####M$:          ,+@##',
        '@##################@/.         :%H##@$-',
        'M###############H,         ;HM##M$=',
        '#################.    .=$M##M$=',
        '################H..;XM##M$=          .:+',
        'M###################@%=           =+@MH%',
        '@#################M/.         =+H#X%=',
        '=+M###############M,      ,/X#H+:,',
        '  .;XM###########H=   ,/X#H+:;',
        '     .=+HM#######M+/+HM@+=.',
        '         ,:/%XM####H/.',
        '              ,.:=-.'
    ];
    
    // Agregar línea vacía antes del arte
    const emptyLine = document.createElement('p');
    emptyLine.className = 'terminal-line';
    emptyLine.textContent = ' ';
    terminalOutput.appendChild(emptyLine);
    
    // Mostrar cada línea del arte ASCII
    cakeArt.forEach((line, index) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.className = 'terminal-line';
            p.textContent = line;
            p.style.whiteSpace = 'pre';
            p.style.fontFamily = 'monospace';
            p.style.color = '#ff9900';
            terminalOutput.appendChild(p);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, index * 100); // 100ms entre cada línea
    });
}

function setupPlayerControls() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const closeBtn = document.getElementById('close-player');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    
    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<span class="pause-icon">⏸</span>';
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<span class="play-icon">▶</span>';
        }
    });
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
    });
    
    // Close button
    closeBtn.addEventListener('click', () => {
        deactivateGLaDOSMode();
    });
    
    // Progress bar click
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });
    
    // Update progress
    audioPlayer.addEventListener('timeupdate', () => {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = percent + '%';
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    });
    
    // Update duration
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audioPlayer.duration);
    });
    
    // Auto-update play/pause button
    audioPlayer.addEventListener('play', () => {
        playPauseBtn.innerHTML = '<span class="pause-icon">⏸</span>';
    });
    
    audioPlayer.addEventListener('pause', () => {
        playPauseBtn.innerHTML = '<span class="play-icon">▶</span>';
    });
    
    // Loop or deactivate when ended
    audioPlayer.addEventListener('ended', () => {
        playPauseBtn.innerHTML = '<span class="play-icon">▶</span>';
    });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
console.log('%cWelcome, traveler.', 'color: #ffffff; font-size: 14px; font-family: monospace;');
console.log('%cYou found the developer console! 🎮', 'color: #ff00ff; font-size: 12px; font-family: monospace;');
console.log('%c\nInterested in the code? Check it out on GitHub!', 'color: #00ffff; font-size: 12px; font-family: monospace;');
