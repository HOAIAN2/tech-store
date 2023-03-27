import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchUserData } from '../../utils/Auth'
import { useUserData, USER_ACTION } from '../../Context'
import { register } from '../../utils/Auth'
import './Register.scss'
import languages from './Languages/Register.json'

function Register() {
    const [, dispatchUser] = useUserData()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [sex, setSex] = useState('Nam')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')
    const [checking, setChecking] = useState(true)
    const buttonRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()
    const prePage = location.state?.from
    let language = languages.en
    if (navigator.language === 'vi') language = languages.vi
    function handleRegister(e) {
        e.preventDefault()
        if (password !== password1) {
            setError(language.wrongReapeatPassword)
            return
        }
        if (username.length < 8) {
            setError(language.usernameTooShort)
            return
        }
        if (password.length < 8) {
            setError(language.passwordTooShort)
            return
        }
        const formatedBirthDate = new Date(birthDate)
        let formatedSex = 'M'
        if (sex === language.female) formatedSex = 'F'
        const fortmatedPhoneNumber = phoneNumber.replace('0', '+84')
        buttonRef.current.classList.add('loading')
        register({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            birthDate: formatedBirthDate,
            sex: formatedSex,
            address: address,
            email: email,
            phoneNumber: fortmatedPhoneNumber
        })
            .then(data => {
                localStorage.setItem('token', JSON.stringify(data))
                return fetchUserData()
            })
            .then(data => {
                dispatchUser({ type: USER_ACTION.SET, payload: data })
                buttonRef.current.classList.remove('loading')
                navigate(prePage?.pathname || '/')
            })
            .catch(error => {
                buttonRef.current.classList.add('loading')
                console.error(error.message)
                setError(error.message)
            })
    }
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
        <div className="register">
            <div className='register-title'>
                <span>{language.title}</span>
            </div>
            <form onSubmit={handleRegister}>
                <div>
                    <div>
                        <label htmlFor='register-username'>{language.username}</label>
                        <input type='text'
                            id='register-username'
                            autoFocus
                            required
                            value={username}
                            onInput={e => { setUsername(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-first-name'>{language.lastName}</label>
                        <input type='text'
                            id='register-first-name'
                            required
                            value={lastName}
                            onInput={e => { setLastName(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-last-name'>{language.firstName}</label>
                        <input type='text'
                            id='register-last-name'
                            required
                            value={firstName}
                            onInput={e => { setFirstName(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-birth-date'>{language.birthDate}</label>
                        <input type='date'
                            id='register-birth-date'
                            required
                            value={birthDate}
                            onInput={e => { setBirthDate(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-sex'>{language.sex}</label>
                        <select name='register-sex' value={sex}
                            onChange={e => { setSex(e.target.value) }}>
                            <option>{language.male}</option>
                            <option>{language.female}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-address'>{language.address}</label>
                        <input type='text'
                            id='register-address'
                            required
                            value={address}
                            onInput={e => { setAddress(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-email'>{language.email}</label>
                        <input type='email'
                            id='register-email'
                            value={email}
                            onInput={e => { setEmail(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-tel'>{language.phoneNumber}</label>
                        <input type='tel'
                            id='tel'
                            pattern="[0]\d{9}"
                            value={phoneNumber}
                            onInput={e => { setPhoneNumber(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-password'>{language.password}</label>
                        <input type='password'
                            id='register-password'
                            value={password}
                            onInput={e => { setPassword(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-password1'>{language.repeatPassword}</label>
                        <input type='password'
                            id='register-password1'
                            value={password1}
                            onInput={e => { setPassword1(e.target.value) }} /> <br />
                    </div>
                </div>
                <div className='error-register'>
                    <span>{error}</span>
                </div>
                <div>
                    <button ref={buttonRef}>{language.title}</button>
                </div>
            </form>
        </div>
    )
}

export default Register