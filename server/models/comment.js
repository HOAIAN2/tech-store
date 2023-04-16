class Comment {
    constructor(commentID, userFirstName, userLastName, productID, comment, commentDate) {
        this.commentID = commentID
        this.userFirstName = userFirstName
        this.userLastName = userLastName
        this.productID = productID
        this.comment = comment
        this.commentDate = new Date(commentDate)
    }
}

module.exports = Comment