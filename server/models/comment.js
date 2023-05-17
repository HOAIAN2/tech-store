class Comment {
    constructor(commentID, userID, avatar, userFirstName, userLastName, productID, comment, rate, commentDate) {
        this.commentID = commentID
        this.userID = userID
        this.avatar = avatar
        this.userFirstName = userFirstName
        this.userLastName = userLastName
        this.productID = productID
        this.comment = comment
        this.rate = rate
        this.commentDate = new Date(commentDate)
    }
}

module.exports = Comment