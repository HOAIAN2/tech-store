import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login, fetchUserData } from '../../utils/Auth'
import { getOrder } from '../../utils/Order'
import { useUserData, USER_ACTION, useOrderData, ORDER_ACTION } from '../../Context'
import languages from './Languages/Login.json'
import './Login.scss'

function Login() {
    const [, dispatchUser] = useUserData()
    const [, dispatchOrders] = useOrderData()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [checking, setChecking] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    const buttonRef = useRef(null)
    const prePage = location.state?.from
    let language = languages.en
    if (navigator.language === 'vi') language = languages.vi
    function handleLogin(e) {
        e.preventDefault()
        if (password.length < 8) {
            setError(language.passwordTooShort)
            return
        }
        buttonRef.current.classList.add('loading')
        login(username, password)
            .then(data => {
                localStorage.setItem('token', JSON.stringify(data))
                return fetchUserData()
            })
            .then(data => {
                dispatchUser({ type: USER_ACTION.SET, payload: data })
                return getOrder()
            })
            .then((data) => {
                dispatchOrders({ type: ORDER_ACTION.SET, payload: data })
                buttonRef.current.classList.remove('loading')
                navigate(prePage?.pathname + prePage?.search || '/')
            })
            .catch(error => {
                buttonRef.current.classList.remove('loading')
                console.error(error.message)
                setError(error.message)
            })
    }
    // Trigger back have token or data refactor later
    useEffect(() => {
        fetchUserData()
            .then(data => {
                dispatchUser({ type: USER_ACTION.SET, payload: data })
                navigate(prePage?.pathname || '/')
            })
            .catch(error => {
                setChecking(false)
                document.title = language.title
                if (error.message !== 'no token') console.error(error.message)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (checking) return null
    else return (
        <div className="login">
            <div className='login-title'>
                <span>{language.title}</span>
            </div>
            <form onSubmit={handleLogin}>
                <div>
                    <input type='text' placeholder={language.username}
                        autoFocus
                        required
                        value={username}
                        onInput={e => { setUsername(e.target.value) }} /> <br />
                </div>
                <div>
                    <input type='password' placeholder={language.password}
                        required
                        value={password}
                        onInput={e => { setPassword(e.target.value) }} /> <br />
                </div>
                <div className='error-login'>
                    <p>{error}</p>
                </div>
                <div>
                    <button ref={buttonRef}>{language.title}</button>
                </div>
            </form>
            <div>
                <span>
                    <Link to='#'>{language.forget}</Link>
                </span>
            </div>
            <div>
                <span>
                    {language.doesntHaveAccount} <Link role='button' to='/register'>{language.register}</Link>
                </span>
            </div>
        </div>
    )
}

export default Login