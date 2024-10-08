import React from 'react';
import Image from "./Image";
import Title from "./Title";
import Author from "./Author";

const Book = (props) => {

  const { title, subtitle, authors, imageLinks } = props;

  return (
    <article className="book">
      <Image thumbnail={imageLinks.thumbnail} title={title}/>
      <Title title={title} subtitle={subtitle}/>
      <Author name={authors} />
    </article>
  )
}

export default Book;
