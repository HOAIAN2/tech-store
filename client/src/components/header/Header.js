import "./Header.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { faSquareYoutube } from "@fortawesome/free-brands-svg-icons"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
function Header() {

    return (
        <div className="header">
        <div className="header_item1">
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
                <div className="header_item_1-2_btn">
                    <div className="wrap_btn_login-logout">
                        <a href="/">
                            <span>Login</span>
                        </a>
                        <p>/</p>
                        <a href="/">
                            <span>Sign Up</span>
                        </a>
                    </div>
                </div>
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
                    <a href="/">
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
    )
}

export default Header