import express from 'express'
import './config/database'
import { Activity, LeaderboardEntry, Team, User, Workout } from './models'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/', (_request, response) => {
  response.json({
    baseUrl: apiBaseUrl,
    endpoints: {
      users: `${apiBaseUrl}/api/users/`,
      teams: `${apiBaseUrl}/api/teams/`,
      activities: `${apiBaseUrl}/api/activities/`,
      leaderboard: `${apiBaseUrl}/api/leaderboard/`,
      workouts: `${apiBaseUrl}/api/workouts/`,
    },
  })
})

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean())
})

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().lean())
})

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().lean())
})

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await LeaderboardEntry.find().lean())
})

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean())
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`)
})