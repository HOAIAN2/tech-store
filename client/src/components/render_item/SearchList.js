import { baseIMG } from "../../utils/api-config"
import { useState } from "react"
import './SearchList.scss'

function SearchList({ data }) {
    // console.log(data)
    // function handleprice() {
    //     let price = Array.from(data?.price.toString())
    //     let arr = []
    //     price.forEach((data, index) => {
    //         arr.unshift(price[price.length - (index + 1)])
    //         if (index !== 0) {
    //             if ((index + 1) % 3 === 0) {
    //                 arr.unshift(".")
    //             }
    //         }
    //     })
    //     price = arr.toString()
    //     price = price.split(',').join('')
    //     return price
    // }

    return (
        <div className="search-container">
        </div>
    )
}

export default SearchList