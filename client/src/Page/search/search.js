import Header from "../../components/header/Header"
import "./search.scss"
import SearchContent from "../../components/search_content/SearchContent"
function Search() {
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