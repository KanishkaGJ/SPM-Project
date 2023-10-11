import React from "react";
import { SellerNavBar } from "./SellerNavBar";
import "./Dashboard.css"; // Import your CSS file for styling
import { SellerFooter } from "./SellerFooter";

export const ReportGenerate = () => {
  const handleGenerateReport = (reportType) => {
    // Implement the logic for generating the report based on the reportType
    // You can trigger the report generation here or redirect to a new page, etc.
    console.log(`Generating ${reportType} report...`);
  };

  return (
    <>
      <SellerNavBar />
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
