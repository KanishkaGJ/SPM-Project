import React from "react";
import { Navbar } from "./Navbar";
import { useHistory } from "react-router-dom"; // Import useHistory
import "./Dashboard.css"; // Import your CSS file for styling

export const ReportGenerate = () => {
  const history = useHistory(); // Initialize the history object

  const handleGenerateReport = (reportType) => {
    if (reportType === "User Management Report") {
      history.push("/user-report"); // Navigate to "/user-report"
    } else {
      console.log(`Generating ${reportType} report...`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h2>Report Generation Dashboard</h2>
        <div className="button-container">
          <button
            onClick={() => handleGenerateReport("Cart Report")}
            className="report-button"
          >
            Generate Cart Report
          </button>
          <button
            onClick={() => handleGenerateReport("Inventory Report")}
            className="report-button"
          >
            Generate Inventory Report
          </button>
          <button
            onClick={() => handleGenerateReport("User Management Report")}
            className="report-button"
          >
            Generate User Management Report
          </button>
        </div>
      </div>
    </>
  );
};
