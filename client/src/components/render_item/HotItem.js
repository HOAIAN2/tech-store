import { Link } from "react-router-dom"
import './HotItem.scss'

function HotItem({ data }) {

    return (
        <>
            <div className='hot-item' >
                <div className="wrap-hot-item">
                    <img src={data.images[0]} alt="" />
                    {/* <div className="wrap_detail"> */}
                    <div className='detail'>
                        <div className="wrap_detail">

                            <div className='price'>{data.price}</div>
                            {/* <div className='btn'>Detail</div> */}
                            <Link className='btn' to={`product/${data.productID}`}>Chi tiết</Link>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default HotItem

