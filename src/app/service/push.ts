import { app } from '../config/firebase'
import { currentUser } from './auth'
import { updateUserToken } from './user'

export const setUpMessaging = async () => {
  const messaging = app.messaging()
  if (process.env.FIREBASE_WEBPUSH_PUBLIC_KEY) {
    messaging.usePublicVapidKey(process.env.FIREBASE_WEBPUSH_PUBLIC_KEY)
    const serviseWorkerRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
    messaging.useServiceWorker(serviseWorkerRegistration)
    messaging.requestPermission()
  } else {
    console.error('process.env.FIREBASE_WEBPUSH_PUBLIC_KEY not set.')
  }
  return messaging
}

export const getToken = async () => {
  const messaging = await setUpMessaging()
  const token = await messaging.getToken()
  const user = await currentUser()
  if (token) {
    console.log(user, token)
    updateUserToken({ ...user, token })
  }
  messaging.onTokenRefresh(async () => {
    const newToken = await messaging.getToken()
    if (newToken) {
      console.log(user, newToken)
      updateUserToken({ ...user, token: newToken })
    }
  })
  return messaging
}
