import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EventDetailsModal = ({ event, isOpen, onClose }) => {

  if (!isOpen || !event) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm "
      id="my-modal"
    >
      <div
        className="relative bg-white rounded-lg shadow-lg border border-black w-full max-w-[1102px] h-[711px] mx-4 p-6"
        style={{ borderRadius: "25px" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute"
          style={{
            top: "29px",
            right: "27px",
            fontSize: "1.5rem",
            color: "black",
          }}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div className="grid grid-rows-2 gap-4">
            <img
              src={event.extendedProps.eventImageOneUrl}
              alt="Event Image 1"
              className="rounded-lg"
              style={{ width: "452px", height: "293px" }}
            />
            <img
              src={event.extendedProps.eventImageTwoUrl}
              alt="Event Image 2"
              className="rounded-lg"
              style={{ width: "452px", height: "293px" }}
            />
          </div>

          <div className="text-lg flex flex-col items-center justify-center">
            <h2
              className="text-left font-bold text-gray-800 mb-10"
              style={{ fontSize: "30px" }}
            >
              {event.title}
            </h2>
            <div className="space-y-[17px]">
              <p
                className="text-left"
                style={{ fontSize: "25px", marginTop: "41px" }}
              >
                Date:{" "}
                {new Date(event.start).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-left" style={{ fontSize: "25px" }}>
                Day:{" "}
                {new Date(event.start).toLocaleDateString("en-GB", {
                  weekday: "long",
                })}
              </p>
              <p className="text-left" style={{ fontSize: "25px" }}>
                Description: {event.extendedProps.content}
              </p>
              <p className="text-left" style={{ fontSize: "25px" }}>
                Organized by: {event.extendedProps.organizedBy}
              </p>
              <a
                href={event.extendedProps.eventFileUrl}
                className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline"
                style={{ fontSize: "25px", marginTop: "20px" }}
              >
                View Event Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
