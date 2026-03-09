import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../../types/todo';
import { updateTodo } from '../api/todo/TodoList';
import { showToast } from '../../utils/toast/toast';

interface UpdateTodoPayload {
  id: number;
  isCompleted: boolean;
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, UpdateTodoPayload>({
    mutationFn: updateTodo,

    onSuccess: () => {
      showToast('success', 'Successfully updated todo status.');

      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },

    onError: () => {
      showToast(
        'error',
        'There is a problem updating todo status, please try again later.',
      );
    },
  });
};
