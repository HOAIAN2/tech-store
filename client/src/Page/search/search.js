import Header from "../../components/header/Header"
import "./search.scss"
import SearchContent from "../../components/search_content/SearchContent"
import { useEffect } from "react"
import { usePropData, useProductData } from '../../Context'
import { getProductSearchPage } from '../../utils/Product'
import { useSearchParams } from "react-router-dom"
import { PRODUCT_ACTION } from '../../Context'

function Search() {
    const [prop] = usePropData()
    const [searchParam] = useSearchParams()
    const [product, dispatchProduct] = useProductData()

    function handlescrollfetch(e) {
        if (e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight) {
            if (product.index) {
                getProductSearchPage(searchParam.get('name'), prop?.brand, prop?.address, prop?.star, product.index)
                    .then((rs => {
                        dispatchProduct({ type: PRODUCT_ACTION.SETProduct, payload: rs.products, index: rs.index })
                    }))
            }
        }
    }

    useEffect(() => {
        document.title = 'Tìm kiếm sản phẩm'
    })
    return (
        <div className="wrapsearch-content" onScroll={handlescrollfetch}>
            <div className="wrapsearch-conten-item">
                <Header />
                <div className="search_content">
                    <SearchContent />
                </div>
            </div>
        </div>
    )

}


export default Search