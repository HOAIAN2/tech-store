import { useEffect } from 'react'
import './Home.scss'
import { useUserData } from '../../Context'
function Home() {
    const [user] = useUserData()
    useEffect(() => {
        document.title = 'Tech Store'
        console.log(user)
    })
    return (
        <div className='home'>
        </div>
    )
}
export default Home