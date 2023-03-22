import { Link } from "react-router-dom"
import './HotItem.scss'

function HotItem({ data }) {

    // return (
    //     <>
    //         <div className="content1_adv_main">
    //             <div className="back"></div>
    //             <div className="wrapcontent1_adv_main">
    //                 {data.map((item, index) => {
    //                     return <div key={index} className='hot-item' >
    //                         <div className="wrapcontentadvmain">
    //                             <img src={`${baseIMG}products/${item.images} `}></img>
    //                             <div className='detail'>
    //                                 <div className='price'>{formatprice(item.price)}</div>
    //                                 <div className='btn'>Detail</div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 })}

    //             </div>
    //             <div className="next"></div>
    //         </div>
    //     </>
    // )
    return (
        <div className='hot-item' >
            <div className="hot-item-content">
                <img src={data.images[0]} alt=""></img>
                <div className='detail'>
                    <div className='price'>{data.price}</div>
                    <Link className='btn' to={`product/${data.productID}`}>Detail</Link>
                </div>
            </div>
        </div>
    )
}

export default HotItem

