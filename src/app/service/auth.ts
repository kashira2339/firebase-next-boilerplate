import { auth, Auth } from '../config/firebase'
import { addUser } from './user'

interface IAuth {
  email: string
  password: string
}

interface ISignUp extends IAuth {
  nickname: string
}

export function listenAuthStateChange(listener) {
  auth.onAuthStateChanged(u => {
    listener(u)
  })
}

export async function signUp({ nickname, email, password }: ISignUp): Promise<any> {
  const user = await auth.createUserWithEmailAndPassword(email, password)
  user.updateProfile({ displayName: nickname })
  return addUser({ uid: user.uid, name: nickname })
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
