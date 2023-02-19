import "./DetailsUserProfile.scss"
import { useUserData } from "../../../Context"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"


function DetailsUserProfile() {

  const [user] = useUserData()
  const [addemail, setaddemail] = useState(false);
  const [birth, setbirth] = useState("")
  const [sex , setsex] = useState(false)

  function handlephonenumber() {
    let a = user.phoneNumber.replace("+84", "0")
    return a.replace(/\d{8}/, "********")
  }
  useEffect(() => {
    setbirth(user.birthDate.toLocaleDateString())
    if(user.sex.includes("f")){
      setsex(true)
    }
    // console.log(user.birthDate.toLocaleDateString().split("/"))
  }, [])


  return (
    <>
      <div className="detailuser-profile">
        <div className="detailuser-profile-title">
          <h1>My Profile</h1>
          <span>Manage and protect your account</span>
        </div>
        <div className="detailuser-profile-infor">
          <form className="infor-user">
            <div className="infor-user-item">
              <div className="infor-user-item1">User Name</div>
              <div className="infor-user-item2">{user.username}</div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Name</div>
              <div className="infor-user-item2">
                <input type="text"></input>
              </div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Email</div>
              <div className="infor-user-item2">
                {user.email ?
                  <span>{user.email}</span> :
                  addemail ? <></> : <span className="addemail" onClick={() => { setaddemail(true) }}>Add</span>
                }
                {addemail ? <input type="text"></input> : <></>}
              </div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Phone Number</div>
              <div className="infor-user-item2">{handlephonenumber()}</div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Gender</div>
              <div className="infor-user-item2">
                <div className="wrapcheckbox">
                  <input className="checkbox" type="radio" name="gender" defaultChecked={sex?true:false}/>
                  <label>male</label>
                </div>
                <div className="wrapcheckbox">
                  <input className="checkbox" type="radio" name="gender" defaultChecked={sex?false:true} />
                  <label>female</label>
                </div>
              </div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">Date Of Birth</div>
              <div className="infor-user-item2">
                <div className="wrap-infor-user-item2">
                  {birth}
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
            <button className="save">Save</button>
          </form>
          <div className="avata-user">
            <div className="wrapavatauser">
              <img className="avata" src="https://images2.thanhnien.vn/Uploaded/gianglao/2022_07_30/odegaard-1979.jpeg"></img>
              <div className="setavata">
                {/* <button>Select Image</button> */}
                <input type="file" name="file" id="file" className="inputfile" />
                <label htmlFor="file">Select Image</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailsUserProfile