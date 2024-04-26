import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom bos-shadow py-3 mb-3">
  <a className="navbar-brand">Ticket Management System </a>


  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span Name="sr-only"></span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/events">Events</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/tickets">Tickets</Link>
      </li>
     
    </ul>
   
  </div>
</nav>
  )
}


export default Navbar

