import { AddTask } from "../../components/AddTask";
import { Header } from "../../components/Header";
import { Todo } from "../../components/Todo";

import styles from './dashboard.module.scss';
import { useTodoList } from "../../hooks/useTodoList";

export default function Dashboard() {
  const { data: todos, isLoading: isLoadingTodos } = useTodoList();

  if(isLoadingTodos) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <Header />
      <section className={styles.mainContainer}>
        <AddTask />
        <h1>ToDo</h1>
        <div className={styles.todosContainer}>
          {todos?.map(todo => {
            if(!todo.completed) {
              return (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  content={todo.content}
                  deadline={todo.deadline}
                  completed={todo.completed}
                />
              );
            }
          })}
        </div>
        <h1>Completed</h1>
        <div className={styles.completedContainer}>
          {todos?.map(todo => {
            if(todo.completed) {
              return (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  content={todo.content}
                  deadline={todo.deadline}
                  completed={todo.completed}
                />
              );
            }
          })}
        </div>
      </section>
    </>
  )
} 
