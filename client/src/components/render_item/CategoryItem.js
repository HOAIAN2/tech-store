import "./CategoryItem.scss"

function CategoryItem(params) {
    return (
        <div className="wrapcategoryitem">

            <div className="category_item">
                <div className="category_item_icon">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2015/img-dienthoai-desk.png"></img>
                </div>
                <div className="category_name">
                    <span>Điện thoại</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryItem