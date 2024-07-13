import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WorkoutService, Workout, UserWorkout } from '../workout.service';

interface WorkoutDisplay {
  name: string;
  workout: string;
  noOfWorkouts: number;
  totalMinutes: number;
}

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<WorkoutDisplay>([]);
  displayedColumns: string[] = [
    'name',
    'workout',
    'noOfWorkouts',
    'totalMinutes',
  ];
  filterType: string = '';
  filterValue: string = '';

  constructor(private workoutService: WorkoutService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.updateDataSource();

    this.dataSource.filterPredicate = (
      data: WorkoutDisplay,
      filter: string
    ) => {
      const searchTerms = JSON.parse(filter);
      const nameMatch = data.name.toLowerCase().includes(searchTerms.name);
      const typeMatch =
        !searchTerms.type || data.workout.toLowerCase() === searchTerms.type;
      return nameMatch && typeMatch;
    };
  }

  updateDataSource() {
    const users = this.workoutService.getWorkouts();
    this.dataSource.data = this.flattenData(users);
  }

  flattenData(users: UserWorkout[]): WorkoutDisplay[] {
    const flattened: WorkoutDisplay[] = [];
    users.forEach((user) => {
      user.workouts.forEach((workout) => {
        flattened.push({
          name: user.name,
          workout: workout.type,
          noOfWorkouts: user.workouts.length,
          totalMinutes: user.workouts.reduce(
            (total, w) => total + w.minutes,
            0
          ),
        });
      });
    });
    return flattened;
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.updateFilter();
  }

  applyTypeFilter() {
    this.updateFilter();
  }

  updateFilter() {
    const filter = {
      name: this.filterValue,
      type: this.filterType.trim().toLowerCase(),
    };
    this.dataSource.filter = JSON.stringify(filter);
  }
}
