import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai"; // Importing delete icon

const App = () => {
  const [items, setItems] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:8080/api/gettask")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return; // Prevent adding empty tasks
    axios
      .post("http://localhost:8080/api/addtask", { todo: newTask })
      .then(() => {
        fetchTasks(); // Refresh task list
        setNewTask(""); // Clear input
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // Delete a task
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8080/api/delete/${id}`)
      .then(() => fetchTasks()) // Refresh task list
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <div>
          {items.length > 0 ? (
            items.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center bg-gray-50 border rounded-md p-3 mb-2 shadow-sm"
              >
                <span className="text-lg">{task.todo}</span>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <AiFillDelete size={24} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
