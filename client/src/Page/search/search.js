import Header from "../../components/header/Header"
import { useSearchParams } from 'react-router-dom'
function Search() {
    const [searchParam, setSearchParam] = useSearchParams({ name: '' })
    console.log(searchParam.get('name'))
    return (
        <>
            <Header />
        </>
    )

}


export default Search