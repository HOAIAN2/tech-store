import { useState, useEffect } from 'react'
import './Register.scss'

function Register() {
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
    function handleRegister(e) {
        e.preventDefault()
        if (password !== password1) {
            setError('Nhập lại mật khẩu không chính xác')
            return
        }
    }
    console.log(sex)
    useEffect(() => {
        document.title = 'Đăng ký'
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
                            value={username}
                            onInput={e => { setUsername(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-first-name'>Họ</label>
                        <input type='text'
                            id='register-first-name'
                            value={lastName}
                            onInput={e => { setLastName(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-last-name'>Tên</label>
                        <input type='text'
                            id='register-last-name'
                            value={firstName}
                            onInput={e => { setFirstName(e.target.value) }} /> <br />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='register-birth-date'>Ngày sinh</label>
                        <input type='date'
                            id='register-birth-date'
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
                    <button>Đăng ký</button>
                </div>
            </form>
            {/* <div>
                <span>
                    <Link to='#'>Quên mật khẩu</Link>
                </span>
            </div>
            <div>
                <span>
                    Chưa có tài khoản? <Link role='button' to='/register'>Đăng ký</Link>
                </span>
            </div> */}
        </div>
    )
}

export default Register