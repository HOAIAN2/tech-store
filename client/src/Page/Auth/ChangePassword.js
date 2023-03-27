import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { changePassword, fetchUserData } from '../../utils/Auth'
import './ChangePassword.scss'
import languages from './Languages/ChangePassword.json'

function ChangePassWord() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [error, setError] = useState('')
    const [checking, setChecking] = useState(true)
    const navigate = useNavigate()
    let language = languages.en
    if (navigator.language === 'vi') language = languages.vi
    function handleChangePassword(e) {
        e.preventDefault()
        if (newPassword !== newPassword1) {
            setError(language.wrongReapeatPassword)
            return
        }
        if (newPassword.length < 8) {
            setError(language.passwordTooShort)
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
        fetchUserData()
            .then(() => {
                setChecking(false)
                document.title = language.title
            })
            .catch(() => {
                navigate('/login')
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (checking) return null
    return (
        <div className="change-password">
            <div className='change-password-title'>
                <span>{language.title}</span>
            </div>
            <form onSubmit={handleChangePassword}>
                <div>
                    <input type='password' placeholder={language.oldPassword}
                        required
                        value={oldPassword}
                        onInput={e => { setOldPassword(e.target.value) }} /> <br />
                </div>
                <div>
                    <input type='password' placeholder={language.newPassword}
                        required
                        value={newPassword}
                        onInput={e => { setNewPassword(e.target.value) }} /> <br />
                </div>
                <div>
                    <input type='password' placeholder={language.repeatPassword}
                        required
                        value={newPassword1}
                        onInput={e => { setNewPassword1(e.target.value) }} /> <br />
                </div>
                <div className='error-change-password'>
                    <p>{error}</p>
                </div>
                <div>
                    <button>{language.title}</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassWord