import React from 'react'

function Note (props) {
  return (
        <div className="card text-dark bg-white mb-3 style-note">
            <div className="card-header">{props.head}</div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.content}</p>
            </div>
            <button
              class="btn btn-danger"
              onClick={() => props.onDelete(props.id)}>
              Delete
            </button>
        </div>
  )
}

export default Note
