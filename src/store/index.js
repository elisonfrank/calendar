import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import calendar from "./ducks/calendar";
import modalNote from "./ducks/modalNote";
import note from "./ducks/note";
import rootSaga from "./sagas/index";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ calendar, modalNote, note }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
