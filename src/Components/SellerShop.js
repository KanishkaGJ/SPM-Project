import React, { useEffect, useState } from 'react';
import { fs } from '../Config/Config';

export const SellerShop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = await fs.collection('Products').get();
        const productsArray = productsRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Seller's Shop</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
            <div className="card mb-4">
              <img src={product.imageURL} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


