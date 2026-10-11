const starfield = document.getElementById('starfield');
    for (let i = 0; i < 68; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty('--size', `${1 + Math.random() * 2}px`);
      star.style.setProperty('--duration', `${5 + Math.random() * 8}s`);
      star.style.setProperty('--delay', `${-Math.random() * 10}s`);
      star.style.setProperty('--move-x', `${-15 + Math.random() * 30}px`);
      star.style.setProperty('--move-y', `${-18 + Math.random() * 36}px`);
      starfield.appendChild(star);
    }

    const button = document.getElementById('revealButton');
    const notes = document.getElementById('little-things');
    const letter = document.querySelector('.letter');
    const letterStarLayer = document.createElement('div');
    letterStarLayer.className = 'letter-star-layer';
    letterStarLayer.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 72; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'letter-sparkle';
      sparkle.style.left = `${4 + Math.random() * 92}%`;
      sparkle.style.top = `${5 + Math.random() * 90}%`;
      sparkle.style.setProperty('--sparkle-size', `${1 + Math.random() * 2}px`);
      sparkle.style.setProperty('--sparkle-speed', `${.35 + Math.random() * .5}s`);
      sparkle.style.setProperty('--sparkle-delay', `${-Math.random() * .9}s`);
      letterStarLayer.appendChild(sparkle);
    }
    letter.prepend(letterStarLayer);
    const music = document.getElementById('pageMusic');
    const musicToggle = document.getElementById('musicToggle');
    const flowerReplay = document.getElementById('flowerReplay');
    // Add the audio file beside index.html and set this to its filename, e.g. 'royal-music.mp3'.
    const MUSIC_FILE = 'royal-music.mp3';
    const blooms = ['✿', '❀', '✾', '✽', '✤'];
    let bloomTimer;
    let bloomStopTimer;

    function sendFlowers(count = 27) {
      for (let i = 0; i < count; i++) {
        const petal = document.createElement('span');
        petal.className = 'petal';
        petal.setAttribute('aria-hidden', 'true');
        petal.textContent = blooms[Math.floor(Math.random() * blooms.length)];
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.color = ['#f2aebe', '#f6d48f', '#fff0d6', '#d3a7cf'][Math.floor(Math.random() * 4)];
        petal.style.setProperty('--duration', `${3.6 + Math.random() * 3.2}s`);
        petal.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
        petal.style.setProperty('--spin', `${Math.random() * 540 - 270}deg`);
        petal.style.animationDelay = `${Math.random() * .7}s`;
        document.body.appendChild(petal);
        window.setTimeout(() => petal.remove(), 7600);
      }
    }

    function startFlowerShow() {
      window.clearInterval(bloomTimer);
      window.clearTimeout(bloomStopTimer);
      sendFlowers();
      bloomTimer = window.setInterval(() => sendFlowers(8), 1700);
      bloomStopTimer = window.setTimeout(() => window.clearInterval(bloomTimer), 5800);
    }

    button.addEventListener('click', () => {
      button.classList.add('is-lit');
      flowerReplay.hidden = false;
      if (MUSIC_FILE) {
        music.src = MUSIC_FILE;
        music.play().then(() => { musicToggle.hidden = false; }).catch(() => {});
      }
      startFlowerShow();
      notes.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    flowerReplay.addEventListener('click', startFlowerShow);

    musicToggle.addEventListener('click', () => {
      if (music.paused) {
        music.play().then(() => {
          musicToggle.textContent = '♫ Pause music';
          musicToggle.setAttribute('aria-pressed', 'true');
        }).catch(() => {});
      } else {
        music.pause();
        musicToggle.textContent = '♫ Play music';
        musicToggle.setAttribute('aria-pressed', 'false');
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    document.querySelectorAll('.fade-up').forEach((element) => observer.observe(element));
