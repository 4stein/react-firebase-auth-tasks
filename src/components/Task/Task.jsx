import React, { useState } from 'react';

const Task = ({ task, deleteTodo, toggleComplete, updateTask, color }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    const title = event.target.title.value;
    const text = event.target.text.value;
    const priority = event.target.priority.value;
    const done = event.target.done.checked;

    console.log(title, text, priority, done);

    setIsEdit(!isEdit);

    updateTask(task, title, text, priority, done);
  };

  return (
    <>
      {!isEdit ? (
        <li className={`in-progress ${color}`}>
          <div className="task-title">
            <h4>{task.title}</h4>
            <div>
              <button
                className="btn btn-light"
                onClick={() => setIsEdit(!isEdit)}
              >
                ✎
              </button>
              <button
                className="btn btn-light"
                onClick={() => deleteTodo(task.id)}
              >
                X
              </button>
            </div>
          </div>

          <p>{task.text}</p>
          <p style={{ color: color }}>{task.priority}</p>
          <label>
            completed{' '}
            <input
              onChange={() => toggleComplete(task)}
              type="checkbox"
              checked={task.done ? 'checked' : ''}
            />
          </label>
        </li>
      ) : (
        <li className={`in-progress ${color}`}>
          <form className="task-edit" onSubmit={handleSubmit}>
            <div className="task-title">
              <input type="text" name="title" defaultValue={task.title} />
              <div>
                <button className="btn btn-success" type="submit">
                  ✓
                </button>
              </div>
            </div>
            <input type="text" name="text" defaultValue={task.text} /> <br />
            <select name="priority" defaultValue={task.priority}>
              <option value="normal">Normal</option>
              <option value="hot">Hot</option>
              <option value="low">Low</option>
            </select>
            <br />
            <label>
              completed{' '}
              <input name="done" defaultChecked={task.done} type="checkbox" />
            </label>
          </form>
        </li>
      )}
    </>
  );
};

export default Task;
