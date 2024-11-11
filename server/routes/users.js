import express from "express";
import {
  getUsers,
  createUser,
  removeUser,
  modifyUser,
  loginUser,
} from "../controllers/users.js";

const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

router.get("/", getUsers);
router.post("/add", createUser);
router.delete("/:id", removeUser);
router.put("/:id", modifyUser);
router.post("/login", loginUser);

// Protected route
router.get("/protected-route", isAuthenticated, (req, res) => {
  res.send("This is a protected route");
});

export default router;
