import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  requestLoadCalendar: ["date"],
  successLoadCalendar: [],
  failureLoadCalendar: [],
});

const INITIAL_STATE = {
  data: [],
  searchDate: new Date(Date.now()),
  loading: false,
  error: "",
};

const request = (state = INITIAL_STATE, action) => ({
  ...state,
  searchDate: action.date,
  loading: true,
});

const success = (state = INITIAL_STATE, action) => ({
  ...state,
  data: action.data,
  loading: false,
  error: false,
});

const failure = (state = INITIAL_STATE, action) => ({
  data: [],
  loading: false,
  error: action.error,
});

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_LOAD_CALENDAR]: request,
  [Types.SUCCESS_LOAD_CALENDAR]: success,
  [Types.FAILURE_LOAD_CALENDAR]: failure,
});
