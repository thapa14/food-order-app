import React from "react";
import "./scss/style/main/main.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function GoToMenu() {
  return (
    <>
      <main className="home d-flex align-items-start justify-content-center">
        <div className="home-content d-flex flex-column justify-content-center ">
          <h1 className="text-capitalize text-center">
            welcome to food's kitchen
          </h1>

          <button className="btns text-capitalize  m-auto">
            <Link to="/menu">go to menu</Link>
          </button>
        </div>
      </main>
    </>
  );
}

export default GoToMenu;
