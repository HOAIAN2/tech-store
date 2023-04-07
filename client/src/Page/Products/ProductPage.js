import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductByID } from '../../utils/Product'
import NotFound from '../errors/NotFound'
import { baseIMG } from '../../utils/api-config'
import './ProductPage.scss'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ProductRating from './ProductRating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faTruck, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { getAVGrate, getNumberRate, getSoldQuantity } from "../../utils/Product/index"
import { useUserData } from "../../Context"
import { Link } from 'react-router-dom'

function ProductPage() {
    const [user,] = useUserData()
    function formatPrice(price) {
        return `${price.toLocaleString('vi')} đ`
    }
    const [product, setProduct] = useState({})
    const [notFound, setNotFound] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState('0')
    const [totalRating, setTotalRating] = useState('0')
    const [soldQuantity, setSoldQuantity] = useState('0')
    const [idimage, setidimage] = useState(1)
    const { id } = useParams()
    useEffect(() => {
        getProductByID(id)
            .then(data => {
                setProduct({
                    ...data,
                    images: data.images.map(image => {
                        return `${baseIMG}/products/${image}`
                    }),
                    discount: data.discount * 100 || null,
                })
                document.title = data.productName
                setQuantity(1)
            })
            .catch(error => {
                if (error.message === '404') setNotFound(true)
            })
        document.querySelector('.App').scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getAVGrate(id)
            .then((rs) => {
                if (rs) setRating(rs)
            })
        getNumberRate(id)
            .then((rs) => {
                setTotalRating(rs)
            })
        getSoldQuantity(id)
            .then((rs) => {
                setSoldQuantity(rs)
            })
    }, [id])
    // console.log(product)
    /// Alot of bugs, fix
    function handleSetQuantity(e) {
        if (e.target.className === 'decrease') {
            if (quantity !== 1) setQuantity(quantity - 1)
        }
        else setQuantity(quantity + 1)
    }
    function handleSetidimage(e) {
        if (product.images) {
            if (e.target.className === 'prive') {
                idimage === 1 ? setidimage(product.images.length) : setidimage(idimage - 1)
            } else {
                idimage === product.images.length ? setidimage(1) : setidimage(idimage + 1)
            }
        }
    }
    console.log(idimage)
    if (notFound) return <NotFound />
    return (
        <>
            <Header />
            <div className='product-page'>
                <div className='product-page-content'>
                    <div className='product-page-images'>
                        <div className='wrap_product-page-image'>
                            {product.images && product.images.map((image, index) => {
                                return <img key={index} src={image} alt={product.productName} style={{ display: `${index + 1 === idimage ? "block" : "none"}` }} />
                            })}
                            <div className='product-page-image-item'>
                                {product.images && product.images.map((item, index) => {
                                    return <li id={index + 1} className={index + 1 === idimage ? 'active' : 'hiden'}></li>
                                })}
                            </div>
                            <div className='nextbtn' onClick={handleSetidimage}><FontAwesomeIcon icon={faChevronRight} /></div>
                            <div className='privebtn' onClick={handleSetidimage} ><FontAwesomeIcon icon={faChevronLeft} /></div>
                        </div>

                    </div>
                    <div className='product-page-data'>
                        <div className='product-name'>{product.productName}</div>
                        <div className='action' style={{ marginTop: "10px", display: "flex" }}>
                            <div className='action_item'>
                                <div className='valuerating' style={{ marginRight: "5px" }}>{rating.slice(0, 3)}</div>
                                <ProductRating rate={rating} />
                            </div>
                            <div className='action_item'>
                                <div className='Evaluate1'>{totalRating}</div>
                                <div className='Evaluate2'>Đánh Giá</div>
                            </div>
                            <div className='action_item'>
                                <div className='bought1'>{soldQuantity}</div>
                                <div className='bought2'>Đã Mua</div>
                            </div>
                        </div>
                        <div className="product-price" style={{ display: "flex", alignItems: "center" }}>
                            {product.discount && <span className="discount">{formatPrice(product.price)}</span>}
                            <span className="price">{formatPrice(product.price * (1 - product.discount))}</span>
                        </div>
                        {user ?
                            <div className='transport'>
                                <div>
                                    <FontAwesomeIcon icon={faTruck} />
                                    <span className='title'>Vận Chuyển Đến</span>
                                </div>
                                <div className='address'>{user.address}</div>
                            </div>
                            :
                            <></>
                        }
                        <div className='product-action'>
                            <span className='title'>Số Lượng</span>
                            <div className='quantity'>
                                <button className='decrease' onClick={handleSetQuantity}>-</button>
                                <input value={quantity} type="number" min="1" readOnly />
                                <button className='increase' onClick={handleSetQuantity}>+</button>
                            </div>
                        </div>
                        <div className='product-function'>
                            <button>
                                <span>Thêm vào giỏ hàng</span>
                                <FontAwesomeIcon icon={faCartShopping} />
                            </button>
                            <button>
                                <span>Mua Ngay</span>
                                <Link to={"/"}></Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default ProductPage