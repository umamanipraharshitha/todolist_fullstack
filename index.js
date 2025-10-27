

const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const uri = "your_url"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

app.use(cors());
app.use(bodyParser.json());

let collection;

// Connect to MongoDB and initialize collection
async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("todoDB");
    collection = db.collection("tasks");
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if the DB connection fails
  }
}

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await collection.find().toArray();
    res.json(tasks || []);  // Ensure empty array if no tasks found
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Add new task
app.post("/tasks", async (req, res) => {
  try {
    const task = { text: req.body.text, completed: false };
    const result = await collection.insertOne(task);
    res.json(result.ops[0]);  // Return the inserted task
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Error adding task" });
  }
});

// Mark task complete
app.put("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: true } }
    );
    if (result.modifiedCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error marking task complete:", error);
    res.status(500).json({ message: "Error marking task complete" });
  }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

// Update task text
app.put("/tasks/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { text } = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { text } }  // Update task text
    );
    if (result.modifiedCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
});

// Connect to the database and start the server
connectToDatabase()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });



