import React from "react";
import Calendar from "../../components/Calendar/index";
import Notes from "../../components/Notes/index";

const Main = () => {
  return (
    <div className="container">
      <Calendar></Calendar>
      <Notes></Notes>
    </div>
  );
};

export default Main;
