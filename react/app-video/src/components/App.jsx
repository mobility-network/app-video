import React, { useState } from 'react'
import Header from './Header'
import Note from './Note'
import CurrentNote from './CurrentNote'
import Input from './Input'
import Video from './Video'
import Load from './Load'
import '../scss/index.css'
import '../scss/style.css'

function App () {
  const [notes, setNotes] = useState([]);
  const [url, setURL] = useState("")
  const [videoTime, setVideoTime] = useState(0);
  const [currentNote, setCurrentNote] = useState({content: "", title: "", time: 0});

  function loadVideo(url) {
    setURL(URL.createObjectURL(url));
  }
  function updateTime(time) {
    setVideoTime(time)
  }

  function addNote(note) {
    setNotes(prevNotes => [...prevNotes, {...note, time: videoTime}])
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((item, index) =>  index !== id)
    })
  }

  function viewNote(id) {
    setCurrentNote(notes[id])
  }

  return (
        <div className='app-container'>
            <Header />
            <div className='pnl-load p-3 my-auto'>
              <Load
                onInput={loadVideo}
              />
            </div>
            <div className="pnl-video p-3 my-auto">
              <Video
                url={url}
                time={videoTime}
                onPlayback={updateTime}
              />
            </div>
            <div className="pnl-input p-3 my-auto">
              <Input 
                onAdd={addNote}
                time={videoTime}
              />
            </div>
            <div className="pnl-view p-3 my-auto">
              <CurrentNote
                head={currentNote.time}
                title={currentNote.title}
                content={currentNote.content}
              />
            </div>
            <div className="pnl-list p-3 bg-secondary">
              {notes.map((note, index) => (
                <Note
                  key={index}
                  id = {index}
                  head={note.time}
                  title={note.title}
                  content={note.content}
                  onDelete={deleteNote}
                  onView={viewNote}
                />
              ))}
            </div>
        </div>
  )
}

export default App
