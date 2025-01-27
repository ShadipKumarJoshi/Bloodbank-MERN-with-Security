import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useRef, useState } from "react";
import { getAllEventsApi } from "../apis/Api";
import "../style/calendar.css";
import EventDetailsModal from "./SingleEvent";

const AllEvents = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [activeView, setActiveView] = useState("dayGridMonth");

  const fetchEvents = async () => {
    try {
      const response = await getAllEventsApi();
      const fetchedEvents = response.data.events.map((event) => ({
        id: event._id, 
        title: event.eventTitle,
        start: new Date(event.eventDate).toISOString(),
        extendedProps: {
          content: event.eventContent,
          organizedBy: event.organizedBy,
          eventFileUrl: event.eventFileUrl,
          eventImageOneUrl: event.eventImageOneUrl,
          eventImageTwoUrl: event.eventImageTwoUrl,
        },
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error Fetching Events", error);
      // Handle the error appropriately, e.g., display a message to the user
    }
  };

  useEffect(() => {
    fetchEvents();
    if (calendarRef.current) {
      setCurrentTitle(calendarRef.current.getApi().currentData.viewTitle);
    }
  }, []);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const renderEventContent = (eventInfo) => {
    return <div className="event-content">{eventInfo.event.title}</div>;
  };

  const handlePrevClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setCurrentTitle(calendarApi.currentData.viewTitle);
  };

  const handleNextClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setCurrentTitle(calendarApi.currentData.viewTitle);
  };

  const handleTodayClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
    setCurrentTitle(calendarApi.currentData.viewTitle);
  };

  const handleViewChange = (view) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view);
    setCurrentTitle(calendarApi.currentData.viewTitle);
    setActiveView(view);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="fc-toolbar">
        <div className="fc-button-group">
          <button className="fc-button" onClick={handleTodayClick}>
            Today
          </button>
          <button className="fc-button" onClick={handlePrevClick}>
            Back
          </button>
          <button className="fc-button" onClick={handleNextClick}>
            Next
          </button>
        </div>
        <div className="fc-toolbar-title">{currentTitle}</div>
        <div className="fc-button-group view-buttons">
          <button
            type="button"
            className={`fc-button ${
              activeView === "dayGridMonth" ? "fc-button-active" : ""
            }`}
            onClick={() => handleViewChange("dayGridMonth")}
          >
            Month
          </button>
          <button
            type="button"
            className={`fc-button ${
              activeView === "dayGridWeek" ? "fc-button-active" : ""
            }`}
            onClick={() => handleViewChange("dayGridWeek")}
          >
            Week
          </button>
          <button
            type="button"
            className={`fc-button ${
              activeView === "dayGridDay" ? "fc-button-active" : ""
            }`}
            onClick={() => handleViewChange("dayGridDay")}
          >
            Day
          </button>
        </div>
      </div>
      <div className="calendar-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          height="auto"
          eventContent={renderEventContent}
          headerToolbar={false}
          titleFormat={{ year: "numeric", month: "long" }}
          buttonText={{
            month: "Month",
            week: "Week",
            day: "Day",
          }}
          buttonIcons={false}
        />
      </div>
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default AllEvents;
