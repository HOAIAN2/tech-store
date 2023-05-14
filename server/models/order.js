class Order {
    constructor(orderID, userID, orderDate, paidMethod, paid) {
        this.orderID = orderID
        this.userID = userID
        this.orderDate = orderDate
        this.paidMethod = paidMethod
        this.paid = paid
        this.products = []
        this.total = 0
        this.voucher = null
    }
    addProduct(productID, productName, quantity, price, discount) {
        this.products.push(new Detail(productID, productName, quantity, price, discount))
    }
    removeProduct(productID) {
        const index = this.products.findIndex(product => {
            return product.productID === productID
        })
        this.products.splice(index, 1)
    }
    setVoucher(voucher) {
        this.voucher = voucher
    }
    paidOrder(paidMethod, orderDate) {
        this.paidMethod = paidMethod
        this.total = this.products.reduce((sum, product) => {
            return sum + product.total()
        }, 0)
        if (this.voucher) {
            this.total = this.total * (1 - this.voucher.voucherDiscount)
        }
        this.orderDate = new Date(orderDate)
        this.paid = true
    }
}

class Detail {
    constructor(productID, productName, quantity, price, discount) {
        this.productID = productID
        this.productName = productName
        this.quantity = quantity
        this.price = price
        this.discount = discount
    }
    setQuantity(quantity) {
        this.quantity = quantity
    }
    total() {
        return (1 - this.discount) * (this.price * this.quantity)
    }
}
module.exports = Order