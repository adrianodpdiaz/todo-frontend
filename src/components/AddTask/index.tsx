import { FormEvent, useContext, useState } from 'react';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import styles from './styles.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { TodoListContext } from '../../contexts/TodoListContext';

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

  if(editField) {
    return (
      <div className={styles.newTask}>
        <form onSubmit={handleSendTask}>
          <textarea
            onChange={event => setNewTodo(event.target.value)}
            value={newTodo}
          />
          <div>
            <div className={styles.datePicker}>
              <DatePickerComponent
                value={selectedDate}
                format="dd-MMM-yyyy"
              />
            </div>
            <div className={styles.actions}>
              <button type="submit" className={styles.btnAdd} >
                Add
              </button>
              <button type="button" className={styles.btnCancel} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className={styles.addTask} onClick={() => setEditField(true)}>
      <button type="button">+</button>
      <span>Add task</span>
    </div>
  )
}