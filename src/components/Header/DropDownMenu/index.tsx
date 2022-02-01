import { Button, Text } from '@chakra-ui/react';
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'

export function DropDownMenu() {
  const { user, signOutGoogle } = useAuth();

  return (
    <div className={styles.dropdown}>
      <h2>{user?.name}</h2>
      <Button
        colorScheme="red"
        size="xs"
        onClick={() => signOutGoogle()}
      >
        <Text fontSize="2xl" color="gray.800">Sign out</Text>
      </Button>
    </div>
  )
}