import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [error, setError] = useState('')

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(todo.id)
    }, 200)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditText(todo.text)
    setError('')
  }

  const handleSaveEdit = () => {
    const success = onUpdate(todo.id, editText)
    if (success) {
      setIsEditing(false)
      setError('')
    } else {
      setError('Invalid task or duplicate')
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditText(todo.text)
    setError('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    } else if (diffInHours < 168) { // Less than a week
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        hour: 'numeric',
        hour12: true
      })
    }
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }

  const isValidEdit = editText.trim().length >= 3 && editText.trim().length <= 200

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="todo-content">
        <button 
          className="toggle-btn"
          onClick={() => onToggle(todo.id)}
          disabled={isEditing}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <div className="checkbox">
            {todo.completed && <span className="checkmark">✓</span>}
          </div>
        </button>
        
        <div className="todo-text-container">
          {isEditing ? (
            <div className="edit-container">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className={`edit-input ${error ? 'error' : ''}`}
                maxLength={200}
                autoFocus
              />
              {error && (
                <div className="edit-error">{error}</div>
              )}
              <div className="edit-actions">
                <button 
                  className="save-btn"
                  onClick={handleSaveEdit}
                  disabled={!isValidEdit}
                  title="Save changes"
                >
                  ✓
                </button>
                <button 
                  className="cancel-btn"
                  onClick={handleCancelEdit}
                  title="Cancel editing"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="todo-text" onDoubleClick={handleEdit}>
                {todo.text}
              </span>
              <div className="todo-meta">
                <span className="todo-date">{formatDate(todo.createdAt)}</span>
                {todo.completed && todo.completedAt && (
                  <span className="completed-date">
                    Completed {formatDate(todo.completedAt)}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      {!isEditing && (
        <div className="todo-actions">
          <button 
            className="edit-btn"
            onClick={handleEdit}
            aria-label="Edit todo"
            title="Double-click text to edit"
          >
            <span className="edit-icon">✎</span>
          </button>
          <button 
            className="delete-btn"
            onClick={handleDelete}
            aria-label="Delete todo"
            title="Delete task"
          >
            <span className="delete-icon">×</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default TodoItem