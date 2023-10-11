import React, { useState, useEffect } from "react";
import { fs } from "../Config/Config";

export const UserReport = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const usersCollection = await fs.collection("users").get();
        const usersData = usersCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUserProfiles();
  }, []);

  // Function to handle the download report action
  const handleDownloadReport = () => {
    // Implement your report download logic here
    // You can use a library or custom code to generate and trigger the download.
    // For example, you can use the FileSaver.js library.
  };

  return (
    <div>
      <h1>User Report</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.FullName}</td>
              <td>{user.Email}</td>
              <td>{user.ContactNumber}</td>
              <td>{user.Address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Download report button */}
      <button onClick={handleDownloadReport}>Download Report</button>
    </div>
  );
};
