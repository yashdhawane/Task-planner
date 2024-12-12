const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    entityname: String,
    tasktype: String,
    date: Date,
    phone: Number,
    contactperson: String,
    notes: { type: String, required: false },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    }
});

module.exports = mongoose.model("Task", taskSchema);    