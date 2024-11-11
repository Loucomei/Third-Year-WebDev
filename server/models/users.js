import db from "../db/db.js";
import bcrypt from "bcrypt";

//the function gets all the users from the database and returns them
const getAllUsers = async () => {
  try {
    const result = await db
      .select("*")
      .from("user")
      .orderBy([{ column: "id", order: "asc" }]);
    console.log("Fetched users: ", result);
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

//the function adds a user to the database, it recives a user object from the front end
const addUser = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const result = await db("user").insert(user).returning("*");
    console.log("Added user:", result);
    return result;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

//the function deletes a user from the database, it recives an id from the front end
const deleteUser = async (id) => {
  try {
    const result = await db("user").where({ id }).del().returning("*");
    console.log("Deleted user:", result);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

//the function updates a user in the database, it recives an id and an updated user object from the front end
const updateUser = async (id, updatedUser) => {
  try {
    const result = await db("user")
      .where({ id })
      .update(updatedUser)
      .returning("*");
    console.log("Updated user:", result);
    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

//the function gets a user by email or username from the database, it recives an identifier from the front end
const getUserByEmailOrUsername = async (identifier) => {
  try {
    const result = await db("user")
      .where({ email: identifier })
      .orWhere({ username: identifier })
      .returning("*");
    return result;
  } catch (error) {
    console.error("Error getting user by email or username:", error);
    throw error;
  }
};

export {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  getUserByEmailOrUsername,
};
