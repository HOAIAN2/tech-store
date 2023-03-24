import { Link } from "react-router-dom"
import './HotItem.scss'

function HotItem({ data }) {

    return (
        <>
            <div className='hot-item' >
                <div className="wrap-hot-item">
                    <img src={data.images[0]} alt="" />
                    <div className='detail'>
                        <div className='price'>{data.price}</div>
                        {/* <div className='btn'>Detail</div> */}
                        <Link className='btn' to={`product/${data.productID}`}>Detail</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotItem

