import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faL } from "@fortawesome/free-solid-svg-icons"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { faSquareYoutube } from "@fortawesome/free-brands-svg-icons"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Account from "../Account/Account"
import languages from './Languages/Header.json'
import "./HeaderOrther.scss"
import { Link } from 'react-router-dom'
import { getOrder } from "../../utils/Order/index"
import { baseIMG } from "../../utils/api-config"
function HeaderOrder() {
    const [focus, setFocus] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    let language = languages.en
    function handeInput(e) {
        setFocus(true)
        setSearchValue(e.target.value)
    }
    if (navigator.language === 'vi') language = languages.vi
    return (
        <div className="headerorder">
            <div className="header_item1">
                <div className="wrap-header-item1">
                    <div className="header_item1-1">
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
                    <form className="header_search">
                        <div className='search'>
                            <input placeholder={language.placeHolder}
                                className='search_input'
                                // value={searchValue}
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
                        {/* {searchValue && focus && <SearchListPopup data={searchData} setSearchValue={setSearchValue} />} */}
                    </form>
                </div>
            </div>


        </div>
    )
}

export default HeaderOrder