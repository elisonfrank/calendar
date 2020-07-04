import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const Header = ({ title, closeModal }) => {
  return (
    <div className="modal-header">
      {title && <label>{title}</label>}
      <button className="btn-close-modal" onClick={closeModal}>
        <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default Header;
