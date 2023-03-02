import { baseIMG } from "../../utils/api-config"
import { useState } from "react"

function Render_list_search({ data }) {
    function handleprice() {
        let price = Array.from(data.price.toString())
        let arr = []
        price.map((data, index) => {
            arr.unshift(price[price.length - (index + 1)])
            if (index !== 0) {
                if ((index + 1) % 3 === 0) {
                    arr.unshift(".")
                }
            }
        })
        price = arr.toString()
        price = price.split(',').join('')
        return price
    }

    return (
        <div className="search-item">
            <img className="image-product-search" src={`${baseIMG}products/${data.images}`}></img>
            <div className="detail-search-product">
                <div className="description">{data.product_name}</div>

                <div className="price-search">{handleprice() + " VND"}</div>

            </div>
        </div>
    )
}

export default Render_list_search