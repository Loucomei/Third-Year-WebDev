import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ItemsItem from "./ItemItem";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, fetchItems } from "../features/items/itemSlice";
import ItemCategories from "../components/ItemCategories";

// This component is responsible for showing the items on the webpage by mapping
// to an ItemItem component.
function Items() {
  const [filter, setFilter] = useState("All");
  const { randomItems, isLoading } = useSelector((store) => store.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const updateItems = ( filter ) => {
    dispatch(changeFilter( filter={filter} ));
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  else {

    //Items to be displayed
    const isItem = ( category, filter ) => category === filter;

    //Map all categories to an array
    //Remove redundant values
    //Create category list
    const tempCategories = randomItems.map((item) =>{
      return item.category;
    })
    const tempSet = new Set(tempCategories.flat());
    const allCategories = ["All", ...tempSet];

    const currentCategory = "All"

    //Called when category buttons are pressed
    //Updates variable stored in filter

    const changeFilter = ( currentCategory ) => {
      const newFilter = allCategories.filter((item) => {
        return item  === currentCategory;
      });
      if(newFilter.length != 0){
        setFilter(newFilter);
      }
      console.log(filter[0].length)
      console.log(filter[0])
      console.log(filter.length)
      console.log(filter[0].length == 1 || filter[0] == "All")
      console.log(filter.length != 0)
      console.log((filter[0].length == 1 || filter[0] == "All") && filter.length != 0)
    };

    return (
      <div>
        <ItemCategories categories={allCategories} changeFilter={changeFilter}/>
          <section className="itemList">
          <h2>Items</h2>
          {randomItems.map((item) => {
            if(filter[0].length == 1 || filter[0] == "All") {
              return (
                  <ItemsItem 
                    item={item}
                    key={item.id}
                  />
              )}
            else {
              if (item.category == filter){
                 return (
                    <ItemsItem 
                      item={item}
                      key={item.id}
                     />
                )
              }
            }
          })}
          </section>
      </div>
    );
  }
}

export default Items;
