const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 9000;
app.use(express.json());
app.use(cors());

let users = [];
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send("Name and email are required!");
  }

  const newUser = { id: Date.now().toString(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  users = users.filter((user) => user.id !== userId);
  res.send("User deleted successfully!");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
