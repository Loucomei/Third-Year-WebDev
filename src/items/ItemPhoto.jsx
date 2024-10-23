import React from "react";

export const ItemPhoto = ({ image, id }) => {
  return <img src={image} alt={id} />;
};
