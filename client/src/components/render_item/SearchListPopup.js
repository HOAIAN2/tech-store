import { Link } from "react-router-dom"
import { baseIMG } from "../../utils/api-config"
import './SearchListPopup.scss'

function SearchListPopup({ data }) {
    const renderData = data.map(product => {
        return {
            ...product,
            images: product.images.map(image => {
                return `${baseIMG}/products/${image}`
            })
        }
    })
    function formatPirce(price) {
        return `${price.toLocaleString('vi')} VNĐ`
    }
    return (
        <div className="search-container">
            {renderData.map(product => {
                return (
                    <Link key={product.productID} className="product-item" to={`product/${product.productID}`}>
                        <img src={product.images} alt="" />
                        <div className="item-content">
                            <div className="product-name">{product.productName}</div>
                            <div className="product-price">{formatPirce(product.price)}</div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default SearchListPopup