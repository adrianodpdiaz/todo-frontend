import Image from "next/image";
import { useRouter } from "next/router";

import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import styles from "./login.module.scss";

export default function Login() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();

  async function handleLogin() {
    if(!user || user == undefined) {
      try {
        signInWithGoogle()
        .then(userResult => {
          api.post('/user', userResult);
        })
        .then(() => {
          router.push('/dashboard');
        })
      } catch(e) {
        console.log(e);
      }
    } else {
      router.push('/dashboard');
    }
  }
  
  return (
    <div className={styles.pageAuth}>
        <div className={styles.companyLogo}>
          <Image
            src="/logo_white.png"
            alt="ToDo Manager Logo"
            width={652.5}
            height={409.5}
            priority
          />
        </div>
        <button type="button" onClick={handleLogin}>
          <div className={styles.googleLogo}>
            <Image
              src="/google.svg"
              alt="Google sign in button"
              width={96}
              height={96}
              priority
            />
          </div>
          <span>Sign in with Google</span>
        </button>
    </div>
  )
} 
