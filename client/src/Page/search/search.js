import Header from "../../components/header/Header"
import "./search.scss"
import SearchContent from "../../components/search_content/SearchContent"
import { useSearchParams } from "react-router-dom"
function Search() {
    const [searchParam, getSearchParam] = useSearchParams()
    console.log(searchParam.get('name'))
    return (
        <>
            <Header />
            <div className="search_content">
                <SearchContent />
            </div>
        </>
    )

}


export default Search