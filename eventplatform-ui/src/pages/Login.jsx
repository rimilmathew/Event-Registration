import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginuser } from "../services/api";

function Login({onlogin}) {
  const navigate=useNavigate()
  const [user, setUser] = useState({email: '', password: ''})
  const [error, setError] = useState('')

  async function UserLogin(event) {
    event.preventDefault()
    try {
      const response = await loginuser(user)
      // console.log(response)
      const accessToken = response.data.access
      const refreshToken = response.data.refresh
      localStorage.setItem('token', 'Bearer ' + accessToken)
      localStorage.setItem('refresh', refreshToken)
      onlogin()
      navigate('/events')
    }
    catch (error){
      if (error.response?.status === 401) {
        setError('Invalid email or password');
      }
      else {
        setError(error.response?.data?.detail ||'Something went wrong');
      }
    }
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(user.email) && user.password.trim() !== "";

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
                    style={{
                      color: "#1a365d",
                      fontSize: "1.75rem",
                    }}
                  >
                    Welcome Back
                  </h2>

                  <p
                    className="text-muted mb-0"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Sign in to manage your events
                  </p>
                </div>

                {/* Error Placeholder */}
                {error && (
                <div
                  className="alert alert-danger"
                  role="alert"
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  {error}
                </div>
                )}

                <form onSubmit={UserLogin}>

                  {/* Email */}
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label fw-medium"
                      style={{
                        fontSize: "0.9rem",
                        color: "#2d3748",
                      }}
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value,})}
                      className="form-control form-control-lg"
                      placeholder="you@example.com"
                      style={{
                        borderRadius: "10px",
                        borderColor: "#e2e8f0",
                        fontSize: "0.95rem",
                        padding: "0.75rem 1rem",
                      }}
                    />
                    {user.email && !emailRegex.test(user.email) && (
                      <small className="text-danger">Invalid email address</small>)}
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label fw-medium"
                      style={{
                        fontSize: "0.9rem",
                        color: "#2d3748",
                      }}
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      id="password"
                      value={user.password}
                      onChange={(e) => setUser({...user, password: e.target.value,})}
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      style={{
                        borderRadius: "10px",
                        borderColor: "#e2e8f0",
                        fontSize: "0.95rem",
                        padding: "0.75rem 1rem",
                      }}
                    />
                    {user.password === "" && (<small className="text-danger">Password is required</small>)}
                  </div>

                  {/* Login Button */}
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
                      Sign In
                    </button>
                  </div>

                  {/* Loading Button Example */}
                  {/*
                  <div className="d-grid mb-3">
                    <button
                      type="button"
                      className="btn btn-lg text-white"
                      disabled
                      style={{
                        backgroundColor: "#1a365d",
                        borderColor: "#1a365d",
                        borderRadius: "10px",
                      }}
                    >
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Signing In...
                    </button>
                  </div>
                  */}

                  {/* Register Link */}
                  <div className="text-center">
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Don't have an account?{" "}
                    </span>

                    <a
                      href="#"
                      className="text-decoration-none fw-medium"
                      style={{
                        color: "#1a365d",
                        fontSize: "0.9rem",
                      }}
                      onClick={()=>navigate('/register')}
                    >
                      Create an account
                    </a>
                  </div>

                </form>
              </div>
            </div>

            <p
              className="text-center mt-4 text-muted"
              style={{ fontSize: "0.8rem" }}
            >
              © EventPlatform. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login