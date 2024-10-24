import React from 'react'

const TechNavbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-success">
    <div class="container-fluid">
      <a class="navbar-brand" href="/technicianDashboard">Welcome</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/profile">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href='/techWorks'>Assigned Works</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default TechNavbar