import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import './NotFound.scss'

function NotFound() {
    useEffect(() => {
        document.title = 'Không tìm thấy'
    }, [])
    return (
        <div className='not-found'>
            <Header />
            <div className='not-found__contents'>
                <div>Rất tiếc, trang này hiện không tồn tại</div>
                <div>Liên kết có thể đã bị gỡ bỏ.<Link to='/'> Về trang chủ</Link></div>
            </div>
        </div>
    )
}

export default NotFound