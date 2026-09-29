import { useCollection } from '../hooks/useCollection.js'
import { CollectionFeedback, PageHeading } from './ResourceStates.jsx'
import { displayReference, formatDate, formatLabel } from '../utils/resourceFormat.js'

function Activities() {
  const { data, error, isLoading, reload } = useCollection('activities')

  return (
    <section className="resource-page" aria-label="Activities">
      <PageHeading count={data.length} description="Recent training sessions logged across your teams." eyebrow="MOVEMENT LOG / 01" title="Activities" />
      <CollectionFeedback error={error} isEmpty={!data.length} isLoading={isLoading} onRetry={reload} />
      {!isLoading && !error && data.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th scope="col">Activity</th><th scope="col">Member</th><th scope="col">Date</th><th scope="col">Duration</th><th scope="col">Distance</th><th scope="col">Calories</th></tr></thead>
            <tbody>
              {data.map((activity) => (
                <tr key={activity._id || activity.seedKey || `${activity.type}-${activity.performedAt}`}>
                  <td><span className={`type-tag${activity.type === 'running' ? ' is-highlighted' : ''}`}>{formatLabel(activity.type)}</span></td>
                  <td className="primary-cell">{displayReference(activity.user)}</td>
                  <td>{formatDate(activity.performedAt || activity.createdAt)}</td>
                  <td>{activity.durationMinutes ? `${activity.durationMinutes} min` : '--'}</td>
                  <td>{activity.distanceKm ? `${activity.distanceKm} km` : '--'}</td>
                  <td>{Number(activity.caloriesBurned || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities