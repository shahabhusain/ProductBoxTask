import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeading from "../Layout/PageHeading";
const Sell = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const sellProduct = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:4000/items", product, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success("Product added successfully", response.data);
    } catch (error) {
      toast.log("Something went wrong", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <PageHeading home={"home"} pagename={"Sell Product"} />

      <div className="container">
        <div className="sell-card">
          <h2 className="sell-heading">Sell Your Product</h2>

          <form className="sell-form" onSubmit={sellProduct}>
            {/* Title Field */}
            <div className="form-group">
              <label>Title</label>
              <input
                style={{padding:"10px 20px"}}
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
              />
            </div>

             {/* Price Field */}
             <div className="form-group">
              <label>Price</label>
              <input
                 style={{padding:"10px 20px"}}
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter product Price"
                required
              />
            </div>

            {/* Image URL Field */}
            <div className="form-group">
              <label>Image URL</label>
              <input
               style={{padding:"10px 20px"}}
                type="text"
                name="img"
                value={product.img}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </div>

            {/* Description Field */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                 style={{padding:"10px 20px"}}
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="submit-btn" type="submit">
              Submit Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sell;