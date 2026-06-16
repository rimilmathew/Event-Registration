import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate= useNavigate()

  return (
    <div style={{ backgroundColor: "#f7fafc" }}>
      {/* HERO SECTION */}
      <section
        className="py-5"
        style={{
          background:
            "linear-gradient(135deg, #1a365d 0%, #2a4a7d 60%, #2c5282 100%)",
          color: "#fff",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span
                className="badge mb-3 px-3 py-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}
              >
                Discover · Register · Attend
              </span>

              <h1
                className="fw-bold mb-3"
                style={{ fontSize: "3rem", lineHeight: 1.15 }}
              >
                Find events worth showing up for.
              </h1>

              <p
                className="mb-4"
                style={{
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.85)",
                  maxWidth: "560px",
                }}
              >
                EventPlatform helps you discover conferences, workshops, and
                meetups, and register in seconds.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <button
                  className="btn btn-lg fw-medium text-white"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255,255,255,0.4)",
                    borderRadius: "10px",
                    padding: "0.75rem 1.5rem",
                  }}
                  onClick={()=>navigate('/register')}
                >
                  Create an Account
                </button>
              </div>
            </div>

            <div className="col-lg-5">
              <div
                className="p-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "16px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <h6
                  className="text-uppercase mb-3"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Upcoming Highlight
                </h6>

                <h4 className="fw-bold mb-2">Tech Summit 2026</h4>

                <p
                  className="mb-3"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.95rem",
                  }}
                >
                  A two-day summit bringing together engineers, designers and
                  founders.
                </p>

                <div
                  className="d-flex justify-content-between"
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <span>July 12 · 9:00 AM</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-5">
  <div className="container py-4">
    <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
      <div>
        <h2 className="fw-bold mb-1" style={{ color: "#1a365d" }}>
          Find Exciting Events for Every Interest
        </h2>
        <p className="text-muted mb-0">
          Explore different types of events and discover experiences that match
          your interests.
        </p>
      </div>

      <a
        href="/events"
        className="text-decoration-none fw-medium"
        style={{ color: "#1a365d" }}
      >
        Browse Events →
      </a>
    </div>

    <div className="row g-4">
      {[
        {
          title: "Technology Conferences",
          description:
            "Connect with developers, founders, and tech enthusiasts.",
          icon: "💻",
        },
        {
          title: "Workshops & Training",
          description:
            "Learn new skills through hands-on sessions and expert guidance.",
          icon: "🎓",
        },
        {
          title: "Networking Meetups",
          description:
            "Build meaningful professional relationships and collaborations.",
          icon: "🤝",
        },
      ].map((item, index) => (
        <div className="col-12 col-md-6 col-lg-4" key={index}>
          <div
            className="card border-0 h-100"
            style={{
              borderRadius: "14px",
              boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                height: "170px",
                fontSize: "4rem",
                background:
                  "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)",
              }}
            >
              {item.icon}
            </div>

            <div className="card-body p-4">
              <h5
                className="fw-bold mb-2"
                style={{ color: "#1a365d" }}
              >
                {item.title}
              </h5>

              <p
                className="text-muted mb-0"
                style={{ fontSize: "0.9rem" }}
              >
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}

export default LandingPage;