import React, { useEffect, useState } from "react";
import { getregisterations } from "../services/api";
import { useNavigate } from "react-router-dom";

function MyRegistrationsPage() {

  const [events, setevents]= useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function fetchevents() {
    try {
      setLoading(true)
      setError("")
      let response = await getregisterations()
      console.log(response.data)
      setevents(response.data)
    } catch (error) {
      setError(
        error.response?.data?.error || error.response?.data?.message || "Unable to load registrations"
      )
    } finally {
      setLoading(false);
    }
  }

  function details(id){
    navigate(`/eventdetails?id=${id}`)
  }

  useEffect(()=>{fetchevents()},[])
  
  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f7fafc" }}>
      <div className="container py-3">
        <div className="mb-4">
          <h2 className="fw-bold mb-1" style={{ color: "#1a365d" }}>
            My Registrations
          </h2>
          <p className="text-muted mb-0">
            Events you have signed up for
          </p>
        </div>

        {/* Loading State */}
        {loading && (
        <div className="text-center py-5">
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#1a365d" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3 mb-0">Loading your registrations...</p>
        </div>
        )}
        {/* Error State */}
        {error && (
        <div
          className="alert alert-danger text-center py-4"
          role="alert"
          style={{
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#fed7d7",
            color: "#c53030",
          }}
        >
          <h5 className="fw-bold mb-2">Unable to load registrations</h5>
          <p className="mb-3">{error}</p>
          <button
            className="btn"
            style={{
              backgroundColor: "#c53030",
              color: "#fff",
              borderRadius: "8px",
            }}
            onClick={fetchevents}
          >
            Retry
          </button>
        </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && !error && (
        <div
          className="text-center py-5 card border-0"
          style={{
            borderRadius: "16px",
            boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
          }}
        >
          <div className="card-body py-5">
            <div
              style={{
                fontSize: "3rem",
                color: "#cbd5e0",
                marginBottom: "0.5rem",
              }}
            >
              🎫
            </div>
            <h5 className="fw-bold mb-2" style={{ color: "#1a365d" }}>
              No registrations yet
            </h5>
            <p className="text-muted mb-3">
              Browse events and register to see them here.
            </p>
          </div>
        </div>
      )}

        {/* Registrations Grid */}
        <div className="row g-4">
          {events.map((i) => (
            <div className="col-12 col-md-6 col-lg-4" key={i}>
              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "14px",
                  boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
                }}
              >
                <div className="card-body p-4">
                  <span
                    className="badge mb-2"
                    style={{
                      backgroundColor: "#c6f6d5",
                      color: "#22543d",
                      fontWeight: 500,
                    }}
                  >
                    Registered
                  </span>
                  <h5 className="fw-bold mb-3" style={{ color: "#1a365d" }}>
                    {i.event.title}
                  </h5>

                  <div className="mb-2 d-flex align-items-center">
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#718096",
                        width: "90px",
                      }}
                    >
                      Date
                    </span>
                    <span
                      className="fw-medium"
                      style={{ color: "#2d3748", fontSize: "0.9rem" }}
                    >
                      🗓️{i.event.date?.slice(0,10)}
                    </span>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#718096",
                        width: "90px",
                      }}
                    >
                      Location
                    </span>
                    <span
                      className="fw-medium"
                      style={{ color: "#2d3748", fontSize: "0.9rem" }}
                    >
                      📍{i.event.location}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#718096",
                        width: "90px",
                      }}
                    >
                      Signed up
                    </span>
                    <span
                      className="fw-medium"
                      style={{ color: "#2d3748", fontSize: "0.9rem" }}
                    >
                      {i.registered_at?.slice(0,10)}
                    </span>
                  </div>

                  <hr style={{ borderColor: "#edf2f7" }} />

                  <a
                    href="#"
                    className="text-decoration-none fw-medium"
                    style={{ color: "#1a365d", fontSize: "0.9rem" }}
                    onClick={()=>details(i.event.id)}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyRegistrationsPage;
