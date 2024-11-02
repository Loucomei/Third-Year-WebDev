import React, { useEffect, useState } from "react";
import ItemsItem from "./ItemItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, setItemsFound } from "../features/items/itemSlice";
import ItemCategories from "../components/ItemCategories";
import Search from "../components/Search.jsx";

// This component is responsible for showing the items on the webpage by mapping
// to an ItemItem component.
function Items() {

  const [filter, setFilter] = useState("All");
  const [nameFilter, setNameFilter] = useState("");
  const { randomItems, isLoading, itemsFound } = useSelector((store) => store.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  else {

    //Map all categories to an array
    //Remove redundant values
    //Create category list
    const tempCategories = randomItems.map((item) =>{
      return item.category;
    })
    const tempSet = new Set(tempCategories.flat());
    const allCategories = ["All", ...tempSet];

    const tempNames = randomItems.map((item) =>{
      return item.title;
    })
    const allNames = [...tempNames];

    //Called when category buttons are pressed
    //Updates variable stored in filter

    const changeFilter = ( currentCategory ) => {
      //console log handler for error checking
      const localFunctionConsoleLogging = false;

      const newFilter = allCategories.filter((item) => {
        return item == currentCategory;
      });

      if(newFilter.length == 0){
        if(itemsFound){
          dispatch(setItemsFound());
        }
      }
      else{
        if(!itemsFound){
          dispatch(setItemsFound())
        }
        setFilter(newFilter);
      }

      if (localFunctionConsoleLogging) {
        console.log("For changeFilter function: ")
        console.log(filter[0].length)
        console.log(filter[0])
        console.log(filter.length)
        console.log(filter[0].length == 1 || filter[0] == "All")
        console.log(filter.length != 0)
        console.log((filter[0].length == 1 || filter[0] == "All") && filter.length != 0)
      }
    };

    const filterNames = ( nameFilter ) => {

      setNameFilter(nameFilter);

      const returnNames = allNames.filter((item) => {
        return item.toLowerCase().includes(nameFilter);
      });
      
      if(returnNames.length == 0){
        if(itemsFound){
          dispatch(setItemsFound());
        }
      }
      else{
        if(!itemsFound){
          dispatch(setItemsFound())
        }
      }

    }

    if (!itemsFound) {
      return (
        <div>
          <ItemCategories categories={allCategories} changeFilter={changeFilter}/>
          <Search changeFilter={filterNames}/>
          No Items Found Sorry q-q
        </div>
      )
    }
    else{
      return (
        <div>
          <ItemCategories categories={allCategories} changeFilter={changeFilter}/>
          <Search changeFilter={filterNames}/>
            <section className="itemList">
            <h2>Items</h2>
            {randomItems.map((item) => {
              if((item.title.toLowerCase().includes(nameFilter) || nameFilter.length == 0)){
                if((filter[0].length == 1 || filter[0] == "All" )) {
                  return (
                      <ItemsItem 
                        item={item}
                        key={item.id}
                      />
                  )}
                else {
                  //console.log(filter)
                  //console.log(nameFilter)
                  //console.log(item.title.toLowerCase());
                  //console.log(item.title.toLowerCase().startsWith(nameFilter));
                  //console.log(item.category == filter);
                  //console.log(nameFilter.length);
                  //console.log(item.category == filter && (item.title.toLowerCase().startsWith(nameFilter) || nameFilter.length == 0));
                  if (item.category == filter){
                    return (
                        <ItemsItem 
                          item={item}
                          key={item.id}
                        />
                    )
                  }
                }
              }
            })}
            </section>
        </div>
      );
    }
  }
}

export default Items;
