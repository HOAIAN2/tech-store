import { Link } from 'react-router-dom'
import { useUserData } from '../../Context'
import './Account.scss'
function Account() {
    // Fetch user Data when app first load
    const [user, dispatchUser] = useUserData()
    console.log(user)
    if (user) return (
        <div className='header-account logon'>
            <div className='drop-list-main'>
                <span>{user.username}</span>
            </div>
            <div className='drop-list-item'>
                <div><Link to='#'>Tài khoản</Link></div>
                <div><Link to='/change-password'>Đổi mật khẩu</Link></div>
                <div>Đăng xuất</div>
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