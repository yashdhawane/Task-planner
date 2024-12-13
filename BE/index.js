const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectToDatabase = require("./db/db");
const Task = require("./db/Schema");
dotenv.config();

const app = express();

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
