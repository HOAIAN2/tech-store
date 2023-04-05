class Voucher {
    constructor(voucherID, voucherName, voucherDiscount, expiryDate, description) {
        this.voucherID = voucherID
        this.voucherName = voucherName
        this.voucherDiscount = voucherDiscount
        this.expiryDate = new Date(expiryDate)
        this.description = description
    }
}

module.exports = Voucher