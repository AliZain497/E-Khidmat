import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;
    const newEmployee = new Employee({ name, email, phone, position });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add employee" });
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch employees" });
  }
});

export default router;
