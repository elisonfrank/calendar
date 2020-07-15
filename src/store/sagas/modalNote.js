import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../services/api";
import { Types } from "../ducks/modalNote";
import { getCalendar } from "./calendar";

function apiPost(date, description) {
  return api.post(`/calendar/`, { date, description });
}

function apiPut(id, date, description) {
  return api.put(`/calendar/${id}`, { date, description });
}

function* postNote(action) {
  try {
    let response;
    if (!action.id) response = yield call(apiPost, action.date, action.note);
    else response = yield call(apiPut, action.id, action.date, action.note);

    if (response.data.error) {
      yield put({
        type: Types.FAILURE_SAVE_MODAL_NOTE,
        error: response.data.error,
      });
    } else {
      yield put({ type: Types.SUCCESS_SAVE_MODAL_NOTE });
      yield getCalendar(action);
    }
  } catch (error) {
    yield put({ type: Types.FAILURE_SAVE_MODAL_NOTE, error });
  }
}

export default function* modalNoteSaga() {
  yield takeLatest(Types.REQUEST_SAVE_MODAL_NOTE, postNote);
}
