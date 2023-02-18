import { Link } from 'react-router-dom'
import { logout } from '../../utils/Auth'
import { useUserData } from '../../Context'
import './Account.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons"
function Account() {
    // Fetch user Data when app first load
    const [user] = useUserData()
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
    if (user) return (
        <div className='header-account logon'>
            <div className='drop-list-main'>
                <FontAwesomeIcon icon={faUser} />
                <span>{user.username}</span>
                <div className='drop-list-item'>
                    <span><Link to='/profile'>Thông tin tài khoản</Link></span>
                    <span><Link to='/change-password'>Đổi mật khẩu</Link></span>
                    <span onClick={handleLogout}><Link to='#'>Đăng xuất</Link></span>
                </div>
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