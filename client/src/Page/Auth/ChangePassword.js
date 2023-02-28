import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../utils/Auth'
import './ChangePassword.scss'

function ChangePassWord() {
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
        changePassword(oldPassword, newPassword)
            .then(data => {
                localStorage.removeItem('token')
                navigate('/login')
            })
            .catch(error => {
                console.error(error.message)
                setError(error.message)
            })
    }
    useEffect(() => {
        document.title = 'Đổi mật khẩu'
    }, [])
    return (
        <div className="change-password">
            <div className='change-password-title'>
                <span>Đổi mật khẩu</span>
            </div>
            <form onSubmit={handleChangePassword}>
                <div>
                    <input type='password' placeholder="Mật khẩu cũ"
                        required
                        value={oldPassword}
                        onInput={e => { setOldPassword(e.target.value) }} /> <br />
                </div>
                <div>
                    <input type='password' placeholder="Mật khẩu mới"
                        required
                        value={newPassword}
                        onInput={e => { setNewPassword(e.target.value) }} /> <br />
                </div>
                <div>
                    <input type='password' placeholder="Nhập lại mật khẩu mới"
                        required
                        value={newPassword1}
                        onInput={e => { setNewPassword1(e.target.value) }} /> <br />
                </div>
                <div className='error-login'>
                    <p>{error}</p>
                </div>
                <div>
                    <button>Đổi mật khẩu</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassWord