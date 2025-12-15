  document.querySelectorAll('.detailslike').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('liked'));
});

document.getElementById("hamburger").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("close");
});

const audio = document.getElementById("audio");
const miniCover = document.getElementById("mini-cover");
const miniTitle = document.getElementById("mini-title");
const miniArtist = document.getElementById("mini-artist");
const playBtnImg = document.getElementById("play-btn"); 
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let currentIndex = 0;
const tracks = [];

document.querySelectorAll(".detailsplay, .play-button").forEach(btn => {
    const trackboxParent = btn.closest(".trackbox");
    const trackParent = btn.closest(".track");

    let title, artist, cover, audioSrc;
    audioSrc = btn.dataset.audio;
    if (!audioSrc) return; 

    if (trackboxParent) {
        title = trackboxParent.querySelector("p")?.innerText;
        artist = trackboxParent.querySelector(".artistname")?.innerText || "";
        cover = trackboxParent.querySelector(".cover")?.src;
    } else if (trackParent) {
        title = trackParent.querySelector(".detailstitle")?.innerText;
        artist = trackParent.querySelector(".detailsartist")?.innerText || "";
       
        cover = btn.closest(".detailscover")?.querySelector("img:not(.detailsplay)")?.src;
    }

    if (!cover || !title || !audioSrc) return;

    tracks.push({ title, artist, cover, audioSrc });

    btn.addEventListener("click", () => {
        currentIndex = tracks.findIndex(t => t.audioSrc === audioSrc);
        loadAndPlay(currentIndex);
    });
});




function loadAndPlay(index) {
    const song = tracks[index];
    audio.src = song.audioSrc;
    audio.play();
    miniCover.style.backgroundImage = `url("${song.cover}")`;
    miniTitle.innerText = song.title;
    miniArtist.innerText = song.artist;
    playBtnImg.src = "./cover arts/elements/pause-button.jpg";
}

audio.addEventListener("ended", () => {
  if (!tracks.length) return;

  currentIndex = (currentIndex + 1) % tracks.length;
  loadAndPlay(currentIndex);
});

playBtnImg.addEventListener("click", () => {
    if(audio.paused) {
        audio.play();
        playBtnImg.src = "./cover arts/elements/pause-button.jpg";
    } else {
        audio.pause();
        playBtnImg.src = "./cover arts/elements/play-button.png";
    }
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % tracks.length;
    loadAndPlay(currentIndex);
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    loadAndPlay(currentIndex);
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault(); 
        if (audio.paused) {
            audio.play();
            playBtnImg.src = "./cover arts/elements/pause-button.jpg";
        } else {
            audio.pause();
            playBtnImg.src = "./cover arts/elements/play-button.png";
        }
        
    }
});

document.getElementById("dontClick").onclick = () => {
    const egg = document.getElementById("easterEgg");
    const audio = document.getElementById("symphony");

    egg.style.display = "block";
    document.body.style.animation = "quake 1s";

    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
        document.querySelector(".ocean").style.animation = "oceanRise 2s forwards";
    }, 1000);

    setTimeout(() => {
        const oceanEl = document.querySelector(".ocean");
        const oceanHeight = oceanEl.offsetHeight;
        const waterTop = window.innerHeight - oceanHeight;

        /* ================= FLOATERS ================= */
        document.querySelectorAll(".float").forEach(el => {
            el.style.opacity = "1";
            el.style.left = Math.random() * window.innerWidth + "px";
            el.style.top  = Math.random() * (window.innerHeight * 0.6) + "px";

            function drift() {
                const dx = (Math.random() - 0.5) * 120;
                const dy = (Math.random() - 0.5) * 120;
                el.animate([
                    { transform: "translate(0,0)" },
                    { transform: `translate(${dx}px, ${dy}px)` }
                ], {
                    duration: 2000 + Math.random()*2000,
                    easing: "ease-in-out",
                    fill: "forwards"
                }).onfinish = drift;
            }
            drift();
        });

    
        document.querySelectorAll(".swim").forEach(el => {
            el.style.opacity = "1";
            el.style.zIndex = 3;

        
            const minY = window.innerHeight * 0.45;
            const maxY = window.innerHeight * 0.65;
            el.style.top = minY + Math.random() * (maxY - minY) + "px";

            function swimLoop() {
                const w = window.innerWidth;
                let startX, endX;

                if (el.classList.contains("goldfish")) {
                    startX = w + 200;
                    endX = -200;
                } else {
                    startX = -200;
                    endX = w + 200;
                }

                el.animate([
                    { transform: `translateX(${startX}px)` },
                    { transform: `translateX(${endX}px)` }
                ], {
                    duration: 4000 + Math.random()*3000,
                    easing: "linear",
                    iterations: 1
                }).onfinish = swimLoop;
            }
            swimLoop();
        });

        document.querySelectorAll(".dolphin").forEach(el => {
            el.style.opacity = "1";
            el.style.zIndex = 4;

            el.style.left = "0px";
            el.style.top = "0px";

            function jump() {
                const sx = Math.random() * window.innerWidth;
                const ex = Math.random() * window.innerWidth;
                const midX = (sx + ex) / 2;

                const startY = 450;              
                const peakY  = waterTop - 120;   
                const endY   = waterTop - 40;    

                el.animate([
                    { transform: `translate(${sx}px, ${startY}px)` },
                    { transform: `translate(${midX}px, ${peakY}px)` },
                    { transform: `translate(${ex}px, ${endY}px)` }
                ], {
                    duration: 1800 + Math.random()*900,
                    easing: "ease-out"
                }).onfinish = jump;
            }
            jump();
        });

    }, 3000);

    setTimeout(() => location.reload(), 10000);
};


function openPopup() {
    document.getElementById('popup').style.display = 'flex';
  }

  window.onclick = function(event) {
    const popup = document.getElementById('popup');
    const content = document.querySelector('.popup-content');
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  }


const progress = document.getElementById('progress');

audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
