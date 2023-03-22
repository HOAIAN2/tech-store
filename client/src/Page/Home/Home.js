import { useEffect } from 'react'
import './Home.scss'
import Header from '../../components/header/Header'
import HomeContent from '../../components/home_content/HomeContent'
// import { useUserData } from '../../Context'
function Home() {
    // const [user] = useUserData()
    useEffect(() => {
        document.title = 'Tech Store'
        // console.log(user)
    })
    return (
        <div className='home'>
            <Header />
            <HomeContent />
        </div>
    )
}
export default Home