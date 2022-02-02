import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useCompleteTodo, useDeleteTodo } from '../../hooks/useTodoList';
import styles from './styles.module.scss';

type TodoProps = {
  id: number;
  content: string;
  completed: boolean;
  deadline: Date;
}

export function Todo({ id, content, deadline, completed }: TodoProps) {
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: completeTodo } = useCompleteTodo();

  async function handleDelete(id: number) {
    deleteTodo(id);
  }

  async function handleComplete(id: number) {
    if(!completed) {
      completeTodo(id);
    }
  }

  return (
    <div className={styles.todo}>
      <div className={!completed ? styles.contentContainer :
        [styles.completed, styles.contentContainer].join(" ")}>
        <div 
          onClick={() => handleComplete(id)}
          style={!completed ? { cursor: "pointer"} : { cursor: "normal"}}
          >
          <Image
            src={!completed ? "/complete.svg" : "/completed.svg"}
            alt="Todo completed"
            width={48}
            height={48}
          />
        </div>
        <div>
          <p>{content}</p>
          <span>{deadline}</span>
        </div>
      </div>
      <Button
        onClick={() => handleDelete(id)}
        size="sm"
        color="gray.800"
      >
        Delete
      </Button>
    </div>
  )
}