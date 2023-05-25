import SliceProductItem from "../../render_item/SliceProductItem";
import { useEffect, useRef } from "react";
import "./SliceProducts.scss"
import PackageSlice from "@danghung_dung/slice_item2"
function SliceProducts({ data }) {
    const container = useRef()

    useEffect(() => {
        PackageSlice(container.current, 3, 5, 0.7, 'ease')
    })
    return (
        <div className="wrap_hot_products">
            <div className="hot_products_slice">
                <div ref={container} className="wrap_hot_product_slice" style={{ height: "100%", position: "absolute", width: "100%", display: "flex", overflow: "hidden" }}>
                    {data.map(product => {
                        return <SliceProductItem key={product.productID} data={product} width={"33.333%"} />
                    })}

                </div>
            </div>
            <div className="thumbnail_category">
                <div className="thumbnail_category_item">
                    <img style={{ width: "100%", height: "100%" }} src="https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/2/1/638108452578436423_F-H2_385x100.png" alt="" />
                </div>
                <div className="thumbnail_category_item">
                    <img style={{ width: "100%", height: "100%" }} src="https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/28/638156005313974558_H2%20A14.png" alt="" />
                </div>
            </div>
        </div>
    )

}





export default SliceProducts;