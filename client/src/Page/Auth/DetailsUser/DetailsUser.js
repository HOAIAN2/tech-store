import { useState } from "react"
import "./DetailsUser.scss"
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from "../../../components/header/Header";
import { useUserData } from "../../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faUserPen } from "@fortawesome/free-solid-svg-icons"
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { faTicketSimple } from "@fortawesome/free-solid-svg-icons"
import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import EditProfile from "./EditProfile"
import languages from './Languages/DetailUser.json'

function DetailsUser() {
  const [user] = useUserData()
  const location = useLocation()
  const [isEditMode, setIsEditMode] = useState(false)
  let language = languages.en
  if (navigator.language === 'vi') language = languages.vi
  if (!user) return <Navigate to='/login' replace state={{ from: location }} />
  const fullName = `${user.lastName} ${user.firstName}`
  return (
    <>
      <Header />
      <div className="conten-details-user">
        <div className="wrapcontendetailsuser">
          <div className="sibar-detail-user">
            <div className="sibar-detail-user_item">
              <div className="avatar-detail-user">
                <img id="avatar" src={user.avatar} alt="" />
              </div>
              <div className="conten-avatar-detailuser">
                <div className="name">
                  {fullName}
                </div>
                <div className="edit-profile">
                  <FontAwesomeIcon icon={faUserPen} />
                  <span onClick={() => { setIsEditMode(true) }}>{language.edit}</span>
                </div>
              </div>
            </div>

            <div className="distance">
              <div className="distanceitem"></div>
            </div>

            <div className="sibar-detail-user_item active">
              <FontAwesomeIcon icon={faUser} />
              <Link to={"/profile"}>{language.myAccount}</Link>
            </div>
            <div className="sibar-detail-user_item">
              <FontAwesomeIcon icon={faClipboardList} />
              <Link to={"/"}>{language.myPurchase}</Link>
            </div>
            <div className="sibar-detail-user_item">
              <FontAwesomeIcon icon={faBell} />
              <Link to={"/"}>{language.notifications}</Link>
            </div>
            <div className="sibar-detail-user_item">
              <FontAwesomeIcon icon={faTicketSimple} />
              <Link to={"/"}>{language.myVoucher}</Link>
            </div>
            <div className="sibar-detail-user_item">
              <FontAwesomeIcon icon={faCoins} />
              <Link to={"/"}>{language.coin}</Link>
            </div>

          </div>
          <div className="content-detail-profile">
            <Outlet />
          </div>
        </div>
      </div>
      {isEditMode && <EditProfile setIsEditMode={setIsEditMode} />}
    </>
  );
}



export default DetailsUser;
