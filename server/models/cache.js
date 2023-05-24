class Cache {
    #limit
    #key
    constructor(key = '', limit = 1000) {
        this.data = []
        this.#limit = limit
        this.#key = key
    }
    get size() {
        return this.data.length
    }
    get limit() {
        return this.#limit
    }
    set limit(newSize) {
        if (this.size > newSize) throw new Error('New maximum size must greater than old size')
        return this.#limit = newSize
    }
    add(item) {
        if (this.find(item[this.#key])) throw new Error(`${this.#key} must be unique`)
        if (this.data.length === this.#limit) this.data.pop()
        this.data.unshift(item)
    }
    addLast(item) {
        if (this.find(item[this.#key])) throw new Error(`${this.#key} must be unique`)
        if (this.data.length === this.#limit) this.data.shift()
        this.data.push(item)
    }
    remove(key) {
        const index = this.data.findIndex(item => item[this.#key] === key)
        if (index === -1) return
        else this.data.splice(index, 1)
    }
    clear() {
        this.data = []
    }
    find(key) {
        return this.data.find(item => {
            return item[this.#key] === key
        })
    }
    toJSON() {
        return JSON.stringify(this.data)
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