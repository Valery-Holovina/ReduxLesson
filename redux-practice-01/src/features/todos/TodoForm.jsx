import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoAdded } from './todosSlice';
function TodoForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }
    dispatch(todoAdded(trimmedText));
    setText('');
  };
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="todo-text">Нове локальне завдання</label>
      <div className="form-row">
        <input
          id="todo-text"
          type="text"
          value={text}
          onChange={event => setText(event.target.value)}
          placeholder="Наприклад, повторити Redux"
        />
        <button type="submit">Додати</button>
      </div>
    </form>
  );
}
export default TodoForm;
 