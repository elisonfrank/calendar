import React from "react";
import "./editer.css";

const EditNotes = (props) => {
  if (props.isEditerEnabled) {
    return (
      <form className="editer" onSubmit={props.onClickSave}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            required
            pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
            placeholder="mm/dd/yyyy"
            autoFocus
          ></input>
        </div>
        <div>
          <label>Notes:</label>
          <textarea required></textarea>
        </div>
        <input type="submit" value="Save"></input>
        <button onClick={props.onClickCancel} type="button">
          Cancel
        </button>
      </form>
    );
  } else return null;
};

export default EditNotes;
