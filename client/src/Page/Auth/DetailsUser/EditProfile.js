import { useState } from "react"
import { useUserData, USER_ACTION } from "../../../Context"
import './EditProfile.scss'
import languages from './Languages/EditProfile.json'
import { editProfile, fetchUserData } from "../../../utils/Auth"

function EditProfile(props) {
    const [user, dispatchUser] = useUserData()
    const [firstName, setfirstName] = useState(user.firstName)
    const [lastName, setlastName] = useState(user.lastName)
    const [birthDate, setBirthDate] = useState(() => {
        const date = new Date(user.birthDate).toLocaleDateString('pt-br').split('/').reverse().join('-');
        return date
    })
    const [sex, setSex] = useState(user.sex)
    const [address, setaddress] = useState(user.address)
    const [email, setEmail] = useState(user.email || '')
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '')
    const [error, setError] = useState('')
    let language = languages.en
    if (navigator.language === 'vi') language = languages.vi
    function inputChange(e) {
        if (e.target.className === "firstname-input") return setfirstName(e.target.value)
        if (e.target.className === "lastname-input") return setlastName(e.target.value)
        if (e.target.className === "address-input") return setaddress(e.target.value)
        if (e.target.className === "email-input") return setEmail(e.target.value)
        if (e.target.className === "phone-input") return setPhoneNumber(e.target.value)
        if (e.target.className === "birth-date-input") return setBirthDate(e.target.value)
    }
    function getSex() {
        if (sex === 'male') return 'm'
        else return 'f'
    }
    function handleSave(e) {
        e.preventDefault()
        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (email.trim() !== '') {
            if (!email.match(emailRegex)) return setError(language.emailInvalid)
        }
        if (!firstName) return setError(language.firstNameNotNull)
        if (!lastName) return setError(language.lastNameNotNull)
        if (!address) return setError(language.addressNotNull)
        const data = {
            firstName: firstName,
            lastName: lastName,
            birthDate: new Date(birthDate),
            sex: getSex(),
            address: address,
            email: email,
            phoneNumber: phoneNumber
        }
        editProfile(data)
            .then(() => fetchUserData())
            .then(data => {
                dispatchUser({ type: USER_ACTION.SET, payload: data })
                props.setIsEditMode(false)
            })
            .catch(error => {
                if (error.message !== 'no token') console.error(error.message)
                console.error(error.message)
                setError(error.message)
            })
    }

    function closePopup(e) {
        if (e.target.className === "shadow") {
            props.setIsEditMode(false)
        }
    }
    return (
        <div className="edit-profile-popup">
            <div className="shadow" onClick={closePopup}>
                <form onSubmit={handleSave} className="popup-container">
                    <div className="title-popup-update-user">{language.title}</div>

                    <div className="content-popup-update">
                        <div className="update-user">
                            <span className="title-update-field">{language.firstName}</span>
                            <div className="wrap-input-pudate">
                                <input className="firstname-input" type="text" value={firstName} onInput={inputChange} />
                            </div>
                        </div>
                        <div className="update-user">
                            <span className="title-update-field">{language.lastName}</span>
                            <div className="wrap-input-pudate">
                                <input className="lastname-input" type="text" value={lastName} onInput={inputChange} />
                            </div>
                        </div>

                        <div className="update-user uploadbirth">
                            <span className="title-update-field">{language.birthDate}</span>
                            <div className="wrap-input-pudate">
                                <input type='date' className="birth-date-input" value={birthDate} onInput={inputChange} />
                            </div>
                        </div>

                        <div className="update-user">
                            <span className="title-update-field">{language.sex}</span>
                            <div className="option">
                                <div className="">
                                    <input id="option-one" className="option-gender"
                                        checked={sex === 'male'}
                                        onChange={() => { setSex('male') }}
                                        name="radio" type="radio" />
                                </div>
                                <label htmlFor="option-one"> {language.male} </label>
                            </div>
                            <div className="option">
                                <div className="">
                                    <input id="option-two" className="option-gender"
                                        checked={sex === 'female'}
                                        onChange={() => { setSex('female') }}
                                        name="radio" type="radio" />
                                </div>
                                <label htmlFor="option-two"> {language.female} </label>
                            </div>
                        </div>

                        <div className="update-user">
                            <span className="title-update-field">{language.address}</span>
                            <div className="wrap-input-pudate">
                                <input className="address-input" type="text" value={address} onInput={inputChange} />
                            </div>
                        </div>
                        <div className="update-user">
                            <span className="title-update-field">{language.email}</span>
                            <div className="wrap-input-pudate">
                                <input className="email-input" type="email" value={email} onInput={inputChange} />
                            </div>
                        </div>
                        <div className="update-user">
                            <span className="title-update-field">{language.phoneNumber}</span>
                            <div className="wrap-input-pudate">
                                <input className="phone-input"
                                    pattern="[0]\d{9}"
                                    type="tel" value={phoneNumber} onInput={inputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="btn-save">
                        <div className="error-message">{error}</div>
                        <button>{language.submit}</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditProfile