import { useState, useEffect } from 'react'
import AddTodo from './components/AddTodo'
import TodoItem from './components/TodoItem'
import TodoFilters from './components/TodoFilters'
import TodoStats from './components/TodoStats'
  import './index.css'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todoflow-tasks')
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos))
      } catch (error) {
        console.error('Error loading todos from localStorage:', error)
        setTodos([])
      }
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todoflow-tasks', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    // Validate input
    const trimmedText = text.trim()
    if (!trimmedText) return false
    if (trimmedText.length > 200) return false
    
    // Check for duplicate tasks
    const isDuplicate = todos.some(todo => 
      todo.text.toLowerCase() === trimmedText.toLowerCase()
    )
    if (isDuplicate) return false

    const newTodo = {
      id: Date.now() + Math.random(), // More unique ID
      text: trimmedText,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'normal'
    }
    setTodos([newTodo, ...todos])
    return true
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { 
        ...todo, 
        completed: !todo.completed,
        completedAt: !todo.completed ? new Date().toISOString() : null
      } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const updateTodo = (id, newText) => {
    const trimmedText = newText.trim()
    if (!trimmedText || trimmedText.length > 200) return false
    
    // Check for duplicate (excluding current todo)
    const isDuplicate = todos.some(todo => 
      todo.id !== id && todo.text.toLowerCase() === trimmedText.toLowerCase()
    )
    if (isDuplicate) return false

    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: trimmedText } : todo
    ))
    return true
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const clearAll = () => {
    setTodos([])
  }

  const getFilteredTodos = () => {
    let filtered = [...todos]
    
    // Apply filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed)
        break
      case 'completed':
        filtered = filtered.filter(todo => todo.completed)
        break
      default:
        break
    }

    // Apply sorting
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'alphabetical':
        filtered.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()))
        break
      case 'completed-first':
        filtered.sort((a, b) => b.completed - a.completed)
        break
      case 'active-first':
        filtered.sort((a, b) => a.completed - b.completed)
        break
      default: // newest
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
    }

    return filtered
  }

  const filteredTodos = getFilteredTodos()
  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">TodoFlow</h1>
          <p className="subtitle">Stay organized, stay productive</p>
        </header>

        <div className="todo-container">
          <AddTodo onAdd={addTodo} />
          
          {todos.length > 0 && (
            <>
              <TodoStats stats={stats} />
              <TodoFilters 
                filter={filter}
                sortBy={sortBy}
                onFilterChange={setFilter}
                onSortChange={setSortBy}
                stats={stats}
              />
            </>
          )}

          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                {todos.length === 0 ? (
                  <>
                    <div className="empty-icon">📝</div>
                    <h3>No todos yet</h3>
                    <p>Add your first task above to get started</p>
                  </>
                ) : (
                  <>
                    <div className="empty-icon">✨</div>
                    <h3>No {filter} todos</h3>
                    <p>Switch to a different filter to see your tasks</p>
                  </>
                )}
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                />
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="actions">
              {stats.completed > 0 && (
                <button className="clear-btn completed" onClick={clearCompleted}>
                  Clear Completed ({stats.completed})
                </button>
              )}
              <button className="clear-btn danger" onClick={clearAll}>
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App