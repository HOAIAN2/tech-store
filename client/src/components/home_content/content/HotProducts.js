import HotItem from "../../render_item/HotItem";
import { useEffect, useState, useRef } from "react";
import { getHotProducts } from "../../../utils/Product/index"
import "./HotProducts.scss"
import { baseIMG } from "../../../utils/api-config";
import PackageSlice from "@danghung_dung/slice_item2"
function HotProducts() {
    const [products, setProducts] = useState([])
    const container = useRef()
    function formatPrice(price) {
        return `${price.toLocaleString('vi')} đ`
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
        }).catch(error => {
            console.error(error)
        })
    }, [])
    useEffect(() => {
        PackageSlice(container.current, 3, 5, 0.7, 'ease')
    })
    return (
        <div className="wrap_hot_products">
            <div className="hot_products_slice">
                <div ref={container} className="wrap_hot_product_slice" style={{ height: "100%", position: "absolute", width: "100%", display: "flex", overflow: "hidden" }}>
                    {products.map(product => {
                        return <HotItem key={product.productID} data={product} />
                    })}

                </div>
            </div>
            <div className="thumbnail_category">
                <div className="thumbnail_category_item">
                    <img style={{ width: "100%", height: "100%" }} src="https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/2/1/638108452578436423_F-H2_385x100.png"></img>
                </div>
                <div className="thumbnail_category_item">
                    <img style={{ width: "100%", height: "100%" }} src="https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/28/638156005313974558_H2%20A14.png"></img>
                </div>
            </div>
        </div>
    )

}





export default HotProducts;