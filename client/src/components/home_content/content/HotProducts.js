import HotItem from "../../render_item/HotItem";
import { useEffect, useState, useRef } from "react";
import { getHotProducts } from "../../../utils/Product/index"
import "./HotProducts.scss"
import { baseIMG } from "../../../utils/api-config";
import randomSlide from "./slideAnimation";
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
        if (products.length !== 0) randomSlide(container.current)
    })
    return (
        <div ref={container} className="hot-products">
            {/* <div className='wrapcontent1'> */}
            {/* <div className="content1_adv"> */}
            {products.map(product => {
                return <HotItem key={product.productID} data={product} />
            })}
            {/* <HotItem data={products} /> */}
            {/* <div className="content1_adv_child">
                    <div className="content1_adv_child_item">
                        <img src="http://localhost:4000/images/orther/1676860538826-600x180.jpg"></img>
                    </div>
                    <div className="content1_adv_child_item">
                        <img src="http://localhost:4000/images/orther/d2351061-0c8a-47.jpeg"></img>
                    </div>
                </div> */}
            {/* </div> */}
            {/* <div className="content1_categories" ></div> */}
            {/* </div> */}
        </div>
    )

}


export default HotProducts;