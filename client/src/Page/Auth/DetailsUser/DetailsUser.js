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
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

function DetailsUser() {
  const [user] = useUserData()
  const location = useLocation()
  const [valueofusername, setvauleofusername] = useState(user.username)
  const [valueoffirstName, setvalueoffirstName] = useState(user.firstName)
  const [valueoflastName, setvalueoflastName] = useState(user.lastName)
  const [valueofaddress, setvalueofaddress] = useState(user.address)
  const [valueofemail, setvalueofemail] = useState(user.email || '')
  const [error, seterror] = useState()

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
        listdayofbirth[index].innerHTML = element.slice(1)
      } else {
        listdayofbirth[index].innerHTML = element
      }
    });
  })

  if (!user) return <Navigate to='/login' replace state={{ from: location }} />
  const fullName = `${user.lastName} ${user.firstName}`

  function handlelistday(data1, data2) {
    return (e) => {
      if (e.target.className === "listday-item") document.querySelector(".value-dayofbirth").innerHTML = e.target.textContent
      if (e.target.className === "listmonth-item") document.querySelector(".value-monthofbirth").innerHTML = e.target.textContent
      if (e.target.className === "listyear-item") document.querySelector(".value-yearofbirth").innerHTML = e.target.textContent
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
  function inputchange(e) {
    if (e.target.className === "username-input") return setvauleofusername(e.target.value)
    if (e.target.className === "firstname-input") return setvalueoffirstName(e.target.value)
    if (e.target.className === "lastname-input") return setvalueoflastName(e.target.value)
    if (e.target.className === "address-input") return setvalueofaddress(e.target.value)
    if (e.target.className === "email-input") return setvalueofemail(e.target.value)
  }

  function getbirth() {
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
  function getgender() {
    let a = document.querySelectorAll("#option-gender")
    if (a[0].checked) {
      return "male"
    }
    return "female"
  }
  function handlebtnsave(e) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!valueofemail.match(emailRegex)) return seterror("Invalid email")
    let a = {
      userName: valueofusername,
      firstName: valueoffirstName,
      lastName: valueoflastName,
      birthDate: new Date(getbirth()),
      gender: getgender(),
      address: valueofaddress,
      email: valueofemail
    }
    console.log(a)
  }

  function closepopup(e) {
    if (e.target.className === "shadow") {
      e.target.parentElement.classList.add('hide')
    }
  }
  function popupopen(e) {
    const a = document.querySelector(".popup")
    a.classList.remove('hide')
  }

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
                <div className="edit-profile" onClick={popupopen}>
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
            <Outlet />
          </div>
        </div>
      </div>

      <div className="popup hide">
        <div className="shadow" onClick={closepopup}>
          <div className="contentpopup">
            <div className="titlepopupupdateuser">Update User</div>

            <div className="content-popup-update">
              <div className="updateuser uploadusername">
                <span className="titlepuload">User Name</span>
                <div className="wrapinput-pudate">
                  <input className="username-input" type="text" value={valueofusername} onInput={inputchange} />
                </div>
              </div>
              <div className="updateuser uploadfirstname">
                <span className="titlepuload">First Name</span>
                <div className="wrapinput-pudate">
                  <input className="firstname-input" type="text" value={valueoffirstName} onInput={inputchange} />
                </div>
              </div>
              <div className="updateuser uploadlastname">
                <span className="titlepuload">Last Name</span>
                <div className="wrapinput-pudate">
                  <input className="lastname-input" type="text" value={valueoflastName} onInput={inputchange} />
                </div>
              </div>

              <div className="updateuser uploadbirth">
                <span className="titlepuload">Birth</span>
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

              <div className="updateuser uploadgender">
                <span className="titlepuload">Gender</span>
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

              <div className="updateuser uploademail">
                <span className="titlepuload">Address</span>
                <div className="wrapinput-pudate">
                  <input className="address-input" type="text" value={valueofaddress} onInput={inputchange} />
                </div>
              </div>
              <div className="updateuser uploademail">
                <span className="titlepuload">Email</span>
                <div className="wrapinput-pudate">
                  <input className="email-input" type="email" value={valueofemail} onInput={inputchange} />
                </div>
              </div>
            </div>

            <div className="btnsave">
              <div className="errormessage">{error}</div>
              <div className="titlebtnsave" onClick={handlebtnsave} >Update</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}



export default DetailsUser;
