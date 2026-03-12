import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../../types/todo';
import { showToast } from '../../utils/toast/toast';
import { addTodo } from '../api/todo/TodoList';

interface AddTodoPayload {
    todo: string;
}

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, AddTodoPayload>({
    mutationFn: addTodo,

    onSuccess: () => {
      showToast('success', 'Task added successfully.');

      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },

    onError: () => {
      showToast(
        'error',
        'There is a problem addint task, please try again later.',
      );
    },
  });
};
