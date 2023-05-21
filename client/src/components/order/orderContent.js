import './orderContent.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faCaretRight, faCheck, faTicket } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState, useRef } from 'react'
import OrderItem from '../render_item/OrderItem'
import { useOrderData, ORDER_ACTION } from '../../Context'
import { removeProduct } from "../../utils/Order"
import { payorder } from "../../utils/Order"

function OrderContent() {
    const [numberproductpay, setnumberproductpay] = useState(0)
    const [orders, dispatchOrders] = useOrderData()
    const [totalpricerender, settotalpricerender] = useState(0)
    const totalprice = useRef(0)
    const [productAction, setproductAction] = useState([])
    const [paid_method, setpaid_method] = useState(2)
    const [typeorder, settypeorder] = useState('order')


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [typeorder])

    useEffect(() => {
        if (!orders[0]?.paid) {
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
                        return item != productID
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
    }

    function deleteproduct(e) {
        removeProduct(productAction)
            .then((rs) => {
                dispatchOrders({ type: ORDER_ACTION.EDIT, payload: rs })
                setproductAction([])
            })
    }
    function buyorder(e) {
        if (!orders[0].paid && orders[0]?.products.length !== 0) {
            payorder()
                .then((rs) => {
                    if (rs) {
                        dispatchOrders({ type: ORDER_ACTION.EDIT, payload: rs })
                        setnumberproductpay(0)
                        settotalpricerender(0)
                        document.querySelector(".popuppaysuccess").style.display = "block"
                    }
                })
        }
    }

    function successclick() {
        document.querySelector(".popuppaysuccess").style.display = "none"
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
                                            <OrderItem data={item} gettotalprice={gettotalprice} handleselectclick={handleselectclick} />
                                        </div>
                                    )
                                })
                            } else if (item.paid && typeorder === "pay") {
                                return item.products.map((item) => {
                                    return (
                                        <div key={item.productID} className='wrapitemorder'>
                                            <OrderItem data={item} gettotalprice={gettotalprice} handleselectclick={handleselectclick} typeorder={"pay"} />
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
                                <div className='paid_method'>
                                    <span>Phương thức thanh toán:</span>
                                    {
                                        paid_method === 2 ? <span>Thanh toán khi nhận hàng</span> : <></>
                                    }
                                </div>
                                {
                                    productAction.at(-1) ? <div className='delete' onClick={deleteproduct} >Xóa</div> : <div className='buy' onClick={buyorder}>Mua Hàng</div>
                                }
                            </div>
                        </div> : <></>
                }
            </div>

            <div className='popuppaysuccess'>
                <div className="popup">
                    <div className="popup-content">
                        <div className="imgbox">
                            <img src='http://localhost:4000/images/orther/checked.png' className="img"></img>
                        </div>
                        <div className="title">
                            <h3>Success!</h3>
                        </div>
                        <p className="para">Cảm ơn bạn đã mua hàng tại Tech Store</p>
                        <form action="">
                            <a href="#" onClick={successclick}>OKAY</a>
                        </form>
                    </div>
                </div>
            </div>
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