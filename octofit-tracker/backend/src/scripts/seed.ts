import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    const teamSeeds = [
      {
        slug: 'sunrise-striders',
        name: 'Sunrise Striders',
        description: 'A friendly team focused on consistent morning runs.',
      },
      {
        slug: 'peak-performers',
        name: 'Peak Performers',
        description: 'A cross-training team that balances strength and endurance.',
      },
    ];
    const teams = await Promise.all(
      teamSeeds.map(({ slug, ...team }) =>
        Team.findOneAndUpdate({ slug }, { $set: team }, { upsert: true, new: true }),
      ),
    );
    const teamBySlug = new Map(teams.map((team) => [team.slug, team]));

    const userSeeds = [
      {
        username: 'maya.chen',
        email: 'maya.chen@example.com',
        firstName: 'Maya',
        lastName: 'Chen',
        age: 29,
        teamSlug: 'sunrise-striders',
        goals: ['Run a 10K', 'Train four times per week'],
      },
      {
        username: 'jordan.rivera',
        email: 'jordan.rivera@example.com',
        firstName: 'Jordan',
        lastName: 'Rivera',
        age: 34,
        teamSlug: 'sunrise-striders',
        goals: ['Improve 5K pace', 'Build a consistent routine'],
      },
      {
        username: 'aisha.patel',
        email: 'aisha.patel@example.com',
        firstName: 'Aisha',
        lastName: 'Patel',
        age: 31,
        teamSlug: 'peak-performers',
        goals: ['Strength train three times per week'],
      },
      {
        username: 'leo.martinez',
        email: 'leo.martinez@example.com',
        firstName: 'Leo',
        lastName: 'Martinez',
        age: 27,
        teamSlug: 'peak-performers',
        goals: ['Complete a half marathon'],
      },
    ];
    const users = await Promise.all(
      userSeeds.map(({ username, teamSlug, ...user }) =>
        User.findOneAndUpdate(
          { username },
          { $set: { ...user, team: teamBySlug.get(teamSlug)!._id } },
          { upsert: true, new: true },
        ),
      ),
    );

    await Promise.all(
      teams.map((team) =>
        Team.updateOne(
          { _id: team._id },
          { $set: { members: users.filter((user) => user.team.equals(team._id)).map((user) => user._id) } },
        ),
      ),
    );

    const userByName = new Map(users.map((user) => [user.username, user]));
    const activitySeeds = [
      { seedKey: 'maya-run-2026-09-24', username: 'maya.chen', type: 'running', durationMinutes: 42, distanceKm: 7.2, caloriesBurned: 465, performedAt: '2026-09-24T06:45:00.000Z' },
      { seedKey: 'jordan-run-2026-09-25', username: 'jordan.rivera', type: 'running', durationMinutes: 31, distanceKm: 5.1, caloriesBurned: 352, performedAt: '2026-09-25T07:10:00.000Z' },
      { seedKey: 'aisha-strength-2026-09-26', username: 'aisha.patel', type: 'strength', durationMinutes: 50, caloriesBurned: 310, performedAt: '2026-09-26T17:30:00.000Z' },
      { seedKey: 'leo-cycling-2026-09-27', username: 'leo.martinez', type: 'cycling', durationMinutes: 65, distanceKm: 24.5, caloriesBurned: 590, performedAt: '2026-09-27T08:00:00.000Z' },
      { seedKey: 'maya-yoga-2026-09-28', username: 'maya.chen', type: 'yoga', durationMinutes: 35, caloriesBurned: 135, performedAt: '2026-09-28T18:15:00.000Z' },
    ];
    await Promise.all(
      activitySeeds.map(({ seedKey, username, performedAt, ...activity }) => {
        const user = userByName.get(username)!;
        return Activity.findOneAndUpdate(
          { seedKey },
          {
            $set: {
              ...activity,
              user: user._id,
              team: user.team,
              performedAt: new Date(performedAt),
            },
          },
          { upsert: true, new: true },
        );
      }),
    );

    const leaderboardSeeds = [
      { username: 'maya.chen', points: 1480, rank: 1 },
      { username: 'leo.martinez', points: 1325, rank: 2 },
      { username: 'aisha.patel', points: 1190, rank: 3 },
      { username: 'jordan.rivera', points: 970, rank: 4 },
    ];
    await Promise.all(
      leaderboardSeeds.map(({ username, points, rank }) => {
        const user = userByName.get(username)!;
        return LeaderboardEntry.findOneAndUpdate(
          { user: user._id, period: '2026-09' },
          { $set: { team: user.team, points, rank } },
          { upsert: true, new: true },
        );
      }),
    );

    const workoutSeeds = [
      {
        slug: 'steady-5k',
        name: 'Steady 5K Run',
        description: 'An easy-paced run to build aerobic endurance.',
        type: 'cardio',
        difficulty: 'beginner',
        durationMinutes: 35,
        caloriesBurned: 320,
        exercises: [{ name: 'Easy run', durationSeconds: 1800 }],
      },
      {
        slug: 'full-body-strength',
        name: 'Full-Body Strength',
        description: 'A balanced session using foundational compound movements.',
        type: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 45,
        caloriesBurned: 280,
        exercises: [
          { name: 'Goblet squat', sets: 3, reps: 10 },
          { name: 'Push-up', sets: 3, reps: 12 },
          { name: 'Dumbbell row', sets: 3, reps: 10 },
        ],
      },
      {
        slug: 'mobility-reset',
        name: 'Mobility Reset',
        description: 'Gentle mobility work for hips, shoulders, and back.',
        type: 'flexibility',
        difficulty: 'beginner',
        durationMinutes: 20,
        caloriesBurned: 90,
        exercises: [
          { name: 'World’s greatest stretch', sets: 2, reps: 5 },
          { name: 'Thoracic rotation', sets: 2, reps: 8 },
        ],
      },
      {
        slug: 'tempo-ride',
        name: 'Tempo Ride',
        description: 'A sustained cycling effort with a controlled tempo interval.',
        type: 'cardio',
        difficulty: 'advanced',
        durationMinutes: 50,
        caloriesBurned: 510,
        exercises: [
          { name: 'Warm-up ride', durationSeconds: 600 },
          { name: 'Tempo interval', durationSeconds: 1800 },
          { name: 'Cool-down ride', durationSeconds: 600 },
        ],
      },
      {
        slug: 'recovery-flow',
        name: 'Recovery Flow',
        description: 'A low-intensity flow to support recovery after training.',
        type: 'recovery',
        difficulty: 'beginner',
        durationMinutes: 25,
        caloriesBurned: 105,
        exercises: [{ name: 'Gentle yoga flow', durationSeconds: 1500 }],
      },
    ];
    await Promise.all(
      workoutSeeds.map(({ slug, ...workout }) =>
        Workout.findOneAndUpdate({ slug }, { $set: workout }, { upsert: true, new: true }),
      ),
    );

    console.log(
      `Seed complete: ${teams.length} teams, ${users.length} users, ${activitySeeds.length} activities, ${leaderboardSeeds.length} leaderboard entries, and ${workoutSeeds.length} workouts.`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
