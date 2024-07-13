import { Injectable } from '@angular/core';

export interface Workout {
  type: string;
  minutes: number;
}

export interface UserWorkout {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private storageKey = 'workoutData';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      this.initializeData();
    }
  }

  get workouts(): UserWorkout[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private initializeData() {
    const userData: UserWorkout[] = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 },
        ],
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 },
        ],
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 },
        ],
      },
      {
        id: 4,
        name: 'Emily Davis',
        workouts: [
          { type: 'Running', minutes: 35 },
          { type: 'Swimming', minutes: 25 },
        ],
      },
      {
        id: 5,
        name: 'James Brown',
        workouts: [
          { type: 'Cycling', minutes: 55 },
          { type: 'Yoga', minutes: 45 },
        ],
      },
      {
        id: 6,
        name: 'Olivia Wilson',
        workouts: [
          { type: 'Running', minutes: 40 },
          { type: 'Cycling', minutes: 60 },
        ],
      },
      {
        id: 7,
        name: 'Liam Martinez',
        workouts: [
          { type: 'Swimming', minutes: 30 },
          { type: 'Yoga', minutes: 20 },
        ],
      },
      {
        id: 8,
        name: 'Sophia Anderson',
        workouts: [
          { type: 'Cycling', minutes: 50 },
          { type: 'Running', minutes: 45 },
        ],
      },
      {
        id: 9,
        name: 'Jackson White',
        workouts: [
          { type: 'Yoga', minutes: 35 },
          { type: 'Swimming', minutes: 25 },
        ],
      },
      {
        id: 10,
        name: 'Isabella Thompson',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 40 },
        ],
      },
    ];
    localStorage.setItem(this.storageKey, JSON.stringify(userData));
  }

  addWorkout(userName: string, newWorkout: Workout) {
    const workouts = this.workouts;
    const user = workouts.find((user) => user.name === userName);
    if (user) {
      user.workouts.push(newWorkout);
    } else {
      workouts.push({
        id: workouts.length + 1,
        name: userName,
        workouts: [newWorkout],
      });
    }
    localStorage.setItem(this.storageKey, JSON.stringify(workouts));
  }

  getWorkouts(): UserWorkout[] {
    return this.workouts;
  }
}
