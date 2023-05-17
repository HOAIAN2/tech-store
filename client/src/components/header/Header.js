import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faL } from "@fortawesome/free-solid-svg-icons"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { faSquareYoutube } from "@fortawesome/free-brands-svg-icons"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons"
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Account from "../Account/Account"
import languages from './Languages/Header.json'
import "./Header.scss"
import SearchListPopup from '../render_item/SearchListPopup'
import { searchProduct } from '../../utils/Product'
import useDebounce from '../../utils/hooks/useDebounce'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { getOrder } from "../../utils/Order/index"
import OrderItem from '../render_item/OrderItem'
import { baseIMG } from "../../utils/api-config"
import { useUserData, useOrderData } from '../../Context'
function Header() {
    const [user] = useUserData()
    const [orders] = useOrderData()
    const navigate = useNavigate()
    const [searchParam] = useSearchParams({ name: '' })
    const [focus, setFocus] = useState(false)
    const [searchValue, setSearchValue] = useState(searchParam.get('name'))
    const [searchData, setSearchData] = useState([])
    const [order, setOrder] = useState([])
    const debounce = useDebounce(searchValue, 200)
    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (e.target.className === 'search_input') return
            if (e.target.className !== 'search-container') setFocus(false)
        })
        if (!debounce) return
        searchProduct(debounce)
            .then(res => {
                setSearchData(res)
            })
            .catch(error => {
                console.error(error)
            })
    }, [debounce])
    useEffect(() => {
        getOrder()
            .then((rs) => {
                setOrder(rs)
            })
    }, [])
    let language = languages.en
    function handeInput(e) {
        setFocus(true)
        setSearchValue(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        navigate(`/search?name=${searchValue}`)
    }
    if (navigator.language === 'vi') language = languages.vi
    return (
        <div className="header">
            <div className="header_item1">
                <div className="wrap-header-item1">
                    <div className="header_item1-1">
                        {/* <div className="header_item_1-1_btn">
                            <span>Kênh Người Bán</span>
                        </div> */}
                        <div className="header_item_1-1_btn">
                            <span>{language.download}</span>
                        </div>
                        <div className="header_item_1-1_btn">
                            <span>{language.languages}</span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>

                    <div className="header_item1-2">
                        <Account />
                        <div className="header_item_1-2_btn">
                            <span className="text-thongbao">{language.notifications}</span>
                            <FontAwesomeIcon className="thongbao-icon" icon={faBell} />
                        </div>
                        <div className="header_item_1-2_btn">
                            <a href="/">
                                <FontAwesomeIcon icon={faSquareYoutube} />
                            </a>
                        </div>
                        <div className="header_item_1-2_btn">
                            <a href="/">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                        </div>
                        <div className="header_item_1-2_btn">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.instagram.com/hoaian.2202/">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                        <div className="header_item_1-2_btn">
                            <a href="/">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            <div className="header_item2">
                <div className="wrap_header_item2">
                    <div className="header_logo">
                        <Link className="wrap_logo" to="/">
                            <h1 className="header_logo_item">TECH</h1>
                            <h1 className="header_logo_item">STORE</h1>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} className="header_search">
                        <div className='search'>
                            <input placeholder={language.placeHolder}
                                className='search_input'
                                value={searchValue}
                                onInput={handeInput}
                                onFocus={() => { setFocus(true) }}
                            ></input>
                        </div>
                        {searchValue && <div className="search_btn">
                            <button className="wrap_search-btn">
                                <span>
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                            </button>
                        </div>}
                        {searchValue && focus && <SearchListPopup data={searchData} setSearchValue={setSearchValue} />}
                    </form>
                    {
                        user && orders.at(-1) ?
                            <Link to={'/order'} className="cart-shopping">
                                <FontAwesomeIcon icon={faCartShopping} />
                                <div className="number-cart">
                                    <span>1</span>
                                </div>
                                <div className='popup_cart-shopping'>
                                    {order.length !== 0 ?
                                        <OrderItem data={order} />
                                        :
                                        <div style={{ textAlign: "center" }}>
                                            <img src={`${baseIMG}orther/icon-nonorder.png`} alt=''></img>
                                            <div>Không Có Sản Phẩm</div>
                                        </div>}
                                </div>
                            </Link> :
                            <></>
                    }
                </div>
            </div>

            <div className="header_item3">
                <div className="wrap-header-item3">
                    <div className="option-item">
                        <div className="header-option">
                            <FontAwesomeIcon icon={faHouseChimney} />
                            <span>{language.home}</span>
                            <FontAwesomeIcon icon={faCaretDown} className="icondow" />
                        </div>
                        <div className="header-option">
                            <span>{language.products}</span>
                            <FontAwesomeIcon icon={faCaretDown} className="icondow" />
                        </div>
                        <div className="header-option">
                            <span>{language.blog}</span>
                        </div>
                        <div className="header-option">
                            <span>{language.contact}</span>
                        </div>
                    </div>
                    <div className="option-item">
                        <div className="header-contact">
                            <FontAwesomeIcon icon={faPhoneVolume} />
                            <span>{language.phoneNumber}</span>
                        </div>
                        <div className="header-contact">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>{language.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header