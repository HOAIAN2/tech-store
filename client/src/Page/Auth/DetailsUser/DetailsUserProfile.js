import { useRef, useState, useEffect } from "react"
import { uploadImage } from "../../../utils/Auth"
import { fetchUserData } from "../../../utils/Auth"
import { useUserData, USER_ACTION } from '../../../Context'
import EditProfile from "./EditProfile"
import "./DetailsUserProfile.scss"
import languages from './Languages/DetailsUserProfile.json'

function DetailsUserProfile() {
  const [user, dispatchUser] = useUserData()
  const [avatar, setAvatar] = useState(user.avatar)
  const [isDifferentAvatar, setIsDifferentAvatar] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [error, setError] = useState('')
  const inputFileRef = useRef()
  const imageRef = useRef()
  let language = languages.en
  if (navigator.language === 'vi') language = languages.vi
  // Format and Show Info
  let sex = language.male
  if (user.sex.toLowerCase() === 'female') sex = language.female
  function formatPhoneNumber() {
    let phoneNumber = user.phoneNumber?.replace("+84", "0")
    return phoneNumber?.replace(/\d{8}/, "********")
  }
  const fullName = `${user.lastName} ${user.firstName}`
  const phoneNumber = formatPhoneNumber()
  const birthDate = user.birthDate.toLocaleDateString()
  async function handleChangeAvatar(e) {
    setError('')
    const acceptFormats = ['image/png', 'image/jpg', 'image/jpeg']
    const limitSize = 500 * 1024
    if (!e.target.files[0]) return
    if (e.target.files[0].size > limitSize) return setError(language.sizeLimit)
    if (!acceptFormats.includes(e.target.files[0].type)) return setError(language.formatNotAccept)
    const file = new FileReader()
    file.addEventListener("load", () => {
      setAvatar(file.result)
      setIsDifferentAvatar(true)
      setError('')
    })
    file.readAsDataURL(e.target.files[0])
  }
  function handleSaveAvatar(e) {
    if (inputFileRef.current.files[0]) {
      uploadImage(inputFileRef.current.files[0])
        .then(() => fetchUserData())
        .then((res) => {
          dispatchUser({ type: USER_ACTION.SET, payload: res })
          setIsDifferentAvatar(false)
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }
  useEffect(() => {
    document.title = language.title
  })
  return (
    <>
      <div className="detailuser-profile">
        <div className="detailuser-profile-title">
          <h1>{language.title}</h1>
          <span>{language.subTitle}</span>
        </div>
        <div className="detailuser-profile-infor">
          <div className="infor-user">
            <div className="infor-user-item">
              <div className="infor-user-item1">{language.username}</div>
              <div className="infor-user-item2">{user.username}</div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">{language.name}</div>
              <div className="infor-user-item2">
                <div className="infor-user-item2">{fullName}</div>
              </div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">{language.email}</div>
              <div className="infor-user-item2">{user.email}</div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">{language.phoneNumber}</div>
              <div className="infor-user-item2">{phoneNumber}</div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">{language.sex}</div>
              <div className="infor-user-item2">
                <div className="wrapcheckbox">
                  <span>{sex}</span>
                </div>
              </div>
            </div>
            <div className="infor-user-item">
              <div className="infor-user-item1">{language.birthDate}</div>
              <div className="infor-user-item2">
                <div className="wrap-infor-user-item2">
                  {birthDate}
                </div>
              </div>
            </div>
            <button className="edit" onClick={() => { setIsEditMode(true) }}>{language.edit}</button>
          </div>
          <div className="avatar-user">
            <div className="wrap-avatar-user">
              <div className="avatar-item">
                <img title={language.hover} ref={imageRef} onClick={() => { inputFileRef.current.click() }} src={avatar} alt={`${fullName} avatar`} />
              </div>
              <div className="set-avatar">
                <input ref={inputFileRef}
                  onChange={handleChangeAvatar}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  id="file"
                  className="inputfile" />
                {error && <span className="error-file">{error}</span>}
                {isDifferentAvatar && !error && <button onClick={handleSaveAvatar}>{language.save}</button>}
              </div>
            </div>
          </div>

        </div>
      </div>
      {isEditMode && <EditProfile setIsEditMode={setIsEditMode} />}
    </>
  )
}

export default DetailsUserProfile