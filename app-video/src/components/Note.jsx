import React from 'react'

function Note (props) {
  return (
        <div className="card text-white bg-primary mb-3 style-note">
            <div className="card-header">{props.head.toFixed(3)}</div>
            <div className="card-body">
                <h6 className="card-title">{props.title}</h6>
            </div>
            <div className="row">
              <div className="col">
                <button
                  class="btn btn-sm btn-secondary w-100"
                  onClick={() => props.onView(props.id)}>
                  View
                </button>
              </div>
              <div className="col">
                <button
                  class="btn btn-sm btn-danger w-100"
                  onClick={() => props.onDelete(props.id)}>
                  Delete
                </button>
              </div>
            </div>
        </div>
  )
}

export default Note
