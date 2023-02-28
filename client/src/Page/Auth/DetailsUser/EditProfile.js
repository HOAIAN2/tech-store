import { useState, useEffect } from "react"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useUserData } from "../../../Context"
import './EditProfile.scss'
function EditProfile(props) {
    const [user] = useUserData()

    const [username, setUsername] = useState(user.username)
    const [firstName, setfirstName] = useState(user.firstName)
    const [lastName, setlastName] = useState(user.lastName)
    const [birthDate, setBirthDate] = useState(() => {
        const date = new Date(user.birthDate).toLocaleDateString('pt-br').split('/').reverse().join('-');
        return date
    })
    const [address, setaddress] = useState(user.address)
    const [email, setEmail] = useState(user.email || '')
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '')
    const [error, seterror] = useState('')
    function inputChange(e) {
        if (e.target.className === "username-input") return setUsername(e.target.value)
        if (e.target.className === "firstname-input") return setfirstName(e.target.value)
        if (e.target.className === "lastname-input") return setlastName(e.target.value)
        if (e.target.className === "address-input") return setaddress(e.target.value)
        if (e.target.className === "email-input") return setEmail(e.target.value)
        if (e.target.className === "phone-input") return setPhoneNumber(e.target.value)
        if (e.target.className === "birth-date-input") return setBirthDate(e.target.value)
    }
    function getGender() {
        let genders = document.querySelectorAll(".option-gender")
        if (genders[0].checked) {
            return "m"
        }
        return "f"
    }
    function handleSave(e) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (email.trim() !== '') {
            if (!email.match(emailRegex)) return seterror("Invalid email")
        }
        const data = {
            userName: username,
            firstName: firstName,
            lastName: lastName,
            birthDate: new Date(birthDate),
            sex: getGender(),
            address: address,
            email: email,
            phoneNumber: phoneNumber
        }
        console.log(data)
    }

    function closePopup(e) {
        if (e.target.className === "shadow") {
            props.setIsEditMode(false)
        }
    }

    useEffect(() => {
        const optionElement = document.querySelectorAll(".option-gender")
        if (user.sex.includes("f")) {
            optionElement[1].setAttribute("checked", true)
        } else {
            optionElement[0].setAttribute("checked", true)
        }
    })
    return (
        <div className="edit-profile-popup">
            <div className="shadow" onClick={closePopup}>
                <div className="popup-container">
                    <div className="title-popup-update-user">User Profile</div>

                    <div className="content-popup-update">
                        <div className="update-user">
                            <span className="title-update-field">User Name</span>
                            <div className="wrap-input-pudate">
                                <input className="username-input" type="text" value={username} onInput={inputChange} />
                            </div>
                        </div>
                        <div className="update-user">
                            <span className="title-update-field">First Name</span>
                            <div className="wrap-input-pudate">
                                <input className="firstname-input" type="text" value={firstName} onInput={inputChange} />
                            </div>
                        </div>
                        <div className="update-user">
                            <span className="title-update-field">Last Name</span>
                            <div className="wrap-input-pudate">
                                <input className="lastname-input" type="text" value={lastName} onInput={inputChange} />
                            </div>
                        </div>

                        <div className="update-user uploadbirth">
                            <span className="title-update-field">Birth</span>
                            <div className="wrap-input-pudate">
                                <input type='date' className="birth-date-input" value={birthDate} onInput={inputChange} />
                            </div>
                        </div>

                        <div className="update-user">
                            <span className="title-update-field">Gender</span>
                            <div className="option">
                                <div className="">
                                    <input id="option-one" className="option-gender" name="radio" value="one" type="radio" />
                                </div>
                                <label htmlFor="option-one"> Male </label>
                            </div>
                            <div className="option">
                                <div className="">
                                    <input id="option-two" className="option-gender" name="radio" value="two" type="radio" />
                                </div>
                                <label htmlFor="option-two"> Female </label>
                            </div>
                        </div>

                        <div className="update-user">
                            <span className="title-update-field">Address</span>
                            <div className="wrap-input-pudate">
                                <input className="address-input" type="text" value={address} onInput={inputChange} />
                            </div>
                        </div>
                        <div className="update-user">
                            <span className="title-update-field">Email</span>
                            <div className="wrap-input-pudate">
                                <input className="email-input" type="email" value={email} onInput={inputChange} />
                            </div>
                        </div>
                        <div className="update-user">
                            <span className="title-update-field">Phone number</span>
                            <div className="wrap-input-pudate">
                                <input className="phone-input"
                                    pattern="[0]\d{9}"
                                    type="tel" value={phoneNumber} onInput={inputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="btn-save">
                        <div className="error-message">{error}</div>
                        <button onClick={handleSave} >Update</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditProfile