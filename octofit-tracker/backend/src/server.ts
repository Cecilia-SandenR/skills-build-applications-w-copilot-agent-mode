import express from 'express'
import './config/database'
import { Activity, LeaderboardEntry, Team, User, Workout } from './models'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`
const allowedFrontendOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
])

app.use(express.json())
app.use((request, response, next) => {
  const origin = request.get('origin')

  if (origin && allowedFrontendOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
  }

  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    response.sendStatus(204)
    return
  }

  next()
})

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