import express from 'express';
import { taskdata,gettask, deletetask } from '../controllers/taskdata.js';  // Import the taskdata controller

const router = express.Router();

// Route to handle task addition,deletion,gettting
router.post('/addtask', taskdata);
router.get('/gettask', gettask);
router.delete('/delete/:id', deletetask);
export default router;


//MVC architecture