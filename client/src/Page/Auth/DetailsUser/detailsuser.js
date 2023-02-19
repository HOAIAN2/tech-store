<<<<<<< HEAD
import "./Detailsuser.scss"
import { Navigate, Outlet } from 'react-router-dom'
=======
import "./DetailsUser.scss"
import { Navigate, Outlet, useLocation } from 'react-router-dom'
>>>>>>> d82a36cfe921ea51a3dae8de076b74c96a27e646
import Header from "../../../components/header/Header";
import { useUserData } from "../../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faUserPen } from "@fortawesome/free-solid-svg-icons"
import {faClipboardList} from "@fortawesome/free-solid-svg-icons"
import {faBell} from "@fortawesome/free-solid-svg-icons"
import {faTicketSimple} from "@fortawesome/free-solid-svg-icons"
import {faCoins} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

function DetailsUser() {
  const [user] = useUserData()
<<<<<<< HEAD
  if (!user) return <Navigate to='/login' />
  const fullName = `${user.lastName} ${user.firstName}`
=======
  const location = useLocation()
  if (!user) return <Navigate to='/login' replace state={{ from: location }} />
>>>>>>> d82a36cfe921ea51a3dae8de076b74c96a27e646
  return (
    <>
      <Header />
      <div className="conten-details-user">
        <div className="wrapcontendetailsuser">
          <div className="sibar-detail-user">
            <div className="sibar-detail-user_item">
              <div className="avata-detail-user">
                {/* <FontAwesomeIcon icon={faUser} /> */}
                <img src="https://images2.thanhnien.vn/Uploaded/gianglao/2022_07_30/odegaard-1979.jpeg" style={{ width: "100%", height: "100%" }}></img>
              </div>
              <div className="conten-avata-detailuser">
                <div className="name">
                  {fullName}
                </div>
                <div className="edit-profile">
                  <FontAwesomeIcon icon={faUserPen} />
                  <span>Edit Profile</span>
                </div>
              </div>
            </div>

            <div className="distance">
              <div className="distanceitem"></div>
            </div>

            <div className="sibar-detail-user_item active">
              <FontAwesomeIcon icon={faUser} />
              <Link to={"/"}>My Account</Link>
            </div>
            <div className="sibar-detail-user_item">
              <FontAwesomeIcon icon={faClipboardList} />
              <Link to={"/"}>My Purchase</Link>
            </div>
            <div className="sibar-detail-user_item">
              <FontAwesomeIcon icon={faBell} />
              <Link to={"/"}>Notifications</Link>
            </div>
            <div className="sibar-detail-user_item">
              <FontAwesomeIcon icon={faTicketSimple} />
              <Link to={"/"}>My Vouchers</Link>
            </div>
            <div className="sibar-detail-user_item">
              <FontAwesomeIcon icon={faCoins} />
              <Link to={"/"}>My TechStore Coins</Link>
            </div>

          </div>
          <div className="content-detail-profile">
            <Outlet/>
          </div>
        </div>
      </div>

    </>
  );
}



export default DetailsUser;
