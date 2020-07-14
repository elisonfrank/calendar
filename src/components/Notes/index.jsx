import React from "react";
import { connect } from "react-redux";
import "./index.css";
import Header from "./Header/header";
import Body from "./Body/body";
import Footer from "./Footer/footer";

const Notes = ({ calendar }) => {
  if (calendar.data)
    return (
      <div className="notes">
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
      </div>
    );
  return null;
};

const mapStateToProps = (state) => ({
  calendar: state.calendar,
});

export default connect(mapStateToProps)(Notes);
