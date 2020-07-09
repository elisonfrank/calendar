import React from "react";
import "./body.css";

const couldShow = (currentValue, searchDate, showNotes) => {
  const currentDate = new Date(currentValue.date);
  return (
    currentDate.getMonth() === searchDate.getMonth() &&
    showNotes &&
    (currentValue.info.note !== "" || currentValue.info.holiday)
  );
};

const couldDelete = (
  currentValue,
  setNoteCouldDelete,
  enableDeleteCheckbox
) => {
  //if (currentValue.info.note !== "") setNoteCouldDelete();
  return currentValue.info.note !== "" && enableDeleteCheckbox;
};

const Body = ({
  data,
  searchDate,
  showNotes,
  setNoteCouldDelete,
  enableDeleteCheckbox,
}) => (
  <div className="body-note">
    {data.map((dateObj) => {
      if (couldShow(dateObj, searchDate, showNotes)) {
        const key = new Date(dateObj.date).toLocaleDateString("en-US");

        return (
          <React.Fragment key={key}>
            {couldDelete(dateObj, setNoteCouldDelete, enableDeleteCheckbox) && (
              <input type="checkbox"></input>
            )}
            <div
              className={
                couldDelete(dateObj, setNoteCouldDelete, enableDeleteCheckbox)
                  ? "note-delete"
                  : "note"
              }
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
