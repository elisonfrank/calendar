import React from "react";
import Body from "./Body/body";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import "./index.css";

const Modal = ({
  show,
  title,
  toSave,
  toCancel,
  toConfirm,
  Ok,
  handleCloseModal,
  children,
}) => {
  const showClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showClassName}>
      <section className="modal-main">
        <Header title={title} closeModal={handleCloseModal}></Header>
        <Body>{children}</Body>
        <Footer
          toSave={toSave}
          toCancel={toCancel}
          toConfirm={toConfirm}
          Ok={Ok}
          onCancel={handleCloseModal}
        ></Footer>
      </section>
    </div>
  );
};

export default Modal;
