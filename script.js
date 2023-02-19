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
progressArea = document.querySelector(".progress-area"),
progressBar = document.querySelector(".progress-bar"),
musicList = document.querySelector(".music-list"),
showMoreBtn = document.querySelector("#more-songs"),
closemusicList = document.querySelector("#close")

let songIndex = Math.floor(Math.random() * allSongs.length);

window.addEventListener("load",()=>{
    loadSong(songIndex);    // loading a song when window is loaded
    playingNow();
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
    playingNow();
})
// next song btn event 
nextSongBtn.addEventListener("click",()=>{
    nextSong();
    playingNow();
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
// update playing song currrent time to the progress bar width

progressArea.addEventListener("click",(e)=>{
    let progressWidthVal = progressArea.clientWidth; // getting width of progressbar
    let clickedOffsetX = e.offsetX  // getting offset x value
    let musicDuration = audioSong.duration; // getting song duration

    audioSong.currentTime = (clickedOffsetX / progressWidthVal) * musicDuration;
    playSong();
})

// work on shuffle button
const shuffleRepeatBtn = container.querySelector("#repeat-plist");

shuffleRepeatBtn.addEventListener("click",()=>{     // repeating all the song from the beginning
   songIndex = 0;
   loadSong(songIndex);
   playSong();
   playingNow();
})
audioSong.addEventListener("ended",()=>{
    nextSong();
    playingNow();
})
showMoreBtn.addEventListener("click",()=>{
    musicList.classList.add("show");
})
closemusicList.addEventListener("click",()=>{
    musicList.classList.remove("show");
})

const ulTag = container.querySelector(".music-list ul");

// create li element according to the array length

for(let i=0;i < allSongs.length;i++){
    let liTag = `<li li-index="${i}">
                    <div class="row">
                        <span>${allSongs[i].name}</span>        
                        <p>${allSongs[i].artist}</p>
                    </div>
                    <audio class="${allSongs[i].src}" src="songs/${allSongs[i].src}.mp3"></audio>
                    <span id="${allSongs[i].src}" class="song-duration"></span>
                </li>`
    ulTag.insertAdjacentHTML("beforeend",liTag);

}

// lets work on play particular song on click
const allLiTags = ulTag.querySelectorAll("li");

function playingNow(){
    for(j=0;j<allLiTags.length;j++){
        // removing playing class from all other li tag if it exist
        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
        }
        //adding playing class to the li tag which is playing
        if(allLiTags[j].getAttribute("li-index") == songIndex){
            allLiTags[j].classList.add("playing");
        }
        //adding onclick event on all li tags
        allLiTags[j].setAttribute("onclick","clicked(this)");
    }
}

function clicked(element){
    let getLiIndex = element.getAttribute("li-index");  // getting li index of particular li tag
    songIndex = getLiIndex;
    loadSong(songIndex);
    playSong();
    playingNow();
}