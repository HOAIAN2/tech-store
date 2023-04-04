import './Footer.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faSquareTwitter } from "@fortawesome/free-brands-svg-icons"
function Footer() {

    return (
        <div className="footer">
            <div className="footer_item1">
                <p className='title'>THEO DÕI CHÚNG TÔI TRÊN</p>
                <div className='footer_item1_item'>
                    <FontAwesomeIcon icon={faSquareFacebook} />
                    <p>Facebook</p>
                </div>
                <div className='footer_item1_item'>
                    <FontAwesomeIcon icon={faInstagram} />
                    <p>Instagram</p>
                </div><div className='footer_item1_item'>
                    <FontAwesomeIcon icon={faSquareTwitter} />
                    <p>Twitter</p>
                </div>
            </div>
        </div>
    )
}

export default Footer