import './orderContent.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faCaretRight, faCheck, faTicket } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState, useRef } from 'react'
import OrderItem from '../render_item/OrderItem'
import { useOrderData, ORDER_ACTION } from '../../Context'
import { removeProduct, payOrder } from "../../utils/Order"
import PopupSuccess from './PopupSuccess'

function OrderContent() {
    const [numberproductpay, setnumberproductpay] = useState(0)
    const [orders, dispatchOrders] = useOrderData()
    const [totalpricerender, settotalpricerender] = useState(0)
    const totalprice = useRef(0)
    const [productAction, setproductAction] = useState([])
    const [paidMethod, setPaidMethod] = useState(2)
    const [typeorder, settypeorder] = useState('order')
    const [showPopup, setShowPopup] = useState(false)
    const [listprice, setlistprice] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [typeorder])

    useEffect(() => {
        if (!orders[0]?.paid) {
            setnumberproductpay(orders[0]?.products.length)
            // setorderitem(orders)
        }
    }, [orders])

    function gettotalprice(price, type) {
        if (type === '+') {
            totalprice.current = price + totalpricerender;
        } else {
            totalprice.current = totalpricerender - price;
        }
        settotalpricerender(totalprice.current)
    }

    function getlistpriceorderitem(data, resetarr = false) {
        if (resetarr) return setlistprice([])
        listprice.push(data)
        setlistprice([listprice])
    }

    useEffect(() => {
        let lengthorordernotpaid
        orders.every((item) => {
            if (!item.paid) {
                lengthorordernotpaid = item.products.length
                return false
            } else return true
        })
        if (lengthorordernotpaid === listprice[0]?.length) {
            if (listprice[0]) {
                const rs = listprice[0].reduce((a, b) => {
                    return a + b
                }, 0)
                settotalpricerender(rs)
            }
        } else {
            settotalpricerender(0)
        }
    }, [listprice, orders[0]?.products.length])

    function handleselect(data) {
        return (e) => {
            document.querySelector('.listorderoptionActive').classList.remove('listorderoptionActive')
            e.target.parentElement.classList.add('listorderoptionActive')
            settypeorder(data)
        }
    }


    function handleselectclick(productID) {
        return (e) => {
            if (typeorder !== "pay") {
                if (e.target.className.includes('selectbox')) {
                    e.target.classList.remove('selectbox')
                    e.target.classList.add('active')
                    setproductAction([...productAction, productID])
                } else {
                    e.target.classList.remove('active')
                    e.target.classList.add('selectbox')
                    const a = productAction.filter((item) => {
                        return item !== productID
                    })
                    setproductAction(a)
                }
            }
        }
    }

    function getAllProductAction(e) {
        if (typeorder !== "pay") {
            if (e.target.className.includes('selectbox')) {
                e.target.classList.remove('selectbox')
                e.target.classList.add('active')
                const rs = []
                orders[0].products.filter((item) => {
                    return rs.push(item.productID)
                })
                setproductAction(rs)
                const b = document.querySelectorAll('#boxselect')
                if (b?.length !== 0) {
                    Array.from(b).map((item) => {
                        item.classList.remove('selectbox')
                        item.classList.add('active')
                    })
                }
            } else {
                e.target.classList.remove('active')
                e.target.classList.add('selectbox')
                const b = document.querySelectorAll('#boxselect')
                if (b?.length !== 0) {
                    Array.from(b).map((item) => {
                        item.classList.remove('active')
                        item.classList.add('selectbox')
                    })
                    setproductAction([])
                }
            }
        }
    }
    function deleteproduct(e) {
        removeProduct(orders[0].orderID, productAction)
            .then((rs) => {
                dispatchOrders({ type: ORDER_ACTION.EDIT, payload: rs })
                setproductAction([])
                setlistprice([])
            })
    }
    function makePayment(e) {
        if (!orders[0].paid && orders[0]?.products.length !== 0) {
            payOrder(orders[0].orderID)
                .then((rs) => {
                    if (rs) {
                        dispatchOrders({ type: ORDER_ACTION.EDIT, payload: rs })
                        setnumberproductpay(0)
                        settotalpricerender(0)
                        setShowPopup(true)
                    }
                })
        }
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
                            <div className="nameorderoption" onClick={handleselect("order")}>Đơn Chờ Thanh Toán</div>
                        </li>
                        <li className="orderoption-item">
                            <FontAwesomeIcon icon={faCaretRight} />
                            <div className="nameorderoption" onClick={handleselect("pay")}>Đơn Đã Thanh Toán</div>
                        </li>
                        <li className="orderoption-item">
                            <FontAwesomeIcon icon={faCaretRight} />
                            <div className="nameorderoption" >Đơn Đã Hủy</div>
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
                <div className='wraporderitem'>
                    {
                        orders ? orders.map((item) => {
                            if (!item.paid && typeorder === "order") {
                                return item.products.map((item) => {
                                    return (
                                        <div key={item.productID} className='wrapitemorder'>
                                            <OrderItem data={item} getlistprice={getlistpriceorderitem} gettotalprice={gettotalprice} handleselectclick={handleselectclick} />
                                        </div>
                                    )
                                })
                            } else if (item.paid && typeorder === "pay") {
                                return item.products.map((item) => {
                                    return (
                                        <div key={item.productID} className='wrapitemorder'>
                                            <OrderItem data={item} getlistprice={getlistpriceorderitem} gettotalprice={gettotalprice} handleselectclick={handleselectclick} typeorder={"pay"} />
                                        </div>
                                    )
                                })
                            }
                        }
                        ) : <></>
                    }
                </div>

                {
                    typeorder === "order" ?
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
                                    <span className='price'>{formatPrice(totalpricerender)}</span>
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
                                <div className='paidMethod'>
                                    <span>Phương thức thanh toán:</span>
                                    {
                                        paidMethod === 2 ? <span>Thanh toán khi nhận hàng</span> : <></>
                                    }
                                </div>
                                {
                                    productAction.at(-1) ? <div className='delete' onClick={deleteproduct} >Xóa</div> : <div className='buy' onClick={makePayment}>Mua Hàng</div>
                                }
                            </div>
                        </div> : <></>
                }
            </div>
            {showPopup && <PopupSuccess message='Cảm ơn bạn đã mua hàng' setShowPopup={setShowPopup} />}
        </div>
    )
    // }
    // else if (window.location.pathname === "/order/pay") {
    //     return (
    //         <div className='wrapordercontent'>

    //             <div className="orderoption">
    //                 <nav className="wraporderoption">
    //                     <h3 className="titleorderoption">
    //                         <FontAwesomeIcon icon={faList} />
    //                         Lọc Đơn Hàng
    //                     </h3>
    //                     <ul className="listorderoption">
    //                         <li className="orderoption-item listorderoptionActive">
    //                             <FontAwesomeIcon icon={faCaretRight} />
    //                             <div className="nameorderoption" onClick={handleselect("order")}>Đơn Chờ Thanh Toán</div>
    //                         </li>
    //                         <li className="orderoption-item">
    //                             <FontAwesomeIcon icon={faCaretRight} />
    //                             <div className="nameorderoption" onClick={handleselect("pay")}>Đơn Đã Thanh Toán</div>
    //                         </li>
    //                         <li className="orderoption-item">
    //                             <FontAwesomeIcon icon={faCaretRight} />
    //                             <div className="nameorderoption" >Đơn Đã Hủy</div>
    //                         </li>
    //                     </ul>
    //                 </nav>
    //             </div>

    //             <div className='ordercontent'>

    //                 <div className='ordercontent-header'>
    //                     <div className='wrapselectbox'>
    //                         <div id='boxselect' className='selectbox' onClick={getAllProductAction}>
    //                             <FontAwesomeIcon icon={faCheck} />
    //                         </div>
    //                     </div>
    //                     <span>Sản Phẩm</span>
    //                     <span>Đơn Giá</span>
    //                     <span>Số Lượng</span>
    //                     <span>Số Tiền</span>
    //                 </div>

    //                 {
    //                     orders ? orders.map((item) => {
    //                         if (!item.paid) {
    //                             return item.products.map((item) => {
    //                                 return (
    //                                     <div key={item.productID} className='wrapitemorder'>
    //                                         <OrderItem data={item} gettotalprice={gettotalprice} handleselectclick={handleselectclick} />
    //                                     </div>
    //                                 )
    //                             })
    //                         }
    //                     }
    //                     ) : <></>
    //                 }

    //             </div>
    //         </div>
    //     )
    // }
}


export default OrderContent