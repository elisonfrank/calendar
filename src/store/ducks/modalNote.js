import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  toogleModalNote: ["showing", "id", "date", "note"],
  setDescriptionNote: ["description"],
  requestSaveModalNote: ["id", "date", "note"],
  successSaveModalNote: [],
  failureSaveModalNote: [],
});

const INITIAL_STATE = {
  showing: false,
  id: "",
  date: "",
  note: "",
  error: "",
};

const toogle = (state = INITIAL_STATE, action) => ({
  showing: action.showing,
  id: action.id,
  date: action.date,
  note: action.note,
});

const setDescriptionNote = (state = INITIAL_STATE, action) => {
  return { ...state, note: action.description };
};

const requestSaveModal = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    id: action.id,
    date: action.date,
    note: action.note,
  };
};

const successSaveModal = (state = INITIAL_STATE, action) => {
  console.log(action);
  return {
    state,
  };
};

const failureSaveModal = (state = INITIAL_STATE, action) => {
  console.log(action.error);
  alert(action.error);
  return {
    ...state,
    error: action.error,
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.TOOGLE_MODAL_NOTE]: toogle,
  [Types.SET_DESCRIPTION_NOTE]: setDescriptionNote,
  [Types.REQUEST_SAVE_MODAL_NOTE]: requestSaveModal,
  [Types.SUCCESS_SAVE_MODAL_NOTE]: successSaveModal,
  [Types.FAILURE_SAVE_MODAL_NOTE]: failureSaveModal,
});
