import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import {
  CategoryService,
  ColumnSeriesService,
} from '@syncfusion/ej2-angular-charts';

import { AppComponent } from './app.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';

const routes: Routes = [
  { path: 'add-workout', component: AddWorkoutComponent },
  { path: 'workouts', component: WorkoutListComponent },
  { path: 'chart', component: WorkoutChartComponent },
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },
  { path: '**', redirectTo: '/workouts' },
];

@NgModule({
  declarations: [
    AppComponent,
    AddWorkoutComponent,
    WorkoutListComponent,
    WorkoutChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ChartModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [CategoryService, ColumnSeriesService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
