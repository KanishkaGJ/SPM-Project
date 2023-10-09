import React, { useState, useEffect } from 'react';
import { fs } from '../Config/Config';

export const SellerShop = () => {
  const [products, setProducts] = useState([]);

  // Fetch the products from Firestore
  const fetchProducts = async () => {
    try {
      const productsRef = fs.collection('Products'); // Assuming 'Products' is your collection name
      const snapshot = await productsRef.get();
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="seller-shop">
      <h1>Seller's Shop</h1>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageURL} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

