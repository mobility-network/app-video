import React, { useState } from 'react'
import Header from './Header'
import Note from './Note'
import Footer from './Footer'
import Input from './Input'
import Video from './Video'
import Load from './Load'
import '../scss/index.css'
import '../scss/style.css'

function App () {
  const [notes, setNotes] = useState([]);
  const [url, setURL] = useState("")

  function loadVideo(url) {
    setURL(URL.createObjectURL(url));
  }

  function addNote(note) {
    setNotes(prevNotes => [...prevNotes, note])
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((item, index) =>  index !== id)
    })
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
              />
            </div>
            <div className="pnl-input p-3 my-auto">
              <Input 
                onAdd={addNote}
              />
            </div>
            <div className="pnl-list p-3 bg-primary">
              {notes.map((note, index) => (
                <Note
                  key={index}
                  id = {index}
                  head={index+1}
                  title={note.title}
                  content={note.content}
                  onDelete={deleteNote}
                />
              ))}
            </div>
        </div>
  )
}

export default App
