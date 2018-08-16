import { db } from '../config/firebase'

interface IUser {
  uid: string
  name: string
}

export async function getUsers(): Promise<IUser[]> {
  return db
    .collection('users')
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
    .then(docs => docs.map(({ uid, name }) => ({ uid, name })))
    .catch(e => Promise.resolve([]))
}

export async function addUser(data: IUser): Promise<any> {
  return db.collection('users').add(data)
}
