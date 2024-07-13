import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';

interface Workout {
  type: string;
  minutes: number;
}

interface UserWorkout {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css'],
})
export class WorkoutChartComponent implements OnInit {
  public data: { userName: string; workoutMinutes: number }[] = [];
  public primaryXAxis: Object = {};
  public primaryYAxis: Object = {};
  public chartTitle: string = '';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.updateChartData();
  }

  updateChartData() {
    const workoutData: { [key: string]: number } =
      this.workoutService.workouts.reduce(
        (acc: { [key: string]: number }, user: UserWorkout) => {
          user.workouts.forEach((workout: Workout) => {
            acc[user.name] = (acc[user.name] || 0) + workout.minutes;
          });
          return acc;
        },
        {}
      );

    this.data = Object.keys(workoutData).map((userName) => ({
      userName,
      workoutMinutes: workoutData[userName],
    }));

    this.primaryXAxis = {
      valueType: 'Category',
      title: 'User Name',
    };

    this.primaryYAxis = {
      title: 'Workout Minutes',
    };

    this.chartTitle = 'Workout Minutes by User';
  }
}
