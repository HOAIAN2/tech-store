import "./homecontent1.scss"
import Product_adv_main from "../../render_item/product-adv-main";
import { useEffect, useState } from "react";
import { getproducthot } from "../../../utils/Auth/index"


function Homecontent1() {
    const [test, settest] = useState([])
    useEffect(() => {
        const a = new Promise(async (resolve, reject) => {
            const products = await getproducthot()
            resolve(products.data)
        });
        a.then((rs) => {
            settest(rs)
        })
    }, [])

    return (
        <div className="content1">
            <div className='wrapcontent1'>
                <div className="content1_adv">
                    <Product_adv_main data={test} />
                    <div className="content1_adv_child">
                        <div className="content1_adv_child_item">
                            <img src="http://localhost:4000/images/orther/1676860538826-600x180.jpg"></img>
                        </div>
                        <div className="content1_adv_child_item">
                            <img src="http://localhost:4000/images/orther/d2351061-0c8a-47.jpeg"></img>
                        </div>
                    </div>
                </div>
                <div className="content1_categories" ></div>
            </div>
        </div>
    )

}


export default Homecontent1;