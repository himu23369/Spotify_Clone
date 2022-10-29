//Initialising the Variables
/* The Audio() constructor creates and returns a new HTMLAudioElement which can be either attached to a document for the user to interact with and/or listen to, or can be used offscreen to manage and play audio. */
let audioElement = new Audio('songs/1.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('progressBar');
let currentSong = Array.from(document.getElementsByClassName('songItem'));
let durationElapsed = document.getElementById('progressBar').value;

//Creating an array of songs
let songs = [
    { songName: "Teri Galliyan", filePath: "songs/1.mp3 ", coverPath: "images/galliyan.jpeg" },
    { songName: "Aaya na tu", filePath: "songs/2.mp3", coverPath: "images/aaya_na_tu.jpeg" },
    { songName: "Jo Tu Na Mila", filePath: "songs/3.mp3", coverPath: "images/Jo_Tu_Na_Mila.jpg" },
    { songName: "Kesariya", filePath: "songs/4.mp3", coverPath: "images/Kesariya.jpeg" },
    { songName: "Naaja", filePath: "songs/5.mp3", coverPath: "images/naaja.jpeg" },
    { songName: "Tujhe Kitna Chahne Lage", filePath: "songs/6.mp3", coverPath: "images/tujhe_kitna_chahne_lage.jpeg" },
    { songName: "Tum mile", filePath: "songs/7.mp3", coverPath: "images/tum_mile.jpeg" }
]

currentSong.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("nameSong")[0].innerText = songs[i].songName;
})

//Listening to events
audioElement.addEventListener('timeupdate', () => {
    //Seekbar Updation
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

//Working with Play/Pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        document.body.style.backgroundImage = 'url("gif/bg.gif")';
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        document.body.style.backgroundImage = 'url("images/backgd.avif")';
    }
})

let makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();

        songIndex = parseInt(e.target.id);

        if (audioElement.paused) {
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');

            audioElement.src = `songs/${songIndex}.mp3`;  //Look at this carefully
            audioElement.currentTime = 0;
            audioElement.play();

            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            document.body.style.backgroundImage = 'url("gif/bg.gif")';
        }

        else {
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');

            audioElement.src = `songs/${songIndex}.mp3`;  //Look at this carefully
            audioElement.currentTime = 0;
            audioElement.pause();

            masterPlay.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            document.body.style.backgroundImage = 'url("images/backgd.avif")';
        }
    })
})

document.getElementById("next").addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 1;
    }
    else {
        songIndex++;
    }
    audioElement.src = `songs/${songIndex}.mp3`;  //Look at this carefully
    audioElement.currentTime = 0;
    audioElement.play();
    document.body.style.backgroundImage = "url('gif/bg.gif')";

    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById("previous").addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 7;
    }
    else {
        songIndex--;
    }
    audioElement.src = `songs/${songIndex}.mp3`;  //Look at this carefully
    audioElement.currentTime = 0;
    audioElement.play();
    document.body.style.backgroundImage = "url('gif/bg.gif')";

    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

    // document.getElementById(songIndex).classList.remove('fa-play');
    // document.getElementById(songIndex).classList.add('fa-pause');
})