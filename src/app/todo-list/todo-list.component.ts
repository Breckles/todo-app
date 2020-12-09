import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Themes } from '../shared/themes.enum';

import { Status, TodoItem } from './todo-item/todo-item.model';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input()
  currentTheme!: Themes;

  public todoItemList!: TodoItem[];
  private listChangedSub!: Subscription;
  private filterChangedSub!: Subscription;

  public currentFilter = 'all';
  public numActiveItems!: number;

  public dragStartDelay = 0;

  constructor(private tls: TodoListService) {}

  ngOnInit(): void {
    this.todoItemList = this.tls.getTodoItems();
    this.numActiveItems = this.todoItemList.filter(
      (todoItem) => todoItem.getStatus() === Status.active
    ).length;
    this.listChangedSub = this.tls.listChanged.subscribe(() => {
      this.todoItemList = this.tls.getTodoItems();
      this.numActiveItems = this.todoItemList.filter(
        (todoItem) => todoItem.getStatus() === Status.active
      ).length;
    });
    this.filterChangedSub = this.tls.filterChanged.subscribe(
      (filter: string) => {
        this.currentFilter = filter;
      }
    );

    // check if user is using a touchscreen
    if (this.deviceIsTouchEnabled()) {
      this.dragStartDelay = 500;
    }
  }

  private deviceIsTouchEnabled(): boolean {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  public clearCompletedItems(): void {
    let activeItemsList = this.todoItemList.filter(
      (todoItem) => todoItem.getStatus() === Status.active
    );
    this.tls.setTodoItems(activeItemsList);
  }

  public updateNumActiveItems(status: Status) {
    if (status === Status.active) {
      this.numActiveItems += 1;
    } else {
      this.numActiveItems -= 1;
    }
  }

  public drop(e: CdkDragDrop<string[]>) {
    console.log('item dropped');
    moveItemInArray(this.todoItemList, e.previousIndex, e.currentIndex);
    // console.log(e);
    // console.log(this.todoItemList);

    // window.setTimeout(() => {
    //   console.log(this.todoItemList);
    // }, 1000);
    this.tls.setTodoItems(this.todoItemList);
  }

  ngOnDestroy() {
    this.listChangedSub.unsubscribe();
    this.filterChangedSub.unsubscribe();
  }
}
