import React from 'react'
import Header from './Header'
import Note from './Note'
import Footer from './Footer'
import notes from '../data'
import '../scss/index.css'
import '../scss/style.css'

function App () {
  return (
        <div>
            <Header />
            {notes.map(note => (
              <Note
                key={note.id}
                head={note.head}
                title={note.title}
                content={note.content}
              />
            ))}
            <Footer />
        </div>
  )
}

export default App
