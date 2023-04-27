import "./ProductHome.scss"
import ProductItem from "../../render_item/ProductItem"
import { getHomeProduct } from "../../../utils/Product"
import { useEffect, useState } from "react"

function ProductHome() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getHomeProduct()
            .then((rs) => {
                const a = rs.data;
                a.map((item, index) => {
                    a[index].products = formatArray(item.products, 4)
                })
                setProducts(a)
            })
    }, [])


    return (
        <div className="producthome">
            <div className="wrapproducthome">
                {products.map((item, index) => {
                    return <div key={index} style={{ backgroundColor: "#fff", padding: "1px", marginBottom: "30px" }}>
                        <h2 style={{ padding: "10px 20px 30px 20px", fontSize: "35px", fontWeight: "500" }}>{item.title}</h2>
                        {item.products.map((item, index) => {
                            return (
                                <div key={index} style={{ display: "flex", justifyContent: "space-around", marginBottom: "30px" }}>
                                    {item.map((item) => {
                                        return <ProductItem key={item.productID} data={item} />
                                    })}
                                </div>
                            )
                        })}
                    </div>
                })}
            </div>
        </div>
    )
}


export function formatArray(data, indexToFormat) {
    let a = []
    let b = []
    data.forEach((item, index) => {
        if (((index + 1) % indexToFormat) === 0) {
            b.push(item)
            a.push(b)
            b = []
        }
        else {
            b.push(item)
        }
    })
    if (b.length != 0) a = [...a, b]
    return a
}

export default ProductHome