import { useNavigate } from 'react-router-dom'
import './SliceProductItem.scss'

function SliceProductItem({ data, width }) {
    const navigate = useNavigate()


    return (
        <>
            <div className='hot-item' style={{ width: width }}>
                <div className="wrap-hot-item">
                    <img src={data.images[0]} alt="" />
                    {/* <div className="wrap_detail"> */}
                    <div className='detail'>
                        <div className="wrap_detail">
                            <div className='price'>{data.price}</div>
                            {/* <div className='btn'>Detail</div> */}
                            <div className='btn' onClick={() => { navigate('/product/' + data.productID) }}>Chi tiết</div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default SliceProductItem

