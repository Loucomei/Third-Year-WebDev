import { updatePrice, getAllItems, getOneItem } from "../models/items.js";

//gets all the items in the database
async function getItems(req, res) {
  try {
    const items = await getAllItems();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//gets a single item from the database
async function getItem(req, res) {
  try {
    const { item_id } = req.query;

    const result = await getOneItem(item_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//updates the price of an item in the database
async function updateItemPrice(req, res) {
  try {
    const { item_id, price } = req.body;
    const result = await updatePrice(item_id, price);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export { updateItemPrice, getItems, getItem };
