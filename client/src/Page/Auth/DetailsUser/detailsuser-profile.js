import Header from "../../../components/header/Header"
import "./detailuser-profile.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faUser} from "@fortawesome/free-solid-svg-icons"
import {faUserPen} from "@fortawesome/free-solid-svg-icons"

function DetailsUser_profile() {
    return (
        <>
            <Header />
            <div className="conten-details-user">
                <div className="wrapcontendetailsuser">
                      <div className="sibar-detail-user">
                        <div className="sibar-detail-user_item">
                            <div className="avata-detail-user">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="conten-avata-detailuser">
                                <div className="name">
                                    Dang Hung Dung
                                </div>
                                <div className="edit-profile">
                                    <FontAwesomeIcon icon={faUserPen} />
                                    <span>Edit Profile</span>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="content-detail-profile"></div>                      
                </div>
            </div>
        </>
    )
}

export default DetailsUser_profile