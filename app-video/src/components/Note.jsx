import React from 'react'

function Note (props) {
  return (
        <div className="card text-white bg-secondary mb-3 style-note">
            <div className="card-header">{props.head}</div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.content}</p>
            </div>
        </div>
  )
}

export default Note
