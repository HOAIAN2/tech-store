import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import './NotFound.scss'
import languages from './Languages/NotFound.json'
import SliceProducts from '../../components/home_content/content/SliceProducts'
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
                <div><Link to='/'>{language.button}</Link></div>
            </div>
            <SliceProducts />
        </div>
    )
}

export default NotFound