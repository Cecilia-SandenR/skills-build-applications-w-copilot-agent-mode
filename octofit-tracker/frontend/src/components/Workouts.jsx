import { useCollection } from '../hooks/useCollection.js'
import { CollectionFeedback, PageHeading } from './ResourceStates.jsx'
import { formatLabel } from '../utils/resourceFormat.js'

function Workouts() {
  const { data, error, isLoading, reload } = useCollection('workouts')

  return (
    <section className="resource-page" aria-label="Workouts">
      <PageHeading count={data.length} description="Sessions curated for strength, endurance, mobility, and recovery." eyebrow="TRAINING LIBRARY / 05" title="Workouts" />
      <CollectionFeedback error={error} isEmpty={!data.length} isLoading={isLoading} onRetry={reload} />
      {!isLoading && !error && data.length > 0 && (
        <div className="workout-list">
          {data.map((workout) => (
            <article className="workout-row" key={workout._id || workout.slug || workout.name}>
              <div>
                <h2 className="record-name">{workout.name || 'Untitled workout'}</h2>
                <p className="record-meta">{formatLabel(workout.type)} / {formatLabel(workout.difficulty)}</p>
                <p className="record-description">{workout.description || 'No description provided.'}</p>
              </div>
              <div className="workout-details" aria-label="Exercises">
                {Array.isArray(workout.exercises) && workout.exercises.length
                  ? workout.exercises.slice(0, 4).map((exercise, index) => <span key={exercise._id || exercise.name || index}>{exercise.name || 'Exercise'}</span>)
                  : <span>No exercise details</span>}
              </div>
              <div className="workout-duration">
                <strong>{workout.durationMinutes || '--'} MIN</strong>
                <span className="secondary-cell">{Number(workout.caloriesBurned || 0).toLocaleString()} kcal</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts