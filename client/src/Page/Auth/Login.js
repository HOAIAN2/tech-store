import { useState } from 'react'
import request from '../../utils/api-config'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    function handleLogin(e) {
        e.preventDefault()
        request.post('/auth/login', {
            username: username,
            password: password
        })
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <input type='text' placeholder="Tên đăng nhập"
                    value={username}
                    onInput={e => { setUsername(e.target.value) }} />
                <input type='password' placeholder="Mật khẩu"
                    value={password}
                    onInput={e => { setPassword(e.target.value) }} />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login