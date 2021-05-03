let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay=0;

let index_no=0;
let playing_song = false;

//create a audio Element
let track = document.createElement('audio');

//All songs list
let All_song =[
    {
        name: "No Guidance",
        path: "./music/Chris Brown - No Guidance (Audio) ft. Drake.mp3",
        img: "./img/chris_brown.jpg",
        singer: "Chris Brown ft Drake"
    },
    {
        name: "No Role Modelz",
        path: "./music/j-cole-no-role-modelz-explicit.mp3",
        img: "./img/J_cole.jpg",
        singer: "J Cole"
    },
    {
        name: "ADHD",
        path: "./music/Joyner Lucas - ADHD (Lyrics).mp3",
        img: "./img/joyner.jpg",
        singer: "Joyner Lucas"
    },
    {
        name: "LOVE",
        path: "./music/kendrick-lamar-love-ft-zacari.mp3",
        img: "./img/kendrick_lamar.jpg",
        singer: "Kendrick Lamar"
    }
];

//All function

//fucntion load the track
function load_track(index_no){
    clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider, 1000);
}
load_track(index_no);

//mute sound
function mute_sound(){
    track.volume =0;
    volume.value =0;
    volume_show.innerHTML =0;
}

//reset song slider
function reset_slider(){
    slider.value = 0;
}

//cheching the song is palying or not
function justplay(){
    if(playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}

//Play song
function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
}
playsong();

//Pause song
function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>';
}

//next song
function next_song(){
    if(index_no < All_song.length -1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

//previous song
function previous_song(){
    if(index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
}

//change the volume
function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

//change slider position
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

//autoplay function
function autoplay_switch(){
    if(autoplay==1){
        autoplay=0;
        autoplay.style.background = "rgba(255,255,255,0.2)";
    }else{
        autoplay =1;
        auto_play.style.background = "#FF8A65";
    }
}

function range_slider(){
    let position =0;

    //update slider position
    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }
    //function will run when the song is over
    if(track.ended){
        play.innerHTML = '<i class= "fa fa-play"></i>';
        if(autoplay==1){
            index_no += 1;
            load_track(index_no);
            playsong();

        }
    }

}