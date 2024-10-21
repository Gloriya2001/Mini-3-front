import React from 'react'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Welcome</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/dashboard">My Account</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/profile">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/casemanage">Case Management</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              My Orders
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Placed</a></li>
              <li><a class="dropdown-item" href="#">Confirmed</a></li>
              <li><a class="dropdown-item" href="#">Work in Progress</a></li>
              <li><a class="dropdown-item" href="#">Delivered</a></li>
              <li><a class="dropdown-item" href="#">Cancelled</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar