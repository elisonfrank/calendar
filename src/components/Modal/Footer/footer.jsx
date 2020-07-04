import React from "react";
import "./footer.css";

const Footer = ({ toSave, toCancel, toConfirm, Ok, onCancel }) => {
  return (
    <div className="modal-footer">
      {toSave && <button className="btn-modal-save">Save</button>}
      {toCancel && (
        <button className="btn-modal-cancel" onClick={onCancel}>
          Cancel
        </button>
      )}
      {toConfirm && <button className="btn-modal-confirm">Confirm</button>}
      {Ok && <button className="btn-modal-ok">OK</button>}
    </div>
  );
};

export default Footer;
