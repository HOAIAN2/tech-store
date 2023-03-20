import { useEffect } from 'react'
import './Home.scss'
import Header from '../../components/header/Header'
import Homecontent from '../../components/homecontent/homecontent'
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
            <Homecontent />
        </div>
    )
}
export default Home