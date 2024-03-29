import { Link } from "react-router-dom"
import { baseIMG } from "../../utils/api-config"
import './SearchListPopup.scss'

function SearchListPopup({ data, setSearchValue }) {
    const renderData = data.map(product => {
        return {
            ...product,
            images: product.images.map(image => {
                return `${baseIMG}/products/${image}`
            }),
            discount: product.discount * 100 || null
        }
    })
    function formatPrice(price) {
        return `${price.toLocaleString('vi')} đ`
    }
    return (
        <div className="search-container">
            {renderData.map(product => {
                return (
                    <div key={product.productID} onClick={() => { setSearchValue('') }}>
                        <Link className="product-item" to={`/product/${product.productID}`}>
                            <img src={product.images} alt="" />
                            <div className="item-content">
                                <div className="product-name">{product.productName}</div>
                                <div className="product-price">
                                    <span className="price">{formatPrice(product.price)}</span>
                                    {product.discount && <span className="discount">{`- ${product.discount}%`}</span>}
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchListPopup