import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  toogleNote: ["showing"],
  enableDeleteCheckboxNote: ["enable"],
  couldDeleteNote: ["could"],
});

const INITIAL_STATE = {
  showing: true,
  enableDeleteCheckbox: false,
  couldDeleteNote: false,
};

const toogle = (state = INITIAL_STATE, action) => ({
  ...state,
  showing: action.showing,
});

const enableCheckbox = (state = INITIAL_STATE, action) => ({
  ...state,
  enableDeleteCheckbox: action.enableDeleteCheckbox,
});

const couldDelete = (state = INITIAL_STATE, action) => ({
  ...state,
  couldDeleteNote: action.couldDeleteNote,
});

export default createReducer(INITIAL_STATE, {
  [Types.TOOGLE_NOTE]: toogle,
  [Types.ENABLE_DELETE_CHECKBOX_NOTE]: enableCheckbox,
  [Types.COULD_DELETE_NOTE]: couldDelete,
});
