import React from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../Redux/menuSlice";

function ListItem({ item }) {
  const dispatch = useDispatch();
  const { name, quantity } = item;
  return (
    <div className="list-item d-flex my-2">
      <div className="li-left  d-flex align-items-center justify-content-between">
        <span className="item-name">{name} :</span>
        <span className="item-quantity">{quantity}</span>
      </div>
      <div className="li-right d-flex align-items-center justify-content-center">
        <button
          className="btn checkout-btn btn-inc"
          onClick={() => dispatch(increment({ name: name }))}
        >
          +
        </button>
        <button
          className="btn checkout-btn btn-dec"
          onClick={() => dispatch(decrement({ name: name }))}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default ListItem;
