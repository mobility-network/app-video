import React, { useRef, useState } from 'react'

function Video (props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
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

function setTime() {
  setVideoTime(videoRef.current.currentTime)
}

  return (
        <div className="card text-white bg-secondary mx-auto">
          <video ref={videoRef} className="mx-auto" src={props.url}></video>
          <button onClick={togglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <p className='mx-auto'>{videoTime}</p>
        </div>
  )
}

export default Video
