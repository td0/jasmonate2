import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import * as fbConfig from '../.key/store'

!firebase.apps.length ? firebase.initializeApp(fbConfig) : ''
export const auth = firebase.auth()
export const db = firebase.database()
export default firebase
