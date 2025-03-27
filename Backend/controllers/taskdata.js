import Task from "../models/task.js";  // Import the Task model

// Controller for adding a task
const taskdata = async (req, res) => {
  const { todo } = req.body;  // Get 'todo' from the request body

  if (!todo) {
    return res.status(400).json({ error: "Todo is required" });  // Ensure 'todo' is provided
  }

  try {
    // Create a new task using the Task model
    const newTask = new Task({ todo });

    // Save the task to MongoDB
    await newTask.save();

    // Return all tasks as a response
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add task' });
  }
};

const gettask = async (req, res) => {

try {

  return res.json(await Task.find());
  
  
} catch (error) {
  console.log(error);
}


};

const deletetask = async (req, res) => {

  try {
  
    await Task.findByIdAndDelete(req.params.id);
    return res.json(await Task.find());
    
    
  } catch (error) {
    console.log(error);
  }
  
  
  };
export { taskdata,gettask,deletetask };
