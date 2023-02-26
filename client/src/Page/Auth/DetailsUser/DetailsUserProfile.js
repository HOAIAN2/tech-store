import "./DetailsUserProfile.scss"
import { uploadImage } from "../../../utils/Auth"
import { fetchUserData } from "../../../utils/Auth"
import { useUserData, USER_ACTION } from '../../../Context'

function DetailsUserProfile() {

  const [user, dispatchUser] = useUserData()
  // Format and Show Info
  let sex = 'male'
  if (user.sex.toLowerCase() === 'female') sex = 'female'
  function formatPhoneNumber() {
    let phoneNumber = user.phoneNumber?.replace("+84", "0")
    return phoneNumber?.replace(/\d{8}/, "********")
  }
  const fullName = `${user.lastName} ${user.firstName}`
  const phoneNumber = formatPhoneNumber()
  const birthDate = user.birthDate.toLocaleDateString()

  async function handlesubmit(e) {
    let a = document.querySelector(".avatar-item")
    const file = new FileReader()
    file.addEventListener("load", () => {
      a.children[0].setAttribute("src", file.result)
    })
    file.readAsDataURL(e.target.files[0])
  }

  function handlesave(e) {
    const file = document.querySelector("#file")
    if (file.files[0]) {
      uploadImage(file.files[0])
        .then(() => fetchUserData())
        .then((res) => {
          dispatchUser({ type: USER_ACTION.SET, payload: res })
        })
    }
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
          <div className="avatar-user">
            <div className="wrap-avatar-user">
              <div className="avatar-item">
                <img id="avatar" src={user.avatar} alt="" />
              </div>
              <div className="set-avatar">
                <input onChange={handlesubmit} type="file" id="file" className="inputfile" />
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