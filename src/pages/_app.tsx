import '../services/firebase';
import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { AuthContextProvider } from '../contexts/AuthContext';
import { TodoListContextProvider } from '../contexts/TodoListContext';

function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <TodoListContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </TodoListContextProvider>
    </AuthContextProvider>
  )
}

export default App 
