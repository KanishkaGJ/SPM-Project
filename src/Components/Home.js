import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import { auth, fs } from "../Config/Config";
import { IndividualFilteredProduct } from "./IndividualFilteredProduct";

export const Home = (props) => {
  // getting current user uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid();

  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = GetCurrentUser();
  // console.log(user);

  // state of products
  const [products, setProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
    const products = await fs.collection("Products").get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // getting cart products
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);

  // globl variable
  let Product;

  // add to cart
  const addToCart = (product) => {
    if (uid !== null) {
      // console.log(product);
      Product = product;
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      fs.collection("Cart " + uid)
        .doc(product.ID)
        .set(Product)
        .then(() => {
          console.log("successfully added to cart");
        });
    } else {
      props.history.push("/login");
    }
  };

  // categories list rendering using span tag
  const [spans] = useState([
    { id: "CasualWearTops", text: "Casual Wear Tops" },
    { id: "OfficeWearTops", text: "Office Wear Tops" },
    { id: "UnderGarments", text: "Under Garments" },
    { id: "SportsWear", text: "Sports Wear" },
    { id: "CasualWearBottoms", text: "Casual Wear Bottoms" },
    { id: "OfficeWearBottoms", text: "Office Wear Bottoms" },
    { id: "PartyWear", text: `Party Wear` },
  ]);

  // active class state
  const [active, setActive] = useState("");

  // category state
  const [category, setCategory] = useState("");

  // handle change ... it will set category and active states
  const handleChange = (individualSpan) => {
    setActive(individualSpan.id);
    setCategory(individualSpan.text);
    filterFunction(individualSpan.text);
  };

  // filtered products state
  const [filteredProducts, setFilteredProducts] = useState([]);

  // filter function
  const filterFunction = (text) => {
    if (products.length > 1) {
      const filter = products.filter((product) => product.category === text);
      setFilteredProducts(filter);
    } else {
      console.log("no products to filter");
    }
  };

  // return to all products
  const returntoAllProducts = () => {
    setActive("");
    setCategory("");
    setFilteredProducts([]);
  };

  const handleChatButtonClick = () => {
    alert("Chat functionality will be implemented here.");
  };

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
      <br></br>
      <div className="container-fluid filter-products-main-box">
        <div className="filter-box">
          <h6>Filter by category</h6>
          {spans.map((individualSpan, index) => (
            <span
              key={index}
              id={individualSpan.id}
              onClick={() => handleChange(individualSpan)}
              className={individualSpan.id === active ? active : "deactive"}
            >
              {individualSpan.text}
            </span>
          ))}
        </div>
        {filteredProducts.length > 0 && (
          <div className="my-products">
            <h1 className="text-center">{category}</h1>
            <a href="javascript:void(0)" onClick={returntoAllProducts}>
              Return to All Products
            </a>
            <div className="products-box">
              {filteredProducts.map((individualFilteredProduct) => (
                <IndividualFilteredProduct
                  key={individualFilteredProduct.ID}
                  individualFilteredProduct={individualFilteredProduct}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}
        {filteredProducts.length < 1 && (
          <>
            {products.length > 0 && (
              <div className="my-products">
                <h1 className="text-center">All Products</h1>
                <div className="products-box">
                  <Products products={products} addToCart={addToCart} />
                </div>
              </div>
            )}
            {products.length < 1 && (
              <div className="my-products please-wait">Please wait...</div>
            )}
          </>
        )}
      </div>
      <button
        onClick={handleChatButtonClick}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#000000",
          color: "#fff",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Chat With Us
      </button>
    </>
  );
};
