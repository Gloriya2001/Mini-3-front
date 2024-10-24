import React from 'react'

const AdminNavbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-secondary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/adminDashboard">Admin</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/adminOrders">Orders</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/addProduct">Add Product</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/ViewProduct">View Product</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/viewDoctor">Doctor Details</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/viewTech">Technician Details</a>
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

export default AdminNavbar;