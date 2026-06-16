import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { logoutuser } from '../services/api'

function Navbar({onlogout, islogin}) {
  const navigate = useNavigate()

  async function logout(){
  let response=await logoutuser()
  // console.log(response)
  localStorage.removeItem('token')
  localStorage.removeItem('refresh')
  onlogout()
  navigate('/')
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white border-bottom"
      style={{ borderColor: "#e2e8f0" }}
    >
      <div className="container">
        {/* Brand */}
        <a
          className="navbar-brand fw-bold fs-4"
          href="#"
          style={{ color: "#1a365d", letterSpacing: "-0.5px" }}
        >
          EventPlatform
        </a>

        {/* Hamburger Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ boxShadow: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {!islogin ? (
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button
                  className="btn btn-outline-primary btn-sm px-4"
                  style={{
                    color: "#1a365d",
                    borderColor: "#1a365d",
                    borderRadius: "8px",
                    fontWeight: 500,
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
            ) : (
              <>
              <li className="nav-item">
              <Link to ="/events">
              <a className="nav-link px-3 py-2 fw-semibold" href="#" style={{ color: "#1a365d" }}>Events</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link to ="/myregistrations">
              <a className="nav-link px-3 py-2 fw-semibold" href="#" style={{ color: "#1a365d" }}>Registrations</a>
              </Link>
            </li>
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button
                  className="btn btn-outline-danger btn-sm px-4"
                  style={{
                    borderRadius: "8px",
                    fontWeight: 500,
                  }}
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar