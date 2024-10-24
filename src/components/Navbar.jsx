import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-info">
    <div class="container-fluid">
      <a class="navbar-brand" href="/doctorDashboard">Dent-Tech</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
      
          <li class="nav-item">
            <Link class="nav-link" to="/profile">Profile</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/casemanage">Case Management</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/doctororders">My Orders</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/">Log Out</Link>
          </li>
         
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar