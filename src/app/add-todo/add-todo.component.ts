import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  public toDoItem = '';

  constructor() {}

  ngOnInit(): void {}

  public onSubmit() {
    if (this.toDoItem !== '') {
    }
  }
}
