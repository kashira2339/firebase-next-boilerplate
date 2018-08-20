import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

const options = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.FIREBASE_MESSAGEGING_SENDER_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

export const app: firebase.app.App = !firebase.apps.length ? firebase.initializeApp(options) : firebase.app()

console.log(app.options)

const firestore = app.firestore()
firestore.settings({ timestampsInSnapshots: true })

export const auth = app.auth()
export const Auth = firebase.auth.Auth
export const db = firestore
