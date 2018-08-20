import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const sendNotification = functions.auth.user().onDelete(user => {
  admin
    .firestore()
    .collection('users')
    .where('uid', '==', user.uid)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
    .then(docs =>
      docs.map(val =>
        admin.messaging().sendToDevice(val.token, {
          notification: {
            title: 'ユーザーが削除されました',
            body: `さようなら、 ${val.name}`
          }
        })
      )
    )
})
