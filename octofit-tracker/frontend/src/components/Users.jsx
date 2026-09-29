import { useCollection } from '../hooks/useCollection.js'
import { CollectionFeedback, PageHeading } from './ResourceStates.jsx'
import { displayReference } from '../utils/resourceFormat.js'

function Users() {
  const { data, error, isLoading, reload } = useCollection('users')

  return (
    <section className="resource-page" aria-label="Members">
      <PageHeading count={data.length} description="Member profiles, team links, and current training goals." eyebrow="MEMBER DIRECTORY / 04" title="Members" />
      <CollectionFeedback error={error} isEmpty={!data.length} isLoading={isLoading} onRetry={reload} />
      {!isLoading && !error && data.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th scope="col">Member</th><th scope="col">Email</th><th scope="col">Team</th><th scope="col">Goals</th></tr></thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id || user.username || user.email}>
                  <td className="primary-cell">
                    {user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : user.username || 'Unnamed member'}
                    <span className="secondary-cell">@{user.username || 'member'}</span>
                  </td>
                  <td>{user.email || 'No email provided'}</td>
                  <td>{displayReference(user.team)}</td>
                  <td>{Array.isArray(user.goals) && user.goals.length ? user.goals.join(', ') : 'No goals added'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users