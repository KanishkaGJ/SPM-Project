import React, { useState } from "react";
import { Navbar } from "./Navbar";
import "./Home.css";
import "../Components/Wardrobe.css";

export const Wardrobe = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", image: "/Assets/sh1.png", color:"Black"},
    { id: 2, name: "Product 2", image: "/Assets/sh2.png", color:"White" },
    { id: 3, name: "Product 3", image: "/Assets/sh4.png", color:"Black" },
    { id: 4, name: "Product 4", image: "/Assets/sh3.png", color:"Blue" },
    { id: 5, name: "Product 5", image: "/Assets/2.png", color:"Cream" },
    { id: 6, name: "Product 6", image: "/Assets/1.png", color:"Badge" },
    { id: 7, name: "Product 7", image: "/Assets/3.png", color:"Black" },
    { id: 8, name: "Product 8", image: "/Assets/tren4.png", color:"Cream" },
    // Add more products here
  ]);

  const [topContainer, setTopContainer] = useState([]);
  const [bottomContainer, setBottomContainer] = useState([]);
  const [lastContainer, setLastContainer] = useState("bottom"); // Initialize the last container as "top"

  const handleAddToContainer = (product) => {
    let container = lastContainer === "top" ? "bottom" : "top";
  
    // Check if the container is empty
    if ((container === "top" && topContainer.length === 0) || (container === "bottom" && bottomContainer.length === 0)) {
      if (container === "top") {
        setTopContainer([product]);
      } else {
        setBottomContainer([product]);
      }
  
      // Update the last used container
      setLastContainer(container);
    }
  };  

  return (
    <>
      <Navbar />
      <div className="app-w">
        <div className="left-panel-w">
          <div className="left-panel-content-w">
            {/* <div className="search-bar">
              <input className="search-bar-input-Box" type="text" placeholder="Search" />
            </div> */}
            <div className="product-list-w">
              {products.map((product) => (
                <div key={product.id} className="product-card-w">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <button onClick={() => handleAddToContainer(product)} className="product-card-w button">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-panel-w">
          <div className="container-w">
            <h2>Top Container</h2>
            <div className="container-content-w">
              {topContainer.map((product) => (
                <div key={product.id} className="container-item-w">
                  <img src={product.image} alt={product.name} />
                </div>
              ))}
            </div>
          </div>
          <div className="container-w">
            <h2>Bottom Container</h2>
            <div className="container-content-w">
              {bottomContainer.map((product) => (
                <div key={product.id} className="container-item-w">
                  <img src={product.image} alt={product.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
