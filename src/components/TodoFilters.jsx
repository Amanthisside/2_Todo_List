function TodoFilters({ filter, sortBy, onFilterChange, onSortChange, stats }) {
  const filterOptions = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed }
  ]

  const sortOptions = [
    { key: 'newest', label: 'Newest First' },
    { key: 'oldest', label: 'Oldest First' },
    { key: 'alphabetical', label: 'A-Z' },
    { key: 'active-first', label: 'Active First' },
    { key: 'completed-first', label: 'Completed First' }
  ]

  return (
    <div className="filters-container">
      <div className="filters">
        <div className="filter-group">
          <label className="filter-label">Filter:</label>
          <div className="filter-buttons">
            {filterOptions.map(option => (
              <button
                key={option.key}
                className={`filter-btn ${filter === option.key ? 'active' : ''}`}
                onClick={() => onFilterChange(option.key)}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>
        
        <div className="sort-group">
          <label className="sort-label">Sort:</label>
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default TodoFilters