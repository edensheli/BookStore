import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../hooks/user/Register";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useMutation(REGISTER);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await register({
        variables: { data: { firstName, lastName, email, password } },
      });
      window.location.replace("/login");
    } catch (err: any) {
      alert(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="mt-5">
      <form onSubmit={handleSubmit}>
        <h3>Register</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            type="text"
            className="form-control"
            placeholder="First name"
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            type="text"
            className="form-control"
            placeholder="Last name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block mt-3 w-100"
        >
          Register
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/login">log in?</a>
        </p>
      </form>
    </Container>
  );
}

export default Register;
