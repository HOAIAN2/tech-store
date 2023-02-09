import { useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './Home.scss'

function Home() {
    useEffect(() => {
        document.title = 'Tech Store'
    })
    return (
        <div className='home'>
            <Header />
            Home
            <Footer />
        </div>
    )
}
export default Home