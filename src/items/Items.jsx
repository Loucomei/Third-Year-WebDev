import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ItemsItem from "./ItemItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../features/items/itemSlice";

// This component is responsible for showing the items on the webpage by mapping
// to an ItemItem component.
function Items() {
  const { randomItems, isLoading } = useSelector((store) => store.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section>
      <h2>Items</h2>
      <div>
        {randomItems.map((item) => {
          return <ItemsItem item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
}

export default Items;
