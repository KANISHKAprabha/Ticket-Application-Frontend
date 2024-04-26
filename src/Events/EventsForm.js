import React from "react";
import { useEffect, useState, useRef } from "react";
import Events from "./Events";
import EventsList from "./EventsList";
import  { Link } from 'react-router-dom'

function EventsCreate() {
  const [events, setEvents] = useState({
    event_name: "",
    event_description: "",
    event_venue: "",
    event_start_date: "",
    event_end_date: "",
  });
  const [ showEventList,setShowEventList]= useState(false)

  useEffect(() => {
    const formattedSatrtDate = formatDateForInput(events.event_start_date);
    const formattedEndDate = formatDateForInput(events.event_end_date);
    setEvents((prevState) => ({
      ...prevState,
      event_start_date: formattedSatrtDate,
      event_end_date: formattedEndDate,
    }));
  }, []);
  const handleShowList =()=>{
    setShowEventList(true)
  }

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  console.log(fileInputRef);

  const handleImageClick = () => {
    // Trigger click on the hidden file input
    fileInputRef.current.click();
    console.log(fileInputRef.current.click());
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const timezoneOffset = date.getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60))
      .toString()
      .padStart(2, "0");
    const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60)
      .toString()
      .padStart(2, "0");
    const timezoneSign = timezoneOffset < 0 ? "+" : "-";

    return `${year}-${month}-${day}T${hours}:${minutes}${timezoneSign}${timezoneOffsetHours}:${timezoneOffsetMinutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("kanishka");

    try {
      const response = await fetch("http://127.0.0.1:8000/create/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(events),
      });
      if (response.ok) {
        console.log("done");
      } else {
        console.log(response.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChhange = (e) => {
    const { name, value } = e.target;
    setEvents((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Event Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <section className="add-contact p-3">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <p className="h3 text-sucess fw-bold">Create Event </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Event Name"
                        name="event_name"
                        value={events.event_name}
                        onChange={handleChhange}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Event Description"
                        name="event_description"
                        value={events.event_description}
                        onChange={handleChhange}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Event Venue"
                        name="event_venue"
                        value={events.event_venue}
                        onChange={handleChhange}
                      />
                      <div className="mb-2"></div>
                      <label>Event start Date</label>
                      <input
                        type="datetime-local"
                        placeholder="Event Start Date"
                        name="event_start_date"
                        value={events.event_start_date}
                        onChange={handleChhange}
                      />
                    </div>
                    <div className="mb-2">
                      <label>Event End Date</label>
                      <input
                        type="datetime-local"
                        placeholder="Event End Date"
                        name="event_end_date"
                        value={events.event_end_date}
                        onChange={handleChhange}
                      />
                    </div>

                    <div className="mb-2">
                      <p onClick={handleImageClick}> Choose file to upload</p>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        accept=".jpg, .jpeg, .png"
                        name="event_image"
                        value={events.event_image}
                      />
                      <img />
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-success"
                        onSubmit={handleSubmit}
                      />
                    </div>
                    
                    {/* <button type="button" className="btn btn-secondary me-2" onClick={handleShowList}>
                      Cancel
                    </button>
                    {showEventList && <EventsList/>} */}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </form>
    </>
  );
}

export default EventsCreate;
