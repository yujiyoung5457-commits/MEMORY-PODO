import React, { useState } from 'react'
import useAuthStore from '../store/authStore'
import icon1 from '../assets/1.svg'
import icon2 from '../assets/2.svg'
import icon3 from '../assets/3.svg'
import icon4 from '../assets/4.svg'
import icon5 from '../assets/5.svg'
import './Login.scss'

const loginIcons = [icon1, icon2, icon3, icon4, icon5]

const LoginIcons = () => (
  <div className="loginIcons" aria-hidden="true">
    {loginIcons.map((icon, index) => (
      <img key={icon} src={icon} alt="" className={`loginIcon loginIcon${index + 1}`} />
    ))}
  </div>
)

const Login = () => {
  const [mode, setMode] = useState('signIn')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useAuthStore((state) => state.user)
  const initialized = useAuthStore((state) => state.initialized)
  const signIn = useAuthStore((state) => state.signIn)
  const signUp = useAuthStore((state) => state.signUp)
  const signOut = useAuthStore((state) => state.signOut)
  const loading = useAuthStore((state) => state.loading)
  const error = useAuthStore((state) => state.error)

  const isSignIn = mode === 'signIn'

  const submitAuth = async (event) => {
    event.preventDefault()

    if (email.trim() === '' || password.trim() === '') {
      alert('이메일과 비밀번호를 입력해주세요')
      return
    }

    try {
      if (isSignIn) {
        await signIn({ email, password })
      } else {
        await signUp({ email, password })
      }
    } catch (err) {
      alert(err.message)
    }
  }

  if (!initialized) {
    return (
      <section className="loginPanel">
        <LoginIcons />
        <h2>Login</h2>
        <p>로그인 상태 확인중</p>
      </section>
    )
  }

  if (user) {
    return (
      <section className="loginPanel">
        <LoginIcons />
        <h2>Login</h2>
        <p className="loginUserEmail">{user.email}</p>
        <button type="button" onClick={signOut}>
          로그아웃
        </button>
      </section>
    )
  }

  return (
    <section className="loginPanel">
      <LoginIcons />
      <h2>Login</h2>
      <form onSubmit={submitAuth}>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && <p>{error.message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? '처리중' : isSignIn ? '로그인' : '회원가입'}
        </button>
      </form>
      <button type="button" onClick={() => setMode(isSignIn ? 'signUp' : 'signIn')}>
        {isSignIn ? '회원가입하기' : '로그인하기'}
      </button>
    </section>
  )
}

export default Login
