import crypto from "crypto";
import { getData, saveData } from "../utils/useData.js";

export const getAllusers = async (req, res) => {
  try {
    const { users } = getData();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const getUserById = (req, res) => {
  try {
    const { users } = getData();
    const user = users.find((u) => u.id === req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

export const createUser = (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const data = getData();
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      phone: phone || "",
    };

    data.users.push(newUser);
    saveData(data);
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const deleteUser = (req, res) => {
  try {
    const userId = req.params.id;
    let data = getData();

    const userIndex = data.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    data.users.splice(userIndex, 1);
    data.wallets.filter((w) => w.user_id !== userId);

    saveData(data);

    res.status(200).json({
      status: "success",
      message: "User and their wallets deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting user",
      error: error.message,
    });
  }
};
export const updateUser = (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone } = req.body;

    let data = getData();
    const index = data.users.findIndex((u) => u.id === userId);

    if (index === -1) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const updatedUser = {
      ...data.users[index],
      name: name || data.users[index].name,
      email: email || data.users[index].email,
      phone: phone || data.users[index].phone,
      id: userId,
    };

    data.users[index] = updatedUser;
    saveData(data);

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error updating user",
      error: error.message,
    });
  }
};
