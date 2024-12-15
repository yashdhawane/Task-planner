const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectToDatabase = require("./db/db");
const path = require('path');
const Task = require("./db/Schema");
dotenv.config();
const fs = require('fs');
const app = express();
const PORT=process.env.PORT || 3000;


app.use(cors());
app.use(express.json());



try {
    connectToDatabase();
} catch (error) {
    console.error(error);
}


app.get("/", async(req, res) => {
 const AllTask= await Task.find({})
 return res.status(200).json(AllTask);
});

app.post("/add", async (req, res) => {
    const {entityname, tasktype, date, phone, contactperson, status,notes} = req.body;
   console.log(entityname, tasktype, date, phone, contactperson, status,notes);

   const newTask = await Task.create({
    entityname, 
    tasktype, 
    date, 
    phone, 
    contactperson, 
    status,
    notes
});

return res.status(201).json({ 
    message: "Content created",
    task: newTask 
});
})

app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
   const respnse= await Task.findByIdAndDelete(id);
   console.log(respnse)
    return res.status(200).json({ message: "Task deleted" });
  });

app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { entityname, tasktype, date, phone, contactperson, status, notes } = req.body;
    console.log(entityname, tasktype, date, phone, contactperson, status, notes);
    const response = await Task.findByIdAndUpdate(id, { entityname, tasktype, date, phone, contactperson, status, notes });
    console.log(response);
    return res.status(200).json({ message: "Task updated", task: response });
  });

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
