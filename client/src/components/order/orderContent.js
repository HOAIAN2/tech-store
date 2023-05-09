import './orderContent.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faCaretRight, faCheck, faTicket } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'

function OderContent() {
    const [quantity, setQuantity] = useState(1)
    const [numberproductpay, setnumberproductpay] = useState(0)


    function handleselect(e) {
        document.querySelector('.listorderoptionActive').classList.remove('listorderoptionActive')
        e.target.parentElement.classList.add('listorderoptionActive')
    }

    function handleSetQuantity(e) {
        if (e.target.className === 'decrease') {
            if (quantity !== 1) setQuantity(quantity - 1)
        }
        else setQuantity(quantity + 1)
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
                        <div className='selectbox' onClick={handleselectclick}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    </div>
                    <span>Sản Phẩm</span>
                    <span>Đơn Giá</span>
                    <span>Số Lượng</span>
                    <span>Số Tiền</span>
                </div>

                <div className='ordercontent-item'>
                    <div className='ordercontent-item1'>
                        <div className='wrapselectbox'>
                            <div className='selectbox' onClick={handleselectclick}>
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        </div>
                        <div className='product'>
                            <div className='wrapimgproduct'>
                                <img src='http://localhost:4000/images/products/c2e7398856394743517f89ff2bf15f4e.jpg'></img>
                            </div>
                            <div className='nameproduct'>Laptop Asus TUF Gaming F15 FX506LHB i5-10300H/8GB/512GB/Win11 HN188W - Hàng chính hãng</div>
                        </div>
                        <div className='price'>
                            <span className='oldprice'>20000</span>
                            <span className='nowprice'>10000</span>
                        </div>

                        <div className='wrapquantity'>
                            <div className='quantity'>
                                <button className='decrease' onClick={handleSetQuantity}>-</button>
                                <input value={quantity} type="number" min="1" readOnly />
                                <button className='increase' onClick={handleSetQuantity}>+</button>
                            </div>
                        </div>

                        <div className='totalprice'>
                            <span>10000</span>
                        </div>
                    </div>
                    <div className='ordercontent-item2'>
                        <span className='relatedproducts'>Sản Phẩm Liên Quan</span>
                        <div className='btndetail'>
                            <span>Chi Tiết Sản Phẩm</span>
                        </div>
                    </div>
                </div>

                <div className='pay'>
                    <div className='voucher'>
                        <FontAwesomeIcon icon={faTicket} />
                        <span>Thêm Voucher</span>
                    </div>
                    <div className='totalprice'>
                        <span className='title'>{`Tổng thanh toán (${numberproductpay} Sản phẩm):`}</span>
                        <span>10.000.000d</span>
                    </div>
                    <div className='action'>
                        <div className='action-item'>
                            <div className='wrapselectbox'>
                                <div className='selectbox' onClick={handleselectclick}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            </div>
                            <span>Chọn Tất Cả</span>
                            <span>Xóa</span>
                        </div>
                        <div className='buy'>Mua Hàng</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OderContent