import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const CalendarComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const [meetingObject, setMeetingObject] = useState("");

  const handleDateSelect = (arg) => {
    setSelectedDateStart(arg.start);
    setSelectedDateEnd(arg.end);
    setModalIsOpen(true);
  };

  const handleConfirm = () => {
    const meetingData = {
      meetingObject: meetingObject,
      startDate: selectedDateStart,
      endDate: selectedDateEnd,
    };

    // @todo : le baseurl passer cela en variable d'env
    axios
      .post("http://localhost:3001/create-meeting", meetingData)
      .then(function (response) {
        console.log(response.data);
        setModalIsOpen(false);
      })
      .catch(function (error) {
        console.log(error);
        //@todo: gestion des erreurs
        setModalIsOpen(false);
      });
  };

  const resetModal = () => {
    setMeetingObject("");
    setModalIsOpen(false);
  };

  return (
    <div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        select={handleDateSelect}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm your date"
        overlayClassName={"modal-overlay"}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            zIndex: 10000,
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <h2>Confirmation</h2>
        <p>
          You have selected a meeting between {selectedDateStart.toString()} and{" "}
          {selectedDateEnd.toString()}
        </p>
        <input
          type="text"
          placeholder="Meeting Object"
          value={meetingObject}
          onChange={(e) => setMeetingObject(e.target.value)}
        />
        <button onClick={handleConfirm} disabled={meetingObject.length < 5}>
          Confirm
        </button>
        <button onClick={resetModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
