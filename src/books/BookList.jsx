import React from "react";
import { useState } from "react";
import Book from "./Book";
import MenuTitle from "../components/MenuTitle";
import MenuCategories from "../components/MenuCategories";
import { data } from "./data.js";
import Search from "../components/Search.jsx";

const { items } = data;
const menuTitle = "Books Menu";
const tempAuthors = items.map((item) =>{
  return item.volumeInfo.authors;
})

const tempItemNames = items.map((item) =>{
  return item.volumeInfo.title;
})

const tempSet = new Set(tempAuthors.flat());

const tempItemNamesSet = new Set(tempItemNames.flat());


const someNames = [...tempItemNamesSet]
const allProducts = ["All", ...tempSet];

const BookList = () => {

  const [authors, setProducts] = useState(allProducts);
  const [author, setProduct] = useState("All");

  const changeFilter = (author) => {
    console.log(author)
    const newItems = someNames.filter((item) => {
      return item.toLowerCase().includes(author);
    });
    console.log(newItems)
    if(newItems.length != 0){
      setProduct(newItems);
    }
  };

  return (
    <>
      <MenuTitle title="Books Menu"/>
      <MenuCategories categories={authors} changeFilter={changeFilter} />
      <Search changeFilter={changeFilter}/>
      <section className="bookList">
        {items.map((item) => {

          const { volumeInfo } = item;

          if((author[0].length == 1 || author[0] == "All") && author.length != 0) {
            const { title, subtitle, authors, imageLinks } = volumeInfo;
            return (
                <Book 
                  title={title}
                  subtitle={subtitle}
                  authors={authors}
                  imageLinks={imageLinks}
                  key={item.id}
                />
            )}
          else {
            if (author[0].includes(volumeInfo.authors[0])){
              const { title, subtitle, imageLinks } = volumeInfo;
              return (
                  <Book 
                    title={title}
                    subtitle={subtitle}
                    authors={author}
                    imageLinks={imageLinks}
                    key={item.id}
                  />
              )
            }
          }

        })}
      </section>
    </>
  )
}

export default BookList
