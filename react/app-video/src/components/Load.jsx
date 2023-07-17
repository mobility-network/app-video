import React from "react";

function Load(props) {
    function handleChange(event) {
        props.onInput(event.target.files[0])
    }

    return (
        <div className="card">
            <input className="m-3" type="file" accept="video/*" onChange={handleChange}/>
        </div>
    )
}

export default Load