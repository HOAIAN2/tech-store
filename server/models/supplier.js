class Supplier {
    constructor(supplierId, supplierName, address, email, phoneNumber,) {
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
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

module.exports = Supplier