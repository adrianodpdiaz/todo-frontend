import { useState } from 'react';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Button, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../../hooks/useAuth';
import { useAddTodoData } from '../../hooks/useTodoList';
import { schemaYup } from '../../services/yup';

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
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaYup)
  });

  const [ editField, setEditField ] = useState(false);
  const [ newTodo, setNewTodo ] = useState('');
  const [ selectedDate, setSelectedDate ] = useState(new Date());

  async function handleSendTask() {
    if(!user) {
      throw new Error('You must be logged in.')
    }

    const todo: TodoType = {
      userId: user.id,
      content: newTodo,
      deadline: selectedDate
    }

    handleCancel();
    mutate(todo);
  }
  
  function handleCancel() {
    setNewTodo('');
    setEditField(false);
    setSelectedDate(new Date());
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
      <form onSubmit={handleSubmit(handleSendTask)}>
        <Textarea
          value={newTodo}
          {...register("newTaskBody")}
          onChange={event => setNewTodo(event.target.value)}
          size="sm"
          focusBorderColor="transparent"
          border="none"
        />

        <span className={styles.errorMsg}>
          {
            errors.newTaskBody &&
            new String(
              errors.newTaskBody?.message
            ).replace('newTaskBody', 'Your input')
          }
        </span>

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