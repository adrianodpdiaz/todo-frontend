import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<User>;
  signOutGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const router = useRouter();
  const [ user, setUser ] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user;
      
        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if(result.user) {
      const { displayName, photoURL, uid } = result.user;
      
      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      const userResult = {
        id: uid,
        name: displayName,
        avatar: photoURL
      }
      setUser(userResult);

      return userResult;
    }
    
    router.push('/');
    return null;
  }

  async function signOutGoogle() {
    firebase.auth().signOut()
    .then(() => {
      setUser(undefined);
      router.push('/');
    })
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}