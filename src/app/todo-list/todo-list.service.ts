import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Status, TodoItem } from './todo-item/todo-item.model';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private localStorage: Storage;
  private listName = 'todoList';

  private todoItems: TodoItem[] = [
    // new TodoItem('Complete online Javascript course', Status.completed),
    // new TodoItem('Jog around the park 3x'),
    // new TodoItem('10 minutes meditation'),
    // new TodoItem('Read for 1 hour'),
    // new TodoItem('Pick up groceries'),
    // new TodoItem('Complete Todo App on Frontend Mentor'),
  ];

  public listChanged = new Subject<TodoItem[]>();
  private currentFilter = 'all';
  public filterChanged = new Subject<string>();

  constructor() {
    this.localStorage = window.localStorage;
    this.initialize();
  }

  private initialize() {
    // Check if a todo list already exists in local storage. If not, create one.
    let list = this.localStorage.getItem(this.listName);
    if (!list) {
      this.localStorage.setItem(this.listName, '');
    } else {
      // List exists in local storage, convert its items to TodoItems and populate app's todo item list
      let parsedList = JSON.parse(list) as [];
      parsedList.map((todoItem) => {
        this.todoItems.push(new TodoItem(todoItem['todo'], todoItem['status']));
      });
      console.log(parsedList);
    }
    let stringified = JSON.stringify(this.todoItems);
    console.log(stringified);
  }

  public updateLocalStorage() {
    let stringifiedList = JSON.stringify(this.todoItems);
    this.localStorage.setItem(this.listName, stringifiedList);
  }

  public getTodoItems(): TodoItem[] {
    return [...this.todoItems];
  }

  public setTodoItems(todoItems: TodoItem[]): void {
    this.todoItems = todoItems;
    this.updateLocalStorage();
    this.listChanged.next([...this.todoItems]);
  }

  public setTodoItem(item: TodoItem, i: number) {
    this.todoItems[i] = item;
    this.updateLocalStorage();
  }

  public addTodoItem(newItem: TodoItem): void {
    this.todoItems.unshift(newItem);
    this.updateLocalStorage();
    this.listChanged.next([...this.todoItems]);
  }

  public deleteTodoItem(index: number): void {
    this.todoItems.splice(index, 1);
    this.updateLocalStorage();
    this.listChanged.next([...this.todoItems]);
  }

  public getFilter(): string {
    return this.currentFilter;
  }
  public setFilter(newFilter: string): void {
    this.currentFilter = newFilter;
    this.filterChanged.next(this.currentFilter);
  }
}
