import React, { useState } from "react";
import { auth, fs } from "../Config/Config";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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

  const loginButtonStyle = {
    marginTop: "2%",
    backgroundColor: "black",
    color: "white",
  };

  return (
    <div className="container" style={{ marginTop: "10%" }}>
      <center>
        <br></br>
        <br></br>
        <h1>Sign Up</h1>
        {successMsg && (
          <>
            <div className="success-msg">{successMsg}</div>
            <br></br>
          </>
        )}
        <form className="form-group" autoComplete="off" onSubmit={handleSignup}>
          <TextField
            id="fullname"
            label="Full Name"
            variant="standard"
            required
            onChange={(e) => setFullname(e.target.value)}
            value={fullName}
          />
          <br></br>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br></br>
          <TextField
            id="password"
            label="Password"
            variant="standard"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br></br>
          <TextField
            id="contactnumber"
            label="Contact NUmber"
            variant="standard"
            required
            onChange={(e) => setContactNumber(e.target.value)}
            value={contactNumber}
          />
          <br></br>
          <TextField
            id="address"
            label="Address"
            variant="standard"
            required
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <br></br>
          <Button type="submit" variant="outlined" style={loginButtonStyle}>
            SIGN UP
          </Button>
        </form>
        <br />
        <br />
        <p>Don't have an account ?</p>
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
            <br></br>
            <div className="error-msg">{errorMsg}</div>
          </>
        )}
      </center>
    </div>
  );
};
