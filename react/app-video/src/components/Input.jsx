import React, {useState} from "react";

function Input(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    
    function handleInput(event) {
        const {name, value} = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        });
    }

    function submitNote(event) {
        props.onAdd(note);

        event.preventDefault()
    }

    return (
        <div class="input-main card p-3 mx-auto">
            <form class="text-primary my-auto">
                <div class="mb-3">
                <label for="noteTime" class="form-label">Timestamp:</label>
                <input
                    id="noteTime" name="time" type="text" class="form-control text-primary"
                    disabled="disabled" value={props.time.toFixed(3)}/>
                </div>
                <div class="mb-3">
                    <label for="noteTitle" class="form-label">Title:</label>
                    <input
                        id="noteTitle" name="title" type="text" class="form-control text-primary"
                        onChange={handleInput} value={note.title} placeholder="Insert title here..."/>
                </div>
                <div class="mb-3">
                    <label for="noteContent" class="form-label">Annotation:</label>
                    <textarea
                        id="noteContnt" name="content" type="text" class="form-control text-primary"
                        onChange={handleInput} value={note.content} placeholder="Add note here..."/>
                </div>
                <button
                    class="btn btn-success"
                    onClick={submitNote}>
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default Input