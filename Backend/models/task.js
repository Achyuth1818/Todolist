import mongoose from 'mongoose';

// Task schema definition
const taskSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Task model based on the schema
const Task = mongoose.model('Task', taskSchema);

export default Task;  // Export the model for use in other files
