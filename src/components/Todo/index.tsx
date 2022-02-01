import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useContext } from 'react';
import { TodoListContext } from '../../contexts/TodoListContext';
import { api } from '../../services/api';
import styles from './styles.module.scss';

type TodoProps = {
  id: number;
  content: string;
  completed: boolean;
  deadline: Date;
  userId?: string;
}

export function Todo({ id, content, deadline, completed }: TodoProps) {
  const { reload, setReload } = useContext(TodoListContext);

  async function handleDelete(id: number) {
      try {
        await api.delete(`/todo/${id}`)
        .then(() => setReload(!reload));
      } catch(e) {
        console.log(e.message);
      }
  }

  async function handleComplete(id: number) {
    if(!completed) {
      try {
        await api.patch(`/todo/complete/${id}`)
        .then(() => setReload(!reload));
      } catch(e) {
        console.log(e.message);
      }
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