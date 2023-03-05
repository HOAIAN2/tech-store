class Category {
  constructor(categoryId, categoryName, description) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
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

module.exports = Category