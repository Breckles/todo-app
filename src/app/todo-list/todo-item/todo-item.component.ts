import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoListService } from '../todo-list.service';
import { Status, TodoItem } from './todo-item.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input()
  public todoItem!: TodoItem;
  @Input()
  public index!: number;
  @Output()
  public statusChanged = new EventEmitter<Status>();

  constructor(private tls: TodoListService) {}

  ngOnInit(): void {}

  toggleStatus(): void {
    if (this.todoItem.getStatus() === Status.active) {
      this.todoItem.setStatus(Status.completed);
    } else {
      this.todoItem.setStatus(Status.active);
    }
    this.statusChanged.emit(this.todoItem.getStatus());
  }

  deleteItem(): void {
    this.tls.deleteTodoItem(this.index);
  }
}
