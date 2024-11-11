import {
  getAllUsers,
  updateUser,
  addUser,
  deleteUser,
  getUserByEmailOrUsername,
} from "../models/users.js";
import bcrypt from "bcrypt";

//gets all the users from database
async function getUsers(req, res) {
  try {
    const results = await getAllUsers();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//creates a new user to database
async function createUser(req, res) {
  try {
    const user = req.body;
    const result = await addUser(user);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//removes user from database
async function removeUser(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//updates user in database
async function modifyUser(req, res) {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    const result = await updateUser(id, updatedUser);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//logs in user bu verifying email or username and password
async function loginUser(req, res) {
  try {
    const { identifier, password } = req.body;
    const user = (await getUserByEmailOrUsername(identifier))[0];
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.session.userId = user.id;
    res.cookie("sessionId", req.sessionID, { httpOnly: true });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export { getUsers, createUser, removeUser, modifyUser, loginUser };
