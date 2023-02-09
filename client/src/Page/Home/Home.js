import { useEffect } from 'react'
import './Home.scss'

function Home() {    
    useEffect(() => {
        document.title = 'Tech Store'
    })
    return (
        <div className='home'>
        </div>
    )
}
export default Home