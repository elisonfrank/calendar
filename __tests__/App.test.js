import React from "react";
import Main from "../src/pages/main";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";

const mockStore = configureStore();

const initialState = {
  calendar: {
    data: [],
    searchDate: new Date(Date.now()),
    loading: false,
    error: "",
  },
  note: {
    showing: true,
    enableDeleteCheckbox: false,
    couldDeleteNote: false,
  },
  modalNote: {
    showing: false,
    id: "",
    date: "",
    note: "",
    error: "",
  },
};

const store = mockStore(initialState);

describe("Testing App component", () => {
  it("should render correctly", () => {
    const wrapper = renderer
      .create(
        <Provider store={store}>
          <Main />
        </Provider>
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
