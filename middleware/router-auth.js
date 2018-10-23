// This is `@middleware/router-auth.js`

export default function({ store, redirect, route }) {
  store.state.user != null && route.name == 'login' ? redirect('/') : ''
  store.state.user == null && route.name != 'login' ? redirect('/login') : ''
}

const isLoggedIn = store => {
  return store && store.state && store.state.user
}
