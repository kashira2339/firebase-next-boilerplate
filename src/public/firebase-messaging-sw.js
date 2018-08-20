// importScripts('/__/firebase/4.10.0/firebase-app.js');
// importScripts('/__/firebase/4.10.0/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')

firebase.initializeApp({
  messagingSenderId: '735129832510'
})
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const title = 'Background Message Title'
  const option = {
    body: 'Background Message body.'
  }

  return self.registration.showNotification(title, option)
})

// messaging.onMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received foreground message ', payload)
//   const title = 'Foreground Message Title'
//   const option = {
//     body: 'Foreground Message body.'
//   }
//
//   return self.registration.showNotification(title, option)
// });

self.addEventListener('fetch', function (event) {
  console.log('service-worker registered!')
});



self.addEventListener('push', event => {
  console.log('Received a push message', event)
  const title = 'Push message coming'
  const body = JSON.stringify(event)

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body
    })
  )
})

self.addEventListener(
  'notificationclick',
  event => {
    event.notification.close()
  },
  false
)
