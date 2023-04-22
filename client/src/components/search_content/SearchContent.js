import { useEffect, useState } from "react"
import { getAddress, getBrands } from "../../utils/supplier/index"
import { getProductSearchPage } from "../../utils/Product/index"
import ItemSidebarSearchPage from "../render_item/ItemSidebarSearchPage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import "./SearchContent.scss"
import { useSearchParams } from "react-router-dom"
import ProductItem from "../render_item/ProductItem"
import { fortmatarr } from "../home_content/content/ProductHome"



function SearchContent() {
    const [searchParam] = useSearchParams()
    const [addDress, setAddress] = useState([])
    const [brands, setBrands] = useState([])
    const [indexToShow] = useState(5)
    const [products, setproducts] = useState([])

    useEffect(() => {
        getAddress()
            .then((rs) => {
                setAddress(rs)
            })
        getBrands()
            .then((rs) => {
                setBrands(rs)
            })
    }, [])

    useEffect(() => {
        getProductSearchPage(searchParam.get('name'))
            .then((rs => {
                setproducts(rs)
            }))
    }, [searchParam])
    return (
        <div className="wrap_search_content">
            <div className="sidebar_search_page">
                <nav className="wrap_sidebar_search_page">
                    <h3>
                        <FontAwesomeIcon icon={faList} />
                        Tìm Kiếm Theo
                    </h3>
                    <ul className="list_item_sidebar_search_page">
                        <li>
                            <div className="title_item_sidebar_list">Theo Địa Chỉ</div>
                            <div className="wrap_item_sidebar_search_item">
                                <ItemSidebarSearchPage arr={addDress} index={indexToShow} />
                            </div>
                            {/* {sidebaraddress.length > indexToShow ? <button onClick={renderitemwhenclickbtnmore}>Xem Thêm</button> : <></>} */}
                        </li>
                        <li>
                            <div className="title_item_sidebar_list">Theo Thương Hiệu</div>
                            <div className="wrap_item_sidebar_search_item">
                                <ItemSidebarSearchPage arr={brands} index={indexToShow} numberToShow={5} />
                            </div>
                            {/* {brands.length > indexToShow ? <button onClick={renderitemwhenclickbtnmore}>Xem Thêm</button> : <></>} */}
                        </li>
                        <li>
                            <div className="title_item_sidebar_list">Theo Đánh Giá</div>
                            <div className="wrap_item_sidebar_search_item">
                                <ItemSidebarSearchPage star={true} />
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="main_search_page">
                <div className="sort">
                    {/* <div className="sortitem"> */}
                    <span className="titlesort">Sắp Xếp Theo</span>
                    {/* </div> */}
                    <div className="sortitem">
                        <span className="sortnew">Mới Nhất</span>
                    </div>
                    <div className="sortitem">
                        <span className="sorthot">Bán Chạy</span>
                    </div>
                    <div className="sortitem">
                        <span className="sortprice">Giá</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                        <div className="sortprice_item">
                            <span>Giá Thấp Đến Cao</span>
                            <span>Giá Cao Đến Thấp</span>
                        </div>
                    </div>
                </div>
                <div className="product-search-page">
                    {
                        products.data ?
                            fortmatarr(products.data, 4).map((item, index) => {
                                return (
                                    <div key={index} className="product-search-page-item">
                                        {item.map((item, index) => {
                                            return <div key={index}><ProductItem data={item} type="search" /></div>
                                        })}
                                    </div>
                                )
                            }) : <></>
                    }
                </div>
            </div>
        </div >
    )
}


export default SearchContent