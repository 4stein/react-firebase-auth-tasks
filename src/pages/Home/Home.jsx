import React, { useLayoutEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../../services/firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Task } from '../../components';

const Home = ({ removeToken }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('normal');

  const [addTask, setAddTask] = useState(false);

  useLayoutEffect(() => {
    const q = query(collection(db, 'tasks'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let tasksArr = [];
      querySnapshot.forEach(doc => {
        tasksArr.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksArr);
    });
    return () => unsubscribe();
  }, []);

  // Create task
  const createTodo = async e => {
    e.preventDefault(e);
    if (title === '') {
      alert('Please enter a valid task');
      return;
    }
    await addDoc(collection(db, 'tasks'), {
      title,
      text,
      priority,
      done: false,
    });
    setTitle('');
    setText('');
    setPriority('normal');
  };

  // Update done in task firebase
  const toggleComplete = async task => {
    await updateDoc(doc(db, 'tasks', task.id), {
      done: !task.done,
    });
  };

  // Update task in firebase
  const updateTask = async (task, title, text, priority, done) => {
    await updateDoc(doc(db, 'tasks', task.id), {
      title,
      text,
      priority,
      done,
    });
  };

  // Delete task
  const deleteTodo = async id => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        removeToken();
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div>
              <div>
                <div className="home-title">
                  <h2>Tasks App</h2>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className={`btn ${addTask ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => setAddTask(!addTask)}
                >
                  {addTask ? '-' : '+'}
                </button>
                <br />
                <br />
                {addTask && (
                  <form onSubmit={createTodo}>
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      type="text"
                      placeholder="Task Title"
                    />{' '}
                    <input
                      value={text}
                      onChange={e => setText(e.target.value)}
                      type="text"
                      placeholder="Task Text"
                    />{' '}
                    <label>
                      Pick a priority:{' '}
                      <select
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                      >
                        <option value="normal">Normal</option>
                        <option value="hot">Hot</option>
                        <option value="low">Low</option>
                      </select>
                    </label>{' '}
                    <button
                      className="btn btn-success"
                      disabled={!title.length || !text.length}
                    >
                      Save
                    </button>
                  </form>
                )}

                <br />
                <br />

                {tasks.length < 1 ? (
                  <div>Please create tasks</div>
                ) : (
                  <div className="row">
                    <div className="col-lg-12">
                      <p>{`You have ${tasks.length} tasks`}</p>
                    </div>
                    <div className="col-lg-3">
                      <h3 style={{ color: 'red' }}>hot</h3>
                      <ul className="tasks-box">
                        {tasks
                          .filter(
                            fTask => !fTask.done && fTask.priority === 'hot'
                          )
                          .map(task => (
                            <Task
                              key={task.id}
                              task={task}
                              deleteTodo={deleteTodo}
                              toggleComplete={toggleComplete}
                              updateTask={updateTask}
                              color="red"
                            />
                          ))}
                      </ul>
                    </div>
                    <div className="col-lg-3">
                      <h3 style={{ color: 'blue' }}>normal</h3>
                      <ul className="tasks-box">
                        {tasks
                          .filter(
                            fTask => !fTask.done && fTask.priority === 'normal'
                          )
                          .map(task => (
                            <Task
                              key={task.id}
                              task={task}
                              deleteTodo={deleteTodo}
                              toggleComplete={toggleComplete}
                              updateTask={updateTask}
                              color="blue"
                            />
                          ))}
                      </ul>
                    </div>
                    <div className="col-lg-3">
                      <h3 style={{ color: 'gray' }}>low</h3>
                      <ul className="tasks-box">
                        {tasks
                          .filter(
                            fTask => !fTask.done && fTask.priority === 'low'
                          )
                          .map(task => (
                            <Task
                              key={task.id}
                              task={task}
                              deleteTodo={deleteTodo}
                              toggleComplete={toggleComplete}
                              updateTask={updateTask}
                              color="gray"
                            />
                          ))}
                      </ul>
                    </div>
                    <div className="col-lg-3">
                      <h3 style={{ color: 'green' }}>done</h3>
                      <ul className="tasks-box">
                        {tasks
                          .filter(fTask => fTask.done)
                          .map(task => (
                            <Task
                              key={task.id}
                              task={task}
                              deleteTodo={deleteTodo}
                              toggleComplete={toggleComplete}
                              updateTask={updateTask}
                              color="green"
                            />
                          ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
