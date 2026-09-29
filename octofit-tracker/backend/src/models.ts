import mongoose, { Schema } from 'mongoose'

const teamSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, min: 13 },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    goals: [{ type: String }],
  },
  { timestamps: true },
)

const activitySchema = new Schema(
  {
    seedKey: { type: String, unique: true, sparse: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: {
      type: String,
      enum: ['running', 'cycling', 'strength', 'yoga', 'walking'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true },
)

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    period: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
)
leaderboardSchema.index({ user: 1, period: 1 }, { unique: true })

const workoutSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'recovery'],
      required: true,
    },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, min: 1 },
        reps: { type: Number, min: 1 },
        durationSeconds: { type: Number, min: 1 },
      },
    ],
  },
  { timestamps: true },
)

export const Team = mongoose.model('Team', teamSchema, 'teams')
export const User = mongoose.model('User', userSchema, 'users')
export const Activity = mongoose.model('Activity', activitySchema, 'activities')
export const LeaderboardEntry = mongoose.model(
  'LeaderboardEntry',
  leaderboardSchema,
  'leaderboard',
)
export const Workout = mongoose.model('Workout', workoutSchema, 'workouts')