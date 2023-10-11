import React, { useState, useEffect } from "react";
import { fs } from "../Config/Config";
import "jspdf-autotable";
import jsPDF from "jspdf";

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
    const doc = new jsPDF();

    // Define the header text
    const headerText = "User Report";

    // Calculate the text width and center it
    const textWidth = doc.getTextWidth(headerText);
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;

    // Add the centered header to the PDF
    doc.text(headerText, x, 10); // Center the text horizontally

    // Define the table columns and rows
    const columns = ["Full Name", "Email", "Contact Number", "Address"];
    const rows = users.map((user) => [
      user.FullName,
      user.Email,
      user.ContactNumber,
      user.Address,
      user.RegisteredDate, // Include the registered date
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    // Save the PDF or open it in a new tab
    doc.save("user_report.pdf");
  };

  return (
    <div>
      <br />
      <h1 style={{ textAlign: "center" }}>All Users</h1>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Registered Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.FullName}</td>
              <td>{user.Email}</td>
              <td>{user.ContactNumber}</td>
              <td>{user.Address}</td>
              <td>{user.RegisteredDate}</td> {/* Display the registered date */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Download report button */}
      <button onClick={handleDownloadReport}>Download Report</button>
    </div>
  );
};
