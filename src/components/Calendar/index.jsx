import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./index.css";
import Modal from "../Modal/index";
import Header from "./Header/index";
import Body from "./Body/index";

import { Creators as ModalNoteActions } from "../../store/ducks/modalNote";

const cols = 6;
const rows = 5;

const Calendar = ({
  modalNote,
  toogleModalNote,
  requestSaveModalNote,
  setDescriptionNote,
}) =>
  // onChangeValueTextArea,
  {
    const handleChangeValueTextArea = (event) => {
      setDescriptionNote(event.target.value);
    };

    return (
      <div className="calendar">
        <Header cols={cols}></Header>
        <Body rows={rows} cols={cols}></Body>
        <Modal
          show={modalNote.showing}
          title={new Date(modalNote.date).toLocaleDateString()}
          toSave={true}
          toCancel={true}
          onClose={() => toogleModalNote(!modalNote.showing)}
          onSave={() =>
            requestSaveModalNote(modalNote.id, modalNote.date, modalNote.note)
          }
        >
          <textarea
            placeholder="Write a note..."
            defaultValue={modalNote.note}
            onChange={handleChangeValueTextArea}
          ></textarea>
        </Modal>
      </div>
    );
  };

const mapStateToProps = (state) => ({
  modalNote: state.modalNote,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ModalNoteActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
