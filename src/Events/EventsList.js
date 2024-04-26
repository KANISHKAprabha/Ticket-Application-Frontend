import React from 'react'
import  { useEffect, useState, useRef } from "react";
import EventsCreate from './EventsForm';

function EventsList() {
    const [events, setEvent] = useState([]);
    const [ showEventForm,setShowEventForm]= useState(false)
   

  useEffect(() => {
    getEvents();
  }, []);

  const handleShowForm =()=>{
    setShowEventForm(true)
  }


  let getEvents = async () => {
    try {
      let data = await fetch("http://127.0.0.1:8000/events/");
      console.log(data);
      let res = await data.json();
      console.log(res);
      setEvent(res);
    } catch (err) {
      console.log(err);
    }
  };
  // const [file, setFile] = useState();
  // const fileInputRef = useRef(null);
  // console.log(fileInputRef);

  // const handleImageClick = () => {
  //   // Trigger click on the hidden file input
  //   fileInputRef.current.click();
  //   console.log(fileInputRef.current.click());
  // };

  // const handleFileChange = (e) => {
   
  //       setFile(URL.createObjectURL(e.target.files[0]));
  // }
  return (
    <>
      <h2>Event List</h2>
      <button
        type="button"
        onClick={handleShowForm}
        className="btn btn-primary me-2"
      >
        Create
      </button>
      {showEventForm && <EventsCreate/>}

      
      <button
        type="button"
        onClick={() => getEvents()}
        className="btn btn-primary me-2"
      >
        Refresh
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Event description</th>
            <th>Event Venue</th>
            <th>Event start date</th>
            <th>Event end date</th>
            <th>Event image</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => {
            return (
              <>
                <tr key={index}>
                  <td>{event.id}</td>
                  <td>{event.event_name}</td>
                  <td>{event.event_description}</td>
                  <td>{event.event_venue}</td>
                  <td>{event.event_start_date}</td>
                  <td>{event.event_end_date}</td>
                  <td >
                  <img
                    src={event.event_image}
                    className="event-img"
                    style={{ display: "none" }}
                    
                    
                    
                  />
                  
                  </td>
                  <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
  }

 

export default EventsList