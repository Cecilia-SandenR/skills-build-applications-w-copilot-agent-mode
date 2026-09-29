export function PageHeading({ count, description, eyebrow, title }) {
  return (
    <div className="page-heading">
      <div>
        <p className="page-eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      <div className="count-mark" aria-label={`${count} records`}>
        <strong>{count}</strong>
        <span>RECORDS</span>
      </div>
    </div>
  )
}

export function CollectionFeedback({ error, isEmpty, isLoading, onRetry }) {
  if (isLoading) return <div className="feedback-panel" role="status">Loading records...</div>
  if (error) {
    return (
      <div className="feedback-panel is-error" role="alert">
        <span>{error}</span>
        <button className="retry-button" onClick={onRetry} type="button">Retry</button>
      </div>
    )
  }
  if (isEmpty) return <div className="feedback-panel is-empty">No records to display yet.</div>
  return null
}
