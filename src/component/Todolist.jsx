import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === '') {
      return;
    }

    const newTodoItem = {
      userId: 1, 
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(newTodoItem),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())



      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo('');
      });
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTodos.find((todo) => todo.id === id)),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => setTodos(updatedTodos));
  };

  const deleteTodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    });
  };

  return (
      <div className="container" style={{ marginTop : '90px'}}>    
      <div className='d-flex justify-content-between align-items-center'>
        <input
          type="text"
          placeholder="Add a new to-do"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="d-flex w-100 py-3 px-5 border rounded-pill me-2"
        />
        <button onClick={addTodo} className='bg-danger text-white border-2 rounded-pill px-4 py-2'>Add</button>
      </div>
      <ul className='d-flex flex-column py-3'>
        {todos.map((todo) => (
          <li key={todo.id} style={{ backgroundColor: todo.completed ? 'aqua' : ''}} className={`d-flex justify-content-between align-items-center border border-3 mb-3 rounded-3 px-3 py-3 ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className='me-3'
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className='bg-danger border rounded-3 text-white py-3 px-3'><i class="bi bi-trash3-fill"></i></button>
          </li>
        ))}
      </ul>
      </div>
  );
}

export default App;
