import { Link } from 'react-router-dom'
import "./CategoryItem.scss"
import { baseIMG } from "../../utils/api-config"

function CategoryItem({ data }) {
    return (
        <div className="wrapcategoryitem">
            <div className="category_item">
                <div className="category_item_icon">
                    <Link className="wrapicon" to={`/search?name=${data.categoryName}`} >
                        <img src={`${baseIMG}orther/${data.icon}`} alt=""></img>
                    </Link>
                </div>
                <div className="category_name">
                    <span>{data.categoryName}</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryItem