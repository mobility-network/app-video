import React from 'react'

function CurrentNote (props) {
  return (
        <div className="card text-white bg-secondary mb-3 style-current-note">
            <div className="card-header">{props.head.toFixed(3)}</div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.content}</p>
            </div>
        </div>
  )
}

export default CurrentNote
