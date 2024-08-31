import { useEffect, useState, useCallback, useMemo } from "react";
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm';
import TodoItem from "./components/TodoItem";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (async (todo) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/todos/', todo);
      const newTodo = response.data.data;
      setTodos((prev) => [newTodo, ...prev]); // Add the new todo to the state
    } catch (error) {
      console.error("Failed to add todo to the server:", error);
    }
  }, []); // Empty dependency array ensures the function is memoized and not recreated on every render

  const updateTodo = useCallback(async (id, updatedTodo) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/todos/u/${id}`, { newText: updatedTodo });
      const updatedTodoItem = response.data.data;
      setTodos((prev) => prev.map(todo => todo._id === id ? updatedTodoItem : todo));
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  }, []);

  const deleteTodo = useCallback(async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/todos/d/${id}`);
      setTodos((prev) => prev.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }, []);

  const toggleComplete = useCallback(async (id) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/todos/t/${id}`);
      const updatedTodo = response.data.data;
      setTodos((prev) => prev.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (error) {
      console.error("Failed to toggle todo completion:", error);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/todos/');
        setTodos(response.data['data']);
      } catch (error) {
        console.error("Failed to fetch todos from the server:", error);
      }
    }
    fetchData();
  }, [addTodo]); // Empty array ensures fetchData runs only once when the component mounts

  // Memoizing the context value to prevent unnecessary re-renders of children
  const todoContextValue = useMemo(() => ({
    todos, updateTodo, deleteTodo, toggleComplete
  }), [todos]);

  return (
    <TodoProvider value={todoContextValue}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo._id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
