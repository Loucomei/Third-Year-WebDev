import React from "react";
import { ItemTitle } from "./ItemTitle";
import { ItemPrice } from "./ItemPrice";
import { ItemDescription } from "./ItemDescription";
import { ItemCategory } from "./ItemCategory";
import { ItemPhoto } from "./ItemPhoto";

// This component is resposible for showing the components of Item on the webpage.
const ItemItem = ({ item }) => {
  const { id, title, price, category, description, image } = item;

  return (
    <div className="itemDiv">
      <ItemTitle title={title} />
      <ItemPrice price={price} />
      <ItemDescription description={description} />
      <ItemPhoto image={image} id={id} />
    </div>
  );
};

export default ItemItem;
