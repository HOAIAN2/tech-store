import CategoryItem from "../../render_item/CategoryItem"
import { getCategories } from "../../../utils/Product/index"
import { useEffect, useState } from "react"

function CategoryProduct() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data.filter(category => category.icon !== null))
            })
    }, [])

    return (
        <div className="categoryproduct" style={{ backgroundColor: "#fff", display: "flex", justifyContent: "space-around" }}>
            {categories.map((item) => {
                return <CategoryItem key={item.categoryID} data={item} />
            })}
        </div>
    )
}
export default CategoryProduct