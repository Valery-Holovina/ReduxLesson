//npm create vite@latest redux-practice-01 -- --template react
// ESLint -> Yes
// cd folder
//npm install @reduxjs/toolkit react-redux
//npm run dev

 

import { useState } from 'react'
import TodoForm from './features/todos/TodoForm'
import TodoList from './features/todos/TodoList'
import TaskForm from './features/tasks/TaskForm'
import TaskList from './features/tasks/TaskList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app">
      <h1>Redux + React</h1>
      <p>Практична робота</p>
      <hr />
      <section className="card">
        <h2>Приклад 1. Локальний Todo</h2>
        <p>
          Завдання зберігаються у Redux тільки під час роботи сторінки.
        </p>
        <TodoForm />
        <TodoList />
      </section>
      <section className="card">
          <h2>Приклад 2. Task Manager API</h2>
          <p>
            Асинхронні actions, завантаження та помилки.
          </p>
          <TaskForm />
          <TaskList />
        </section>
    </main>
  )
}

export default App
