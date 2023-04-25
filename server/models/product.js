class Product {
    constructor(productID, productName, supplier, category, price, quantity, soldQuantity,
        unitInOrder, discount, images, description, rating, ratingCount, supplierID, commentCount) {
        this.productID = productID
        this.productName = productName
        this.supplier = supplier
        this.supplierID = supplierID
        this.category = category
        this.price = price
        this.quantity = quantity
        this.soldQuantity = soldQuantity
        this.unitInOrder = unitInOrder
        this.discount = discount
        this.images = images
        this.description = description
        this.rating = parseFloat(rating) || 0
        this.ratingCount = ratingCount || 0
        this.commentCount = commentCount || 0
    }
    updateUnitInOrder(delta) {
        this.unitInOrder += delta
    }
    updateQuantity(delta) {
        this.quantity += delta
    }
    updateSoldQuantity(quantity) {
        this.soldQuantity += quantity
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

module.exports = Product