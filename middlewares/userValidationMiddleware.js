import { body, validationResult } from "express-validator";
import { getData } from "../utils/useData.js";

export const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.params.id;

  if (!name || !email) {
    return res.status(400).json({
      status: "fail",
      message: " Name and Email are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "fail",
      message: " Invalid email format",
    });
  }

  try {
    const { users } = getData();

    const emailExists = users.find((u) => u.email === email && u.id !== userId);

    if (emailExists) {
      return res.status(400).json({
        status: "fail",
        message: "Email is already in use",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (name.length < 3) {
    return res.status(400).json({
      status: "fail",
      message: "Name must be at least 3 characters",
    });
  }

  next();
};
