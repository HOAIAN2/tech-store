class User {
    constructor(id, username, firstName, lastName, hashedPassword) {
        this.id = id
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
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