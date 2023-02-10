class Categories {
    constructor(category_id, category_name, description) {
      this.category_id = category_id;
      this.category_name = category_name;
      this.description = description;
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