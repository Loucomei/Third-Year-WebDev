import React from "react"

const ItemCategories = ({ categories }) => {

    return (
        <div>
            {categories.map((category) => {
                return (
                    <button 
                        key={category}
                    > {category}
                    </button>
                )
            })}
        </div>
    )
}

export default ItemCategories;