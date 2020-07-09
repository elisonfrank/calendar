import React from "react";
import "./index.css";
import DatePicker from "react-date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/index";

const cols = 6;
const rows = 5;
const week = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const renderThead = (searchDate, load) => {
  const ths = [];

  const handleChange = (date) => {
    load(date);
  };

  const handleBack = () => {
    const newDate = new Date(searchDate);
    newDate.setMonth(newDate.getMonth() - 1);
    load(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(searchDate);
    newDate.setMonth(newDate.getMonth() + 1);
    load(newDate);
  };

  for (var i = 0; i <= cols; i++) {
    ths.push(
      <div className={"th" + week[i]} key={week[i]}>
        {week[i].substr(0, 3)}
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="thead-month">
        <button onClick={handleBack} className="back">
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </button>
        <DatePicker
          monthPlaceholder="mm"
          yearPlaceholder="yyyy"
          className="month"
          maxDetail="year"
          onChange={handleChange}
          value={searchDate}
        />
        <button onClick={handleNext} className="next">
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </button>
      </div>
      <div className="thead-week">{ths}</div>
    </React.Fragment>
  );
};

const renderTbody = (data, onDayClick) => {
  let tds = [];
  let td;
  let position = 0;

  const renderToday = (id, date, note) => (
    <div
      key={date.toLocaleDateString("en-US")}
      className="day today"
      onClick={() => onDayClick(id, date, note)}
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
      onClick={() => onDayClick(id, date, note)}
    >
      <span className="number">{date.getDate()}</span>
    </div>
  );

  for (var row = 0; row <= rows; row++) {
    for (var col = 0; col <= cols; col++) {
      const dateObj = data[position];
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

const Calendar = ({
  searchDate,
  data,
  load,
  onDayClick,
  modalNote,
  onCloseModal,
  onSaveModal,
  onChangeValueTextArea,
}) => {
  return (
    <div className="calendar">
      {renderThead(searchDate, load)}
      {renderTbody(data, onDayClick)}
      <Modal
        show={modalNote.show}
        title={new Date(modalNote.date).toLocaleDateString()}
        toSave={true}
        toCancel={true}
        onClose={onCloseModal}
        onSave={() => onSaveModal(modalNote.id, modalNote.date, modalNote.note)}
      >
        <textarea
          placeholder="Write a note..."
          defaultValue={modalNote.note}
          onChange={onChangeValueTextArea}
        ></textarea>
      </Modal>
    </div>
  );
};

export default Calendar;
