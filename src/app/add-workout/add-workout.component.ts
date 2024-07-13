import { Component } from '@angular/core';
import { WorkoutService, Workout } from '../workout.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css'],
})
export class AddWorkoutComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  onSubmit() {
    if (this.userName && this.workoutType && this.workoutMinutes > 0) {
      const newWorkout: Workout = {
        type: this.workoutType,
        minutes: this.workoutMinutes,
      };

      this.workoutService.addWorkout(this.userName, newWorkout);

      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = 0;
    } else {
      alert('Please fill out all fields');
    }
  }
}
