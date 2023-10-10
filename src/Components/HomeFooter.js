import React from "react";
import "./SellerFooter.css"; // Import the CSS file for styling

export const HomeFooter = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <a href="#">All inventory</a>
        <a href="#">Add products</a>
        <a href="/report-dashboard">Generate reports</a>
        <a href="#">Magic Wardrobe</a> {/* New item */}
        <a href="#">About Us</a> {/* New item */}
        <a href="#">Contact Us</a> {/* New item */}
      </div>
      
      <div className="footer-details">
        <p>Developed by Quad 200</p>
        <a href="/seller-shop">Admin Login</a>
      </div>
    </div>
  );
};
