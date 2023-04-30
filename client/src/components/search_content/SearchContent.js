import { useEffect, useState, useRef } from "react"
import { getAddress, getBrands } from "../../utils/supplier/index"
import { getProductSearchPage, getProductByID } from "../../utils/Product/index"
import ItemSidebarSearchPage from "../render_item/ItemSidebarSearchPage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import "./SearchContent.scss"
import { useSearchParams } from "react-router-dom"
import ProductItem from "../render_item/ProductItem"
import { formatArray } from "../home_content/content/ProductHome"
import { usePropData, useSortData } from "../../Context"
// import { SORT_ACTION } from '../../Context/index'



function SearchContent() {
    const [searchParam] = useSearchParams()
    const [address, setAddress] = useState([])
    const [brands, setBrands] = useState([])
    const [indexToShow] = useState(5)
    const [products, setproducts] = useState([])
    const [productsOrigin, setproductsOrigin] = useState([])
    const [prop] = usePropData()
    // const [sort, dispatchSort] = useSortData()

    function handlesort(typesort) {
        return (e) => {
            if (typesort.includes('price')) {
                let a = document.querySelector('.activesortprice')
                let b = document.querySelector('.activeSort')
                let c = document.querySelector('.sortprice-name')
                a?.classList.remove('activesortprice')
                b?.classList.remove('activeSort')
                c.textContent = e.target.textContent
                c.style.color = '#d41138'
                e.target.classList.add('activesortprice')
            } else {
                let a = document.querySelector('.activeSort')
                let b = document.querySelector('.sortprice-name')
                let c = document.querySelector('.activesortprice')
                a?.classList.remove('activeSort')
                b.textContent = 'Giá'
                b.style.color = ''
                c?.classList.remove('activesortprice')
                e.target.classList.add('activeSort')
            }


            if (typesort === 'default') {
                setproducts({ products: [...productsOrigin.products] })
            } else if (typesort === 'moinhat') {
                let a = productsOrigin.products.map((item, index) => {
                    return { ...item }
                })
                a = a.sort((a, b) => {
                    return b.productID - a.productID
                })
                setproducts({ products: a })
            } else if (typesort === 'hot') {
                let a = productsOrigin.products.map((item, index) => {
                    return { ...item }
                })
                a = a.sort((a, b) => {
                    return b.soldQuantity - a.soldQuantity
                })
                setproducts({ products: a })
            } else if (typesort === 'priceDESC') {
                const a = products.products.sort((a, b) => {
                    return a.price - b.price
                })
                setproducts({ products: a })
            } else if (typesort === 'priceASC') {
                const a = products.products.sort((a, b) => {
                    return b.price - a.price
                })
                setproducts({ products: a })
            }
        }
    }

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
        getProductSearchPage(searchParam.get('name'), prop?.brand, prop?.address)
            .then((rs => {
                setproducts(rs)
                setproductsOrigin({ products: [...rs.products], index: rs.index })
            }))
    }, [searchParam, prop])


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
                                <ItemSidebarSearchPage arr={address} typeprop={'address'} index={indexToShow} />
                            </div>
                            {/* {sidebaraddress.length > indexToShow ? <button onClick={renderitemwhenclickbtnmore}>Xem Thêm</button> : <></>} */}
                        </li>
                        <li>
                            <div className="title_item_sidebar_list">Theo Thương Hiệu</div>
                            <div className="wrap_item_sidebar_search_item">
                                <ItemSidebarSearchPage arr={brands} typeprop={'brand'} index={indexToShow} numberToShow={5} />
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
                    <span className="titlesort" >Sắp Xếp Theo</span>
                    {/* </div> */}
                    <div className="sortitem activeSort" onClick={handlesort('default')}>
                        <span className="sortnew" >Liên Quan</span>
                    </div>
                    <div className="sortitem" onClick={handlesort('moinhat')}>
                        <span className="sortnew"  >Mới Nhất</span>
                    </div>
                    <div className="sortitem" onClick={handlesort('hot')}>
                        <span className="sorthot" >Bán Chạy</span>
                    </div>
                    <div className="sortprice">
                        <span className="sortprice-name">Giá</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                        <div className="sortprice_item">
                            <span onClick={handlesort('priceDESC')} >Giá Thấp Đến Cao</span>
                            <span onClick={handlesort('priceASC')}>Giá Cao Đến Thấp</span>
                        </div>
                    </div>
                </div>
                <div className="product-search-page">
                    {
                        products?.products ?
                            formatArray(products.products, 4).map((item, index) => {
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