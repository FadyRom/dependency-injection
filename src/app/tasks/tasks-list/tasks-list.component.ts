import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, TaskStatusOptions } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [
    {
      provide: TASK_STATUS_OPTIONS,
      useValue: TaskStatusOptions,
    },
  ],
})
export class TasksListComponent {
  private tasksService = inject(TasksService);
  taskStatusOption = inject(TASK_STATUS_OPTIONS);

  selectedFilter = signal<string>('all');
  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in_progress':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });
}
