import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/login/",
      user,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    localStorage.clear();

    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("username", data.username);
    localStorage.setItem("user_id", data.user_id);

    window.location.href = "/";
  };

  return (
    <div className="auth-form-container">
      <Form onSubmit={submit}>
        <h3 className="auth-form-title">Sign In</h3>
        <Form.Group className="mt-3" controlId="formBasic">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            className="mt-1"
            placeholder="Enter Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}
