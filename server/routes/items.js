import express from "express";
import { updateItemPrice, getItems, getItem } from "../controllers/items.js";

const router = express.Router();

router.post("/bid", updateItemPrice);
router.get("/", getItems);
router.get("/item_id", getItem);

export default router;
