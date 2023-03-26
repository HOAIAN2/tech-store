import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import './NotFound.scss'
import languages from './Languages/NotFound.json'
import HotProducts from '../../components/home_content/content/HotProducts'
function NotFound() {
    let language = languages.en
    if (navigator.language === 'vi') language = languages.vi
    useEffect(() => {
        document.title = language.title
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='not-found'>
            <Header />
            <div className='not-found__contents'>
                <div>404</div>
                <div>{language.content}</div>
                <div><Link to='/'> Về trang chủ</Link></div>
            </div>
            <HotProducts />
        </div>
    )
}

export default NotFound