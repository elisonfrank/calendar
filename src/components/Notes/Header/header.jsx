import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => (
  <div className="header-note">
    <span className="title-note">Notes</span>
    <button className="btn-expand" onClick={props.onClickShowNotes}>
      <FontAwesomeIcon icon={props.areNotesShowing ? faAngleUp : faAngleDown} />
    </button>
  </div>
);

export default Header;
