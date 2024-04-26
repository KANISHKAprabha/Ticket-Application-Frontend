import React, { useState } from "react";
import EventsList from "./EventsList";
import EventsForm from "./EventsForm";

function Events() {
  const [content, setContent] = useState(<EventsList showForm={showForm} />);

  function showList() {
    setContent(<EventsList showForm={showForm} />);
  }

  function showForm() {
    setContent(<EventsForm showList={showList} />);
  }

  return <>{content}</>;
}

export default Events;

