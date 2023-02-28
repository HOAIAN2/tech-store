import "./Header.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { faSquareYoutube } from "@fortawesome/free-brands-svg-icons"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons"
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import Account from "../Account/Account"
import {searchProduct} from "../../utils/Auth"
import { useState } from "react"
function Header() {
    const [valueofsearch, setvalueofsearch] = useState("")
    const [productsearch, setproductsearch] = useState([])
    async function handleinputsearch(e) {
        setvalueofsearch(e.target.value)
        searchProduct(e.target.value)
        .then((res)=>{
            setproductsearch(res)
            console.log(res)
        })
    }

    return (
        <div className="header">
            <div className="header_item1">
                <div className="wrap-header-item1">
                    <div className="header_item1-1">
                        <div className="header_item_1-1_btn">
                            <span>Kênh Người Bán</span>
                        </div>
                        <div className="header_item_1-1_btn">
                            <span>Tải Ứng Dụng</span>
                        </div>
                        <div className="header_item_1-1_btn">
                            <span>Language</span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>

                    <div className="header_item1-2">
                        <Account />
                        <div className="header_item_1-2_btn">
                            <span className="text-thongbao">Thông Báo</span>
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
                        <a className="wrap_logo" href="/">
                            <h1 className="header_logo_item">TECH</h1>
                            <h1 className="header_logo_item">STORE</h1>
                        </a>
                    </div>
                    <div className="header_search">
                        <div className='search'>
                            <input placeholder='Tìm sản phẩm' className='search_input' value={valueofsearch} onInput={handleinputsearch}></input>
                            <div className="list-search">
                               <div className="search-item">
                                <img className="image-product-search" src="http://localhost:4000/images/avatar/user.png"></img>
                                <div className="description">Điện thoại Samsung Galaxy Z Flip 4 (8GB/128GB) - Hàng chính hãng</div>
                               </div>
                            </div>
                        </div>
                        <div className="search_btn">
                            <div className="wrap_search-btn">
                                <span>Search</span>
                            </div>
                        </div>
                    </div>
                    <div className="cart-shopping">
                        <FontAwesomeIcon icon={faCartShopping} />
                        <div className="number-cart">
                            <span>1</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header_item3">
                <div className="wrap-header-item3">
                    <div className="option-item">
                        <div className="header-option">
                            <FontAwesomeIcon icon={faHouseChimney} />
                            <span>Home</span>
                            <FontAwesomeIcon icon={faCaretDown} className="icondow" />
                        </div>
                        <div className="header-option">
                            <span>Products</span>
                            <FontAwesomeIcon icon={faCaretDown} className="icondow" />
                        </div>
                        <div className="header-option">
                            <span>Blog</span>
                        </div>
                        <div className="header-option">
                            <span>Contact</span>
                        </div>
                    </div>
                    <div className="option-item">
                        <div className="header-contact">
                            <FontAwesomeIcon icon={faPhoneVolume} />
                            <span>035 596 0156</span>
                        </div>
                        <div className="header-contact">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>dungprof8.0@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header