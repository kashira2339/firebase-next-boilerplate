import { db } from '../config/firebase'

interface IUser {
  uid: string
  name: string
  token?: string
}

export async function getUsers(): Promise<IUser[]> {
  return db
    .collection('users')
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
    .then(docs => docs.map(({ uid, name }) => ({ uid, name })))
    .catch(() => Promise.resolve([]))
}

export async function addUser(data: IUser): Promise<any> {
  return db.collection('users').add(data)
}

export async function updateUserToken({ uid, token }: { uid: string; token: string }): Promise<any> {
  return db.collection('users')
    .where('uid', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => doc.ref.update({ token }))
    })
}
