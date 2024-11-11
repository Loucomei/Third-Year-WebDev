import db from "../db/db.js";

// Get all items from the database
const getAllItems = async () => {
  try {
    const items = await db("items").select("*");
    return items;
  } catch (error) {
    console.error("Error getting items:", error);
    throw error;
  }
};

//gets one item from the database by the item_id, it recives an id from front end and
//returns the item with that id
const getOneItem = async (item_id) => {
  console.log(item_id);
  try {
    const item = await db("items").where("item_id", item_id).select("*");
    return item;
  } catch (error) {
    console.error("Error getting item:", error);
    throw error;
  }
};

//updates the price of the item that is set by the API, the function recives id from the request
//checks if the id already exist in the database, if it does it updates the price of the item
//if it does not exist it inserts the item into the database
const updatePrice = async (item_id, price) => {
  const item = { item_id: item_id, price: price };
  try {
    const check = await db("items").where("item_id", item_id).select("*");
    if (check.length === 0) {
      const result = await db("items").insert(item).returning("*");
      return result;
    } else {
      console.log(check);

      const result = await db("items")
        .where("id", check[0].id)
        .update("price", price);
      return result;
    }
  } catch (error) {
    console.error("Error updating price:", error);
    throw error;
  }
};

export { updatePrice, getAllItems, getOneItem };
