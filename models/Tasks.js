const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    tasks: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }

},
    { timestamps: true }
);

const Task = new mongoose.model('Task',taskSchema);

module.exports = Task;