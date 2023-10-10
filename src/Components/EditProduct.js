import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"; // Import useHistory
import { fs, storage } from "../Config/Config";
import "./EditProduct.css"; // Import the CSS file for styling

export const EditProduct = () => {
  const { productId } = useParams();
  const history = useHistory(); // Initialize history
  const [product, setProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isProductUpdated, setProductUpdated] = useState(false); // State for the success message

  useEffect(() => {
    fs.collection("Products")
      .doc(productId)
      .get()
      .then((snapshot) => {
        const productData = snapshot.data();
        setProduct(productData);
        setEditedProduct(productData);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);

  // Fetch the product image from Firebase Storage
  useEffect(() => {
    if (product.imageUrl) {
      storage
        .ref()
        .child(product.imageUrl)
        .getDownloadURL()
        .then((url) => {
          setEditedProduct({ ...editedProduct, imageUrl: url });
        })
        .catch((error) => {
          console.error("Error fetching image URL:", error);
        });
    }
  }, [product.imageUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Display the selected image immediately
    const imageUrl = URL.createObjectURL(file);
    setEditedProduct({ ...editedProduct, imageUrl });
  };

  const handleSave = () => {
    // Update the product data in Firestore
    fs.collection("Products")
      .doc(productId)
      .update(editedProduct)
      .then(() => {
        console.log("Product updated successfully");
        setProductUpdated(true); // Set success message to true
        setTimeout(() => {
          setProductUpdated(false); // Clear success message after a delay
          history.push("/seller-shop"); // Navigate to /seller-shop
        }, 2000); // Delay in milliseconds
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });

    // If a new image is selected, update the image in Firebase Storage
    if (imageFile) {
      const imageRef = storage.ref().child(`product_images/${productId}`);
      imageRef.put(imageFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          // Update the imageUrl field in Firestore
          fs.collection("Products")
            .doc(productId)
            .update({ imageUrl })
            .then(() => {
              console.log("Image URL updated successfully");
            })
            .catch((error) => {
              console.error("Error updating image URL:", error);
            });
        });
      });
    }
  };

  return (
    <div className="edit-product-container">
      <h1>Edit Product</h1>
      {editedProduct.imageUrl && (
        <div>
          <label>Current Image:</label>
          <img
            src={editedProduct.imageUrl}
            alt="Product"
            style={{ maxWidth: "200px" }}
          />
        </div>
      )}
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={editedProduct.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={editedProduct.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={editedProduct.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>New Image:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button onClick={handleSave}>Save</button>
      {isProductUpdated && <p>Product Updated</p>}
    </div>
  );
};
