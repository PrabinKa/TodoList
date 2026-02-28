export interface Todo {
  userId: number;
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodoListResponse {
    limit: number;
    skip: number;
    todos: Todo[];
    total: number;
}