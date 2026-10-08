import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTask,
  fetchTasks,
  updateTask
} from './tasksSlice';
 
function TaskList() {
  const { items, status, error } = useSelector(
    state => state.tasks
  );
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);
 
  if (status === 'loading') {
    return <p className="status">Завантаження завдань...</p>;
  }
 
  if (status === 'failed') {
    return (
      <div>
        <p className="error">Помилка: {error}</p>
        <button type="button" onClick={() => dispatch(fetchTasks())}>
          Спробувати ще раз
        </button>
      </div>
    );
  }
 
  if (items.length === 0) {
    return <p className="empty">Серверних завдань немає.</p>;
  }
 
  return (
    <ul className="task-list">
      {items.map(task => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          <button
            className="task-title"
            type="button"
            onClick={() => dispatch(updateTask(task))}
          >
            {task.title}
          </button>
 
          <button
            className="danger"
            type="button"
            onClick={() => dispatch(deleteTask(task.id))}
          >
            Видалити
          </button>
        </li>
      ))}
    </ul>
  );
}
 
export default TaskList;