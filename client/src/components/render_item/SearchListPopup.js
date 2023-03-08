import { baseIMG } from "../../utils/api-config"
import { useState } from "react"
import './SearchListPopup.scss'

function SearchListPopup({ data }) {
    const renderData = data.map(product => {
        return { ...product, images: `${baseIMG}/products/${product.images}` }
    })
    console.log(renderData)
    return (
        <div className="search-container">
            {renderData.map(product => {
                return (
                    <div key={product.productID} className="product-item">
                        <img src={product.images} alt="" />
                        <div className="item-content">
                            <div className="product-name">{product.productName}</div>
                            <div className="product-price">{product.price}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchListPopup