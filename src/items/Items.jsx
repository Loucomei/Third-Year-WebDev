import React, { useEffect } from "react";
import ItemsItem from "./ItemItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, setItemsFound, setCategoryFilter, setNameFilter } from "../features/items/itemSlice";
import ItemCategories from "../components/ItemCategories";
import Search from "../components/Search.jsx";

// This component is responsible for showing the items on the webpage by mapping
// to an ItemItem component.
const Items = () => {

  const { 
    randomItems, 
    isLoading, 
    itemsFound, 
    nameFilter, 
    categoryFilter
  } = useSelector((store) => store.items);

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
        dispatch(setCategoryFilter(newFilter));
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

    const filterNames = (nameFilter) => {

      dispatch(setNameFilter(nameFilter));

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
        }1
      }

    }

    if (!itemsFound) {
      return (
        <div>
          <ItemCategories categories={allCategories} changeFilter={changeFilter}/>
          <Search changeFilter={filterNames}/>
          No Items Found
        </div>
      )
    }
    else{
      return (
        <div className="bg-base-100">
          <ItemCategories categories={allCategories} changeFilter={changeFilter}/>
          <Search changeFilter={filterNames}/>
          <h4 className="text-center text-3xl font-bold">
                    Items
          </h4>
            <section className="itemList">
            {randomItems.map((item) => {
              if((item.title.toLowerCase().includes(nameFilter) || nameFilter.length == 0)){
                if((categoryFilter[0].length == 1 || categoryFilter[0] == "All" )) {
                  return (
                      <ItemsItem 
                        item={item}
                        time={20}
                        key={item.id}
                      />
                  )}
                else {
                  if (item.category == categoryFilter){
                    return (
                        <ItemsItem 
                          item={item}
                          time={20}
                          key={item.id}
                          className="item"
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
