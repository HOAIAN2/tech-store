import { useEffect } from 'react'

function Home() {
    useEffect(()=>{
        document.title = 'Tech Store'
    })
    return (
        <div>Home</div>
    )
}
export default Home