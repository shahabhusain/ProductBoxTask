import React, { useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import "rc-slider/assets/index.css";
import { FiTrash } from "react-icons/fi"; 
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "../Layout/Modal";
import Heading from "../Layout/Heading";

const FlashSale = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [productData, setProductData] = useState([]);

  const fetchProductsData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/items"); 
      setProductData(response.data);
      console.log("responseData =>", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/items/${id}`);
      setProductData(productData.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }



  return (
    <div>
      <div>
      <Heading heading={"All Furniture Products"} />
        <div className="w-10/12 m-auto flex gap-3 items-start mt-8">
      
          <div>
            <div className="grid grid-cols-4 gap-3">
            {productData.map((item, index) => (
    <div key={index}>
      <div className="overflow-hidden relative ml-4">
        <div className="image-container relative">
          <div className="rounded-3xl w-[400px] h-[500px]">
            <img
              src={item.img}
              alt="img"
              className="rounded-2xl w-full h-full object-cover"
              style={{height:"500px", width:"290px"}}
            />
          </div>

          <div className="opacity-0 absolute top-0 right-0 m-4">
            <div>
              <div>
               <Link to={`/buyDetail/${item.id}`}>
                        <button className="bg-white p-4 rounded-full mb-2">
                          <FaEye />
                        </button>
                      </Link>
              </div>
              <button 
                    onClick={() => handleDelete(item.id)} 
                    className="bg-white p-4 rounded-full"
                  >
                    <FiTrash />
                  </button>
            </div>
          </div>
          <div className="opacity-0 absolute -bottom-3 right-0 bg-white p-4 rounded-s-2xl">
            <div className="bg-black text-white h-10 w-10 grid place-items-center rounded-3xl">
              <button
                className="text-2xl"
                onClick={() => setIsModalOpen(item.id)}
              >
                <BiCart />
              </button>
            </div>
          </div>
        </div>

        <div className="product-details mt-2">
          <p className="mb-2">{item.title}</p>
          <p>${item.price}</p>
        </div>
      </div>
    </div>
  ))}
            </div>
          </div>
        </div>

        <Modal
          data={productData.find((item) => item.id === isModalOpen)}
          isModalOpen={isModalOpen}
          handleClose={() => setIsModalOpen(null)}
        />
      </div>
    </div>
  );
};

export default FlashSale;

