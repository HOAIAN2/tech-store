import { useEffect } from 'react'
import './Home.scss'
import Header from '../../components/header/Header'
// import { useUserData } from '../../Context'
function Home() {
    // const [user] = useUserData()
    useEffect(() => {
        document.title = 'Tech Store'
        // console.log(user)
    })

    function test(e) {
        console.log(e)
    }


    return (
        <div className='home'>
            <input onInput={test} type="file" name="filefield" multiple="multiple"></input>
            <Header />
        </div>
    )
}
export default Home