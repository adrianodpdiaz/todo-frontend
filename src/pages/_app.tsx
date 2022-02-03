import '../services/firebase';
import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { AuthContextProvider } from '../contexts/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthContextProvider>
          <div className={styles.wrapper}>
            <main>
              <Component {...pageProps} />
            </main>
          </div>
        </AuthContextProvider>
      </ChakraProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
    </QueryClientProvider>
  )
}

export default App 
