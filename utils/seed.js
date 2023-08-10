// Imports
const connection = require("../config/connection");
const mongoose = require("mongoose");
const { User, Thought, Reaction } = require("../models");

// Seed data
const users = [
  {
    username: "Ryan",
    email: "ryan@gmail.com",
    thought: [],
  },
];

console.log(connection);

// Connects to server
connection.once("open", async () => {
  console.log("connected");

  // Drop existing table
  await User.deleteMany({});

  // Adds seed data to database
  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
