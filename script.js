function $(selector) {
    return document.querySelector(selector);
}

//Selecting all required selectors
const preview = $(".preview");
const playBtn = $(".play-pause");
const stop = $(".stop");
const player = $(".player");
const spinner = $(".audio-style");
const showMediaName = $(".togglebar .showname");

$("#fileInput").addEventListener("change", Player);

function Player() {
    let file = this.files[0];

    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
    spinner.style.animation = " spin .5s ease-in forwards infinite";

    console.log(playBtn.className);
    if (file.type.indexOf("mp3") > 0) {
        spinner.style.display = "block";
    } else {
        spinner.style.display = "none";
    }
    showMediaName.innerHTML = file.name;
    let fileReader = new FileReader();
    console.log(file);
    fileReader.onload = function(event) {
        let dataUrl = event.target.result;
        preview.src = dataUrl;
    };
    if (preview.src != "") fileReader.readAsDataURL(file);

    //$(".controls").style.bottom = "-100%";
}

function pausePlay() {
    if (playBtn.classList.contains("fa-pause")) {
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
        preview.pause();
        spinner.style.animation = "none";
    } else if (playBtn.classList.contains("fa-play")) {
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
        preview.play();
        spinner.style.animation = " spin .5s ease-in forwards infinite";
    }
}

function stopPlay() {
    preview.src = "";
    preview.duration = 0;
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
    spinner.style.display = "none";
    showMediaName.innerHTML = "";
}

playBtn.addEventListener("click", pausePlay);
stop.addEventListener("click", stopPlay);

$("video").addEventListener("click", function() {
    preview.pause();
});
//if (preview.src == "")