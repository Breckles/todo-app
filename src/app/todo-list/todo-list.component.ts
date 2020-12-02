import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Status, TodoItem } from './todo-item/todo-item.model';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todoItemList!: TodoItem[];
  private listChangedSub!: Subscription;
  public currentFilter = 'all';
  private filterChangedSub!: Subscription;

  constructor(private tls: TodoListService) {}

  ngOnInit(): void {
    this.todoItemList = this.tls.getTodoItems();
    this.listChangedSub = this.tls.listChanged.subscribe(() => {
      this.todoItemList = this.tls.getTodoItems();
    });
    this.filterChangedSub = this.tls.filterChanged.subscribe(
      (filter: string) => {
        this.currentFilter = filter;
      }
    );
  }

  clearCompletedItems(): void {
    let activeItemsList = this.todoItemList.filter(
      (todoItem) => todoItem.getStatus() === Status.active
    );
    this.tls.setTodoItems(activeItemsList);
  }

  ngOnDestroy() {
    this.listChangedSub.unsubscribe();
    this.filterChangedSub.unsubscribe();
  }
}
