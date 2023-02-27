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
    const [address, setaddress] = useState(user.address)
    const [email, setEmail] = useState(user.email || '')
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '')
    const [error, seterror] = useState()
    function handlelistday(data1, data2) {
        return (e) => {
            if (e.target.className === "listday-item") document.querySelector(".value-dayofbirth").textContent = e.target.textContent
            if (e.target.className === "listmonth-item") document.querySelector(".value-monthofbirth").textContent = e.target.textContent
            if (e.target.className === "listyear-item") document.querySelector(".value-yearofbirth").textContent = e.target.textContent
            let a = document.querySelector(data1)
            let b = document.querySelector(data2)
            if (a.style.display === "none") {
                a.style.display = "block"
                b.style.display = "block"
            } else {
                a.style.display = "none"
                b.style.display = "none"
            }
        }
    }
    function inputChange(e) {
        if (e.target.className === "username-input") return setUsername(e.target.value)
        if (e.target.className === "firstname-input") return setfirstName(e.target.value)
        if (e.target.className === "lastname-input") return setlastName(e.target.value)
        if (e.target.className === "address-input") return setaddress(e.target.value)
        if (e.target.className === "email-input") return setEmail(e.target.value)
        if (e.target.className === "phone-input") return setPhoneNumber(e.target.value)
    }

    function getBirth() {
        let a = document.querySelectorAll(".birth-value")
        let rs = []
        a.forEach((element) => {
            if (element.textContent.length === 1) {
                return rs.push("0" + element.textContent)
            }
            return rs.push(element.textContent)
        })
        const newArray = rs.slice().reverse();
        return newArray.toString().replace(/,/g, "-")
    }
    function getGender() {
        let a = document.querySelectorAll("#option-gender")
        if (a[0].checked) {
            return "male"
        }
        return "female"
    }
    function handleSave(e) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (email.trim() !== '') {
            if (!email.match(emailRegex)) return seterror("Invalid email")
        }
        let a = {
            userName: username,
            firstName: firstName,
            lastName: lastName,
            birthDate: new Date(getBirth()),
            gender: getGender(),
            address: address,
            email: email,
            phoneNumber: phoneNumber
        }
        console.log(a)
    }

    function closePopup(e) {
        if (e.target.className === "shadow") {
            props.setIsEditMode(false)
        }
    }

    useEffect(() => {
        const optionElement = document.querySelectorAll("#option-gender")
        const birthDate = user.birthDate.toLocaleDateString().split("/")
        const listdayofbirth = document.querySelectorAll(".birth-value")
        if (user.sex.includes("f")) {
            optionElement[1].setAttribute("checked", true)
        } else {
            optionElement[0].setAttribute("checked", true)
        }

        birthDate.forEach((element, index) => {
            if (element[0] === "0") {
                listdayofbirth[index].textContent = element.slice(1)
            } else {
                listdayofbirth[index].textContent = element
            }
        });
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
                            <div className="wrapupdatebirth">
                                <div className="birth dayofbirth" onClick={handlelistday(".listday", ".wrapdayofbirth")}>
                                    <p className="birth-value value-dayofbirth">1</p>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                    <div className="listday" style={{ display: "none" }}>
                                        <li className="listday-item">1</li>
                                        <li className="listday-item">2</li>
                                        <li className="listday-item">3</li>
                                        <li className="listday-item">4</li>
                                        <li className="listday-item">5</li>
                                        <li className="listday-item">6</li>
                                        <li className="listday-item">7</li>
                                        <li className="listday-item">8</li>
                                        <li className="listday-item">9</li>
                                        <li className="listday-item">10</li>
                                        <li className="listday-item">11</li>
                                        <li className="listday-item">12</li>
                                        <li className="listday-item">13</li>
                                        <li className="listday-item">14</li>
                                        <li className="listday-item">15</li>
                                        <li className="listday-item">16</li>
                                        <li className="listday-item">17</li>
                                        <li className="listday-item">18</li>
                                        <li className="listday-item">19</li>
                                        <li className="listday-item">20</li>
                                        <li className="listday-item">21</li>
                                        <li className="listday-item">22</li>
                                        <li className="listday-item">23</li>
                                        <li className="listday-item">24</li>
                                        <li className="listday-item">25</li>
                                        <li className="listday-item">26</li>
                                        <li className="listday-item">27</li>
                                        <li className="listday-item">28</li>
                                        <li className="listday-item">29</li>
                                        <li className="listday-item">30</li>
                                        <li className="listday-item">31</li>
                                    </div>
                                    <div className="wrapdayofbirth" style={{ display: "none" }}></div>
                                </div>
                                <div className="birth monthofbirth" onClick={handlelistday(".listmonth", ".wrapmonthofbirth")}>
                                    <p className="birth-value value-monthofbirth">2</p>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                    <div className="listmonth" style={{ display: "none" }} >
                                        <li className="listmonth-item">1</li>
                                        <li className="listmonth-item">2</li>
                                        <li className="listmonth-item">3</li>
                                        <li className="listmonth-item">4</li>
                                        <li className="listmonth-item">5</li>
                                        <li className="listmonth-item">6</li>
                                        <li className="listmonth-item">7</li>
                                        <li className="listmonth-item">8</li>
                                        <li className="listmonth-item">9</li>
                                        <li className="listmonth-item">10</li>
                                        <li className="listmonth-item">11</li>
                                        <li className="listmonth-item">12</li>
                                    </div>
                                    <div className="wrapmonthofbirth" style={{ display: "none" }}></div>
                                </div>
                                <div className="birth yearofbirth" onClick={handlelistday(".listyear", ".wrapyearofbirth")}>
                                    <p className="birth-value value-yearofbirth">2023</p>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                    <div className="listyear" style={{ display: "none" }} >
                                        <li className="listyear-item">1960</li>
                                        <li className="listyear-item">1961</li>
                                        <li className="listyear-item">1962</li>
                                        <li className="listyear-item">1963</li>
                                        <li className="listyear-item">1964</li>
                                        <li className="listyear-item">1965</li>
                                        <li className="listyear-item">1966</li>
                                        <li className="listyear-item">1967</li>
                                        <li className="listyear-item">1968</li>
                                        <li className="listyear-item">1969</li>
                                        <li className="listyear-item">1970</li>
                                        <li className="listyear-item">1971</li>
                                        <li className="listyear-item">1972</li>
                                        <li className="listyear-item">1973</li>
                                        <li className="listyear-item">1974</li>
                                        <li className="listyear-item">1975</li>
                                        <li className="listyear-item">1976</li>
                                        <li className="listyear-item">1977</li>
                                        <li className="listyear-item">1978</li>
                                        <li className="listyear-item">1979</li>
                                        <li className="listyear-item">1980</li>
                                        <li className="listyear-item">1981</li>
                                        <li className="listyear-item">1982</li>
                                        <li className="listyear-item">1983</li>
                                        <li className="listyear-item">1984</li>
                                        <li className="listyear-item">1985</li>
                                        <li className="listyear-item">1986</li>
                                        <li className="listyear-item">1987</li>
                                        <li className="listyear-item">1988</li>
                                        <li className="listyear-item">1989</li>
                                        <li className="listyear-item">1990</li>
                                        <li className="listyear-item">1991</li>
                                        <li className="listyear-item">1992</li>
                                        <li className="listyear-item">1993</li>
                                        <li className="listyear-item">1994</li>
                                        <li className="listyear-item">1995</li>
                                        <li className="listyear-item">1996</li>
                                        <li className="listyear-item">1997</li>
                                        <li className="listyear-item">1998</li>
                                        <li className="listyear-item">1999</li>
                                        <li className="listyear-item">2000</li>
                                        <li className="listyear-item">2001</li>
                                        <li className="listyear-item">2002</li>
                                        <li className="listyear-item">2003</li>
                                        <li className="listyear-item">2004</li>
                                        <li className="listyear-item">2005</li>
                                        <li className="listyear-item">2006</li>
                                        <li className="listyear-item">2007</li>
                                        <li className="listyear-item">2008</li>
                                        <li className="listyear-item">2009</li>
                                        <li className="listyear-item">2010</li>
                                        <li className="listyear-item">2011</li>
                                        <li className="listyear-item">2012</li>
                                        <li className="listyear-item">2013</li>
                                        <li className="listyear-item">2014</li>
                                        <li className="listyear-item">2015</li>
                                        <li className="listyear-item">2016</li>
                                        <li className="listyear-item">2017</li>
                                        <li className="listyear-item">2018</li>
                                        <li className="listyear-item">2019</li>
                                        <li className="listyear-item">2020</li>
                                        <li className="listyear-item">2021</li>
                                        <li className="listyear-item">2022</li>
                                        <li className="listyear-item">2023</li>
                                    </div>
                                    <div className="wrapyearofbirth" style={{ display: "none" }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="update-user">
                            <span className="title-update-field">Gender</span>
                            <div className="option">
                                <div className="">
                                    <input id="option-gender" name="radio" value="one" type="radio" />
                                </div>
                                <label htmlFor="option-one"> Male </label>
                            </div>
                            <div className="option">
                                <div className="">
                                    <input id="option-gender" name="radio" value="two" type="radio" />
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

                    <div className="btnsave">
                        <div className="errormessage">{error}</div>
                        <button onClick={handleSave} >Update</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditProfile