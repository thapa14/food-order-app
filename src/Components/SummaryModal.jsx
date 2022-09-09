import React from "react";
import "../scss/style/summaryModal/summaryModal.css";
import ListItem from "./ListItem";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../Redux/menuSlice";

function SummaryModal({ toggleCartSummary, cartSummary }) {
  const dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cart.productList);
  console.log(cartItems);
  cartItems = cartItems.filter((value) => value.quantity !== 0);
  const totalValue = cartItems.reduce((total, cur) => {
    return (total += cur.quantity * cur.price);
  }, 0);

  const handleCheckoutClick = () => {
    toggleCartSummary(!cartSummary);
    dispatch(clearCart());
  };
  return (
    <>
      <div className="modal-wrapper d-flex justify-content-center align-items-center">
        <div className="order-summary bg-white">
          <h3>Order Summary</h3>
          <div className="order-list">
            {cartItems.map((item, index) => {
              return <ListItem key={index} item={item} />;
            })}
          </div>
          <span> Total (INR): {totalValue}</span>

          <div className="modal-footer">
            <button className="btn" onClick={handleCheckoutClick}>
              <Link to="/checkout">save and checkout</Link>
            </button>
            <button
              className="btn"
              onClick={() => toggleCartSummary(!cartSummary)}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryModal;
