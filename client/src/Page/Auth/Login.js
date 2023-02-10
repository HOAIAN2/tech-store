import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, fetchUserData } from '../../utils/Auth'
import { useUserData, USER_ACTION } from '../../Context'
import './Login.scss'

function Login(props) {
    const [, dispatchUser] = useUserData()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('Demo error')
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
                // handle later
                console.error(error)
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
                console.error(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <div>
                    <input type='text' placeholder="Tên đăng nhập"
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
                <Link role='button' to='/register'></Link>
            </div>
        </div>
    )
}

export default Login