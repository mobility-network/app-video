import React, { useRef, useState } from 'react'

function Video (props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef('null');

function togglePlay() {
  if (isPlaying) {
    videoRef.current.pause();
  } else {
    videoRef.current.play();
    setInterval(setTime, 50);
  }
  setIsPlaying(!isPlaying);
}

function restartVid() {
  if (!isPlaying) {
    videoRef.current.currentTime = 0;
    setTime()
  }
}

function stepVid() {
  if (!isPlaying) {
    videoRef.current.currentTime += 0.05;
    setTime()
  }
}

function setTime() {
  props.onPlayback(videoRef.current.currentTime)
}

  return (
        <div className="card text-primary mx-auto">
          <video ref={videoRef} className="mx-auto" src={props.url}></video>
          <div className='card mx-auto'>
            <button className={isPlaying ? "btn btn-danger m-3" : "btn btn-success m-3"} onClick={togglePlay}> {isPlaying ? "Pause" : "Play"} </button>
            <div className="row w-100">
              <div className='col'>
                <button className={isPlaying ? "btn btn-danger m-3 w-100" : "btn btn-secondary m-3 w-100"} onClick={restartVid}>Restart</button>
              </div>
              <div className='col'>
                <button className={isPlaying ? "btn btn-danger m-3 w-100" : "btn btn-secondary m-3 w-100"} onClick={stepVid}>Last Frame</button>
              </div>
              <div className='col'>
                <button className={isPlaying ? "btn btn-danger m-3" : "btn btn-secondary m-3 w-100"} onClick={stepVid}>Next Frame</button>
              </div>
            </div>
            <p className='mx-auto'>{props.time.toFixed(3)}</p>
          </div>
        </div>
  )
}

export default Video
