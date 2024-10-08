import React from "react";

const MenuTitle = ({ title }) => {
    return (
        <div>
            <h2>
                {title ? title : "Invalid" }
            </h2>
        </div>
    )
}

export default MenuTitle