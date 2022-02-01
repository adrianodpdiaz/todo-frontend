import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { DropDownMenu } from './DropDownMenu';

import styles from './styles.module.scss';

export function Header() {
  const { user } = useAuth();
  const [ open, setOpen ] = useState(false);

  return (
    <header className={styles.headerContainer}>
      <div title="Coming soon...">
        <Image
          src="/menu.svg"
          alt="Menu Icon"
          width={652.5}
          height={409.5}
        />
      </div>
      <div className={styles.picContainer}>
      {user?.avatar != undefined && (
        <Image
          src={user?.avatar}
          alt="User profile picture"
          width={50}
          height={50}
          onClick={() => setOpen(!open)}
        />
      )}
      {open && <DropDownMenu />}
      </div>
    </header>
  )
}