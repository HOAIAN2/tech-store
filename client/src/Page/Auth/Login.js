import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import request from '../../utils/api-config'
import { useUserData, USER_ACTION } from '../../Context'
import './Login.scss'

function Login(props) {
    const [, dispatchUser] = useUserData()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const prePage = props.path
    function fetchUserData() {
        const token = JSON.parse(localStorage.getItem('token'))
        request.get('/user', {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        })
            .then(res => {
                dispatchUser({ type: USER_ACTION.SET, payload: res.data })
                navigate(prePage || '/')
            })
            .catch(error => {
                console.error(error)
            })
    }
    function handleLogin(e) {
        e.preventDefault()
        request.post('/auth/login', {
            username: username,
            password: password
        })
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res.data))
                fetchUserData()
            })
            .catch(error => {
                console.error(error)
            })
    }
    useEffect(() => {
        document.title = 'Đăng nhập'
    })
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