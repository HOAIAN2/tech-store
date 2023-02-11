import { useEffect } from 'react'
import './Home.scss'
import Header from '../../components/header/Header'
import { useUserData } from '../../Context'
function Home() {
    const [user] = useUserData()
    useEffect(() => {
        document.title = 'Tech Store'
        console.log(user)
    })
    return (
        <div className='home'>
            <Header />
        </div>
    )
}
export default Home