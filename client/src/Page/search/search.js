import Header from "../../components/header/Header"
import "./search.scss"
import SearchContent from "../../components/search_content/SearchContent"
import { useEffect } from "react"
function Search() {
    useEffect(() => {
        document.title = 'Tìm kiếm sản phẩm'
    })
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