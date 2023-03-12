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
    #setCurrentPrice() { }
    addProduct(productID, productName, quantity, price) {
        this.products.push({ productID, productName, quantity, price })
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
        this.#setCurrentPrice()
        this.paidMethod = paidMethod
        this.total = this.products.reduce((sum, product) => {
            return sum + product.price * product.quantity
        }, 0)
        this.orderDate = new Date(orderDate)
        this.paid = true
    }
}

module.exports = Order