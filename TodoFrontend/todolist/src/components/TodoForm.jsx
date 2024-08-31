import React, { useEffect, useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import axios from 'axios';

function TodoForm() {
  const [todo, setTodo] = useState({
    text: ''
  });
  const { addTodo } = useTodo();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const handleTodoForm = async (e) => {
    e.preventDefault();

    try {
      // Create the JSON payload
      const jsonTodo = {
        text: todo.text
      };

      // Make the API call with JSON payload
      const response = await axios.post('http://localhost:8000/api/v1/todos/upload', jsonTodo, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      

      // Clear the form after successful submission
      setTodo({
        text: ''
      });

      // Optionally call the context `addTodo` function
      addTodo({ todoText: todo.text, completed: false });

    } catch (error) {
      console.error('Error uploading todo:', error);
    }
  };

  return (
    <form onSubmit={handleTodoForm} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo.text}
        name="text"
        onChange={handleChange}
        required
      />
      <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
