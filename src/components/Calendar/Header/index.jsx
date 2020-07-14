import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-date-picker";
import "./index.css";

import { Creators as CalendarActions } from "../../../store/ducks/calendar";

const Header = ({ calendar, requestLoadCalendar, cols }) => {
  const week = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const ths = [];

  const handleChange = (date) => {
    requestLoadCalendar(date);
  };

  const handleBack = () => {
    const newDate = new Date(calendar.searchDate);
    newDate.setMonth(newDate.getMonth() - 1);
    requestLoadCalendar(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(calendar.searchDate);
    newDate.setMonth(newDate.getMonth() + 1);
    requestLoadCalendar(newDate);
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
          value={calendar.searchDate}
        />
        <button onClick={handleNext} className="next">
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </button>
      </div>
      <div className="thead-week">{ths}</div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  calendar: state.calendar,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CalendarActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
