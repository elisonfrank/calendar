import React, { Component } from "react";
import Calendar from "../../components/Calendar/index";
import Notes from "../../components/Notes/index";
import api from "../../services/api";

class Main extends Component {
  state = {
    searchDate: new Date(Date.now()),
    showNotes: true,
    modalNote: {
      show: false,
      id: "",
      date: "",
      note: "",
    },
    enableDeleteCheckbox: false,
    couldDeleteNote: false,
    data: [],
  };

  componentDidMount() {
    this.loadCalendar(this.state.searchDate);
  }

  loadCalendar = async (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const response = await api.get(`/calendar?month=${month}&year=${year}`);
    this.setState({ searchDate: date, data: response.data });
  };

  handleClickDay = (id, date, note) => {
    this.setState({
      modalNote: {
        show: true,
        id,
        date,
        note,
      },
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalNote: {
        show: false,
        id: "",
        date: "",
        note: "",
      },
    });
  };

  handleSaveModal = async (id, date, description) => {
    let res;

    if (!id) {
      res = await api.post(`/calendar/`, { date, description });
    } else {
      res = await api.put(`/calendar/${id}`, { date, description });
    }

    if (res.data.error) {
      console.log(res.data.error);
      alert(res.data.error);
    } else {
      this.handleCloseModal();
      this.loadCalendar(this.state.searchDate);
    }
  };

  handleClickDeleteNote = () => {
    this.setState({
      enableDeleteCheckbox: !this.state.enableDeleteCheckbox,
    });
  };

  handleClickShowNote = () => {
    this.setState({ showNotes: !this.state.showNotes });
  };

  handleChangeValueTextArea = (e) => {
    this.setState({
      modalNote: {
        show: this.state.modalNote.show,
        id: this.state.modalNote.id,
        date: this.state.modalNote.date,
        note: e.target.value,
      },
    });
  };

  setNoteCouldDelete = () => {
    if (!this.state.couldDeleteNote) this.setState({ couldDeleteNote: true });
  };

  render() {
    return (
      <div className="container">
        <Calendar
          searchDate={this.state.searchDate}
          data={this.state.data}
          load={this.loadCalendar}
          onDayClick={this.handleClickDay}
          modalNote={this.state.modalNote}
          onCloseModal={this.handleCloseModal}
          onSaveModal={this.handleSaveModal}
          onChangeValueTextArea={this.handleChangeValueTextArea}
        ></Calendar>
        <Notes
          searchDate={this.state.searchDate}
          data={this.state.data}
          enableDeleteCheckbox={this.state.enableDeleteCheckbox}
          showNotes={this.state.showNotes}
          onClickNew={this.handleClickNewNote}
          onClickDelete={this.handleClickDeleteNote}
          onClickShow={this.handleClickShowNote}
          couldDeleteNote={this.state.couldDeleteNote}
          setNoteCouldDelete={this.setNoteCouldDelete}
        ></Notes>
      </div>
    );
  }
}

export default Main;
