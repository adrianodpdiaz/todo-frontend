import { FormEvent, useContext, useState } from 'react';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Button, Textarea } from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { TodoListContext } from '../../contexts/TodoListContext';

import styles from './styles.module.scss';

export function AddTask() {
  const { user } = useAuth();
  const { reload, setReload } = useContext(TodoListContext);
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

    const question = {
      userId: user.id,
      content: newTodo,
      deadline: selectedDate
    }

    try {
      await api.post('/todo', question)
      .then(() => {
        handleCancel();
        setReload(!reload);
      });
    } catch(e) {
      console.log(e.message);
    }
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