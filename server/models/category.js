class Category {
  constructor(categoryID, categoryName, description, icon) {
    this.categoryID = categoryID
    this.categoryName = categoryName
    this.description = description
    this.icon = icon
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