import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

export const firebaseConfig = {
  apiKey: 'AIzaSyCzJcT0b2EzzZc9mU7YK_UY7Y8ovYuCBI4',
  authDomain: 'book-appointments-37a0e.firebaseapp.com',
  projectId: 'book-appointments-37a0e',
  storageBucket: 'book-appointments-37a0e.appspot.com',
  messagingSenderId: '618801287017',
  appId: '1:618801287017:web:c5ed6fc803b0ff5bcf37f8',
  measurementId: 'G-C19Q9F7SVM'
}

if (!firebase.default.apps.length) {
  firebase.default.initializeApp(firebaseConfig)
}

export { firebase }
