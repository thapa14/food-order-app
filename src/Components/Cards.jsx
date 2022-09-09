import React from "react";
import "../scss/style/cards/cards.css";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../Redux/menuSlice";

function Cards({ item }) {
  // states
  const dispatch = useDispatch();

  const { name, price, image, quantity } = item;

  const handleIncrementButtonClick = () => {
    dispatch(
      increment({
        name: name,
        price: price,
        image: image,
      })
    );
  };
  const handleDecrementButtonClick = () => {
    quantity
      ? dispatch(
          decrement({
            name: name,
          })
        )
      : window.alert("please select quantity first!!");
  };
  const cardImageStyle = {
    background: `url(${image}) no-repeat center center/cover`,
  };
  return (
    <div className="col-10 col-sm-6 col-md-4 g-5 card-height">
      <div className="card h-100">
        <div className="card-image" style={cardImageStyle}></div>
        {/* <img className="card-img-top" src={image} alt="img" /> */}
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-capitalize">{name}</h5>
            <p className="card-text text-capitalize mb-1">price: {price}</p>
            {quantity ? (
              <>
                <p className="card-text mb-1">Total: {quantity}</p>
                <p className="card-text mb-1">Cost: {quantity * price}</p>
              </>
            ) : null}
          </div>

          <div className="">
            <button
              className="btn quantity-btn btn-inc shadow-sm"
              onClick={handleIncrementButtonClick}
            >
              +
            </button>
            <button
              className="btn quantity-btn btn-dec shadow-sm"
              onClick={handleDecrementButtonClick}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
