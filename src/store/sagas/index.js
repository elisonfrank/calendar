import { fork, all } from "redux-saga/effects";

import calendarSaga from "./calendar";
import modalNoteSaga from "./modalNote";

export default function* rootSaga() {
  yield all(
    //[...Object.values(calendarSaga), ...Object.values(modalNoteSaga)].map(fork)
    [fork(calendarSaga), fork(modalNoteSaga)]
  );
}
