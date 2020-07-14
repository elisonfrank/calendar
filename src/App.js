import React, { Component } from "react";
import "./app.css";
import Main from "./pages/main/index";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as CalendarActions } from "./store/ducks/calendar";

class App extends Component {
  componentDidMount() {
    const { requestLoadCalendar, searchDate } = this.props;
    requestLoadCalendar(searchDate);
  }

  render() {
    return (
      <div className="App">
        <Main></Main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchDate: state.calendar.searchDate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CalendarActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
