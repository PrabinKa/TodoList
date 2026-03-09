import { store } from '../../../store/store';
import { Todo, TodoListResponse } from '../../../types/todo';
import api from '../../axiosInstance';

interface DeletedTodo extends Todo {
  isDeleted: boolean;
  deletedOn: string;
}

const getTodoList = async ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}): Promise<TodoListResponse> => {
  const { data } = await api.get(`todos?limit=${limit}&skip=${skip}`);

  return data;
};

const updateTodo = async ({
  id,
  isCompleted,
}: {
  id: number;
  isCompleted: boolean;
}): Promise<Todo> => {
  const { data } = await api.put(`todos/${id}`, { completed: isCompleted });

  return data;
};

const deleteTodo = async ({ id }: { id: number }): Promise<DeletedTodo> => {
  const { data } = await api.delete(`todos/${id}`);

  return data;
};

const addTodo = async ({ todo }: { todo: string }): Promise<Todo> => {
  const { userDetails } = store.getState();
  const { userDetails: user } = userDetails;

  const { data } = await api.post(`todos/add`, {
    todo: todo,
    completed: false,
    userId: user?.id,
  });

  return data;
};

export { getTodoList, updateTodo, deleteTodo, addTodo };
