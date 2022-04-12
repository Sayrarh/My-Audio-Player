//Adding all required tags and elements

const container = document.querySelector(".container"),
musicImg = container.querySelector(".img-container img"),
musicName = container.querySelector(".music-info .name"),
musicArtist = container.querySelector(".music-info .artist"),
mainAudio = container.querySelector("#main-audio"),
playPauseBtn = container.querySelector(".play-pause"),
nextBtn = container.querySelector("#next"),
prevBtn = container.querySelector("#prev"),
progressContainer = container.querySelector(".progress-container"),
progressBar = progressContainer.querySelector(".progress-bar"),
musicList = container.querySelector(".music-list"),
moreMusicBtn = container.querySelector("#more-music"),
closeMusicBtn = musicList.querySelector("#close");

//Array starts from 0 so the Index 3 is Beautiful Name
let musicIndex = 2;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);//calling load music function once window is loaded
    //playingNow();
  });

//load music function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic(){
    container.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
//pause music function
function pauseMusic(){
    container.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//Previous music function
function prevMusic(){
    musicIndex--; //decrement of musicIndex by 1
    //if musicIndex is less than 1, then musicIndex will be the array length so the last music play
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
  }

//Next music function
function nextMusic(){
    musicIndex++; //increment of musicIndex by 1
    //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
  }

  // play or pause button event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = container.classList.contains("paused");
    //if isMusicPlay is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingNow();
  });

//next music button event
nextBtn.addEventListener("click", ()=>{
nextMusic();
});

//Previous music button event
prevBtn.addEventListener("click", ()=>{
    prevMusic();
    });
//more music button event
    moreMusicBtn.addEventListener("click", ()=>{
        musicList.classList.toggle("show");
    });
    //close music button event
    closeMusicBtn.addEventListener("click", ()=>{
        moreMusicBtn.click();
    });

  // update progress bar width according to music current time
  mainAudio.addEventListener("timeupdate", (e)=>{
      const currentTime = e.target.currentTime; //getting playing song current time
      const duration = e.target.duration; //Getting the playing song duration time
      let progressWidth = (currentTime / duration) * 100;
      progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = container.querySelector(".current-time"),
  musicDuration = container.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });
  //update playing song current duration
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
  currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});
//Let's update playing song current time in according to the progress bar width
progressContainer.addEventListener("click", (e)=>{
    let progressWidth = progressContainer.clientWidth; //Getting width of progress bar
    let clickedOffSetX = e.offsetX; //Getting offset X value
    let songDuration = mainAudio.duration; //Getting song total duration

    mainAudio.currentTime = (clickedOffSetX / progressWidth) * songDuration;
    playMusic(); //So if music is paused and user click on the progress bar then the music will play
    
});

//Change loop, Shuffle, repeat icon onclick
const repeatBtn = container.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
    //First we get the innerText of the icon then we will change accordingly
    let getText = repeatBtn.innerText; //Getting innerText of Icon
    //Let's do different changes on different icon click using switch
    switch(getText){
        case "repeat": //If this icon is repeat then change it to repeat_one
           repeatBtn.innerText = "repeat_one";
           repeatBtn.setAttribute("title", "Song looped");
           break;
        case "repeat_one": //If icon is repeat_one then change it to shuffle
            repeatBtn.innerText ="shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle": //If this icon is shuffle then change it to repeat
           repeatBtn.innerText = "repeat";
           repeatBtn.setAttribute("title", "Playlist looped");
           break;
    }
});

//Let's work on what to do after the song has ended
mainAudio.addEventListener("ended", ()=>{
    //Doing according to the icon means if I set the icon to loop song then it will repeat the current song and go on

    let getText = repeatBtn.innerText; //Getting innerText of Icon
    //Let's do different changes on different icons click using switch
    switch(getText){
        case "repeat": //If this icon is repeat then simply call the nextMusic function so the next song will play
        nextMusic();
           break;
        case "repeat_one": //If icon is repeat_one then change the current playing song current time to 0 so that the song will play from the begining
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic(); //calling playMusic function makes the same play overagain 
            break;
        case "shuffle": //If this icon is shuffle then change it to 
        //Generating random index between the max range of array length
           let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
           do{
            randIndex = Math.floor((Math.random() * allMusic.length) + 1);
           }while(musicIndex == randIndex);  //this loop run until the next random number won't be the same as that of the current music index ==
           musicIndex = randIndex; //passing randomIndex to musicIndex so the random song will play
           loadMusic(musicIndex); //calling loadMusic function
           playMusic(); //calling playMusic function 
           playingNow();
           break;
    }
});

const ulTag = container.querySelector("ul");
//creating li tags according to the array length of the music list
for (let i = 0; i < allMusic.length; i++){
    //passing the song name, artist from the array to li
    let liTag = `<li li-index="${i + 1}"> 
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="music-duration">3:40</span>
                <!--we use this audio tag to get the total duration of a particular music so it can show on the list-->
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio> 
              </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
    //liAudioDuration select span tag which show audio total duration 
    let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
    //liAudioTag select audio tag which have the audio source
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    //loadeddata event is used to get the music total duration without playing it
    liAudioTag.addEventListener("loadeddata", ()=>{
      let duration = liAudioTag.duration;
      let totalMin = Math.floor(duration / 60);
      let totalSec = Math.floor(duration % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;  //shows the particular song total duration
      //adding t duration attribute which we will use below
      liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
    });
}

//playing particular song on click
function playingNow(){
  const allLiTags = ulTag.querySelectorAll("li");

  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector(".music-duration");
    //let's remove playing class from all other li expect the last one which is clicked
    if(allLiTags[j].classList.contains("playing")){
      allLiTags[j].classList.remove("playing");
      //let's get that audio duration value and pass to .audio-duration innertext
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration; //passing t-duration value to audio duration innerText
    }
    //if there is an li tag which-index is equal to the musicIndex
    //then this music is playing now and we will style it
    if(allLiTags[j].getAttribute("li-index") == musicIndex){
      allLiTags[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    //adding onclick attribute in all li tags
    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
  
}
//playing song on the click of li
function clicked(element){
  //getting li index of a particular clicked li tag
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //passing that Liindex to musicIndex
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}