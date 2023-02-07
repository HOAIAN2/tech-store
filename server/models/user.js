class User {
    constructor(userID, role, username, firstName, lastName,
        birthDate, address, email, phoneNumber, hashedPassword) {
        this.userID = userID,
            this.role = role,
            this.username = username,
            this.firstName = firstName,
            this.lastName = lastName,
            this.birthDate = new Date(birthDate),
            this.address = address,
            this.email = email,
            this.phoneNumber = phoneNumber,
            this.hashedPassword = hashedPassword
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