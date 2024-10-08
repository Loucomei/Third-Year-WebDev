import React from "react"

const MenuCategories = ({ categories, filterAuthor}) => {

    return (
        <div>
            {categories.map((category) => {
                return (
                    <button 
                        key={category}
                        onClick={() => {
                            filterAuthor(category);
                        }}
                    > {category}
                    </button>
                )
            })}
        </div>
    )
}

export default MenuCategories;