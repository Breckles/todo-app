import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoItem } from './todo-item/todo-item.model';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private todoItems = [
    new TodoItem('Jog around the park 3x'),
    new TodoItem('10 minutes meditation'),
    new TodoItem('Read for 1 hour'),
    new TodoItem('Pick up groceries'),
  ];

  public listChanged = new Subject<TodoItem[]>();

  constructor() {}

  public getTodoItems(): TodoItem[] {
    return [...this.todoItems];
  }

  public setTodoItems(todoItems: TodoItem[]): void {
    this.todoItems = todoItems;
    this.listChanged.next([...this.todoItems]);
  }

  public addTodoItem(newItem: TodoItem): void {
    this.todoItems.unshift(newItem);
    this.listChanged.next([...this.todoItems]);
  }

  public deleteTodoItem(index: number): void {
    this.todoItems.splice(index, 1);
    this.listChanged.next([...this.todoItems]);
  }
}
