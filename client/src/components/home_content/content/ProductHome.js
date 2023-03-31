import "./ProductHome.scss"
import ProductItem from "../../render_item/ProductItem"
import { searchProduct } from "../../../utils/Product"
import { useEffect, useState } from "react"

function ProductHome() {
    const [products, setproducts] = useState([])
    useEffect(() => {
        searchProduct('Laptop', 'more', 'hot', 'asc')
            .then((rs) => {
                setproducts(fortmatarr(rs.data))
            })
    }, [])
    function fortmatarr(data) {
        let a = []
        let b = []
        data.forEach((item, index) => {
            if (((index + 1) % 5) === 0 && index !== 0) {
                // b.push(item)
                a.push(b)
                b = []
            } else {
                b.push(item)
            }
        })
        return a
    }
    return (
        <div className="producthome">
            <div className="wrapproducthome">
                {products.map((item, index) => {
                    return (
                        <div key={index} style={{ display: "flex", justifyContent: "space-around", marginBottom: "30px" }}>
                            {item.map((item) => {
                                return <ProductItem key={item.productID} data={item} />
                            })}
                        </div>
                    )
                })}

                {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <ProductItem data={products.length != 0 ? products[0][0] : []} />
                    <ProductItem data={products.length != 0 ? products[0][0] : []} />
                    <ProductItem data={products.length != 0 ? products[0][0] : []} />
                    <ProductItem data={products.length != 0 ? products[0][0] : []} />


                </div> */}
            </div>
        </div>
    )
}

export default ProductHome