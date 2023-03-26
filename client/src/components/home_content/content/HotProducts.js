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
        PackageSlice(container.current, 3, 5, 0.7, 'ease')
    })
    return (
        <div className="hot-products">
            <div className="wrap_hot_products">
                <div ref={container} className="hot_products_slice">
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