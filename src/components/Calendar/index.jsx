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
        <div className="th" key={this.week[i]}>
          {this.week[i].substr(0, 3)}
        </div>
      );
    }
    return (
      <div className="thead">
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
      </div>
    );
  };

  renderToday = (date) => {
    return (
      <div
        key={date.toLocaleDateString("en-US")}
        id={date.toLocaleDateString("en-US")}
        className="td today"
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
        className="td blocked"
      >
        <span className="number">{date.getDate()}</span>
      </div>
    );
  };

  renderNormal = (date) => {
    return (
      <div
        className="td"
        key={date.toLocaleDateString("en-US")}
        id={date.toLocaleDateString("en-US")}
        onClick={this.handleClickDay}
      >
        <span className="number">{date.getDate()}</span>
      </div>
    );
  };

  renderTbody = () => {
    const trs = [];
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
      if (tds.length > 0)
        trs.push(
          <div className="tr" key={row}>
            {tds}
          </div>
        );
      tds = [];
    }
    return (
      <div className="tbody">
        {trs.length === 0 ? <div class="not-found">No data found</div> : trs}
      </div>
    );
  };

  handleChange = (date) => {
    this.props.load(date);
  };

  handleClickDay = (e) => {
    //tem que cuidar se o click nao foi no span
    //alert(e.target.getAttribute("id"));
    //console.log(e.target.getAttribute("id"));
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
        <div className="table">
          {this.renderThead()}
          {this.renderTbody()}
        </div>
      </div>
    );
  }
}

export default Calendar;
