import React, { Component } from "react";
import "./index.css";
import Header from "./Header/header";
import Body from "./Body/body";
import Footer from "./Footer/footer";

class Notes extends Component {
  render() {
    if (this.props.data)
      return (
        <div className="notes">
          <Header
            onClickShowNotes={this.props.onClickShowNotes}
            areNotesShowing={this.props.areNotesShowing}
          ></Header>
          <Body
            searchDate={this.props.searchDate}
            data={this.props.data}
            areNotesShowing={this.props.areNotesShowing}
            isCheckboxDeleteEnabled={this.props.isCheckboxDeleteEnabled}
            setNoteCouldDelete={this.props.setNoteCouldDelete}
          ></Body>
          <Footer
            isCheckboxDeleteEnabled={this.props.isCheckboxDeleteEnabled}
            couldDeleteNote={this.props.couldDeleteNote}
            onClickNew={this.props.onClickNew}
            onClickDelete={this.props.onClickDelete}
          ></Footer>
        </div>
      );
    return null;
  }
}

export default Notes;
