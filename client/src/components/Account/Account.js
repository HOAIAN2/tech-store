import { Link } from 'react-router-dom'
import { useUserData } from '../../Context'
import './Account.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons"
function Account() {
    // Fetch user Data when app first load
    const [user, dispatchUser] = useUserData()
    console.log(user)
    if (user) return (
        <>
            <div className='drop-list-main'>
                <FontAwesomeIcon icon={faUser} />
                <span>{user.username}</span>
                <div className='drop-list-item'>
                    <span>Tài Khoản Của Tôi</span>
                    <span>Đổi Mật Khẩu</span>
                    <span>Đăng xuất</span>
                </div>
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