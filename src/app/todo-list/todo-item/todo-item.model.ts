export class TodoItem {
  private todo: string;
  private status: Status = Status.active;

  constructor(todo: string, status?: Status) {
    this.todo = todo;
    if (status) {
      this.status = status;
    }
  }

  public getTodo(): string {
    return this.todo;
  }

  public setTodo(todo: string): void {
    this.todo = todo;
  }

  public getStatus(): Status {
    return this.status;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }
}

export enum Status {
  active = 'active',
  completed = 'completed',
}
