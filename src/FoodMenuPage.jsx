import React from "react";
import Cards from "./Components/Cards";
// import menuData from "./data/feeds.json";
import { useSelector } from "react-redux";

function FoodMenuPage() {
  const cartList = useSelector((state) => state.cart.productList);

  return (
    <>
      <div className="menus">
        <div className="list m-auto">
          <div className="row justify-content-center justify-content-md-start">
            {cartList.map((item, index) => {
              return <Cards key={index} item={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default FoodMenuPage;
