class Order {
    constructor(orderID, userID, orderDate, paidMethod, paid) {
        this.orderID = orderID
        this.userID = userID
        this.orderDate = orderDate
        this.paidMethod = paidMethod
        this.paid = paid
        this.products = [] // {productID, productName, quantity, price?}
        this.total = 0
    }
    addProduct(productID, productName, quantity, price, discount) {
        this.products.push({ productID, productName, quantity, price, discount })
    }
    setProduct(productID, quantity) {
        for (let index = 0; index < this.products.length; i++) {
            if (this.products[index].productID === productID) {
                this.products[index.quantity] = quantity
                break
            }
        }
    }
    removeProduct(productID) {
        const index = this.products.findIndex(product => {
            return product.productID === productID
        })
        this.products.splice(index, 1)
    }
    paidOrder(paidMethod, orderDate) {
        this.paidMethod = paidMethod
        this.total = this.products.reduce((sum, product) => {
            return sum + (product.price * (1 - product.discount) * product.quantity)
        }, 0)
        this.orderDate = new Date(orderDate)
        this.paid = true
    }
    updatequantityproduct(quantity, productID) {
        this.products.every((item) => {
            if (item.productID === productID) {
                item.quantity = quantity
                return false
            }
            return true
        })
    }
}

module.exports = Order