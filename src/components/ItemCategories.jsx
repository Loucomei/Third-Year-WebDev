import React from "react"

const ItemCategories = ({ categories, changeFilter }) => {

    return (
        <div>
            {categories.map((category) => {
                return (
                    <button 
                        key={category}
                        onClick={() => {
                            changeFilter(category);
                        }}
                    > {category}
                    </button>
                )
            })}
        </div>
    )
}

export default ItemCategories;