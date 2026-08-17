let isPlaying = false;
        let hp = 100;
        const MAX_HP = 100;
        let progress = 0;
        const MAX_PROGRESS = 100;
        let phaseInterval = null;
        let hasClickedThisPhase = false;
        let isTutorial = false;
        
        const wuXing = [
            { name: 'Kim', color: '#ffffff', secondary: '#cccccc', sinhMon: '☰' },
            { name: 'Thủy', color: '#00aaff', secondary: '#0055ff', sinhMon: '☵' },
            { name: 'Mộc', color: '#00ff00', secondary: '#008800', sinhMon: '☳' },
            { name: 'Hỏa', color: '#ff3300', secondary: '#aa0000', sinhMon: '☲' },
            { name: 'Thổ', color: '#ffcc00', secondary: '#aa7700', sinhMon: '☷' }
        ];
        
        let currentPhaseIndex = 0;
        let activePhase = wuXing[0];
        
        function updateHealthBar() {
            const fill = document.getElementById('hpFill');
            fill.style.width = hp + '%';
            fill.style.background = hp > 60 ? '#0f0' : (hp > 30 ? '#ff0' : '#f00');
            document.getElementById('hpText').innerText = `Thọ Nguyên: ${Math.floor(hp)}/${MAX_HP}`;
        }

        function updateProgressBar() {
            document.getElementById('progressFill').style.width = `${progress}%`;
            document.getElementById('progressText').innerText = `Tiến Độ Phá Trận: ${progress}%`;
        }

        function takeDamage(amount) {
            if (!isPlaying) return;
            hp -= amount;
            if (hp <= 0) {
                hp = 0;
                gameOver();
            }
            updateHealthBar();
        }

        function heal(amount) {
            if (!isPlaying) return;
            hp += amount;
            if (hp > MAX_HP) hp = MAX_HP;
            updateHealthBar();
        }

        function showEffect(flashClass, text, x, y) {
            const flash = document.createElement('div');
            flash.className = flashClass;
            document.body.appendChild(flash);
            setTimeout(() => flash.remove(), 1000);
            
            const txt = document.createElement('div');
            txt.className = flashClass === 'life-flash' ? 'heal-text' : 'damage-text';
            txt.innerText = text;
            txt.style.left = x + 'px';
            txt.style.top = y + 'px';
            document.body.appendChild(txt);
            setTimeout(() => txt.remove(), 1500);
        }

        function startGame() {
            hp = 100;
            progress = 0;
            isPlaying = true;
            hasClickedThisPhase = false;
            isTutorial = true;
            
            document.getElementById('menuOverlay').classList.add('hidden');
            document.getElementById('gameOverOverlay').classList.add('hidden');
            document.getElementById('winOverlay').classList.add('hidden');
            document.getElementById('tutorialOverlay').classList.remove('hidden');
            document.getElementById('hpContainer').classList.remove('hidden');
            document.getElementById('progressContainer').classList.remove('hidden');
            document.getElementById('uiContainer').classList.remove('hidden');
            document.getElementById('gameTitle').classList.add('hidden');
            document.getElementById('gameSubtitle').classList.add('hidden');
            
            updateHealthBar();
            updateProgressBar();
            currentPhaseIndex = 0;
            updatePhase(true);
            if(phaseInterval) clearInterval(phaseInterval);
        }

        function gameOver() {
            isPlaying = false;
            clearInterval(phaseInterval);
            document.getElementById('gameOverOverlay').classList.remove('hidden');
            document.getElementById('hpContainer').classList.add('hidden');
            document.getElementById('progressContainer').classList.add('hidden');
            document.getElementById('uiContainer').classList.add('hidden');
        }

        function gameWin() {
            isPlaying = false;
            clearInterval(phaseInterval);
            const scene = document.getElementById('scene');
            scene.style.transition = 'all 2s';
            scene.style.transform = 'scale(3) rotateZ(720deg)';
            scene.style.opacity = '0';
            showEffect('life-flash', 'PHI THĂNG!', window.innerWidth/2, window.innerHeight/2);
            setTimeout(() => {
                document.getElementById('winOverlay').classList.remove('hidden');
                scene.style.transition = 'all 0.5s ease-in-out';
                scene.style.transform = 'rotateX(60deg) scale(1)';
                scene.style.opacity = '1';
            }, 2000);
        }

        document.getElementById('btnPlay').addEventListener('click', startGame);
        document.getElementById('btnRestart').addEventListener('click', startGame);
        document.getElementById('btnWinRestart').addEventListener('click', startGame);

        function updatePhase(isFirst = false) {
            if (isPlaying && !isFirst && !hasClickedThisPhase) {
                showEffect('death-flash', 'Nhiễm Tà Khí!\n-15 Thọ Nguyên', window.innerWidth/2, window.innerHeight/2);
                takeDamage(15);
            }
            hasClickedThisPhase = false;
            if (!isPlaying && !isFirst) return;
            activePhase = wuXing[currentPhaseIndex];
            document.documentElement.style.setProperty('--primary-glow', activePhase.color);
            document.documentElement.style.setProperty('--secondary-glow', activePhase.secondary);
            document.documentElement.style.setProperty('--core-glow', activePhase.color);
            document.getElementById('phaseUI').innerText = `Hệ: ${activePhase.name}`;
            if (isTutorial) {
                document.getElementById('tutPhaseName').innerText = activePhase.name;
                document.getElementById('tutPhaseName').style.color = activePhase.color;
                document.getElementById('tutSinhMon').innerText = activePhase.sinhMon;
                document.getElementById('tutSinhMon').style.color = activePhase.color;
            }
            currentPhaseIndex = (currentPhaseIndex + 1) % wuXing.length;
            if (currentPhaseIndex === 0 && !isFirst) triggerSpaceDistortion();
        }
        
        function triggerSpaceDistortion() {
            if(!isPlaying) return;
            const scene = document.getElementById('scene');
            scene.classList.remove('distortion');
            void scene.offsetWidth;
            scene.classList.add('distortion');
            triggerShockwave(true);
        }

        document.getElementById('tutSinhMon').addEventListener('click', (e) => {
            if (!isTutorial) return;
            showEffect('life-flash', 'ĐÚNG SINH MÔN!\n+15 Thọ Nguyên\n+10% Phá Trận', e.clientX, e.clientY);
            triggerShockwave(false);
            heal(15);
            progress += 10;
            updateProgressBar();
            hasClickedThisPhase = true; 
            isTutorial = false;
            document.getElementById('tutorialOverlay').classList.add('hidden');
            phaseInterval = setInterval(() => updatePhase(false), 6000);
        });

        const baguaSymbols = ['☰', '☵', '☶', '☳', '☴', '☲', '☷', '☱'];
        const innerRing = document.getElementById('innerRing');
        baguaSymbols.forEach((symbol, index) => {
            const angle = (index * 360) / 8;
            const radius = 130; 
            
            const el = document.createElement('div');
            el.className = 'trigram';
            el.textContent = symbol;
            
            const rad = angle * Math.PI / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            
            el.style.transform = `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`;
            
            // Logic Click Sinh Môn / Tử Môn
            el.addEventListener('click', (e) => {
                e.stopPropagation(); 
                if (!isPlaying || hasClickedThisPhase) return;
                
                if (symbol === activePhase.sinhMon) {
                    showEffect('life-flash', 'ĐÚNG SINH MÔN!\n+15 Thọ Nguyên\n+10% Phá Trận', e.clientX, e.clientY);
                    triggerShockwave(false);
                    heal(15);
                    progress += 10;
                    if (progress > MAX_PROGRESS) progress = MAX_PROGRESS;
                    updateProgressBar();
                    hasClickedThisPhase = true; // An toàn phase này
                    
                    if (progress >= MAX_PROGRESS && !isTutorial) {
                        gameWin();
                        return;
                    }

                    if (isTutorial) {
                        isTutorial = false;
                        document.getElementById('tutorialOverlay').classList.add('hidden');
                        phaseInterval = setInterval(() => updatePhase(false), 6000);
                    }
                } else {
                    if (isTutorial) {
                        showEffect('death-flash', `SAI KÝ HIỆU!\nHãy tìm: ${activePhase.sinhMon}`, e.clientX, e.clientY);
                    } else {
                        showEffect('death-flash', 'SAI TỬ MÔN!\n-25 Thọ Nguyên', e.clientX, e.clientY);
                        takeDamage(25);
                        hasClickedThisPhase = true; // Bị phạt rồi thì khỏi bấm nữa cho phase này
                    }
                }
            });
            
            innerRing.appendChild(el);
        });

        // Phân bổ Phù văn
        const midRing = document.getElementById('midRing');
        const outerRing = document.getElementById('outerRing');
        const runes = ['臨', '兵', '鬥', '者', '皆', '陣', '列', '在', '前']; // Cửu Tự
        const outerSymbols = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']; // 12 Địa chi

        function populateRing(ring, radius, items, className, rotateOffset = 90) {
            items.forEach((symbol, index) => {
                const angle = (index * 360) / items.length;
                const el = document.createElement('div');
                el.className = className;
                el.textContent = symbol;
                const rad = angle * Math.PI / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                el.style.transform = `translate(${x}px, ${y}px) rotate(${angle + rotateOffset}deg)`;
                ring.appendChild(el);
            });
        }
        populateRing(midRing, 205, runes, 'rune-mid');
        populateRing(outerRing, 280, outerSymbols, 'rune');

        // ==========================================
        // Hiệu ứng tương tác
        // ==========================================
        const array = document.getElementById('array');
        
        function updateRotation(x, y) {
            const xAxis = (window.innerWidth / 2 - x) / 25;
            const yAxis = (window.innerHeight / 2 - y) / 25;
            array.style.transform = `rotateX(${60 + yAxis}deg) rotateZ(${xAxis}deg)`;
        }
        window.addEventListener('mousemove', (e) => { updateRotation(e.pageX, e.pageY); });
        window.addEventListener('touchmove', (e) => { if (e.touches.length > 0) updateRotation(e.touches[0].pageX, e.touches[0].pageY); });
        window.addEventListener('mouseleave', () => { array.style.transform = `rotateX(60deg) rotateZ(0deg)`; });

        const shockwave = document.getElementById('shockwave');
        function triggerShockwave(isMassive = false) {
            shockwave.style.animation = 'none';
            void shockwave.offsetWidth;
            
            if (isMassive) {
                shockwave.style.borderWidth = '30px';
                shockwave.style.animationDuration = '3s';
            } else {
                shockwave.style.borderWidth = '10px';
                shockwave.style.animationDuration = '1.5s';
            }
            shockwave.style.animationName = 'shockwaveAnim';
            
            document.querySelectorAll('.ring').forEach(ring => {
                ring.style.animationDuration = isMassive ? '0.5s' : '1s';
            });
            
            setTimeout(() => {
                document.getElementById('outerRing').style.animationDuration = '30s';
                document.getElementById('midRing').style.animationDuration = '20s';
                document.getElementById('innerRing').style.animationDuration = '15s';
            }, isMassive ? 3000 : 1500);
        }

        window.addEventListener('click', (e) => {
            if(isPlaying) triggerShockwave(false);
        });

        // Hạt năng lượng
        const particlesContainer = document.getElementById('particles');
        for(let i = 0; i < 70; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            
            particle.style.background = wuXing[0].color;
            particle.style.boxShadow = `0 0 10px ${wuXing[0].color}`;
            
            particlesContainer.appendChild(particle);
        }
        
        // Background rotation starts even if not playing
        document.documentElement.style.setProperty('--primary-glow', wuXing[0].color);
        document.documentElement.style.setProperty('--secondary-glow', wuXing[0].secondary);
        document.documentElement.style.setProperty('--core-glow', wuXing[0].color);