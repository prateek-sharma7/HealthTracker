import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { WorkoutListComponent } from './workout-list.component';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutListComponent],
      imports: [MatPaginatorModule, MatTableModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply filter correctly', () => {
    component.applyFilter({ target: { value: 'john' } } as any);
    expect(component.dataSource.filter).toBe('john');
  });

  it('should apply type filter correctly', () => {
    component.filterType = 'Running';
    component.applyTypeFilter();
    expect(component.dataSource.filter).toBe('Running');
  });
});
