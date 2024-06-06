const Time = document.getElementById("time");
const Video1 = document.getElementById("video-1");
const Video2 = document.getElementById("video-2");
const Video3 = document.getElementById("video-3");
const Video4 = document.getElementById("video-4");
const File1 = document.getElementById("file-1");
const File2 = document.getElementById("file-2");
const File3 = document.getElementById("file-3");
const File4 = document.getElementById("file-4");
const FramePrev1 = document.getElementById("frame-prev-1");
const FramePrev2 = document.getElementById("frame-prev-2");
const FramePrev3 = document.getElementById("frame-prev-3");
const FramePrev4 = document.getElementById("frame-prev-4");
const FrameNext1 = document.getElementById("frame-next-1");
const FrameNext2 = document.getElementById("frame-next-2");
const FrameNext3 = document.getElementById("frame-next-3");
const FrameNext4 = document.getElementById("frame-next-4");
const SyncVid1 = document.getElementById("sync-video-1");
const SyncVid2 = document.getElementById("sync-video-2");
const SyncVid3 = document.getElementById("sync-video-3");
const SyncVid4 = document.getElementById("sync-video-4");
const CtrlRestart = document.getElementById("ctrl-restart");
const CtrlPlay = document.getElementById("ctrl-play");
const CtrlFramePrev = document.getElementById("ctrl-frame-prev");
const CtrlFrameNext = document.getElementById("ctrl-frame-next");
const CardContainer = document.getElementById("list-cards");
const AddNote = document.getElementById("add-note");
const InputTime = document.getElementById("input-time");
const InputText = document.getElementById("input-text");
const ExportBtn = document.getElementById("export-notes");
const iconPlay  ="<span class='bi bi-play-fill'></span>";
const iconPause  ="<span class='bi bi-pause-fill'></span>";

const AppData = {
    dt: 1/30,
    numVid: 4,
    isPlaying: false,
    videoTime: 0,
    videoDOM: [Video1, Video2, Video3, Video4],
    videoLoaded: [false, false, false, false],
    videoStart: [0, 0, 0, 0],
    noteList: []
};

window.onload = function () {
    setVideoSize(360, 240);
    handleLoadVideo();
    // Set Video Sync Button Functions
    setVideoFrameControls();
    setVideoSyncControls();
    // Set Video Control Bar
    setVideoControlBar();
    // Set Add Note Controls
    setNoteInputs();
    // Add export button function
    ExportBtn.onclick = function () {
        console.log(AppData)
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(AppData)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'video-annotations.txt';
        a.click();
    }
}

function setVideoSize(width, height) {
    Video1.width = width;
    Video2.width = width;
    Video3.width = width;
    Video4.width = width;
    
    Video1.height = height;
    Video2.height = height;
    Video3.height = height;
    Video4.height = height;
}

function handleLoadVideo() {
    File1.onchange = e => { loadVideo(e, Video1, 0) };
    File2.onchange = e => { loadVideo(e, Video2, 1) };
    File3.onchange = e => { loadVideo(e, Video3, 2) };
    File4.onchange = e => { loadVideo(e, Video4, 3) };
}

function loadVideo(e, VideoDOM, i) {
    var file = e.target.files[0];
    var URL = window.URL || window.webkitURL 
    var fileURL = URL.createObjectURL(file)
    VideoDOM.src = fileURL;
    // Update AppData
    AppData.videoLoaded[i] = true;
    console.log(AppData.videoLoaded)
}

function setVideoFrameControls() {
    FrameNext1.onclick = function () { handleNextFrame(0) };
    FrameNext2.onclick = function () { handleNextFrame(1) };
    FrameNext3.onclick = function () { handleNextFrame(2) };
    FrameNext4.onclick = function () { handleNextFrame(3) };
    FramePrev1.onclick = function () { handlePreviousFrame(0) };
    FramePrev2.onclick = function () { handlePreviousFrame(1) };
    FramePrev3.onclick = function () { handlePreviousFrame(2) };
    FramePrev4.onclick = function () { handlePreviousFrame(3) };
}

function setVideoSyncControls() {
    SyncVid1.onclick = function () { handleSyncVideo(0) };
    SyncVid2.onclick = function () { handleSyncVideo(1) };
    SyncVid3.onclick = function () { handleSyncVideo(2) };
    SyncVid4.onclick = function () { handleSyncVideo(3) };
}

function setVideoControlBar() {
    CtrlRestart.onclick = function () {
        for (v=0; v<AppData.numVid; v++) {
            if (AppData.videoLoaded[v]) {
                AppData.videoDOM[v].currentTime = AppData.videoStart[v];
            }
        }     
    }

    CtrlPlay.onclick = function () {
        AppData.isPlaying = ~AppData.isPlaying;

        for (v=0; v<AppData.numVid; v++) {
            if (AppData.videoLoaded[v]) {
                if (AppData.isPlaying) {
                    AppData.videoDOM[v].play();
                } else {
                    AppData.videoDOM[v].pause();
                }
                handleVideoTimeUpdate(v);
            }
        }

        // Button Style
        if (AppData.isPlaying) {
            CtrlPlay.innerHTML = iconPause + "Pause";
            CtrlPlay.classList.remove("btn-success");
            CtrlPlay.classList.add("btn-danger");
        } else {
            CtrlPlay.innerHTML = iconPlay + "Play";
            CtrlPlay.classList.remove("btn-danger");
            CtrlPlay.classList.add("btn-success");
        }
    }

    CtrlFrameNext.onclick = function () {
        for (v=0; v<AppData.numVid; v++) {
            if (AppData.videoLoaded[v]) {
                handleNextFrame(v);
                handleVideoTimeUpdate(v);
            }
        }
    }
    
    CtrlFramePrev.onclick = function () {
        if (AppData.videoTime >= 0) {
            for (v=0; v<AppData.numVid; v++) {
                if (AppData.videoLoaded[v]) {
                    handlePreviousFrame(v);
                    handleVideoTimeUpdate(v);
                }
            }
        }
    }
}

function setNoteInputs() {
    AddNote.onclick = function () {
        let time = AppData.videoTime;
        let text = InputText.value;
        
        createCard(time, text)
        AppData.noteList.push({'time': time, 'text': text})
    }
}

function handleVideoTimeUpdate(idx) {
    AppData.videoTime = AppData.videoDOM[idx].currentTime - AppData.videoStart[idx];
    Time.innerHTML = AppData.videoTime.toFixed(2);
    InputTime.innerHTML = AppData.videoTime.toFixed(2);
}

function handleNextFrame(idx) {
    if ((AppData.videoDOM[idx].currentTime + AppData.dt) <= AppData.videoDOM[idx].duration) {
        AppData.videoDOM[idx].currentTime += AppData.dt;
    }
}

function handlePreviousFrame(idx) {
    if ((AppData.videoDOM[idx].currentTime - AppData.dt) >= 0) {
        AppData.videoDOM[idx].currentTime -= AppData.dt;
    }
}

function handleViewFrame(idx, frameTime) {
    AppData.videoDOM[idx].currentTime = AppData.videoStart[idx] + frameTime;
}

function handleSyncVideo(idx) {
    AppData.videoStart[idx] = AppData.videoDOM[idx].currentTime;
}

function createCard(time, text) {
    let card = document.createElement('div');
    let cardHeader = document.createElement('div');
    let cardBody = document.createElement('div');
    let cardBodyText = document.createElement('p');
    let btnCardView = document.createElement('button');
    let btnCardDel = document.createElement('button');
    let timeCard = document.createElement('p');

    card.className = 'card text-dark bg-light mx-1 display-card';
    cardHeader.className = 'card-header';
    cardBody.className = 'card-body';
    cardBodyText.className = 'card-text card-body-text';
    btnCardView.className = 'btn btn-sm btn-dark';
    btnCardDel.className = 'btn btn-sm btn-danger';
    timeCard.style.display = 'none';

    cardHeader.innerHTML = time.toFixed(2);
    cardBodyText.innerHTML = text;
    btnCardView.innerHTML = "View";
    btnCardDel.innerHTML = "Delete";
    timeCard.innerHTML = time;

    // Add card functionality
    btnCardDel.onclick = function () {
        this.parentElement.parentElement.remove();
    };

    btnCardView.onclick = function () {
        for (v=0; v<AppData.numVid; v++) {
            if (AppData.videoLoaded[v]) {
                handleViewFrame(v, time);
            }
        }
    }

    card.appendChild(cardHeader);
    cardBody.appendChild(cardBodyText);
    cardBody.appendChild(btnCardView);
    cardBody.appendChild(btnCardDel);
    card.appendChild(cardBody);
    CardContainer.appendChild(card);
}

