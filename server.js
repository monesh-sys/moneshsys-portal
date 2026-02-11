const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

// CONNECT TO MONGODB
mongoose.connect("YOUR_MONGODB_LINK");

// EMPLOYEE MODEL
const Employee = mongoose.model("Employee", {
  empId: String,
  name: String,
  password: String,
  role: String
});

// LOGIN API
app.post("/login", async (req, res) => {
  const { empId, password } = req.body;

  const user = await Employee.findOne({ empId });

  if (!user) return res.json({ success: false });

  const valid = await bcrypt.compare(password, user.password);

  if (valid) {
    res.json({ success: true, name: user.name, role: user.role });
  } else {
    res.json({ success: false });
  }
});

// ADD EMPLOYEE (Admin Only)
app.post("/add-employee", async (req, res) => {
  const { empId, name, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const newEmp = new Employee({
    empId,
    name,
    password: hashed,
    role: "employee"
  });

  await newEmp.save();
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
