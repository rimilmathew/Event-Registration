import React, { useEffect, useState } from "react";
import { eventsearch, getallevents } from "../services/api";
import { useNavigate } from "react-router-dom";

function EventsPage() {

  const [events, setevents] = useState([])
  const navigate = useNavigate()
  const [searchTerm, setsearchTerm] = useState("")
  const [isSearching, setisSearching] = useState(false)
  
  async function fetchallevents(){
    let event = await getallevents()
    // console.log(event.data)
    setevents(event.data)
  }

  function input(event){
    setsearchTerm(event.target.value)
  }

  async function searchevents(){
    let response = await eventsearch(searchTerm)
    // console.log(response.data)
    if (Array.isArray(response.data)) {
      setevents(response.data);
    } else {
      setevents([]);
    }
  }

  function details(id){
    navigate(`/eventdetails?id=${id}`)
  }
  
  useEffect(()=>{
    const delay = setTimeout(() => {
      if (searchTerm.trim() === ''){
        setisSearching(false);
        fetchallevents()
      } else {
        setisSearching(true);
        searchevents()
      }
    }, 600);
    return () => clearTimeout(delay)
  },[searchTerm])

  return (
    <div style={{ backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      {/* HERO SECTION */}
      <section
        className="py-4"
        style={{
          background:
            "linear-gradient(135deg, #1a365d 0%, #2a4a7d 60%, #2c5282 100%)",
          color: "#fff",
        }}
      >
        <div className="container py-3">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span
                className="badge mb-2 px-3 py-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: "999px",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                }}
              >
                Discover Events
              </span>

              <h1
                className="fw-bold mb-2"
                style={{
                  fontSize: "2.2rem",
                  lineHeight: 1.2,
                }}
              >
                Explore Events That Inspire You
              </h1>

              <p
                className="mb-0"
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.85)",
                  maxWidth: "520px",
                }}
              >
                Browse conferences, workshops, networking meetups, and more.
                Find the perfect event and register in just a few clicks.
              </p>
            </div>

            <div className="col-lg-4">
              <div
                className="p-3"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "14px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <h6
                  className="text-uppercase mb-2"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Event Directory
                </h6>

                <h5 className="fw-bold mb-2">100+ Events</h5>

                <p
                  className="mb-0"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.85rem",
                  }}
                >
                  Discover opportunities to learn, connect, and grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="py-4">
        <div className="container">
          {/* Heading */}
          <div className="text-center mb-4">
            <h3
              className="fw-bold mb-2"
              style={{ color: "#1a365d" }}
            >
              Browse All Events
            </h3>

            <p
              className="text-muted mb-0"
              style={{ fontSize: "0.95rem" }}
            >
              Search and discover events tailored to your interests.
            </p>
          </div>

          {/* Search */}
          <div className="row justify-content-center mb-4">
            <div className="col-lg-6">
              <div
                className="input-group"
                style={{
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <span
                  className="input-group-text"
                  style={{
                    backgroundColor: "#fff",
                    borderColor: "#e2e8f0",
                    borderRight: "none",
                  }}
                >
                  🔍
                </span>

                <input
                  type="text"
                  onChange={input}
                  className="form-control"
                  placeholder="Search events..."
                  style={{
                    borderColor: "#e2e8f0",
                    borderLeft: "none",
                    fontSize: "0.95rem",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Event Cards */}
          <div className="row g-3">
            {events.map((i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <div
                  className="card border-0 h-100"
                  style={{
                    borderRadius: "14px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "150px",
                      background:
                        "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.2rem",
                    }}
                  >
                    🎟️
                  </div>

                  <div className="card-body p-3 d-flex flex-column">

                    <h6
                      className="fw-bold mb-2"
                      style={{ color: "#1a365d" }}
                    >
                      {i.title}
                    </h6>

                    <p
                      className="text-muted mb-1"
                      style={{ fontSize: "0.85rem" }}
                    >
                      🗓️{i.date?.slice(0,10)}
                    </p>

                    <p
                      className="text-muted mb-3"
                      style={{ fontSize: "0.85rem" }}
                    >
                      📍{i.location}
                    </p>

                    <button
                      className="btn mt-auto text-white fw-medium"
                      style={{
                        backgroundColor: "#1a365d",
                        borderRadius: "8px",
                        padding: "0.55rem",
                        fontSize: "0.9rem",
                      }}
                      onClick={()=>details(i.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {isSearching && events.length === 0 && (
        <div className="text-center py-5">
          <h5 className="text-muted">No events found 😕</h5>
          <p className="text-muted">Try a different search keyword</p>
        </div>
      )}
    </div>
  );
}

export default EventsPage;