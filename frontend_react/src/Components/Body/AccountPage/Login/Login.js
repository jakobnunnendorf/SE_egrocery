import React from "react";
import "./Login.css";
import users from "../mockUserData";

export default function Login(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const user = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (user) {
      console.log("User logged in:", formData);
      props.setActiveComponent("MyAccount")
    } else {
      console.log("Invalid email or password");
      // Display an error message to inform the user that the login has failed
    }
  };

  return (
    <div>
      <div className="container-form">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="card-title text-center">Login</h2>
              <div className="card-body py-md-4">
                <form onSubmit={handleSubmit}>
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
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Login"
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
