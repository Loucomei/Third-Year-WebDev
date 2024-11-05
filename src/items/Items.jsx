import React, { useEffect, useState } from "react";
import ItemsItem from "./ItemItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, setItemsFound } from "../features/items/itemSlice";
import ItemCategories from "../components/ItemCategories";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";

// This component is responsible for showing the items on the webpage by mapping
// to an ItemItem component.
function Items({ showDescription = false }) {
  const [filter, setFilter] = useState("All");
  const [nameFilter, setNameFilter] = useState("");
  const { randomItems, isLoading, itemsFound } = useSelector(
    (store) => store.items
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);
  //handler for when an item is clicked the page with that item will load
  const handleItemClick = (item) => {
    navigate(`/items/${item.id}`);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else {
    //Map all categories to an array
    //Remove redundant values
    //Create category list
    const tempCategories = randomItems.map((item) => {
      return item.category;
    });
    const tempSet = new Set(tempCategories.flat());
    const allCategories = ["All", ...tempSet];

    const tempNames = randomItems.map((item) => {
      return item.title;
    });
    const allNames = [...tempNames];
    const currentCategory = "All";

    // Called when category buttons are pressed
    // Updates variable stored in filter
    const changeFilter = (currentCategory) => {
      setFilter(currentCategory);
    };

    const filterNames = (nameFilter) => {
      setNameFilter(nameFilter);

      const returnNames = allNames.filter((item) => {
        return item.toLowerCase().includes(nameFilter);
      });

      if (returnNames.length === 0) {
        if (itemsFound) {
          dispatch(setItemsFound());
        }
      } else {
        if (!itemsFound) {
          dispatch(setItemsFound());
        }
      }
    };

    if (!itemsFound) {
      return (
        <div>
          <ItemCategories
            categories={allCategories}
            changeFilter={changeFilter}
          />
          <Search changeFilter={filterNames} />
          No Items Found Sorry q-q
        </div>
      );
    } else {
      return (
        <div>
          <ItemCategories
            categories={allCategories}
            changeFilter={changeFilter}
          />
          <Search changeFilter={filterNames} />
          <section className="itemList">
            <h2>Items</h2>
            {randomItems
              .filter(
                (item) =>
                  (filter === "All" || item.category === filter) &&
                  (item.title.toLowerCase().includes(nameFilter) ||
                    nameFilter.length === 0)
              )
              .map((item) => (
                <div key={item.id} onClick={() => handleItemClick(item)}>
                  <ItemsItem item={item} showDescription={showDescription} />
                </div>
              ))}
          </section>
        </div>
      );
    }
  }
}
export default Items;
