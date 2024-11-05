import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemItem from "./ItemItem";
import NavBar from "../components/NavBar";
//Grabs the items by their id to display them on sepereate pages
const DetailsItem = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${itemId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
       <NavBar />
      {item ? <ItemItem item={item} showDescription={true} /> : <h2>Item not found</h2>}
    </>
  );
};
export default DetailsItem;
