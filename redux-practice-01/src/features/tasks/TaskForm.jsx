import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from './tasksSlice';
function TaskForm() {
  const [title, setTitle] = useState('');
  const mutationStatus = useSelector(
    state => state.tasks.mutationStatus
  );
  const dispatch = useDispatch();
  const isSaving = mutationStatus === 'loading';
  const handleSubmit = async event => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle || isSaving) {
      return;
    }
    try {
      await dispatch(createTask(trimmedTitle)).unwrap();
      setTitle('');
    } catch {
      // Текст помилки вже зберігається у Redux.
    }
  };
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="server-task-title">
        Нове серверне завдання
      </label>
      <div className="form-row">
        <input
          id="server-task-title"
          type="text"
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="Назва завдання"
          disabled={isSaving}
        />
        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Збереження...' : 'Додати через API'}
        </button>
      </div>
    </form>
  );
}
export default TaskForm;
 