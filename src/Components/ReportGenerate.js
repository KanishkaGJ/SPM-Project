import React from "react";
import { Navbar } from "./Navbar";
import "./Dashboard.css"; // Import your CSS file for styling
import 'jspdf-autotable';
import jsPDF from 'jspdf';


function generatePDFReport() {
  const doc = new jsPDF();
  doc.text('My PDF Report', 10, 10); // Add title
  // Add content to the PDF
  doc.setFontSize(14);
  doc.text('Section 1: Introduction', 10, 30);
  doc.setFontSize(12);
  doc.text(
    'This is a sample PDF report generated using jsPDF in a React application. It includes text, a table, and an image.',
    10,
    40
  );

  


  // Add a section with an image
  doc.setFontSize(14);
  doc.text('Section 3: Sample Image', 10, 160);



  // Save the PDF or open it in a new tab
  doc.save('report.pdf');
}

export const ReportGenerate = () => {
  const handleGenerateReport = (reportType) => {
    // Implement the logic for generating the report based on the reportType
    // You can trigger the report generation here or redirect to a new page, etc.
    console.log(`Generating ${reportType} report...`);
  };

  return (
    <>
    <Navbar/>
      <div className="dashboard">
        <h2>Report Generation Dashboard</h2>
        <div className="button-container">
          <button onClick={generatePDFReport} className="report-button">
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



