import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PiMinus, PiPlus } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal, updateQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Modal = ({ isModalOpen, handleClose, data }) => {
  const [qty, setQty] = useState(1);
  const [addedItemToCart, setAddedItemToCart] = useState(false);

  const dispatch = useDispatch();

  const addItemToCart = (product) => {
    let totalPrice = qty * product.price;

    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };

    dispatch(addToCart(tempProduct));
    dispatch(getCartTotal());
    setAddedItemToCart(true);
  };

  useEffect(() => {
    if (isModalOpen) {
    } else {
      setQty(1);
      setAddedItemToCart(false);
    }
  }, [isModalOpen]);

  const increaseQuantity = (itemId, currentQuantity) => {
    const newQty = currentQuantity + 1;
    setQty(newQty);
    dispatch(updateQuantity({ id: itemId, quantity: newQty }));
  };
  const decreaseQuantity = (itemId, currentQuantity) => {
    const newQty = Math.max(currentQuantity - 1, 1);
    setQty(newQty);
    dispatch(updateQuantity({ id: itemId, quantity: newQty }));
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content w-2/3 relative bg-white overflow-hidden">
            <span
              className="absolute top-0 right-0 p-4"
              onClick={() => handleClose()}
            >
              <FaTimes />
            </span>
            <div className="flex">
              <div className="relative">
                <div className="flash_sale_img">
                  <img src={data.img} alt="img" />
                </div>
              </div>

              <div className="modal-info ml-6">
                <p className="mb-2 font-bold">{data.title}</p>
                <p className="text-red-600 text-xl">${data.price}</p>
                <p className="my-2">${data.description}</p>
                <div className="flex items-center">
                  <div className="flex mr-3">
                    <button
                      className="border mt-4 py-3 px-6"
                      onClick={() => decreaseQuantity(data.id, qty)}
                    >
                      <PiMinus />
                    </button>
                    <span className="border mt-4 py-3 px-6 count">
                      {qty || 1}
                    </span>
                    <button
                      className="border mt-4 py-3 px-6"
                      onClick={() => increaseQuantity(data.id, qty)}
                    >
                      <PiPlus />
                    </button>
                  </div>

                  <div className="addtocart mr-3">
                    {addedItemToCart ? (
                      <button style={{padding:"10px"}} className="mt-4 px-6 py-3 text-white">
                        <Link to="/cart">View Cart</Link>
                      </button>
                    ) : (
                      <button
                      style={{padding:"10px"}} 
                        onClick={() => addItemToCart(data)}
                        className="mt-4 px-6 py-3 text-white"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
