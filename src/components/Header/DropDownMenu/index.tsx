import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'

export function DropDownMenu() {
  const { user, signOutGoogle } = useAuth();

  return (
    <div className={styles.dropdown}>
      <h2>{user?.name}</h2>
      <button onClick={() => signOutGoogle()}>Sign out</button>
    </div>
  )
}