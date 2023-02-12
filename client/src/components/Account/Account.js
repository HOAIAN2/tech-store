import { Link } from 'react-router-dom'
import { useUserData } from '../../Context'
import { logout } from '../../utils/Auth'
import './Account.scss'
function Account() {
    // Fetch user Data when app first load
    const [user, dispatchUser] = useUserData()
    function handleLogout() {
        logout()
            .then(data => {
                console.log(data)
                localStorage.clear()
                window.location.reload()
            })
            .catch(error => {
                alert(error.message)
            })
    }
    console.log(user)
    if (user) return (
        <div className='header-account logon'>
            <div className='drop-list-main'>
                <span>{user.username}</span>
            </div>
            <div className='drop-list-item'>
                <div><Link to='#'>Tài khoản</Link></div>
                <div><Link to='/change-password'>Đổi mật khẩu</Link></div>
                <div onClick={handleLogout}><Link to='#'>Đăng xuất</Link></div>
            </div>
        </div>
    )
    else return (
        <div className='header-account'>
            <Link className='login-btn' to='/login'>
                <span>Đăng nhập</span>
            </Link>
            {/* <p>/</p> */}
            <Link className='register-btn' to='/register'>
                <span>Đăng ký</span>
            </Link>
        </div>
    )
}

export default Account