import React from "react";
import Calendar from "../../components/Calendar/index";
import Notes from "../../components/Notes/index";

const Main = () => {
  // handleChangeValueTextArea = (e) => {
  //   this.setState({
  //     modalNote: {
  //       show: this.state.modalNote.show,
  //       id: this.state.modalNote.id,
  //       date: this.state.modalNote.date,
  //       note: e.target.value,
  //     },
  //   });
  // };

  return (
    <div className="container">
      <Calendar
      // onChangeValueTextArea={this.handleChangeValueTextArea}
      ></Calendar>
      <Notes></Notes>
    </div>
  );
};

export default Main;
