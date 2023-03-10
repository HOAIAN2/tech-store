import { Link } from "react-router-dom"
import { baseIMG } from "../../utils/api-config"
import './SearchListPopup.scss'

function SearchListPopup({ data }) {
    const renderData = data.map(product => {
        return {
            ...product,
            images: product.images.map(image => {
                return `${baseIMG}/products/${image}`
            }),
            discount: product.discount * 100 || null
        }
    })
    function formatPirce(price) {
        return `${price.toLocaleString('vi')} VNĐ`
    }
    console.log(renderData)
    return (
        <div className="search-container">
            {renderData.map(product => {
                return (
                    <Link key={product.productID} className="product-item" to={`product/${product.productID}`}>
                        <img src={product.images} alt="" />
                        <div className="item-content">
                            <div className="product-name">{product.productName}</div>
                            <div className="product-price">
                                <span className="price">{formatPirce(product.price)}</span>
                                {product.discount && <span className="discount">{`- ${product.discount}%`}</span>}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default SearchListPopup