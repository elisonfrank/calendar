import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./body.css";

import { Creators as NoteActions } from "../../../store/ducks/note";

const Body = ({ calendar, note, couldDeleteNote }) => {
  const couldShow = (currentValue) => {
    const currentDate = new Date(currentValue.date);
    return (
      currentDate.getMonth() === calendar.searchDate.getMonth() &&
      note.showing &&
      (currentValue.info.note !== "" || currentValue.info.holiday)
    );
  };

  const couldDelete = (currentValue) => {
    //couldDeleteNote(currentValue.info.note !== "");
    return currentValue.info.note !== "" && note.enableDeleteCheckbox;
  };

  return (
    <div className="body-note">
      {calendar.data.map((dateObj) => {
        if (couldShow(dateObj, calendar.searchDate, note.showing)) {
          const key = new Date(dateObj.date).toLocaleDateString("en-US");

          return (
            <React.Fragment key={key}>
              {couldDelete(dateObj) && <input type="checkbox"></input>}
              <div
                className={couldDelete(dateObj) ? "note-delete" : "note"}
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
};

const mapStateToProps = (state) => ({
  calendar: state.calendar,
  note: state.note,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(NoteActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Body);
