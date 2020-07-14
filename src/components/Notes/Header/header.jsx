import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import { Creators as NoteActions } from "../../../store/ducks/note";

const Header = ({ note, toogleNote }) => {
  return (
    <div className="header-note">
      <span className="title-note">Notes</span>
      <button className="btn-expand" onClick={() => toogleNote(!note.showing)}>
        <FontAwesomeIcon icon={note.showing ? faAngleUp : faAngleDown} />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  note: state.note,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(NoteActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
