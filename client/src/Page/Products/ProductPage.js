import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import NotFound from '../errors/NotFound'
import { baseIMG } from '../../utils/api-config'
import './ProductPage.scss'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ProductRating from './ProductRating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faTruck, faChevronRight, faChevronLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { getProductByID, getproductssuggest } from "../../utils/Product/index"
import { getComments, addComment } from '../../utils/Comment'
import { createOrder, addProduct } from '../../utils/Order'
import { useUserData, useOrderData, ORDER_ACTION } from "../../Context"
import CommentItem from '../../components/render_item/CommentItem'
import { getRating } from '../../utils/Rating'
import UserRating from './UserRating'
import languages from './Languages/ProductPage.json'
import PopupSuccess from '../../components/order/PopupSuccess'
import SliceProductItem from '../../components/render_item/SliceProductItem'
import '../../components/render_item/SliceProductItem.scss'
import PackageSlice from '@danghung_dung/slice_item2'

function ProductPage() {
    let language = languages.en
    if (navigator.language === 'vi') language = languages.vi
    const [user,] = useUserData()
    const [orders, dispatchOrders] = useOrderData()
    function formatPrice(price) {
        return `${price.toLocaleString('vi')} đ`
    }
    const [comment, setComment] = useState('')
    const [product, setProduct] = useState({})
    const [comments, setComments] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [imageID, setImageID] = useState(1)
    const [activeRating, setActiveRating] = useState(false)
    const [commentOrder, setCommentOrder] = useState(language.latest)
    const [userRate, setUserRate] = useState(0)
    const [showPopup, setShowPopup] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()
    const commentRef = useRef()
    const container = useRef()
    const [suggest, setsuggest] = useState([])
    // console.log(product)
    /// Alot of bugs, fix
    function handleSetQuantity(e) {
        if (e.target.className === 'decrease') {
            if (quantity !== 1) setQuantity(quantity - 1)
        }
        else setQuantity(quantity + 1)
    }
    function handlesetImageID(e) {
        if (product.images) {
            if (e.target.className === 'prive') {
                imageID === 1 ? setImageID(product.images.length) : setImageID(imageID - 1)
            } else {
                imageID === product.images.length ? setImageID(1) : setImageID(imageID + 1)
            }
        }
    }
    function handleSendComment() {
        if (comment === '') return
        addComment(id, comment)
            .then((result) => {
                setComments([result, ...comments])
                setComment('')
                return getProductByID(id)
            })
            .then(data => {
                handleSetProductData(data)
            })
            .catch(error => {
                console.error(error)
            })
    }
    function handleLoadComments() {
        let orderMode = 'DESC'
        if (commentOrder === language.oldest) orderMode = 'ASC'
        getComments(id, orderMode, comments[comments.length - 1].commentID)
            .then(result => {
                setComments([...comments, ...result])
            })
    }
    function didUserBought() {
        return orders.filter(order => order.paid === true).some(order => {
            return order.products.find(product => product.productID === parseInt(id))
        })
    }
    function handleAddToCart() {
        const latestOrder = orders[0]
        if (!latestOrder || latestOrder.paid) {
            createOrder(parseInt(id), quantity)
                .then(data => {
                    dispatchOrders({ type: ORDER_ACTION.EDIT, payload: data })
                    setShowPopup(true)
                })
                .catch(error => {
                    console.error(error)
                    setError(true)
                    setShowPopup(true)
                })
        }
        else {
            addProduct(latestOrder.orderID, parseInt(id), quantity)
                .then(data => {
                    dispatchOrders({ type: ORDER_ACTION.EDIT, payload: data })
                    setShowPopup(true)
                })
                .catch(error => {
                    console.error(error)
                    setError(true)
                    setShowPopup(true)
                })
        }
    }
    function handleSetProductData(data) {
        setProduct({
            ...data,
            images: data.images.map(image => {
                return `${baseIMG}/products/${image}`
            }),
            discount: data.discount * 100 || null,
        })
    }
    useEffect(() => {
        let orderMode = 'DESC'
        if (commentOrder === language.oldest) orderMode = 'ASC'
        getProductByID(id)
            .then(data => {
                handleSetProductData(data)
                document.title = data.productName
            })
            .catch(error => {
                if (error.message === '404') setNotFound(true)
            })
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getComments(id, orderMode)
            .then(result => {
                setComments(result)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    useEffect(() => {
        let orderMode = 'DESC'
        if (commentOrder === language.oldest) orderMode = 'ASC'
        getComments(id, orderMode)
            .then(result => {
                setComments(result)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentOrder])
    useEffect(() => {
        const latestOrder = orders[0]
        if (latestOrder?.paid) return
        const product = latestOrder?.products.find(product => product.productID === parseInt(id))
        if (product) setQuantity(product.quantity)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    useEffect(() => {
        commentRef.current.style.height = 'auto'
        commentRef.current.style.height = commentRef.current.scrollHeight + 'px'
    }, [comment])
    useEffect(() => {
        if (!didUserBought()) return
        getRating(parseInt(id))
            .then(rate => {
                setUserRate(rate.rate)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    useEffect(() => {
        if (activeRating === true) return
        getProductByID(id)
            .then(data => {
                handleSetProductData(data)
            })
            .catch(error => {
                console.error(error)
            })
        setComments(comments.map(comment => {
            if (comment.userID === user.userID) return { ...comment, rate: userRate }
            else return { ...comment }
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRating])

    useEffect(() => {
        getproductssuggest(id)
            .then((rs) => {
                setsuggest(rs.map(product => {
                    return {
                        ...product,
                        images: product.images.map(image => {
                            return `${baseIMG}/products/${image}`
                        }),
                        discount: product.discount * 100 || null,
                        price: formatPrice(product.price)
                    }
                }))
            })

    }, [id])
    useEffect(() => {
        PackageSlice(container.current, 4, 5, 0.7, 'ease')
    }, [suggest])

    if (notFound) return <NotFound />
    return (
        <>
            <Header />
            {error && showPopup && <PopupSuccess type='error' message={language.error} setShowPopup={setShowPopup} />}
            {!error && showPopup && <PopupSuccess message={language.success} setShowPopup={setShowPopup} />}
            <div className='product-page'>
                {activeRating &&
                    <div className='overlay-rating' onClick={(e) => {
                        if (e.target.className === 'overlay-rating') setActiveRating(false)
                    }}>
                        <UserRating rating={userRate} setRating={setUserRate} setActiveRating={setActiveRating} />
                    </div>
                }
                <div className='product-page-content'>
                    <div className='product-page-images'>
                        <div className='wrap_product-page-image'>
                            {product.images && product.images.map((image, index) => {
                                return <img key={index} src={image} alt={product.productName} style={{ display: `${index + 1 === imageID ? "block" : "none"}` }} />
                            })}
                            <div className='product-page-image-item'>
                                {product.images && product.images.map((item, index) => {
                                    return <li key={index} id={index + 1} className={index + 1 === imageID ? 'active' : 'hiden'}></li>
                                })}
                            </div>
                            <div className='nextbtn' onClick={handlesetImageID}><FontAwesomeIcon icon={faChevronRight} /></div>
                            <div className='privebtn' onClick={handlesetImageID} ><FontAwesomeIcon icon={faChevronLeft} /></div>
                        </div>

                    </div>
                    <div className='product-page-data'>
                        <div className='product-name'>{product.productName}</div>
                        <div className='action' style={{ marginTop: "10px", display: "flex" }}>
                            <div className='action_item'>
                                <div className='valuerating' style={{ marginRight: "5px" }}>{product.rating}</div>
                                <ProductRating rate={product.rating} />
                            </div>
                            <div className='action_item'>
                                <div className='Evaluate1'>{product.ratingCount}</div>
                                <div className='Evaluate2'>{language.rating}</div>
                            </div>
                            <div className='action_item'>
                                <div className='bought1'>{product.soldQuantity}</div>
                                <div className='bought2'>{language.sold}</div>
                                {didUserBought() && <button
                                    onClick={() => { setActiveRating(true) }}>{language.rating}
                                </button>}
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
                                    <span className='title'>{language.shipTo}</span>
                                </div>
                                <div className='address'>{user.address}</div>
                            </div>
                            :
                            <></>
                        }
                        <div className='product-action'>
                            <span className='title'>{language.quantity}</span>
                            <div className='quantity'>
                                <button className='decrease' onClick={handleSetQuantity}>-</button>
                                <input value={quantity} type="number" min="1" readOnly />
                                <button className='increase' onClick={handleSetQuantity}>+</button>
                            </div>
                        </div>
                        <div className='product-function'>
                            <button onClick={handleAddToCart}>
                                <span>{language.addToCart}</span>
                                <FontAwesomeIcon icon={faCartShopping} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='product-page-suggest'>
                    <div ref={container} className="suggest_products_slice">
                        {suggest.map(product => {
                            return <SliceProductItem key={product.productID} data={product} width={"25%"} />
                        })}
                    </div>

                </div>
                < div className='product-page-comments' >
                    <div className='comment-count'>
                        <span>{language.comments} ({product.commentCount})</span>
                        <select value={commentOrder}
                            onChange={e => {
                                setCommentOrder(e.target.value)
                            }}>
                            <option>{language.latest}</option>
                            <option>{language.oldest}</option>
                        </select>
                    </div>
                    <div className='comment-writter'>
                        <div className='left'>
                            <div className='avatar'>
                                {user === null ? <img src={`${baseIMG}avatar/user.png`} alt='' /> : <img src={user.avatar} alt='' />}
                            </div>
                        </div>
                        <div className='right'>
                            <textarea
                                ref={commentRef}
                                placeholder={language.placeHolder}
                                value={comment}
                                onFocus={() => {
                                    if (!user) {
                                        navigate('/login', { state: { from: location } })
                                    }
                                }}
                                onInput={(e) => { setComment(e.target.value) }}
                                maxLength='255'></textarea>
                            <button onClick={handleSendComment}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </div>
                    <div className='comment-list'>
                        {comments.map(comment => {
                            return <CommentItem key={comment.commentID} data={comment} />
                        })}
                        {comments.length !== product.commentCount ? <button onClick={handleLoadComments}>{language.loadMore}</button> : null}
                    </div>
                </ div>
            </div >
            <Footer />
        </>
    )
}
export default ProductPage