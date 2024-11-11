import React from "react";
import Timer from "./Timer";
import { NavLink } from "react-router-dom";

// This component is resposible for showing the components of Item on the webpage.
const ItemItem = ({ item, time }) => {
  const { id, title, price, image } = item;

  const details = () => {
    localStorage.setItem("item", JSON.stringify(item));
  };

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-accent">
            {title}
            <Timer timer={time} />
          </h2>
          <p></p>
          <div className="card-actions justify-end">
            <NavLink to="/item" onClick={details} className="btn btn-primary">
              Current Bid £{price}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemItem;
