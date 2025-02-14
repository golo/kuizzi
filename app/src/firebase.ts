import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, signInAnonymously } from 'firebase/auth'
import { collection, connectFirestoreEmulator, doc, getFirestore, query } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { ref, getDownloadURL } from 'firebase/storage'

const app = initializeApp({
  apiKey: 'AIzaSyAvHh8CwRxbL-EheIO192-9KOEtP23LU7o',
  authDomain: 'cuiss-a87d9.firebaseapp.com',
  databaseURL: 'https://cuiss-a87d9.firebaseio.com',
  projectId: 'cuiss-a87d9',
  storageBucket: 'cuiss-a87d9.firebasestorage.app',
  messagingSenderId: '294095364564',
  appId: '1:294095364564:web:7028621d492aef0e093641'
})

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

if (import.meta.env.VITE_FIREBASE_EMULATOR === 'true' && !auth.emulatorConfig) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
}

export async function getImageUrl(path: string) {
  return await getDownloadURL(ref(storage, path))
}

export async function signInAnonym() {
  await signInAnonymously(auth).catch(error => console.error(`Could not anonymously sign in. You probably can't play`, error))
}

export function getGameRef(id: string) {
  return doc(db, 'games', id)
}

export function getGamePlayersQuery(gameId: string) {
  return query(collection(db, 'games', gameId, 'players'))
}

export function getUser() {
  const user = auth.currentUser
  if (!user) throw new Error('user is not signed in')
  return user
}
