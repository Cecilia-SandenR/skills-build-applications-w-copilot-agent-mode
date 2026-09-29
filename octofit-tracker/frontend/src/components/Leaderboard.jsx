import { useCollection } from '../hooks/useCollection.js'
import { CollectionFeedback, PageHeading } from './ResourceStates.jsx'
import { displayReference, formatLabel } from '../utils/resourceFormat.js'

function Leaderboard() {
  const { data, error, isLoading, reload } = useCollection('leaderboard')
  const rankedEntries = [...data].sort((first, second) => (first.rank ?? Infinity) - (second.rank ?? Infinity))

  return (
    <section className="resource-page" aria-label="Leaderboard">
      <PageHeading count={data.length} description="A snapshot of member points and team standings for each period." eyebrow="TEAM STANDINGS / 02" title="Leaderboard" />
      <CollectionFeedback error={error} isEmpty={!data.length} isLoading={isLoading} onRetry={reload} />
      {!isLoading && !error && data.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th scope="col">Rank</th><th scope="col">Member</th><th scope="col">Team</th><th scope="col">Period</th><th scope="col">Points</th></tr></thead>
            <tbody>
              {rankedEntries.map((entry, index) => (
                <tr key={entry._id || `${entry.user}-${entry.period}`}>
                  <td className="rank-number">{String(entry.rank || index + 1).padStart(2, '0')}</td>
                  <td className="primary-cell">{displayReference(entry.user)}</td>
                  <td>{displayReference(entry.team)}</td>
                  <td>{formatLabel(entry.period)}</td>
                  <td className="primary-cell">{Number(entry.points || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard