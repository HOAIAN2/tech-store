import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, fetchUserData } from '../../utils/Auth'
import { useUserData, USER_ACTION } from '../../Context'
import './Login.scss'

function Login(props) {
    const [, dispatchUser] = useUserData()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const prePage = props.path
    function handleLogin(e) {
        e.preventDefault()
        login(username, password)
            .then(data => {
                localStorage.setItem('token', JSON.stringify(data))
                return fetchUserData()
            })
            .then(data => {
                dispatchUser({ type: USER_ACTION.SET, payload: data })
                navigate(prePage || '/')
            })
            .catch(error => {
                console.error(error.message)
                setError(error.message)
            })
    }
    // Trigger back have token or data refactor later
    useEffect(() => {
        document.title = 'Đăng nhập'
        fetchUserData()
            .then(data => {
                dispatchUser({ type: USER_ACTION.SET, payload: data })
                navigate(prePage || '/')
            })
            .catch(error => {
                console.error(error.message)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="login">
            <div className='login-title'>
                <span>Đăng nhập</span>
            </div>
            <form onSubmit={handleLogin}>
                <div>
                    <input type='text' placeholder="Tên đăng nhập"
                        autoFocus
                        value={username}
                        onInput={e => { setUsername(e.target.value) }} /> <br />
                </div>
                <div>
                    <input type='password' placeholder="Mật khẩu"
                        value={password}
                        onInput={e => { setPassword(e.target.value) }} /> <br />
                </div>
                <div className='error-login'>
                    <span>{error}</span>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
            <div>
                <span>
                    <Link to='#'>Quên mật khẩu</Link>
                </span>
            </div>
            <div>
                <span>
                    Chưa có tài khoản? <Link role='button' to='/register'>Đăng ký</Link>
                </span>
            </div>
        </div>
    )
}

export default Login