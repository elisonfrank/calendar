import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../services/api";
import { Types } from "../ducks/calendar";

function apiGet(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  return api.get(`/calendar?month=${month}&year=${year}`);
}

export function* getCalendar(action) {
  try {
    const response = yield call(apiGet, action.date);

    yield put({
      type: Types.SUCCESS_LOAD_CALENDAR,
      data: response.data,
    });
  } catch (error) {
    yield put({ type: Types.FAILURE_LOAD_CALENDAR, error });
  }
}

export default function* calendarSaga() {
  yield takeLatest(Types.REQUEST_LOAD_CALENDAR, getCalendar);
}
