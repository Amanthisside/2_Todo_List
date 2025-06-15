function TodoStats({ stats }) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
  
  return (
    <div className="stats-container">
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completionRate}%</span>
          <span className="stat-label">Progress</span>
        </div>
      </div>
      
      {stats.total > 0 && (
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default TodoStats