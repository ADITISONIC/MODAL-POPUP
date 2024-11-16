import { useState } from "react";
import Modal from "./modal";

export default function ModalTest() {
  const [showModalPopup, setModalPopup] = useState(false);
  function handleToggleModalPopup() {
    setModalPopup(!showModalPopup);
  }
  function showclose(){
    setModalPopup(!showModalPopup)
  }
  return (
    <div>
      <button onClick={handleToggleModalPopup}>Open Modal Popup</button>
      {showModalPopup && <Modal onclose={showclose} body={<div>Customized body</div>} />}
    </div>
  );
}
