class User {
    constructor(id, username, firstName, lastName, hashedPassword) {
        this.id = id
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
        this.hashedPassword = hashedPassword
    }
}

module.exports = User