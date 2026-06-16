import React, { useState } from "react";
import { createuser } from "../services/api";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [user, setuser] = useState({name: '',email: '',password: ''});
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate=useNavigate()
  const [error, setError] = useState("")

  async function register(event) {
    event.preventDefault()
    try{
      let response = await createuser(user)
      // console.log(response)
      setError("")
      navigate('/login')
    }
    catch (error){
      setError(
      error.response?.data?.email || error.response?.data?.message || error.response?.data?.error || "Something went wrong")
    }
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = user.name.trim() !== "" && emailRegex.test(user.email) && 
    user.password.length >= 8 && user.password === confirmPassword;

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{ backgroundColor: "#f7fafc" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div
              className="card border-0"
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="card-body p-4 p-md-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <h2
                    className="fw-bold mb-2"
                    style={{ color: "#1a365d", fontSize: "1.75rem" }}
                  >
                    Create Account
                  </h2>
                  <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                    Join EventPlatform to discover events
                  </p>
                </div>

                {/* Error Alert Placeholder */}
                <div
                  className={`alert alert-danger mb-4 ${error ? "" : "d-none"}`}
                  role="alert"
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#fed7d7",
                    color: "#c53030",
                    fontSize: "0.9rem",
                  }}
                >{error}
                </div>

                <form onSubmit={register}>
                  {/* Name */}
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label fw-medium"
                      style={{ fontSize: "0.9rem", color: "#2d3748" }}
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      onChange={(event)=>{setuser({...user,'name':event.target.value})}}
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="Jane Doe"
                      style={{
                        borderRadius: "10px",
                        borderColor: "#e2e8f0",
                        fontSize: "0.95rem",
                        padding: "0.75rem 1rem",
                      }}
                    />
                    <div className="invalid-feedback">
                      Please enter your name.
                    </div>
                    {user.name === "" && (<small className="text-danger">Name is required</small>)}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label fw-medium"
                      style={{ fontSize: "0.9rem", color: "#2d3748" }}
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      onChange={(event)=>{setuser({...user,'email':event.target.value})}}
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="you@example.com"
                      style={{
                        borderRadius: "10px",
                        borderColor: "#e2e8f0",
                        fontSize: "0.95rem",
                        padding: "0.75rem 1rem",
                      }}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address.
                    </div>
                    {user.email && !emailRegex.test(user.email) && (
                      <small className="text-danger">Invalid email address</small>)}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-medium"
                      style={{ fontSize: "0.9rem", color: "#2d3748" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      onChange={(event)=>{setuser({...user,'password':event.target.value})}}
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Create a password"
                      style={{
                        borderRadius: "10px",
                        borderColor: "#e2e8f0",
                        fontSize: "0.95rem",
                        padding: "0.75rem 1rem",
                      }}
                    />
                    <div className="invalid-feedback">
                      Password must be at least 8 characters.
                    </div>
                    {user.password && user.password.length < 8 && (
                      <small className="text-danger">Password must be at least 8 characters</small>)}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-medium"
                      style={{ fontSize: "0.9rem", color: "#2d3748" }}
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control form-control-lg"
                      id="confirmPassword"
                      placeholder="Re-enter your password"
                      style={{
                        borderRadius: "10px",
                        borderColor: "#e2e8f0",
                        fontSize: "0.95rem",
                        padding: "0.75rem 1rem",
                      }}
                    />
                    <div className="invalid-feedback">
                      Passwords do not match.
                    </div>
                    {confirmPassword && user.password !== confirmPassword && (
                      <small className="text-danger">Passwords do not match</small>)}
                  </div>

                  {/* Submit */}
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      disabled={!isValid}
                      className="btn btn-lg text-white"
                      style={{
                        backgroundColor: "#1a365d",
                        borderColor: "#1a365d",
                        borderRadius: "10px",
                        fontWeight: 500,
                        fontSize: "1rem",
                        padding: "0.85rem",
                      }}
                    >
                      Create Account
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                      Already have an account?{" "}
                    </span>
                    <a
                      href="#"
                      className="text-decoration-none fw-medium"
                      style={{ color: "#1a365d", fontSize: "0.9rem" }}
                      onClick={()=>navigate('/login')}
                    >
                      Sign in
                    </a>
                  </div>
                </form>
              </div>
            </div>

            <p
              className="text-center mt-4 text-muted"
              style={{ fontSize: "0.8rem" }}
            >
              &copy; {new Date().getFullYear()} EventPlatform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
