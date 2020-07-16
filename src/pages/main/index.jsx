import React, { Component } from "react";
import Calendar from "../../components/Calendar/index";
import Notes from "../../components/Notes/index";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as CalendarActions } from "../../store/ducks/calendar";

class Main extends Component {
  componentDidMount() {
    const { requestLoadCalendar, searchDate } = this.props;
    requestLoadCalendar(searchDate);
  }

  render() {
    return (
      <div className="container">
        <Calendar></Calendar>
        <Notes></Notes>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchDate: state.calendar.searchDate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CalendarActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
