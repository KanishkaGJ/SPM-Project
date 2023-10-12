import React, { useState, useEffect } from "react";
import { fs } from "../Config/Config";
import "jspdf-autotable";
import jsPDF from "jspdf";

export const CartReport = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const cartCollection = await fs.collection("Cart").get(); // Adjust the collection name if needed
        const cartData = cartCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCarts(cartData);
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };
    fetchCartDetails();
  }, []);

  // Function to handle the download cart report action
  const handleDownloadCartReport = () => {
    const doc = new jsPDF();

    // Define the header text
    const headerText = "Cart Report";

    // Calculate the text width and center it
    const textWidth = doc.getTextWidth(headerText);
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;

    // Add the centered header to the PDF
    doc.text(headerText, x, 10); // Center the text horizontally

    // Define the table columns and rows
    const columns = ["User ID", "Product Name", "Quantity", "Price"];
    const rows = carts.map((cart) => [
      cart.userId, // Replace with the actual user ID property
      cart.productName,
      cart.quantity,
      cart.price,
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    // Save the PDF or open it in a new tab
    doc.save("cart_report.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Cart Details
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "0 auto",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              User ID
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Product Name
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Quantity
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart, index) => (
            <tr
              key={cart.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
              }}
            >
              <td style={{ padding: "8px" }}>{cart.userId}</td>
              <td style={{ padding: "8px" }}>{cart.productName}</td>
              <td style={{ padding: "8px" }}>{cart.quantity}</td>
              <td style={{ padding: "8px" }}>{cart.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          position: "absolute",
          bottom: "10px", // Adjust the distance from the bottom as needed
          left: "50%",
          transform: "translateX(-50%)", // Center the button horizontally
          textAlign: "center",
          width: "100%",
        }}
      >
        <button
          onClick={handleDownloadCartReport}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Download Report
        </button>
      </div>
    </div>
  );
};
