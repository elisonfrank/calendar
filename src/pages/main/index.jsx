import React, { Component } from "react";
import Calendar from "../../components/Calendar/index";
import Notes from "../../components/Notes/index";
import Editer from "../../components/Notes/Editer/editer";
import api from "../../services/api";

class Main extends Component {
  state = {
    searchDate: new Date(Date.now()),
    areNotesShowing: true,
    isEditerEnabled: false,
    isCheckboxDeleteEnabled: false,
    couldDeleteNote: false,
    data: [],
  };

  componentDidMount() {
    this.loadCalendar(this.state.searchDate);
  }

  setProp = (key) => {
    this.setState(key);
  };

  loadCalendar = async (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const response = await api.get(`/calendar?month=${month}&year=${year}`);
    this.setState({ searchDate: date, data: response.data });
  };

  handleClickNewNote = () => {
    this.setState({ isEditerEnabled: true });
  };

  handleClickDeleteNote = () => {
    this.setState({
      isCheckboxDeleteEnabled: !this.state.isCheckboxDeleteEnabled,
    });
  };

  handleClickSaveNote = () => {
    //faz coisa aqui
    this.setState({ isEditerEnabled: false });
  };

  handleClickCancelNote = () => {
    this.setState({ isEditerEnabled: false });
  };

  handleClickShowNote = () => {
    this.setState({ areNotesShowing: !this.state.areNotesShowing });
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
          onClickNew={this.handleClickNewNote}
        ></Calendar>
        <Notes
          searchDate={this.state.searchDate}
          isCheckboxDeleteEnabled={this.state.isCheckboxDeleteEnabled}
          areNotesShowing={this.state.areNotesShowing}
          couldDeleteNote={this.state.couldDeleteNote}
          data={this.state.data}
          onClickNew={this.handleClickNewNote}
          onClickDelete={this.handleClickDeleteNote}
          onClickShowNotes={this.handleClickShowNote}
          setNoteCouldDelete={this.setNoteCouldDelete}
        ></Notes>
        <Editer
          isEditerEnabled={this.state.isEditerEnabled}
          onClickSave={this.handleClickSaveNote}
          onClickCancel={this.handleClickCancelNote}
        ></Editer>
      </div>
    );
  }
}

export default Main;
