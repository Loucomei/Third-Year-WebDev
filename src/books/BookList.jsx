import React from "react";
import { useState } from "react";
import Book from "./Book";
import MenuTitle from "../components/MenuTitle";
import MenuCategories from "../components/MenuCategories";
import { data } from "./data.js";

const { items } = data;
const menuTitle = "Books Menu";
const tempAuthors = items.map((item) =>{
  return item.volumeInfo.authors;
})
const tempSet = new Set(tempAuthors.flat());
const allAuthors = ["All", ...tempSet];

const BookList = () => {

  const [authors, setAuthors] = useState(allAuthors);
  const [author, setAuthor] = useState("All");

  const filterAuthor = (author) => {
    const newItems = allAuthors.filter((item) => {
      return item === author;
    });
    setAuthor(newItems);
  };

  return (
    <>
      <MenuTitle title="Books Menu"/>
      <MenuCategories categories={authors} filterAuthor={filterAuthor} />
      <section className="bookList">
        {items.map((item) => {

          const { volumeInfo } = item;

          if(author[0].length == 1 || author[0] == "All") {
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
