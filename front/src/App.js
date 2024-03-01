import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Book a meeting with Cyril</h1>
      </header>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
      />
    </div>
  );
}

export default App;
