import { auth, Auth } from '../config/firebase'

interface IAuth {
  email: string
  password: string
}

export function listenAuthStateChange(listener) {
  auth.onAuthStateChanged(u => {
    listener(u)
  })
}

export async function signUp({ email, password }: IAuth): Promise<any> {
  return auth.createUserWithEmailAndPassword(email, password)
}

export async function signIn({ email, password }: IAuth): Promise<any> {
  return auth.setPersistence(Auth.Persistence.SESSION).then(() => auth.signInWithEmailAndPassword(email, password))
}

export async function signOut(): Promise<any> {
  return currentUser().then(() => auth.signOut())
}

export async function currentUser(): Promise<any> {
  return auth.currentUser ? Promise.resolve(auth.currentUser) : Promise.reject('unauthorized')
}
