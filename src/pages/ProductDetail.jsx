import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageHeading from "../Layout/PageHeading";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/items/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
   <div>
    <PageHeading home={"home"} pagename={"Product Detail"} />
     <div style={{width:"100%", margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"15px" }}>
        <div  className=" border py-3 px-4 rounded-xl">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div>
        <img style={{width:"300px"}} src={product.img} alt={product.title} className="w-[400px] h-[400px] object-cover rounded-xl" />
        <div>
          <p className="text-xl">${product.price}</p>
          <p className="mt-4">{product.description}</p>
        </div>
      </div>
        </div>
    </div>
   </div>
  );
};

export default ProductDetail;
