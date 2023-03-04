class User {
    static #checkSex(sex = 'M') {
        if (sex.toLowerCase() === 'm') return 'male'
        else return 'female'
    }
    constructor(userID, role, username, firstName, lastName,
        birthDate, sex, address, email, phoneNumber, avatar, hashedPassword) {
        this.userID = userID
        this.role = role
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
        this.birthDate = new Date(birthDate)
        this.sex = User.#checkSex(sex)
        this.address = address
        this.email = email
        this.phoneNumber = phoneNumber
        this.avatar = avatar
        this.hashedPassword = hashedPassword
    }
    setFirstName(firstName) {
        this.firstName = firstName
    }
    setLastName(lastName) {
        this.lastName = lastName
    }
    setBirthDate(birthDate) {
        this.birthDate = new Date(birthDate)
    }
    setSex(sex) {
        this.sex = User.#checkSex(sex)
    }
    setAddress(address) {
        this.address = address
    }
    setEmail(email) {
        this.email = email
    }
    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber
    }
    setPassword(hashedPassword) {
        this.hashedPassword = hashedPassword
    }
    setAvatar(avatar) {
        this.avatar = avatar
    }
    ignoreProps() {
        const object = { ...this }
        const ignoreProps = Array.from(arguments)
        ignoreProps.forEach(key => {
            object[key] = undefined
        })
        return object
    }
}

module.exports = User