import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Config/Config";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import login from "../Images/login.png";

export const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSuccessMsg(
          "Login Successful. You will now automatically get redirected to the Home page"
        );
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          history.push("/");
        }, 3000);
      })
      .catch((error) => setErrorMsg(error.message));
  };

  const handleSignupClick = () => {
    history.push("/signup");
  };

  const loginButtonStyle = {
    marginTop: "1%",
    backgroundColor: "black",
    color: "white",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const contentStyle = {
    width: "50%",
    padding: "20px",
  };

  const formContainerStyle = {
    width: "50%",
    padding: "20px",
    borderRight: "1px solid #ccc", // Add a vertical line here
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageUrl = "https://example.com/your-image.jpg";

  return (
    <div className="container" style={containerStyle}>
      <div style={formContainerStyle}>
        <img
          src={imageUrl}
          alt="Your Image"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
      <div style={contentStyle}>
        {/* Add your existing content here */}
        <center>
          <br />
          <br />
          <h1>Login</h1>
          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
              <br />
            </>
          )}
          <form
            className="form-group"
            autoComplete="off"
            onSubmit={handleLogin}
          >
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br />
            <br />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <br />
            <br />
            <Button type="submit" variant="outlined" style={loginButtonStyle}>
              LOGIN
            </Button>
          </form>
          <br />
          <br />
          <p>Don't have an account?</p>
          <Box sx={{ "& button": { m: 1 } }}>
            <Button
              size="large"
              style={{ marginTop: "-1%", color: "black" }}
              onClick={handleSignupClick}
            >
              SIGNUP
            </Button>
          </Box>
          {errorMsg && (
            <>
              <br />
              <div className="error-msg">{errorMsg}</div>
            </>
          )}
        </center>
      </div>
    </div>
  );
};
