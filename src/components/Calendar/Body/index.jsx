import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./index.css";

import { Creators as ModalNoteActions } from "../../../store/ducks/modalNote";

const Body = ({ calendar, modalNote, toogleModalNote, rows, cols }) => {
  let tds = [];
  let td;
  let position = 0;

  const renderToday = (id, date, note) => (
    <div
      key={date.toLocaleDateString("en-US")}
      className="day today"
      onClick={() => toogleModalNote(!modalNote.showing, id, date, note)}
    >
      <span className="number">{date.getDate()}</span>
    </div>
  );

  const renderBlocked = (date) => (
    <div key={date.toLocaleDateString("en-US")} className="day blocked">
      <span className="number">{date.getDate()}</span>
    </div>
  );

  const renderNormal = (id, date, note) => (
    <div
      className="day"
      key={date.toLocaleDateString("en-US")}
      onClick={() => toogleModalNote(!modalNote.showing, id, date, note)}
    >
      <span className="number">{date.getDate()}</span>
    </div>
  );

  for (var row = 0; row <= rows; row++) {
    for (var col = 0; col <= cols; col++) {
      const dateObj = calendar.data[position];
      if (!dateObj) continue;

      const date = dateObj && new Date(dateObj.date);

      if (dateObj.info.dayOfWeek === col) {
        position++;

        if (!dateObj.info.enabled) td = renderBlocked(date);
        else if (date.toDateString() === new Date(Date.now()).toDateString())
          td = renderToday(dateObj.info.noteid, date, dateObj.info.note);
        else td = renderNormal(dateObj.info.noteid, date, dateObj.info.note);
      } else td = <td></td>;

      tds.push(td);
    }
  }
  return (
    <div className="tbody">
      {tds.length === 0 ? <div className="not-found">No data found</div> : tds}
    </div>
  );
};

const mapStateToProps = (state) => ({
  calendar: state.calendar,
  modalNote: state.modalNote,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ModalNoteActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Body);
