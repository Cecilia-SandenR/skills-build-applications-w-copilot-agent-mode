import { useCollection } from '../hooks/useCollection.js'
import { CollectionFeedback, PageHeading } from './ResourceStates.jsx'

function Teams() {
  const { data, error, isLoading, reload } = useCollection('teams')

  return (
    <section className="resource-page" aria-label="Teams">
      <PageHeading count={data.length} description="Training groups building consistency together." eyebrow="COMMUNITY / 03" title="Teams" />
      <CollectionFeedback error={error} isEmpty={!data.length} isLoading={isLoading} onRetry={reload} />
      {!isLoading && !error && data.length > 0 && (
        <div className="team-list">
          {data.map((team) => {
            const memberCount = Array.isArray(team.members) ? team.members.length : 0
            return (
              <article className="team-row" key={team._id || team.slug || team.name}>
                <div><h2 className="record-name">{team.name || 'Unnamed team'}</h2><p className="record-meta">{team.slug || 'OCTOFIT TEAM'}</p></div>
                <p className="record-description">{team.description || 'A team ready to move with purpose.'}</p>
                <div className="member-count"><strong>{memberCount}</strong> {memberCount === 1 ? 'member' : 'members'}</div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Teams