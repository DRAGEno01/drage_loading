document.addEventListener('DOMContentLoaded', async function() {
    const statusText = document.getElementById('status-text');
    const toggleMusic = document.getElementById('toggleMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.querySelector('.progress');
    
    let totalFiles = 0;
    let filesLoaded = 0;

    const config = await fetch('config.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Error loading config:', error);
            return {
                server_name: 'Server Name',
                music_file: 'music.mp3',
                logo_file: 'logo.png',
                gradient_start: '#000000',
                gradient_end: '#1a1a1a',
                background_images_display: false,
                background_images: []
            };
        });

    document.querySelector('.logo h1').textContent = config.server_name;

    const logoImg = document.createElement('img');
    logoImg.src = config.logo_file;
    logoImg.alt = config.server_name;
    logoImg.style.maxWidth = '300px';
    logoImg.style.marginBottom = '20px';
    document.querySelector('.logo').insertBefore(logoImg, document.querySelector('.logo h1'));

    progressBar.style.background = `linear-gradient(90deg, ${config.gradient_start}, ${config.gradient_end})`;

    const audio = new Audio(config.music_file);
    audio.loop = true;
    audio.volume = 0.5;
    volumeSlider.value = audio.volume * 100;
    
    const playAudio = () => {
        audio.play().catch(function(error) {
            console.log("Audio autoplay failed:", error);
        });
    };

    playAudio();

    const handleFirstInteraction = () => {
        playAudio();
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    if ('GetParentResourceName' in window) {
        setTimeout(playAudio, 1000);
    }

    if (config.background_images_display && config.background_images.length > 0) {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        
        let shuffledImages = shuffleArray([...config.background_images]);
        
        const bgContainer = document.createElement('div');
        bgContainer.className = 'background-container';
        
        const bg1 = document.createElement('div');
        const bg2 = document.createElement('div');
        bg1.className = 'background fade-in';
        bg2.className = 'background';
        
        bgContainer.appendChild(bg1);
        bgContainer.appendChild(bg2);
        document.body.insertBefore(bgContainer, document.body.firstChild);

        let currentImageIndex = 0;
        let activeBg = bg1;
        let inactiveBg = bg2;

        const setBackground = (imageUrl) => {
            inactiveBg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`;
            inactiveBg.classList.add('fade-in');
            activeBg.classList.remove('fade-in');
            
            [activeBg, inactiveBg] = [inactiveBg, activeBg];
        };

        bg1.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${shuffledImages[0]})`;
        
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % shuffledImages.length;
            
            if (currentImageIndex === 0) {
                shuffledImages = shuffleArray([...config.background_images]);
            }
            
            setBackground(shuffledImages[currentImageIndex]);
        }, 7000);
    }
    
    toggleMusic.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            toggleMusic.textContent = '🔊';
        } else {
            audio.pause();
            toggleMusic.textContent = '🔈';
        }
    });
    
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        audio.volume = volume;
    });
    
    toggleMusic.textContent = '🔊';

    const isFiveM = 'GetParentResourceName' in window;
    
    if (!isFiveM) {
        let progress = 0;
        const simulateLoading = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(simulateLoading);
                statusText.textContent = 'Welcome to the server!';
            } else {
                statusText.textContent = `Loading... ${Math.round(progress)}%`;
            }
            progressBar.style.width = progress + '%';
        }, 500);
    }
    
    window.addEventListener('message', function(e) {
        if (!isFiveM) return;
        
        let data = e.data;
        
        if (data.eventName === 'loadProgress') {
            totalFiles = data.totalFiles;
            filesLoaded = data.filesLoaded;
            
            const progress = (filesLoaded / totalFiles) * 100;
            progressBar.style.width = progress + '%';
            statusText.textContent = `Loading... ${Math.round(progress)}%`;
        }
        
        if (data.eventName === 'loadFinished') {
            statusText.textContent = 'Welcome to the server!';
            progressBar.style.width = '100%';
        }

        if (data.progressBar) {
            let value = data.progressBar;
            progressBar.style.width = value + '%';
            statusText.textContent = `Loading... ${Math.round(value)}%`;
        }

        if (data.message) {
            statusText.textContent = data.message;
        }
    });

    if (isFiveM) {
        fetch(`https://${GetParentResourceName()}/init`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).catch(err => console.error('Error:', err));
    }
}); 