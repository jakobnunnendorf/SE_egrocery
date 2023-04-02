import React from "react";
import "./SignupForm.css";

export default function SignupForm(props) {
  const handleLoginClick = () => {
    props.setActiveComponent("Login");
  };

  return (
    <div>
      <div className="container-form">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="card-title text-center">Register</h2>
              <div className="card-body py-md-4">
                <form onSubmit={props.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="confirm-password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleLoginClick}
                    >
                      Login
                    </button>
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Create Account"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
