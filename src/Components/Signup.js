import React, { useState, useEffect } from "react";
import { auth, fs } from "../Config/Config";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import login from "../Images/login.png";
import Button from "@mui/material/Button";

export const Signup = () => {
  const history = useHistory();
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (!contactNumber) {
      setErrorMsg("Please enter a Contact Number.");
      return;
    }
    if (!address) {
      setErrorMsg("Please enter your address");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        fs.collection("users")
          .doc(credentials.user.uid)
          .set({
            FullName: fullName,
            Email: email,
            Password: password,
            ContactNumber: contactNumber,
            Address: address,
          })
          .then(() => {
            setSuccessMsg(
              "Signup Successful. You will now automatically get redirected to Login"
            );
            setFullname("");
            setEmail("");
            setPassword("");
            setContactNumber("");
            setAddress("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              history.push("/login");
            }, 3000);
          })
          .catch((error) => setErrorMsg(error.message));
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  const signupButtonStyle = {
    marginTop: "2%",
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

  // Disable scrolling when the Login component mounts
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="container" style={containerStyle}>
      <div style={formContainerStyle}>
        <img src={login} alt="Your Image" style={{ marginLeft: "-26%", marginBottom:"-7%" }} />
      </div>
      <div style={contentStyle}>
        <center style={{ marginLeft: "50%" }}>
          <br />
          <br />
          <h1 style={{ marginBottom:"12%", marginTop:"10%" }}>Sign Up</h1>
          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
              <br />
            </>
          )}
          <form
            className="form-group"
            autoComplete="off"
            onSubmit={handleSignup}
          >
            <TextField
              id="fullname"
              label="Full Name"
              variant="standard"
              required
              onChange={(e) => setFullname(e.target.value)}
              value={fullName}
            />
            <br />
            <br />
            <TextField
              id="email"
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
              type="password"
              label="Password"
              variant="standard"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <br />
            <br />
            <TextField
              id="contactnumber"
              label="Contact Number"
              variant="standard"
              required
              onChange={(e) => setContactNumber(e.target.value)}
              value={contactNumber}
            />
            <br />
            <br />
            <TextField
              id="address"
              label="Address"
              variant="standard"
              required
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <br />
            <br />
            <Button type="submit" variant="outlined" style={signupButtonStyle}>
              SIGN UP
            </Button>
          </form>
          <br />
          <br />
          <p>Already have an account?</p>
          <Box sx={{ "& button": { m: 1 } }}>
            <Button
              size="large"
              style={{ marginTop: "-1%", color: "black" }}
              onClick={handleLoginClick}
            >
              LOGIN
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
