import './EditUserProfile.scss'
const { useState } = require("react")
const { useUserData } = require("../../../Context")

function EditUserProfile() {
    const [user] = useUserData()
    console.log(user)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email || '')
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '')
    const [sex, setsex] = useState(user.setsex)
    return (
        <div className="profile-edit hide">
            <form>
                <div>
                    <span>Edit Profile</span>
                </div>
                <div>
                    <label>Họ</label>
                    <input type='text'
                        value={lastName}
                        onChange={e => { setLastName(e.target.value) }} />
                </div>
                <div>
                    <label>Tên</label>
                    <input type='text'
                        value={firstName}
                        onChange={e => { setFirstName(e.target.value) }} />
                </div>
                <div>
                    <label>Email</label>
                    <input type='email'
                        value={email}
                        onChange={e => { setEmail(e.target.value) }} />
                </div>
                <div>
                    <label>Số điện thoại</label>
                    <input type='tel'
                        value={phoneNumber}
                        onChange={e => { setPhoneNumber(e.target.value) }} />
                </div>
            </form>
            <button>Thoát</button>
        </div>
    )
}

export default EditUserProfile