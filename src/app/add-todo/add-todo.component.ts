import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoItem } from '../todo-list/todo-item/todo-item.model';
import { TodoListService } from '../todo-list/todo-list.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  public todo = '';

  constructor(private tls: TodoListService) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm) {
    if (this.todo !== '') {
      let newTodo = new TodoItem(this.todo);
      this.tls.addTodoItem(newTodo);
      form.reset();
    }
  }
}
