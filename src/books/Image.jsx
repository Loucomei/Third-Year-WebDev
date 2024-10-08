import React from 'react';



const Image = ({ thumbnail, title }) => {

  return (
    <img src={thumbnail} title={title} />
  )
}

export default Image;
