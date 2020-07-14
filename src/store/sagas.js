import { takeLatest, put, call } from "redux-saga/effects";
import api from "../services/api";
import { Types as CalendarTypes } from "./ducks/calendar";
import { Types as ModalNoteTypes } from "./ducks/modalNote";

function apiGet(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  return api.get(`/calendar?month=${month}&year=${year}`);
}

function apiPost(date, description) {
  return api.post(`/calendar/`, { date, description });
}

function apiPut(id, date, description) {
  return api.put(`/calendar/${id}`, { date, description });
}

function* getCalendar(action) {
  try {
    const response = yield call(apiGet, action.date);

    yield put({
      type: CalendarTypes.SUCCESS_LOAD_CALENDAR,
      data: response.data,
    });
  } catch (error) {
    yield put({ type: CalendarTypes.FAILURE_LOAD_CALENDAR, error });
  }
}

function* postNote(action) {
  try {
    let response;
    if (!action.id) response = yield call(apiPost, action.date, action.note);
    else response = yield call(apiPut, action.id, action.date, action.note);

    if (response.data.error) {
      yield put({
        type: ModalNoteTypes.FAILURE_SAVE_MODAL_NOTE,
        error: response.data.error,
      });
    } else {
      yield put({ type: ModalNoteTypes.SUCCESS_SAVE_MODAL_NOTE });
      yield getCalendar(action);
    }
  } catch (error) {
    yield put({ type: ModalNoteTypes.FAILURE_SAVE_MODAL_NOTE, error });
  }
}

function* actionWatcher() {
  yield takeLatest(CalendarTypes.REQUEST_LOAD_CALENDAR, getCalendar);
  yield takeLatest(ModalNoteTypes.REQUEST_SAVE_MODAL_NOTE, postNote);
}

export default function* rootSaga() {
  yield actionWatcher();
}
