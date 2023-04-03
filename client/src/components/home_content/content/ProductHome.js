import "./ProductHome.scss"
import ProductItem from "../../render_item/ProductItem"
import { getHomeProduct } from "../../../utils/Product"
import { useEffect, useState } from "react"
import dung_React_scrollbar from "@danghung_dung/react_scrollbar"


function ProductHome() {
    const [products, setproducts] = useState([])
    useEffect(() => {
        getHomeProduct()
            .then((rs) => {
                const a = rs.data;
                a.map((item, index) => {
                    a[index].products = fortmatarr(item.products)
                })
                setproducts(a)
            })
    }, [])
    function fortmatarr(data) {
        let a = []
        let b = []
        data.forEach((item, index) => {
            if (((index + 1) % 4) === 0) {
                b.push(item)
                a.push(b)
                b = []
            }
            else {
                b.push(item)
            }
        })
        return a
    }
    useEffect(() => {
        if (document.querySelector(".wrapproducthome").children.length != 0) {
            dung_React_scrollbar(document.querySelector(".App"), 'red')
        }
    })

    return (
        <div className="producthome">
            <div className="wrapproducthome">
                {products.map((item, index) => {
                    return <div key={index} style={{ backgroundColor: "#fff", padding: "1px 0px", margin: "30px 0px" }}>
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

                    // return (
                    //     <div key={index} style={{ display: "flex", justifyContent: "space-around", marginBottom: "30px" }}>
                    //         {item.map((item) => {
                    //             return <ProductItem key={item.productID} data={item} />
                    //         })}
                    //     </div>
                    // )
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