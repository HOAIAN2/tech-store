import "./DetailsUserProfile.scss"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { UploadImage, fetchImage } from "../../../utils/Auth"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { fetchUserData } from "../../../utils/Auth"
import { useUserData, USER_ACTION } from '../../../Context'


function DetailsUserProfile() {

  const [user, dispatchUser] = useUserData()
  const [avata, setavata] = useState(false)
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

  async function handlesubmit(e) {
    setavata(true)
    if (avata) {
      let a = document.querySelector(".avataitem")
      const file = new FileReader()
      file.addEventListener("load", () => {
        a.children[0].setAttribute("src", file.result)
      })
      file.readAsDataURL(e.target.files[0])
    }
  }

  function handlesave(e) {
    const file = document.querySelector("#file")
    if (file.files[0]) {
      UploadImage(file.files[0], user.username)
        .then((res) => {
          return fetchUserData();
        })
        .then((res)=>{
          dispatchUser({ type: USER_ACTION.SET, payload: res })
           
        })
    }
    else {
      console.log("err")
    }
  }
  useEffect(() => {
    // var observer = new MutationObserver((mutations) => {
    //   let b = document.querySelector("#file")
    //   const file = new FileReader()
    //   file.addEventListener("load", () => {
    //     mutations[0].target.children[0].setAttribute("src", file.result)
    //   })
    //   file.readAsDataURL(b.files[0])
    // });
    // observer.observe(document.querySelector(".avataitem"), { childList: true, subtree: true });

    if(user.avatar){
      setavata(true)
      const image = fetchImage(user.avatar)
    }
  }, [])

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
                <div className="infor-user-item2">{fullName}</div>
              </div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Email</div>
              <div className="infor-user-item2">
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
                  <span>{sex}</span>
                </div>
              </div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Date Of Birth</div>
              <div className="infor-user-item2">
                <div className="wrap-infor-user-item2">
                  {birthDate}
                </div>
              </div>
            </div>
            <button className="edit" onClick={handlesave}>Save</button>
          </div>
          <div className="avata-user">
            <div className="wrapavatauser">
              <div className="avataitem">
                {/* {avata ? <img id="avata" src="" alt="" /> : <FontAwesomeIcon icon={faUser} id="avata" />} */}
                <img id="avata" src="" alt="" />
              </div>
              <form className="setavata">
                <input onChange={handlesubmit} type="file" id="file" className="inputfile" />
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