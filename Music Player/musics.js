window.onload=function(){
    const playBtn = document.querySelector("#mainPlayBtn");
    const audio = document.querySelector("#audio");
    const btnPrev = document.querySelector("#btnPrev");
    const btnNext = document.querySelector("#btnNext");
    const trackTitle = document.querySelector(".track-title");
    const artistName = document.querySelector(".artist-name");
    const cover = document.querySelector(".cover");
    const slider = document.querySelector(".slider");
    const thumb = document.querySelector(".slider-thumb");
    const progress = document.querySelector(".progress");
    const time = document.querySelector(".time");
    const fullTime = document.querySelector(".fulltime");
    const volumeSlider = document.querySelector(".volume-slider .slider");
    const volumeProgress = document.querySelector(".volume-slider .progress");
    const volumeIcon = document.querySelector(".volume-Icon");

    //Is the track playing
    let trackPlaying = false;

    //Is volume muted
    let volumeMuted = false;

    //Which track is loaded currently based on no. id
    let trackId = 0;

    //Track names
    const tracks = [
        "EndGame",
        "Mera Bina",
        "Kaun Tujhe",
        "Bad Guy",
        "Dhadkan",
        "Showed Me",
        "Gunjan Aap Ki Nazron Ne Samjha",
        "Kabhi Jo Badal Barse"
    ];

    //Track artists
    const artists = [
        "Taylor Swift",
        "KSHMR",
        "Aftermorning",
        "The Interrupters",
        "Jimbo",
        "Maddison Beer",
        "Aftermorning",
        "Aftermorning"
    ];

    //Track names
    const covers = [
        "cover1",
        "cover2",
        "cover3",
        "cover4",
        "cover5",
        "cover6",
        "cover7",
        "cover8"
    ]

    //click event play button
    playBtn.addEventListener('click', playTrack);

    function playTrack() {
        //if audio not playing
        if(trackPlaying === false) {
            //play audio
            audio.play();
            //add pause icon inside button
            playBtn.innerHTML = `
                <span class= "material-symbols-outlined">
                    pause
                </span>
            `;
            //set trackPlaying to true, now playing
            trackPlaying = true;
            //otherwise if playing
        } else {
            //pause audio
            audio.pause();
            // add play icon inside
            playBtn.innerHTML = `
                <span class= "material-symbols-outlined">
                    play_arrow
                </span>
            `;
            //set trackPlaying to false, now paused again
            trackPlaying = false;
        }
    }
    function switchTrack() {
        if(trackPlaying === true) {
            audio.play();
        }
    }
    const trackSrc = "music/" + tracks[trackId] + ".mp3";
    
    function loadTrack() {
        audio.src = "music/" + tracks[trackId] + ".mp3";

        audio.load();

        trackTitle.innerHTML = tracks[trackId];
        artistName.innerHTML = artists[trackId];
        cover.src = "covers/" + covers [trackId] + ".jpg";
        
        progress.style.width = 0;
        thumb.style.left = 0;

        audio.addEventListener("loadeddata", () => {
            setTime(fullTime, audio.duration);
            slider.setAttribute("max", audio.duration);
        });
    }
    loadTrack();

    btnPrev.addEventListener("click", () => {
        //Decrement track ID
        trackId--;
        //If ID goes below 0 repeats last track
        if(trackId < 0) {
            trackId = tracks.length - 1;
        }
        loadTrack();
        switchTrack();
    });

    btnNext.addEventListener("click", nextTrack);

    function nextTrack() {
        trackId++;
        if(trackId > tracks.lenght - 1) {
            trackId = 0;
        }
        loadTrack();
        switchTrack();
    }

    //When audio ends play next track
    audio.addEventListener("ended", nextTrack);

    //Format time
    function setTime(output, input) {
    //Calc minutes from input
    const minutes = Math.floor(input / 60);
    //Calc seconds from input
    const seconds = Math.floor(input % 60);

    //If seconds under 10
    if(seconds < 10 ) {
        //Add zero before first no.
        output.innerHTML = minutes + ":0" + seconds;
        //If over 10, without zero
    } else {
        output.innerHTML = minutes + ":" + seconds;
    }
    }
    //Outputs audio duration
    setTime(fullTime, audio.duration);

    //Time changing on audio track
    audio.addEventListener("timeupdate", () => {
        const currentAudioTime = Math.floor(audio.currentTime);
        const timePercentage = (currentAudioTime / audio.duration) * 100 + "%";
        setTime(time, currentAudioTime);

        progress.style.width = timePercentage;
        thumb.style.left = timePercentage;
    });

    function customSlider() {
        const val = (slider.value / audio.duration) * 100 + "%";
        progress.style.width = val;
        thumb.style.left = val;
        setTime(time, slider.value);
        audio.currentTime = slider.value;
    }

    customSlider();

    slider.addEventListener("input", customSlider);

    //Volume Slider
    let val;

    function customVolumeSlider() {
        const maxVal = volumeSlider.getAttribute("max");
        val = (volumeSlider.value / maxVal) * 100 + "%";
        volumeProgress.style.width = val;
        audio.volume = volumeSlider.value / 100;
        
        
    }
    
    customVolumeSlider();
    volumeSlider.addEventListener("input", customVolumeSlider);

    volumeIcon.addEventListener('click', () => {
        if(volumeMuted === false) {
            volumeIcon.innerHTML = `
                <span class = "material-symbols-outlined">
                    volume_off
                </span>
         `;
         audio.volume = 0;
         volumeProgress.style.width = 0;
         volumeMuted = true;
        } else {
            volumeIcon.innerHTML = `
                <span class = "material-symbols-outlined">
                    volume_down
                </span>
         `;
         audio.volume = 0.5;
         volumeProgress.style.width = val;
         volumeMuted = false;
        }
    });
    
}
