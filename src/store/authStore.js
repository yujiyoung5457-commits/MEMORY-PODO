import { create } from 'zustand'
import {
  signInWithEmail,
  signOutWithFirebase,
  signUpWithEmail,
  subscribeAuthState,
} from '../services/FirebaseAuth'

const mapUser = (user) => {
  if (!user) {
    return null
  }

  return {
    uid: user.uid,
    email: user.email,
  }
}

const useAuthStore = create((set) => ({
  user: null,
  initialized: false,
  loading: false,
  error: '',

  listenAuthState: () => {
    return subscribeAuthState((user) => {
      set({
        user: mapUser(user),
        initialized: true,
      })
    })
  },

  signUp: async ({ email, password }) => {
    set({ loading: true, error: '' })
    try {
      const user = await signUpWithEmail({ email, password })
      set({ user: mapUser(user), loading: false })
    } catch (err) {
      set({ error: err, loading: false })
      throw err
    }
  },

  signIn: async ({ email, password }) => {
    set({ loading: true, error: '' })
    try {
      const user = await signInWithEmail({ email, password })
      set({ user: mapUser(user), loading: false })
    } catch (err) {
      set({ error: err, loading: false })
      throw err
    }
  },

  signOut: async () => {
    await signOutWithFirebase()
    set({ user: null, error: '' })
  },
}))

export default useAuthStore
