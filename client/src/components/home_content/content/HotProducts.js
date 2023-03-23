import HotItem from "../../render_item/HotItem";
import { useEffect, useState, useRef } from "react";
import { getHotProducts } from "../../../utils/Product/index"
import "./HotProducts.scss"
import { baseIMG } from "../../../utils/api-config";
import randomSlide from "./slideAnimation";
import BackageSlice from "@danghung_dung/slice_items"
function HotProducts() {
    const [products, setProducts] = useState([])
    const container = useRef()
    // function test(element, index) {
    //     const valuetransforms = element.attributes.valuetransfrom.value
    //     const stringtransfrom = `translate(calc(${valuetransforms}% - 100%), 0px)`
    //     element.attributes.valuetransfrom.value = valuetransforms - 100
    //     element.style.transform = stringtransfrom
    // }

    // useEffect(() => {
    //     if (!products.length) return
    //     if (products.length != 0) {
    //         const [...a] = document.querySelectorAll(".hot-item")
    //         a.every((element, index) => {
    //             if (index < 3) {
    //                 element.setAttribute('valuetransfrom', -100 * (4 - (index + 1)))
    //                 element.style.transform = `translate(calc(-100%*${4 - (index + 1)}), 0px)`
    //                 return true
    //             } else {
    //                 element.setAttribute('valuetransfrom', 0)
    //                 element.style.transform = `translate(0%, 0px)`
    //                 return true
    //             }
    //         })
    //         setInterval(() => {
    //             const [...a] = document.querySelectorAll(".hot-item")
    //             a.every((element, index) => {
    //                 if (index < 4) {
    //                     test(element, index)
    //                     return true
    //                 }
    //             })
    //             setTimeout(() => {
    //                 a[0].style.transform = `translate(0%, 0px)`
    //                 a[0].attributes.valuetransfrom.value = 0
    //                 document.querySelector(".hot-item-content").appendChild(a[0])
    //             }, 1000)
    //         }, 5000)

    //     }
    // }, [products])
    function formatPrice(price) {
        return `${price.toLocaleString('vi')} VNĐ`
    }
    useEffect(() => {
        getHotProducts().then(res => {
            setProducts(res.map(product => {
                return {
                    ...product,
                    images: product.images.map(image => {
                        return `${baseIMG}/products/${image}`
                    }),
                    discount: product.discount * 100 || null,
                    price: formatPrice(product.price)
                }
            }))
        })
    }, [])
    useEffect(() => {
        // if (products.length !== 0) randomSlide(container.current)
        const element = document.querySelector(".hot_products_slice")
        BackageSlice(element, 3, 5, 0.5)
    })
    return (
        <div ref={container} className="hot-products">
            <div className="wrap_hot_products">
                <div className="hot_products_slice">
                    {products.map(product => {
                        return <HotItem key={product.productID} data={product} />
                    })}
                </div>
                <div className="thumbnail_category">
                    <div className="thumbnail_category_item">thumbnail_category</div>
                    <div className="thumbnail_category_item">thumbnail_category</div>
                </div>
            </div>
        </div>
    )

}


export default HotProducts;