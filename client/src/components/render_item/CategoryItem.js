import "./CategoryItem.scss"
import { baseIMG } from "../../utils/api-config"

function CategoryItem({ data }) {

    return (
        <div className="wrapcategoryitem">
            <div className="category_item">
                <div className="category_item_icon">
                    <div className="wrapicon">
                        <img src={`${baseIMG}orther/${data.icon}`} alt=""></img>
                    </div>
                </div>
                <div className="category_name">
                    <span>{data.category_name}</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryItem