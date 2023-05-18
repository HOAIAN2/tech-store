import './orderContent.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faCaretRight, faCheck, faTicket, faEarthEurope } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState, useRef } from 'react'
import OrderItem from '../render_item/OrderItem'
import { useOrderData, ORDER_ACTION } from '../../Context'
import { removeProduct } from "../../utils/Order"
import { getProductByID } from "../../utils/Product"

function OrderContent() {
    const [numberproductpay, setnumberproductpay] = useState(0)
    const [orders, dispatchOrders] = useOrderData()
    const [totalpricerender, settotalpricerender] = useState(0)
    const totalprice = useRef(0)
    const [productAction, setproductAction] = useState([])
    const [orderitem, setorderitem] = useState([])

    useEffect(() => {
        if (orders) {
            setnumberproductpay(orders[0].products.length)
            // setorderitem(orders)
        }
    }, [orders])

    function gettotalprice(price, type) {
        if (type === '+') {
            totalprice.current = totalprice.current + price;
        } else {
            totalprice.current = totalprice.current - price;
        }
        settotalpricerender(formatPrice(totalprice.current))
    }


    function handleselect(e) {
        document.querySelector('.listorderoptionActive').classList.remove('listorderoptionActive')
        e.target.parentElement.classList.add('listorderoptionActive')
    }


    function handleselectclick(productID) {
        console.log(productID)
        return (e) => {
            if (e.target.className.includes('selectbox')) {
                e.target.classList.remove('selectbox')
                e.target.classList.add('active')
                setproductAction([...productAction, productID])
            } else {
                e.target.classList.remove('active')
                e.target.classList.add('selectbox')
                const a = productAction.filter((item) => {
                    return item != productID
                })
                setproductAction(a)
            }
        }
    }

    function getAllProductAction(e) {
        if (e.target.className.includes('selectbox')) {
            e.target.classList.remove('selectbox')
            e.target.classList.add('active')
            const rs = []
            orders[0].products.filter((item) => {
                return rs.push(item.productID)
            })
            setproductAction(rs)
            const b = document.querySelectorAll('#boxselect')
            if (b?.length != 0) {
                Array.from(b).map((item) => {
                    item.classList.remove('selectbox')
                    item.classList.add('active')
                })
            }
        } else {
            e.target.classList.remove('active')
            e.target.classList.add('selectbox')
            const b = document.querySelectorAll('#boxselect')
            if (b?.length != 0) {
                Array.from(b).map((item) => {
                    item.classList.remove('active')
                    item.classList.add('selectbox')
                })
                setproductAction([])
            }
        }


    }

    function deleteproduct(e) {
        removeProduct(productAction)
            .then((rs) => {
                dispatchOrders({ type: ORDER_ACTION.EDIT, payload: rs })
                window.location.reload()
            })
    }

    function formatPrice(price) {
        return `${price.toLocaleString('vi')} ₫`
    }


    return (
        <div className='wrapordercontent'>

            <div className="orderoption">
                <nav className="wraporderoption">
                    <h3 className="titleorderoption">
                        <FontAwesomeIcon icon={faList} />
                        Lọc Đơn Hàng
                    </h3>
                    <ul className="listorderoption">
                        <li className="orderoption-item listorderoptionActive">
                            <FontAwesomeIcon icon={faCaretRight} />
                            <div className="nameorderoption" onClick={handleselect}>Đơn Chờ Thanh Toán</div>
                        </li>
                        <li className="orderoption-item">
                            <FontAwesomeIcon icon={faCaretRight} />
                            <div className="nameorderoption" onClick={handleselect}>Đơn Đã Thanh Toán</div>
                        </li>
                        <li className="orderoption-item">
                            <FontAwesomeIcon icon={faCaretRight} />
                            <div className="nameorderoption" onClick={handleselect}>Đơn Đã Hủy</div>
                        </li>
                    </ul>
                </nav>
            </div>




            <div className='ordercontent'>
                <div className='ordercontent-header'>
                    <div className='wrapselectbox'>
                        <div id='boxselect' className='selectbox' onClick={getAllProductAction}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    </div>
                    <span>Sản Phẩm</span>
                    <span>Đơn Giá</span>
                    <span>Số Lượng</span>
                    <span>Số Tiền</span>
                </div>
                {
                    orders ? orders[0]?.products.map((item, index) => {
                        return (
                            <div key={index} className='wrapitemorder'>
                                <OrderItem data={item} gettotalprice={gettotalprice} handleselectclick={handleselectclick} />
                            </div>
                        )
                    }) : <></>
                }



                <div className='pay'>
                    <div className='voucher'>
                        <div className='wrapvoucher'>
                            <FontAwesomeIcon icon={faTicket} />
                            <span>Thêm Voucher</span>
                        </div>
                    </div>
                    <div className='totalprice'>
                        <div className='wraptotalprice'>
                            <span className='title'>{`Tổng thanh toán (${numberproductpay} Sản phẩm):`}</span>
                            <span className='price'>{totalpricerender}</span>
                        </div>
                    </div>
                    <div className='action'>
                        <div className='action-item'>
                            <div className='wrapselectbox'>
                                <div id='boxselect' className='selectbox' onClick={getAllProductAction}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            </div>
                            <span>Chọn Tất Cả</span>
                            <span>Xóa</span>
                        </div>
                        {
                            productAction.at(-1) ? <div className='delete' onClick={deleteproduct} >Xóa</div> : <div className='buy'>Mua Hàng</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OrderContent