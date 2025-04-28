import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/users')
    }
  }, [navigate])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      })
      localStorage.setItem('token', res.data.token)
      navigate('/users')
      if (res.data) {
        toast.success("Login Successfully")
      }
    } catch (err) {
      alert('Invalid credentials')
    }
  }

  return (
    <div className='login-wrapper'>
      <div className='login-card'>
        <div className='login-header'>SIGN IN</div>
        <div className='avatar-placeholder'>
          <i className='fas fa-user-circle'></i>
        </div>
        <form className='login-form' onSubmit={handleLogin}>
          <div className='input-group'>
            <i className='fas fa-user'></i>
            <input
              type='email'
              placeholder='username'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-group'>
            <i className='fas fa-lock'></i>
            <input
              type='password'
              placeholder='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type='submit' className='login-btn'>
            LOGIN
          </button>
          <div className='nav-div'>
            <div>
              Don't have account?{' '}
              <span>
                <a href='/register'>Sign-up</a>
              </span>{' '}
            </div>
            <div>Forgot your password?</div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
