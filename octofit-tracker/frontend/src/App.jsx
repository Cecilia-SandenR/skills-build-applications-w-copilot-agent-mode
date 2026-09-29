import { Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import octofitMark from '../../../docs/octofitapp-small.png'
import { apiIsConfiguredForCodespaces } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Activities', path: '/activities', index: '01' },
  { label: 'Leaderboard', path: '/leaderboard', index: '02' },
  { label: 'Teams', path: '/teams', index: '03' },
  { label: 'Members', path: '/users', index: '04' },
  { label: 'Workouts', path: '/workouts', index: '05' },
]

function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/activities" aria-label="Octofit Tracker home">
          <img src={octofitMark} alt="" />
          <span className="brand-name">
            OCTOFIT
            <small>TRACKER</small>
          </span>
        </NavLink>

        <div className="nav-caption">TRAINING DESK</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              key={item.path}
              to={item.path}
            >
              <span className="nav-index">{item.index}</span>
              <span>{item.label}</span>
              <span className="nav-arrow" aria-hidden="true">+</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-status">
          <span className="status-indicator" />
          <span>{apiIsConfiguredForCodespaces ? 'CODESPACES API' : 'LOCAL API'}</span>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <span className="topbar-label">OCTOFIT / PERFORMANCE</span>
          <span className="topbar-note">MOVE WITH INTENT</span>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
        <footer className="app-footer">
          <span>OCTOFIT TRACKER</span>
          <span>CONSISTENCY BUILDS MOMENTUM</span>
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />} path="/">
        <Route element={<Navigate replace to="/activities" />} index />
        <Route element={<Activities />} path="activities" />
        <Route element={<Leaderboard />} path="leaderboard" />
        <Route element={<Teams />} path="teams" />
        <Route element={<Users />} path="users" />
        <Route element={<Workouts />} path="workouts" />
        <Route element={<Navigate replace to="/activities" />} path="*" />
      </Route>
    </Routes>
  )
}

export default App
