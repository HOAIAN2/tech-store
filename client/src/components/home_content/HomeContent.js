import SliceProducts from "./content/SliceProducts"
import CategoryProduct from "./content/CategoryProduct"
import ProductHome from "./content/ProductHome"
import { useEffect, useState } from "react"
import { getHotProducts } from "../../utils/Product"
import { baseIMG } from "../../utils/api-config";

function HomeContent() {
    const [products, setProducts] = useState([])

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
            setProducts([])
        })
    }, [])

    function formatPrice(price) {
        return `${price.toLocaleString('vi')} đ`
    }

    return (
        <div className="content-home" style={{}}>
            <div className="component1" style={{ backgroundColor: "#fff", boxShadow: "0 0 1px" }}>
                <SliceProducts data={products} />
                <div className="maincontenthome" style={{ width: "100%", height: "maxcontent", backgroundColor: "#fff", paddingTop: "10px" }}>
                    <div className="wrapmaincontenthome" style={{ width: "1257px", margin: "auto" }}>
                        <CategoryProduct />
                    </div>
                </div>
            </div>
            <ProductHome />
        </div>
    )
}

export default HomeContent