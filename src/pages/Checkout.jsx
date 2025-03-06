import React, { useEffect, useState } from "react";
import PageHeading from "../Layout/PageHeading";


const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("checkout")) || [];
    setCheckoutItems(storedItems);
  }, []);

  return (
    <div>
      <PageHeading home={"home"} pagename={"Checkout Products"} />
       <div className="checkout-container">
       {checkoutItems.length === 0 ? (
        <p className="empty-message">No items in checkout</p>
      ) : (
        <div className="checkout-list">
          {checkoutItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <img src={item.img} alt={item.title} className="checkout-img" />
              <div className="checkout-details">
                <h3>{item.title}</h3>
                <p className="checkout-price">${item.price}</p>
              </div>
              <button className="checkout-btn">Approved</button>
            </div>
          ))}
        </div>
      )}
       </div>
    </div>
  );
};

export default Checkout;
