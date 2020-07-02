import React, { Component } from "react";
import "./index.css";
import DatePicker from "react-date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

class Calendar extends Component {
  cols = 6;
  rows = 5;
  week = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  renderThead = () => {
    const ths = [];

    for (var i = 0; i <= this.cols; i++) {
      ths.push(
        <div className={"th" + this.week[i]} key={this.week[i]}>
          {this.week[i].substr(0, 3)}
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="thead-month">
          <button onClick={this.handleBack} className="back">
            <FontAwesomeIcon icon={faArrowCircleLeft} />
          </button>
          <DatePicker
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            className="month"
            maxDetail="year"
            onChange={this.handleChange}
            value={this.props.searchDate}
          />
          <button onClick={this.handleNext} className="next">
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        </div>
        <div className="thead-week">{ths}</div>
      </React.Fragment>
    );
  };

  renderToday = (date) => {
    return (
      <div
        key={date.toLocaleDateString("en-US")}
        id={date.toLocaleDateString("en-US")}
        className="day today"
        onClick={this.handleClickDay}
      >
        <span className="number">{date.getDate()}</span>
      </div>
    );
  };

  renderBlocked = (date) => {
    return (
      <div
        key={date.toLocaleDateString("en-US")}
        id={date.toLocaleDateString("en-US")}
        className="day blocked"
      >
        <span className="number">{date.getDate()}</span>
      </div>
    );
  };

  renderNormal = (date) => {
    return (
      <div
        className="day"
        key={date.toLocaleDateString("en-US")}
        id={date.toLocaleDateString("en-US")}
        onClick={this.handleClickDay}
      >
        <span className="number">{date.getDate()}</span>
      </div>
    );
  };

  renderTbody = () => {
    let tds = [];
    let td;
    let position = 0;

    for (var row = 0; row <= this.rows; row++) {
      for (var col = 0; col <= this.cols; col++) {
        const dateObj = this.props.data[position];
        if (!dateObj) continue;

        const date = dateObj && new Date(dateObj.date);

        if (dateObj.info.dayOfWeek === col) {
          position++;

          if (!dateObj.info.enabled) td = this.renderBlocked(date);
          else if (date.toDateString() === new Date(Date.now()).toDateString())
            td = this.renderToday(date);
          else td = this.renderNormal(date);
        } else td = <td></td>;

        tds.push(td);
      }
    }
    return (
      <div className="tbody">
        {tds.length === 0 ? (
          <div className="not-found">No data found</div>
        ) : (
          tds
        )}
      </div>
    );
  };

  handleChange = (date) => {
    this.props.load(date);
  };

  handleClickDay = (e) => {
    this.props.onClickNew();
  };

  handleBack = () => {
    const { searchDate } = this.props;
    const newDate = new Date(searchDate);
    newDate.setMonth(newDate.getMonth() - 1);
    this.props.load(newDate);
  };

  handleNext = (event) => {
    const { searchDate } = this.props;
    const newDate = new Date(searchDate);
    newDate.setMonth(newDate.getMonth() + 1);
    this.props.load(newDate);
  };

  render() {
    return (
      <div className="calendar">
        {this.renderThead()}
        {this.renderTbody()}
      </div>
    );
  }
}

export default Calendar;
