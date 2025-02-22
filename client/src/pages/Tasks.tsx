import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'
import { fetchTasks, addTask, deleteTask, updateTask } from '../services/taskService';
import styles from '../styles/tasks.module.css'
import { tasksTemp } from '../utils/tasks';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';


interface Task {
  id: number;
  description: string;
  completed: boolean;
  created_at: string;
  user_id: number;
}


const Tasks = () => {
    const { token, logout } = useContext(AuthContext)!;
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [openModal, setOpenModal] = useState(false)
    const [updatedTaskDesc, setUpdatedTaskDesc] = useState('');
    const [editTask, setEditTask] = useState<{ id: number; description: string } | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
      const loadTasks = async () => {
           if (!token)
             return;
           try {
            const fetchedTasks: Task[] = await fetchTasks(token);
            console.log("Fetched Tasks:", fetchedTasks);
    
            setTasks(fetchedTasks); 
          } catch (error) {
          console.error("Error loading tasks:", error);
        }
      };
  
      loadTasks();
    }, [token]);

    // Add new task
    const handleAddTask = async (e: React.FormEvent) => {
      e.preventDefault();
      const task = await addTask(token!, newTask);
      if (task) setTasks([...tasks, task]);
      setNewTask(''); 
    };

    // Delete task
    const handleDeleteTask = async (taskId: number) => {
      try {
        const result = await deleteTask(token!, taskId);
           setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));   
      } catch (error) {
        console.error('Unexpected error in handleDeleteTask:', error);
      }
    };

    //opens modal    
    const handleEditTask = (task: { id: number; description: string }) => {
      setEditTask(task);
      setUpdatedTaskDesc(task.description);
      setOpenModal(true);
    };

    const handleLogout = () => {
      logout(); 
      navigate('/login'); 
    };


  // Handle task update
  const handleUpdateTask = async () => {
    if (editTask) {
      const updatedTask = await updateTask(token!, editTask.id, updatedTaskDesc);
      if (updatedTask) {
        setTasks(tasks.map((task) => (task.id === editTask.id ? updatedTask : task)));
      }
      setOpenModal(false);
    }
  };

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 550,
      height:250,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 4,
      display:'flex',
      gap:'10px',
      flexDirection:'column',
      p: 4,
    };


  return (
    <div  className={styles.container}>
      <div className={styles.containerInner}>
        <h1>Tasks</h1>
        <form className={styles.createTask} onSubmit={handleAddTask}>
            <p><label>Enter New Task:</label></p>
            <textarea rows={5} 
                      required 
                      placeholder="New Task" 
                      value={newTask}
                      className={styles.textarea}
                      onChange={(e) => setNewTask(e.target.value)}
             />
            <button type='submit' className={styles.button}>Add Task</button> 
        </form>
        <div className={styles.viewTask}>
          {tasks.map((task, index) => (
            <div key={index} className={styles.task}>
              <p>{task.description}</p> 
              <div className={styles.actionsIco}>
                <button className={styles.actionBtn} onClick={() => handleEditTask(task)}>Edit</button>
                <button className={styles.actionBtn} onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
              <Modal
                open={openModal}
                onClose={handleEditTask}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                {editTask && (
                  <>
                    <h1>Editing Task ID: {editTask.id}</h1>
                    <textarea
                      rows={5}
                      value={updatedTaskDesc}
                      onChange={(e) => setUpdatedTaskDesc(e.target.value)}
                    />
                    <button onClick={handleUpdateTask} style={{height:'40px'}}>Update Task</button>
                    <button onClick={()=>setOpenModal(false)} style={{height:'40px'}}>Cancel</button>
                  </>
                )}
                </Box>
              </Modal>
            
            </div>
          ))}
        </div>

        <button className={styles.button} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Tasks
