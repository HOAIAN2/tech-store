import { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import request from '../../utils/api-config'
import { useUserData, USER_ACTION } from '../../Context'
import './Login.scss'

function Login(props) {
    const [user, dispatchUser] = useUserData()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const prePage = props.path
    const token = JSON.parse(localStorage.getItem('token'))
    async function fetchUserData() {
        if (!token) return null
        try {
            const res = await request.get('/user', {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            })
            return res.data
        } catch (error) {
            console.error(error)
            return null
        }
    }
    function handleLogin(e) {
        e.preventDefault()
        request.post('/auth/login', {
            username: username,
            password: password
        })
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res.data))
                fetchUserData().then(data => {
                    if (data) {
                        dispatchUser({ type: USER_ACTION.SET, payload: data })
                        navigate(prePage || '/')
                    }
                })
            })
            .catch(error => {
                console.error(error)
            })
    }
    useEffect(() => {
        document.title = 'Đăng nhập'
    }, [])
    /// Trigger back have token or data refactor later
    if (user || token) {
        if (!user) {
            fetchUserData().then(data => {
                if (data) {
                    dispatchUser({ type: USER_ACTION.SET, payload: data })
                    navigate(prePage || '/')
                }
            })
        }
        return <Navigate to={prePage || '/'} />
    }
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