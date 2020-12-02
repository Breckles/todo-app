import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
})
export class TodoFilterComponent implements OnInit {
  public currentFilter = 'all';

  constructor(private tls: TodoListService) {}

  ngOnInit(): void {}

  public onFilterSelect(filter: string): void {
    if (filter !== this.currentFilter) {
      this.currentFilter = filter;
      this.tls.setFilter(this.currentFilter);
    }
  }
}
