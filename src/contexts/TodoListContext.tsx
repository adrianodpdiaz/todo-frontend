import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

type TodoType = {
  id: number;
  content: string;
  completed: boolean;
  deadline: Date;
  userId: string;
}

type TodoListContextType = {
  todos: TodoType[] | undefined;
  reload: boolean;
  setReload: Dispatch<any>;
}

type TodoListContextProviderProps = {
  children: ReactNode
}

export const TodoListContext = createContext({} as TodoListContextType);

export function TodoListContextProvider(props: TodoListContextProviderProps) {
  const { user } = useAuth();
  const [ todos, setTodos ] = useState<TodoType[]>([]);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    async function getTodosFromServer() {
      try {
        if(user?.id) {
          const { data } = await api.get<TodoType[]>('/todo', {
            params: {
              userId: user?.id
            }
          });
          setTodos(data);
        }
      } catch(e) {
        console.log(e.message);
      }
    }

    getTodosFromServer();
  }, [user?.id, reload]);

  return (
    <TodoListContext.Provider value={{ todos, reload, setReload }}>
      {props.children}
    </TodoListContext.Provider>
  )
}