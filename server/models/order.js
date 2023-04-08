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
        this.products.push({ productID, productName, quantity, price, discount })
    }
    setProduct(productID, quantity) {
        for (let index = 0; index < this.products.length; index++) {
            if (this.products[index].productID === productID) {
                this.products[index].quantity = quantity
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
    setVoucher(voucher) {
        this.voucher = voucher
    }
    paidOrder(paidMethod, orderDate) {
        this.paidMethod = paidMethod
        this.total = this.products.reduce((sum, product) => {
            return sum + (product.price * (1 - product.discount) * product.quantity)
        }, 0)
        if (this.voucher) {
            this.total = this.total * (1 - this.voucher.voucherDiscount)
        }
        this.orderDate = new Date(orderDate)
        this.paid = true
    }
}

module.exports = Order