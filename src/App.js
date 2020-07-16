import React, { Component } from "react";
import "./app.css";
import Main from "./pages/main/index";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Main></Main>
        </Provider>
      </div>
    );
  }
}
export default App;
