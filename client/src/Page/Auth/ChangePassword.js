import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../utils/Auth'
import './ChangePassword.scss'

function ChangePassWord() {
    const [username, setUsername] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    function handleChangePassword(e) {
        e.preventDefault()
        if (newPassword !== newPassword1) {
            setError('nhập lại mật khẩu không chính xác')
            return
        }
        changePassword(username, oldPassword, newPassword)
            .then(data => {
                console.log(data)
                navigate('/login')
            })
            .catch(error => {
                console.error(error.message)
                setError(error.message)
            })
    }
    // Trigger back have token or data refactor later
    useEffect(() => {
        document.title = 'Đổi mật khẩu'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="change-password">
            <div className='change-password-title'>
                <span>Đổi mật khẩu</span>
            </div>
            <form onSubmit={handleChangePassword}>
                <div>
                    <input type='text' placeholder="Tên đăng nhập"
                        autoFocus
                        value={username}
                        onInput={e => { setUsername(e.target.value) }} /> <br />
                </div>
                <div>
                    <input type='password' placeholder="Mật khẩu cũ"
                        value={oldPassword}
                        onInput={e => { setOldPassword(e.target.value) }} /> <br />
                </div>
                <div>
                    <input type='password' placeholder="Mật khẩu mới"
                        value={newPassword}
                        onInput={e => { setNewPassword(e.target.value) }} /> <br />
                </div>
                <div>
                    <input type='password' placeholder="Nhập lại mật khẩu mới"
                        value={newPassword1}
                        onInput={e => { setNewPassword1(e.target.value) }} /> <br />
                </div>
                <div className='error-login'>
                    <span>{error}</span>
                </div>
                <div>
                    <button>Đổi mật khẩu</button>
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

export default ChangePassWord