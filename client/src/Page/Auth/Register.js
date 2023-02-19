import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUserData } from '../../utils/Auth'
import { useUserData, USER_ACTION } from '../../Context'
import { register } from '../../utils/Auth'
import './Register.scss'

function Register(props) {
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
    const buttonRef = useRef(null)
    const navigate = useNavigate()
    const prePage = props.path
    function handleRegister(e) {
        e.preventDefault()
        if (password !== password1) {
            setError('Nhập lại mật khẩu không chính xác')
            return
        }
        if (username.length < 8) {
            setError('Tên đăng nhập phải có ít nhất 8 ký tự')
            return
        }
        if (username.length > 20) {
            setError('Tên đăng nhập quá dài')
            return
        }
        const formatedBirthDate = new Date(birthDate)
        let formatedSex = 'M'
        if (sex === 'Nữ') formatedSex = 'F'
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
                navigate(prePage || '/')
            })
            .catch(error => {
                buttonRef.current.classList.add('loading')
                console.error(error.message)
                setError(error.message)
            })
    }
    useEffect(() => {
        document.title = 'Đăng ký'
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
        <div className="register">
            <div className='register-title'>
                <span>Đăng ký</span>
            </div>
            <form onSubmit={handleRegister}>
                <div>
                    <div>
                        <label htmlFor='register-username'>Tên đăng nhập</label>
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
                        <label htmlFor='register-first-name'>Họ</label>
                        <input type='text'
                            id='register-first-name'
                            required
                            value={lastName}
                            onInput={e => { setLastName(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-last-name'>Tên</label>
                        <input type='text'
                            id='register-last-name'
                            required
                            value={firstName}
                            onInput={e => { setFirstName(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-birth-date'>Ngày sinh</label>
                        <input type='date'
                            id='register-birth-date'
                            required
                            value={birthDate}
                            onInput={e => { setBirthDate(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-sex'>Giới tính</label>
                        <select name='register-sex' value={sex}
                            onChange={e => { setSex(e.target.value) }}>
                            <option>Nam</option>
                            <option>Nữ</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-address'>Địa chỉ</label>
                        <input type='text'
                            id='register-address'
                            required
                            value={address}
                            onInput={e => { setAddress(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-email'>Email</label>
                        <input type='email'
                            id='register-email'
                            value={email}
                            onInput={e => { setEmail(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-tel'>Số điện thoại</label>
                        <input type='tel'
                            id='tel'
                            pattern="[0]\d{9}"
                            value={phoneNumber}
                            onInput={e => { setPhoneNumber(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-password'>Mật khẩu</label>
                        <input type='password'
                            id='register-password'
                            value={password}
                            onInput={e => { setPassword(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-password1'>Nhập lại mật khẩu</label>
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
                    <button ref={buttonRef}>Đăng ký</button>
                </div>
            </form>
        </div>
    )
}

export default Register