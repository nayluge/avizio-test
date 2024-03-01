import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from 'react-modal';

Modal.setAppElement('#root');

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
        // Ici, vous pouvez traiter les informations de la réunion, par exemple les envoyer à un serveur
        console.log("Meeting Object:", meetingObject);
        console.log("Start Date:", selectedDateStart);
        console.log("End Date:", selectedDateEnd);
        setModalIsOpen(false); // Fermer la modal après la confirmation
    };

    const resetModal = () => {
        setMeetingObject("");
        setModalIsOpen(false); // Fermer la modal après la confirmation
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
                overlayClassName={'modal-overlay'}
            >
                <h2>Confirmation</h2>
                <p>You have selected a meeting between {selectedDateStart.toString()} and {selectedDateEnd.toString()}</p>
                <input
                    type="text"
                    placeholder="Meeting Object"
                    value={meetingObject}
                    onChange={(e) => setMeetingObject(e.target.value)}
                />
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={resetModal}>Cancel</button>
            </Modal>
        </div>
    );
};

export default CalendarComponent;
