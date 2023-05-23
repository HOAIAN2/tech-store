class Cache {
    #key
    constructor(key = '', limit = 1000) {
        this.data = []
        this.limit = limit
        this.#key = key
    }
    add(item) {
        if (this.data.length === this.limit) this.data.pop()
        this.data.unshift(item)
    }
    find(value) {
        return this.data.find(item => {
            return item[this.#key] === value
        })
    }
}


class OrderCache extends Cache {
    filter(userID) {
        return this.data.filter(order => order.userID == userID)
    }
    findLatest(userID) {
        return this.filter(userID)[0]
    }
    replace(order) {
        const index = this.data.findIndex(item => item.orderID === order.orderID)
        this.data[index] = order
    }
}
module.exports = {
    Cache,
    OrderCache
}