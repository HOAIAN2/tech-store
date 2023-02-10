class Suppliers{
    constructor(supplier_id,supplier_name,address,email,phone_number,){
        this.supplier_id = supplier_id;
        this.supplier_name = supplier_name;
        this.address = address;
        this.phone_number = phone_number;
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