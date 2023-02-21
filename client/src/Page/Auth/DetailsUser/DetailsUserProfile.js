import "./DetailsUserProfile.scss"
import { useUserData } from "../../../Context"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import request from "../../../utils/api-config"


function DetailsUserProfile() {

  const [user] = useUserData()
  // const [isEdit, setIsEdit] = useState(false)
  // Format and Show Info
  let sex = 'male'
  if (user.sex.toLowerCase() === 'female') sex = 'female'
  function formatPhoneNumber() {
    let phoneNumber = user.phoneNumber.replace("+84", "0")
    return phoneNumber?.replace(/\d{8}/, "********")
  }
  const fullName = `${user.lastName} ${user.firstName}`
  const phoneNumber = formatPhoneNumber()
  const birthDate = user.birthDate.toLocaleDateString()
  // Làm cái nút đổi thông tin bên cạnh đoạn Show chứ show thẳng nó conflict nhiều lắm.


  function handlesubmit(e) {
    var formData = new FormData();
    console.log(e)
    formData.append("image", e.target.files[0]);
    request.post('/auth/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })


  }

  return (
    <>
      <div className="detailuser-profile">
        <div className="detailuser-profile-title">
          <h1>My Profile</h1>
          <span>Manage and protect your account</span>
        </div>
        <div className="detailuser-profile-infor">
          <div className="infor-user">
            <div className="infor-user-item">
              <div className="infor-user-item1">User Name</div>
              <div className="infor-user-item2">{user.username}</div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Name</div>
              <div className="infor-user-item2">
                {/* <input type="text"></input> */}
                <div className="infor-user-item2">{fullName}</div>
              </div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Email</div>
              <div className="infor-user-item2">
                {/* {user.email ?
                  <span>{user.email}</span> :
                  addemail ? <></> : <span className="addemail" onClick={() => { setaddemail(true) }}>Add</span>
                }
                {addemail ? <input type="text"></input> : <></>} */}
              </div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Phone Number</div>
              <div className="infor-user-item2">{phoneNumber}</div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Gender</div>
              <div className="infor-user-item2">
                <div className="wrapcheckbox">
                  {/* <input className="checkbox" type="radio" name="gender" defaultChecked={sex ? false : true} />
                  <label>male</label>
                </div>
                <div className="wrapcheckbox">
                  <input className="checkbox" type="radio" name="gender" defaultChecked={sex ? true : false} />
                  <label>female</label> */}
                  <span>{sex}</span>
                </div>
              </div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Date Of Birth</div>
              <div className="infor-user-item2">
                <div className="wrap-infor-user-item2">
                  {birthDate}
                  {/* <div className="birthitem">
                    <div className="dayofbirth-item">
                      <span>1</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="listvalue-dayofbirth"></div>
                  </div>
                  <div className="birthitem">
                    <div className="dayofbirth-item">
                      <span>1</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="listvalue-dayofbirth"></div>
                  </div>
                  <div className="birthitem">
                    <div className="dayofbirth-item">
                      <span>1</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="listvalue-dayofbirth"></div>
                  </div> */}
                </div>
              </div>
            </div>
            <button className="edit">Edit</button>
          </div>
          <div className="avata-user">
            <div className="wrapavatauser">
              <img className="avata" src="https://images2.thanhnien.vn/Uploaded/gianglao/2022_07_30/odegaard-1979.jpeg"></img>
              <form className="setavata">
                {/* <button>Select Image</button> */}
                <input onChange={handlesubmit} type="file" name="file" id="file" className="inputfile" />
                <label htmlFor="file">Select Image</label>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default DetailsUserProfile