import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(todo.completed);
  const [todoMsg, setTodoMsg] = useState(todo.text);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const handleChange = (e) => {
    setTodoMsg(e.target.value);
  };

  const editTodo = () => {
    updateTodo(todo._id, todoMsg);
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo._id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'
        } ${todo.completed ? 'line-through' : ''}`}
        value={todoMsg}
        name='newText'
        onChange={handleChange}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable(true);
          }
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? '📁' : '✏️'}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo._id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
