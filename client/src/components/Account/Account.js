import { Link } from 'react-router-dom'
import { useUserData } from '../../Context'
import './Account.scss'
function Account() {
    // Fetch user Data when app first load
    const [user, dispatchUser] = useUserData()
    console.log(user)
    if (user) return (
        <>
            <div className='drop-list-main'>
                <span>{user.username}</span>
            </div>
            <div className='drop-list-item'>
                <span>Thông tin tài khoản</span>
                <span>Đổi mật khẩu</span>
                <span>Đăng xuất</span>
            </div>
        </>
    )
    else return (
        <>
            <Link to='/login'>
                <span>Đăng nhập</span>
            </Link>
            <p>/</p>
            <Link to='/register'>
                <span>Đăng ký</span>
            </Link>
        </>
    )
}

export default Account