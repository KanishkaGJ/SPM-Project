import React, { useEffect, useState } from 'react';
import { fs } from '../Config/Config';
import { SellerNavBar } from './SellerNavBar';
import { Link } from 'react-router-dom';
import bannerImage from '../Images/herov2.jpg';

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
    <div>
      <SellerNavBar />

      <div
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            style={{
              color: '#fff',
              fontSize: '36px',
              fontWeight: 700,
            }}
          >
            Seller's Shop
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 50 }}>
        <div className="row">
          <div className="col-md-3 filter-box">
           
            {/* Example:
            <h6>Filter by category</h6>
            <ul>
              <li>Category 1</li>
              <li>Category 2</li>
              {/* Add more categories as needed */}
            {/*</ul>*/}
          </div>
          <div className="col-md-9 product-container-scroll">
            <div className="product-container">
              {products.map((product) => (
                <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card mb-4">
                    <img src={product.url} className="card-img-top" alt={product.title} />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">${product.price}</p>
                      <Link to={`/seller/edit-product/${product.id}`} className="btn btn-primary">
                        Edit Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
