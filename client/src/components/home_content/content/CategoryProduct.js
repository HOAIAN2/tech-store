import CategoryItem from "../../render_item/CategoryItem"
import { getcategories } from "../../../utils/Auth/index"
import { useEffect, useState } from "react"

function CategoryProduct() {
    const [categories, setcategories] = useState([])
    useEffect(() => {
        getcategories()
            .then((rs) => {
                setcategories(rs.data)
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