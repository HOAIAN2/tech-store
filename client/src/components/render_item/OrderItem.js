import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { getProductByID } from '../../utils/Product'
import { baseIMG } from '../../utils/api-config'
import { useNavigate } from 'react-router-dom'
import { useOrderData, ORDER_ACTION } from "../../Context"
import { createOrder, addProduct } from "../../utils/Order"

function OrderItem({ data, gettotalprice, handleselectclick, typeorder, getlistprice }) {
    const [quantity, setQuantity] = useState(data.quantity)
    const [product, setproduct] = useState()
    const navigate = useNavigate()
    const [orders, dispatchOrders] = useOrderData()

    useEffect(() => {
        getProductByID(data.productID)
            .then((rs) => {
                setproduct(rs)
                if (typeorder !== "pay") {
                    // gettotalprice(rs.discount ? (rs.price * (1 - rs.discount)) * quantity : rs.price * quantity, '+')
                    getlistprice(rs.discount ? (rs.price * (1 - rs.discount)) * quantity : rs.price * quantity)
                } else {
                    getlistprice({}, true)
                }
            })
    }, [orders[0]?.products.length])

    function handleSetQuantity(type) {
        return (e) => {
            if (e.target.className === 'decrease') {
                if (quantity !== 1) {
                    setQuantity(quantity - 1)
                    handleAddToCart(quantity - 1)
                    gettotalprice((product.discount ? (product.price * (1 - product.discount)) : product.price), type)
                }
            }
            else {
                setQuantity(quantity + 1)
                handleAddToCart(quantity + 1)
                gettotalprice((product.discount ? (product.price * (1 - product.discount)) : product.price), type)
            }
        }
    }


    function handleAddToCart(value) {
        const latestOrder = orders[0]
        if (!latestOrder || latestOrder.paid) {
            createOrder(parseInt(data.productID), value)
                .then(data => {
                    dispatchOrders({ type: ORDER_ACTION.EDIT, payload: data })
                })
                .catch(error => {
                    console.error(error)
                })
        }
        else {
            addProduct(latestOrder.orderID, parseInt(data.productID), value)
                .then(data => {
                    dispatchOrders({ type: ORDER_ACTION.EDIT, payload: data })
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    function formatPrice(price) {
        return `${price.toLocaleString('vi')} ₫`
    }

    if (product) {
        return (
            <div className='ordercontent-item'>
                <div className='ordercontent-item1'>
                    <div className='wrapselectbox'>
                        <div id='boxselect' className='selectbox' onClick={handleselectclick(data.productID)}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    </div>
                    <div className='product'>
                        <div className='wrapimgproduct'>
                            <img src={`${baseIMG}products/${product.images[0]}`} alt=''></img>
                        </div>
                        <div className='nameproduct'>{data.productName}</div>
                    </div>
                    <div className='price'>
                        <span className='oldprice'>{formatPrice(product.price)}</span>
                        {
                            product.discount ? <span className='nowprice'>{formatPrice(product.price * (1 - product.discount))}</span> : <></>
                        }
                    </div>

                    <div className='wrapquantity'>
                        {
                            typeorder !== "pay" ?
                                <div className='quantity'>
                                    <button className='decrease' onClick={handleSetQuantity('-')}>-</button>
                                    <input value={quantity} type="number" min="1" readOnly />
                                    <button className='increase' onClick={handleSetQuantity('+')}>+</button>
                                </div> : product.soldQuantity
                        }
                    </div>

                    <div className='totalprice'>
                        <span>{formatPrice(product.discount ? (product.price * (1 - product.discount)) * quantity : product.price * quantity)}</span>
                    </div>
                </div>
                <div className='ordercontent-item2'>
                    <span className='relatedproducts' onClick={() => { navigate('/search?name=' + product.category) }} >Sản Phẩm Liên Quan</span>
                    <div className='btndetail' onClick={() => { navigate('/product/' + product.productID) }}>
                        {
                            typeorder !== "pay" ? <span>Chi Tiết Sản Phẩm</span> : <span>Mua Lại</span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default OrderItem;