import { useDispatch, useSelector } from 'react-redux';
import { todoRemoved, todoToggled } from './todosSlice';
function TodoList() {
  const todos = useSelector(state => state.todos.items);
  const dispatch = useDispatch();
  if (todos.length === 0) {
    return <p className="empty">Локальних завдань поки немає.</p>;
  }
  return (
    <ul className="task-list">
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <button
            className="task-title"
            type="button"
            onClick={() => dispatch(todoToggled(todo.id))}
          >
            {todo.text}
          </button>
          <button
            className="danger"
            type="button"
            onClick={() => dispatch(todoRemoved(todo.id))}
          >
            Видалити
          </button>
        </li>
      ))}
    </ul>
  );
}
export default TodoList;
 