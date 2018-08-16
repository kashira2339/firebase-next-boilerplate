import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

export const app: firebase.app.App = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: '<apiKey>',
      authDomain: '<authDomain>',
      databaseURL: '<databaseURL>',
      projectId: '<projectId>',
      storageBucket: '<storageBucket>'
      // messagingSenderId: '<messagingSenderId>'
    })
  : firebase.app()

const firestore = app.firestore()
firestore.settings({ timestampsInSnapshots: true })

export const auth = app.auth()
export const Auth = firebase.auth.Auth
export const db = firestore
