import React from "react";

const ItemCategories = ({ categories, changeFilter }) => {
  return (
    <div className="bg-base-100">
      {categories.map((category) => {
        return (
          <button
            key={category}
            onClick={() => {
              changeFilter(category);
            }}
            className="btn glass"
          >
            {" "}
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default ItemCategories;
