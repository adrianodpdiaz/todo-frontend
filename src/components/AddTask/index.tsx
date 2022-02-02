import { FormEvent, useState } from 'react';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Button, Textarea } from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';
import { useAddTodoData } from '../../hooks/useTodoList';

import styles from './styles.module.scss';

type TodoType = {
  id?: number;
  content: string;
  completed?: boolean;
  deadline: Date;
  userId: string;
}

export function AddTask() {
  const { user } = useAuth();
  const { mutate } = useAddTodoData();
  const [ editField, setEditField ] = useState(false);
  const [ newTodo, setNewTodo ] = useState('');
  const [ selectedDate, setSelectedDate ] = useState(new Date());

  async function handleSendTask(event: FormEvent) {
    event.preventDefault();
    if(newTodo.trim() === '') {
      return;
    }
    if(!user) {
      throw new Error('You must be logged in.')
    }

    const todo: TodoType = {
      userId: user.id,
      content: newTodo,
      deadline: selectedDate
    }

    mutate(todo);
    handleCancel();
  }
  
  function handleCancel() {
    setEditField(false);
    setSelectedDate(new Date());
    setNewTodo('');
  }

  return (
    !editField && (
    <div className={styles.addTask} onClick={() => setEditField(true)}>
      <Button
        size="sm"
        color="gray.800"
      >
        +
      </Button>
      <span>Add task</span>
    </div>
    ) || (
    <div className={styles.newTask}>
      <form onSubmit={handleSendTask}>
        <Textarea
          value={newTodo}
          onChange={event => setNewTodo(event.target.value)}
          size="sm"
          focusBorderColor="transparent"
          border="none"
        />
        <div id={styles.utilButtons}>
          <div>
            <DatePickerComponent
              value={selectedDate}
              format="dd-MMM-yyyy"
              onChange={event => setSelectedDate(event.target.value)}
            />
          </div>
          <div>
            <Button
              type="submit"
              className={styles.btnAdd}
              size="md"
              color="gray.800"
            >
              Add
            </Button>
            <Button 
              className={styles.btnCancel}
              onClick={handleCancel}
              size="md"
              color="gray.800"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
    )
  )
}