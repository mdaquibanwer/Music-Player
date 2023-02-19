let allSongs = [ 
    {
        name: "0",
        artist: "NCS",
        img: "0",
        src: "0"
    },
    {
        name: "1",
        artist: "NCS",
        img: "1",
        src: "1"
    },
    {
        name: "2",
        artist: "NCS",
        img: "2",
        src: "2"
    },
    {
        name: "3",
        artist: "NCS",
        img: "3",
        src: "3"
    },
    {
        name: "4",
        artist: "NCS",
        img: "4",
        src: "4"
    },
    {
        name: "5",
        artist: "NCS",
        img: "5",
        src: "5"
    },
    {
        name: "6",
        artist: "NCS",
        img: "6",
        src: "6"
    },
    {
        name: "7",
        artist: "NCS",
        img: "7",
        src: "7"
    },
    {
        name: "8",
        artist: "NCS",
        img: "8",
        src: "8"
    },
    {
        name: "9",
        artist: "NCS",
        img: "9",
        src: "9"
    },
]

// selected all required tags or elements
const container = document.querySelector(".container"),
songImg = document.querySelector(".img-area img"),
songName = document.querySelector(".song-details .name"),
songArtist = document.querySelector(".song-details .artist"),
audioSong = document.querySelector("#audio-song"),
playPauseSong = document.querySelector(".play-pause"),
playPauseSongBtn = document.querySelector(".play-pause i"),
prevSongBtn = document.querySelector("#prev-song"),
nextSongBtn = document.querySelector("#next-song"),
progressBar = document.querySelector(".progress-bar")

let songIndex = 2;

window.addEventListener("load",()=>{
    loadSong(songIndex);    // loading a song when window is loaded
})

// load song function
function loadSong(index){
    songName.innerText = allSongs[index].name;
    songArtist.innerText = allSongs[index].artist;
    songImg.src = `covers/${allSongs[index].img}.jpg`;
    audioSong.src = `songs/${allSongs[index].src}.mp3`;
}
// play song function 
function playSong(){
    container.classList.add("paused");
    audioSong.play();
    playPauseSongBtn.classList.remove("fa-play");
    playPauseSongBtn.classList.add("fa-pause");
}
// pause song function
function pauseSong(){
    container.classList.remove("paused");
    audioSong.pause();
    playPauseSongBtn.classList.add("fa-play");
    playPauseSongBtn.classList.remove("fa-pause");
}

// play or pause song event
playPauseSong.addEventListener("click",()=>{
    const isSongPaused = container.classList.contains("paused");
    // if isSongpaused is true then call pauseSong else call playSong
    isSongPaused ? pauseSong() : playSong();
})


//next song function
function nextSong(){
    songIndex++;
    songIndex >= allSongs.length ? songIndex = 0 : songIndex = songIndex;
    loadSong(songIndex);
    playSong();
}
// prev song function
function prevSong(){
    songIndex--;
    songIndex < 0 ? songIndex = allSongs.length - 1 : songIndex = songIndex;
    loadSong(songIndex);
    playSong();
}

// prev song btn event
prevSongBtn.addEventListener("click",()=>{
    prevSong();
})
// next song btn event 
nextSongBtn.addEventListener("click",()=>{
    nextSong();
})

// updating progress bar according to the current song time
audioSong.addEventListener("timeupdate",(e)=>{
    // console.log(e);
    const currentTime = e.target.currentTime;   // getting current timeof the song
    const songDuration = e.target.duration; // getting the duration of the song
    let progressWidth = (currentTime/songDuration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let songCurrentTime = container.querySelector(".current");
    let songDurationTime = container.querySelector(".duration");
    
    audioSong.addEventListener("loadeddata",()=>{
        // update song total duration
        let audioDuration = audioSong.duration;
        let totalMinute = Math.floor(audioDuration / 60);
        let totalSecond = Math.floor(audioDuration % 60);
        if(totalSecond<10){ // adding 0 if second is less than 10
            totalSecond = `0${totalSecond}`;
        }
        songDurationTime.innerText = `${totalMinute}:${totalSecond}`;
    })
    // update current time;
    let currentMinute = Math.floor(currentTime / 60);
    let currentsecond = Math.floor(currentTime % 60);
    if(currentsecond < 10){
        currentsecond = `0${currentsecond}`;
    }
    songCurrentTime.innerText = `${currentMinute}:${currentsecond}`;
    
})