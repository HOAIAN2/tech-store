import CategoryItem from "../../render_item/CategoryItem"
import { getCategories } from "../../../utils/Product/index"
import { useEffect, useState } from "react"

function CategoryProduct() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories()
            .then((rs) => {
                setCategories(rs.data)
            })
    }, [])

    return (
        <div className="categoryproduct" style={{ backgroundColor: "#fff", display: "flex", justifyContent: "space-around" }}>
            {categories.map((item) => {
                return <CategoryItem data={item} />
            })}
        </div>
    )
}
export default CategoryProduct