import Header from "../../components/header/Header"
import "./search.scss"
import Search_content from "../../components/search_content/search_content"
function Search() {

    return (
        <>
            <Header />
            <div className="search_content">
                <Search_content />
            </div>
        </>
    )

}


export default Search