import { useState } from 'react'

function AddTodo({ onAdd }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    const trimmedText = text.trim()
    
    // Validation
    if (!trimmedText) {
      setError('Please enter a task')
      return
    }
    
    if (trimmedText.length < 3) {
      setError('Task must be at least 3 characters long')
      return
    }
    
    if (trimmedText.length > 200) {
      setError('Task must be less than 200 characters')
      return
    }

    const success = onAdd(text)
    if (success) {
      setText('')
      setError('')
    } else {
      setError('This task already exists')
    }
  }

  const handleInputChange = (e) => {
    setText(e.target.value)
    if (error) setError('') // Clear error when user starts typing
  }

  const isValid = text.trim().length >= 3 && text.trim().length <= 200

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="What needs to be done?"
          className={`add-todo-input ${error ? 'error' : ''}`}
          maxLength={200}
          autoFocus
        />
        <button 
          type="submit" 
          className="add-todo-btn"
          disabled={!isValid}
          title={!isValid ? 'Task must be 3-200 characters' : 'Add task'}
        >
          <span className="add-icon">+</span>
          Add Task
        </button>
      </div>
      
      <div className="input-feedback">
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}
        
        <div className="char-count">
          <span className={text.length > 180 ? 'warning' : text.length > 150 ? 'caution' : ''}>
            {text.length}/200 characters
          </span>
          {text.trim().length > 0 && text.trim().length < 3 && (
            <span className="min-length">Minimum 3 characters</span>
          )}
        </div>
      </div>
    </form>
  )
}

export default AddTodo