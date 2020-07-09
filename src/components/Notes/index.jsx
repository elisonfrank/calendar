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
            onClickShow={this.props.onClickShow}
            showNotes={this.props.showNotes}
          ></Header>
          <Body
            searchDate={this.props.searchDate}
            data={this.props.data}
            showNotes={this.props.showNotes}
            enableDeleteCheckbox={this.props.enableDeleteCheckbox}
            setNoteCouldDelete={this.props.setNoteCouldDelete}
          ></Body>
          <Footer
            enableDeleteCheckbox={this.props.enableDeleteCheckbox}
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
