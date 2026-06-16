import React, { useEffect, useState } from "react";
import { eventregister, getevent } from "../services/api";
import { useLocation } from "react-router-dom";

function EventDetailsPage() {

  const {search}= useLocation()
  const queryParams= new URLSearchParams(search)
  const id= queryParams.get('id')
  const [event, setevent] = useState([])
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");

  async function fetchevent(){
    let response = await getevent(id)
    // console.log(response)
    setevent(response.data)
    setRegistered(response.data.is_registered)
  }
  async function registerevent(id) {
    try{
      let response = await eventregister(id)
      if(response.status === 201) {
        setRegistered(true)
      }
    }
    catch (error){
      setError(error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong")
    }
  }

  useEffect(()=>{fetchevent()},[])

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f7fafc" }}>
      <div className="container">
        {/* Loading State */}
        <div className="d-none text-center py-5">
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#1a365d" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3 mb-0">Loading event details...</p>
        </div>

        {/* Error State */}
        <div
          className={`alert alert-danger text-center py-4 ${error ? "" : 'd-none'}`}
          role="alert"
          style={{
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#fed7d7",
            color: "#c53030",
          }}
        >
          <h5 className="fw-bold mb-2">Registration Failed.</h5>
          <p className="mb-0">{error}.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            {/* Card */}
            <div
              className="card border-0 overflow-hidden"
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Banner */}
              <div
                style={{
                  height: "280px",
                  background:
                    "linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #4299e1 100%)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "2rem",
                  color: "#fff",
                }}
              >
                <div>
                  <span
                    className="badge mb-2 px-3 py-2"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.18)",
                      borderRadius: "999px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Conference
                  </span>
                  <h1 className="fw-bold mb-0" style={{ fontSize: "2.4rem" }}>
                    {event.title}
                  </h1>
                </div>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {/* Success Alert Placeholder */}
                {registered && (
                <div
                  className="alert alert-success mb-4"
                  role="alert"
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#c6f6d5",
                    color: "#22543d",
                  }}
                >
                  ✓ You have successfully registered for this event.
                </div>
              )}

                <div className="row g-4">
                  <div className="col-12 col-md-8">
                    <h4 className="fw-bold mb-3" style={{ color: "#1a365d" }}>
                      About this event
                    </h4>
                    <p
                      className="text-muted mb-4"
                      style={{ fontSize: "0.98rem", lineHeight: 1.7 }}
                    >
                      {event.description}
                    </p>
                  </div>

                  <div className="col-12 col-md-4">
                    <div
                      className="p-4"
                      style={{
                        backgroundColor: "#f7fafc",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="mb-3">
                        <div
                          className="text-uppercase fw-medium mb-1"
                          style={{
                            fontSize: "0.72rem",
                            color: "#718096",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Date
                        </div>
                        <div className="fw-medium" style={{ color: "#1a365d" }}>
                          🗓️{event.date?.slice(0,10)}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div
                          className="text-uppercase fw-medium mb-1"
                          style={{
                            fontSize: "0.72rem",
                            color: "#718096",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Time
                        </div>
                        <div className="fw-medium" style={{ color: "#1a365d" }}>
                          🕒{event.date?.slice(11,19)}
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-uppercase fw-medium mb-1"
                          style={{
                            fontSize: "0.72rem",
                            color: "#718096",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Location
                        </div>
                        <div className="fw-medium" style={{ color: "#1a365d" }}>
                          📍{event.location}
                        </div>
                      </div>
                    </div>

                    {/* Register Button */}
                    {registered ?(<></>):(  
                    <div className="d-grid mt-3">
                      <button
                        className="btn btn-lg text-white"
                        style={{
                          backgroundColor: "#1a365d",
                          borderColor: "#1a365d",
                          borderRadius: "10px",
                          fontWeight: 500,
                          padding: "0.85rem",
                        }}
                        onClick={()=>registerevent(event.id)}
                      >
                        Register Now
                      </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
