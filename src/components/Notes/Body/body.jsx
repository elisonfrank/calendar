import React from "react";
import "./body.css";

const couldShow = (currentValue, props) => {
  const currentDate = new Date(currentValue.date);
  return (
    currentDate.getMonth() === props.searchDate.getMonth() &&
    props.areNotesShowing &&
    (currentValue.info.note !== "" || currentValue.info.holiday)
  );
};

const couldDelete = (currentValue, props) => {
  if (currentValue.info.note !== "") props.setNoteCouldDelete();
  return currentValue.info.note !== "" && props.isCheckboxDeleteEnabled;
};

const Body = (props) => (
  <div className="body-note">
    {props.data.map((dateObj) => {
      if (couldShow(dateObj, props)) {
        const key = new Date(dateObj.date).toLocaleDateString("en-US");

        return (
          <React.Fragment key={key}>
            {couldDelete(dateObj, props) && <input type="checkbox"></input>}
            <div
              className={couldDelete(dateObj, props) ? "note-delete" : "note"}
              key={key}
            >
              <span>{key}</span>
              <p>{dateObj.info.note}</p>
              <span>
                {dateObj.info.holiday &&
                  "holiday: " + dateObj.info.holiday.name}
              </span>
            </div>
          </React.Fragment>
        );
      }
      return null;
    })}
  </div>
);

export default Body;
