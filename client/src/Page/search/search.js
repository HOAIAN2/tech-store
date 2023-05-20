import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import "./search.scss"
import SearchContent from "../../components/search_content/SearchContent"
import { useEffect, useState } from "react"
import { usePropData, useProductData } from '../../Context'
import { getProductSearchPage } from '../../utils/Product'
import { useSearchParams } from "react-router-dom"
import { PRODUCT_ACTION } from '../../Context'

function Search() {
    const [prop] = usePropData()
    const [searchParam] = useSearchParams()
    const [product, dispatchProduct] = useProductData()
    const [typesort, settypesort] = useState('')

    function callbackGetTypesort(typesort) {
        settypesort(typesort)
    }
    useEffect(() => {
        function handleScrollFetch() {
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                if (product.index) {
                    window.removeEventListener('scroll', handleScrollFetch)
                    getProductSearchPage(searchParam.get('name'), prop?.brand, prop?.address, prop?.star, typesort, product.index)
                        .then((rs => {
                            dispatchProduct({ type: PRODUCT_ACTION.SETPRODUCT, payload: rs.data, index: rs.index })
                        }))
                }
            }
        }
        window.addEventListener('scroll', handleScrollFetch)
        return () => {
            window.removeEventListener('scroll', handleScrollFetch)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])
    useEffect(() => {
        document.title = 'Tìm kiếm sản phẩm'
    })
    return (
        <div className="wrapsearch-content">
            <div className="wrapsearch-conten-item">
                <Header />
                <div className="search_content">
                    <SearchContent callbackgettypesort={callbackGetTypesort} />
                </div>
                <Footer />
            </div>
        </div>
    )

}


export default Search