import React, { useState, useEffect } from "react";
import { auth, fs } from "../Config/Config";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Navbar } from "./Navbar";
import { arrowLeft } from "react-icons-kit/feather/arrowLeft";
import { Icon } from "react-icons-kit";
export const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const history = useHistory();
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      fs.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserProfile(doc.data());
            setEditedProfile(doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  }, []);
  const enableEditing = () => {
    setEditing(true);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };
  const saveEditedProfile = () => {
    const isProfileChanged =
      JSON.stringify(editedProfile) !== JSON.stringify(userProfile);

    if (isProfileChanged) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update your profile details?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fs.collection("users")
            .doc(auth.currentUser.uid)
            .update(editedProfile)
            .then(() => {
              setUserProfile(editedProfile);
              setEditing(false);
              Swal.fire(
                "Success!",
                "Your profile has been updated.",
                "success"
              );
            })
            .catch((error) => {
              console.error("Error updating document:", error);
              Swal.fire(
                "Error",
                "An error occurred while updating your profile.",
                "error"
              );
            });
        }
      });
    } else {
      Swal.fire({
        title: "No Changes",
        text: "You haven't made any changes to your profile. Do you want to proceed anyway?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          setEditing(false);
        }
      });
    }
  };
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);
  const deleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.currentUser
          .delete()
          .then(() => {
            history.push("/");
          })
          .catch((error) => {
            console.error("Error deleting account:", error);
          });
      }
    });
  };
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();
  return (
    <div>
      <Navbar user={user} totalProducts={totalProducts} />
      <div className="container">
        <br />
        <br />
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="btn btn-link"
            onClick={() => history.goBack()} // Go back to the previous page
          >
            <Icon icon={arrowLeft} size={34} style={{ marginTop:"2%", marginLeft:"-100%", color:"#000000" }} /> {/* Render the back button icon */}
          </button>
          
        </div>
        <center><h1 style={{ marginTop:"-3%" }} >User Profile</h1></center>
      
        <hr />
        {userProfile && (
          <div>
            <div className="profile-header">
              <center>
                {" "}
                <div
                  className="profile-avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "black",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2%",
                  }}
                >
                  <div
                    className="avatar-letter"
                    style={{ color: "white", fontSize: "44px" }}
                  >
                    {userProfile.FullName.charAt(0).toUpperCase()}
                  </div>
                </div>
              </center>
              <div className="profile-details">
                {editing ? (
                  <form>
                    <table
                      className="table table-borderless"
                      style={{ marginTop: "3%", marginLeft: "32%" }}
                    >
                      <tbody>
                        <tr>
                          <th style={{ width: "25%" }}>Full Name:</th>
                          <td>
                            <input
                              type="text"
                              style={{ width: "25%" }}
                              className="form-control"
                              id="FullName"
                              name="FullName"
                              value={editedProfile.FullName}
                              onChange={handleEditChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td>
                            <input
                              type="email"
                              style={{ width: "25%" }}
                              className="form-control"
                              id="Email"
                              name="Email"
                              value={editedProfile.Email}
                              onChange={handleEditChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>Contact Number:</th>
                          <td>
                            <input
                              type="text"
                              style={{ width: "25%" }}
                              className="form-control"
                              id="ContactNumber"
                              name="ContactNumber"
                              value={editedProfile.ContactNumber}
                              onChange={handleEditChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>Address:</th>
                          <td>
                            <input
                              type="text"
                              style={{ width: "25%" }}
                              className="form-control"
                              id="Address"
                              name="Address"
                              value={editedProfile.Address}
                              onChange={handleEditChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                ) : (
                  <table
                    className="table table-borderless"
                    style={{ marginTop: "3%", marginLeft: "32%" }}
                  >
                    <tbody>
                      <tr>
                        <th style={{ width: "25%" }}>Full Name</th>
                        <td>{userProfile.FullName}</td>
                      </tr>
                      <br />
                      <tr>
                        <th>Email</th>
                        <td>{userProfile.Email}</td>
                      </tr>
                      <br />
                      <tr>
                        <th>Contact Number</th>
                        <td>{userProfile.ContactNumber}</td>
                      </tr>
                      <br />
                      <tr>
                        <th>Address</th>
                        <td>{userProfile.Address}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <center>
              <div style={{ marginTop: "30px" }}>
                {editing ? (
                  <button
                    className="btn btn-success"
                    onClick={saveEditedProfile}
                    style={{ marginLeft: "20px" }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={enableEditing}
                    style={{ marginLeft: "25px" }}
                  >
                    Edit Profile
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={deleteAccount}
                  style={{ marginLeft: "20px" }}
                >
                  Delete Account
                </button>
              </div>
            </center>
          </div>
        )}
        {!userProfile && <p>Loading...</p>}
      </div>
    </div>
  );
};
