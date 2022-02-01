import '../services/firebase';
import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { AuthContextProvider } from '../contexts/AuthContext';
import { TodoListContextProvider } from '../contexts/TodoListContext';
import { ChakraProvider } from '@chakra-ui/react';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <TodoListContextProvider>
          <div className={styles.wrapper}>
            <main>
              <Component {...pageProps} />
            </main>
          </div>
        </TodoListContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default App 
