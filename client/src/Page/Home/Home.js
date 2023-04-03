import { useEffect } from 'react'
import './Home.scss'
import Header from '../../components/header/Header'
import HomeContent from '../../components/home_content/HomeContent'
import Footer from '../../components/footer/Footer'


function Home() {
    // const [user] = useUserData()


    useEffect(() => {
        document.title = 'Tech Store'
    }, [])
    return (
        <div className='home'>
            <Header />
            <HomeContent />
            <Footer />
        </div>
    )
}
export default Home

