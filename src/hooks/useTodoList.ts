import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "../services/api";
import { useAuth } from "./useAuth";

type TodoType = {
  id?: number;
  content: string;
  completed?: boolean;
  deadline: Date;
  userId: string;
}

export function useTodoList() {
  const { user } = useAuth();

  return useQuery(
    'todos',
    () => {
      return api.get<TodoType[]>('/todo', {
        params: {
          userId: user?.id
        }
      });
    },
    {
      enabled: !!user?.id,
      select: data => {
        return data.data;
      }
    }
  );
}

export function useAddTodoData() {
  const queryClient = useQueryClient();

  return useMutation(
    (newTodo: TodoType) => api.post('/todo', newTodo),
    {
      onSuccess: () => queryClient.invalidateQueries('todos')
    }
  )
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: number) => api.delete(`/todo/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries('todos')
    }
  )
}

export function useCompleteTodo() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: number) => api.patch(`/todo/complete/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries('todos')
    }
  )
}