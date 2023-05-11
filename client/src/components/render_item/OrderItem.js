import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { getProductByID } from '../../utils/Product'
import { baseIMG } from '../../utils/api-config'
import { useNavigate } from 'react-router-dom'

function OrderItem({ data, gettotalprice }) {
    const [quantity, setQuantity] = useState(1)
    const [product, setproduct] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        getProductByID(data.productID)
            .then((rs) => {
                setproduct(rs)
                gettotalprice(rs.discount ? (rs.price * (1 - rs.discount)) * quantity : rs.price * quantity, '+')
            })
    }, [])

    function handleSetQuantity(type) {
        return (e) => {
            if (e.target.className === 'decrease') {
                if (quantity !== 1) {
                    setQuantity(quantity - 1)
                    gettotalprice((product.discount ? (product.price * (1 - product.discount)) : product.price), type)
                }
            }
            else {
                setQuantity(quantity + 1)
                gettotalprice((product.discount ? (product.price * (1 - product.discount)) : product.price), type)
            }
        }
    }

    function getdetailproduct() {
        navigate('/product/' + product.productID)
    }

    function handleselectclick(e) {
        if (e.target.className.includes('selectbox')) {
            e.target.classList.remove('selectbox')
            e.target.classList.add('active')
        } else {
            e.target.classList.remove('active')
            e.target.classList.add('selectbox')
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
                        <div className='selectbox' onClick={handleselectclick}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    </div>
                    <div className='product'>
                        <div className='wrapimgproduct'>
                            <img src={`${baseIMG}products/${product.images[0]}`}></img>
                        </div>
                        <div className='nameproduct'>{product.productName}</div>
                    </div>
                    <div className='price'>
                        <span className='oldprice'>{formatPrice(product.price)}</span>
                        {
                            product.discount ? <span className='nowprice'>{formatPrice(product.price * (1 - product.discount))}</span> : <></>
                        }
                    </div>

                    <div className='wrapquantity'>
                        <div className='quantity'>
                            <button className='decrease' onClick={handleSetQuantity('-')}>-</button>
                            <input value={quantity} type="number" min="1" readOnly />
                            <button className='increase' onClick={handleSetQuantity('+')}>+</button>
                        </div>
                    </div>

                    <div className='totalprice'>
                        <span>{formatPrice(product.discount ? (product.price * (1 - product.discount)) * quantity : product.price * quantity)}</span>
                    </div>
                </div>
                <div className='ordercontent-item2'>
                    <span className='relatedproducts'>Sản Phẩm Liên Quan</span>
                    <div className='btndetail' onClick={getdetailproduct}>
                        <span>Chi Tiết Sản Phẩm</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default OrderItem;