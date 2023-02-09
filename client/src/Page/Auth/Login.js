import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import request from '../../utils/api-config'
import './Login.scss'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    function handleLogin(e) {
        e.preventDefault()
        request.post('/auth/login', {
            username: username,
            password: password
        })
            .then(res => {
                console.log(res)
                localStorage.setItem('token', JSON.stringify(res.data))
                navigate('/')
            })
            .catch(error => {
                console.error(error)
            })
    }
    useEffect(() => {
        document.title = 'login'
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