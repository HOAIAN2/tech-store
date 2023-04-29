import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import NotFound from '../errors/NotFound'
import { baseIMG } from '../../utils/api-config'
import './ProductPage.scss'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ProductRating from './ProductRating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faTruck, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { getProductByID } from "../../utils/Product/index"
import { getComments, addComment } from '../../utils/Comment'
import { useUserData } from "../../Context"
import { Link } from 'react-router-dom'
import CommentItem from '../../components/render_item/CommentItem'
import languages from './Languages/ProductPage.json'

function ProductPage() {
    let language = languages.en
    if (navigator.language === 'vi') language = languages.vi
    const [user,] = useUserData()
    function formatPrice(price) {
        return `${price.toLocaleString('vi')} đ`
    }
    const [comment, setComment] = useState('')
    const [product, setProduct] = useState({})
    const [comments, setComments] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [imageID, setImageID] = useState(1)
    const [commentOrder, setCommentOrder] = useState(language.latest)
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()
    useEffect(() => {
        let orderMode = 'DESC'
        if (commentOrder === language.oldest) orderMode = 'ASC'
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
        getComments(id, orderMode)
            .then(result => {
                setComments(result)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
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
                setProduct({
                    ...data,
                    images: data.images.map(image => {
                        return `${baseIMG}/products/${image}`
                    }),
                    discount: data.discount * 100 || null,
                })
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
    useEffect(() => {
        let orderMode = 'DESC'
        if (commentOrder === language.oldest) orderMode = 'ASC'
        getComments(id, orderMode)
            .then(result => {
                setComments(result)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentOrder])
    console.log(product)
    console.log(commentOrder)
    if (notFound) return <NotFound />
    return (
        <>
            <Header />
            <div className='product-page'>
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
                            <button>
                                <span>{language.addToCart}</span>
                                <FontAwesomeIcon icon={faCartShopping} />
                            </button>
                            <button>
                                <span>{language.buyNow}</span>
                                <Link to={"/"}></Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='product-page-comments'>
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
                                value={comment}
                                onFocus={() => {
                                    if (!user) {
                                        navigate('/login', { state: { from: location } })
                                    }
                                }}
                                onInput={(e) => { setComment(e.target.value) }}
                                maxLength='255'></textarea>
                            <button onClick={handleSendComment} >{language.send}</button>
                        </div>
                    </div>
                    <div className='comment-list'>
                        {comments.map(comment => {
                            return <CommentItem key={comment.commentID} data={comment} />
                        })}
                        {comments.length !== product.commentCount ? <button onClick={handleLoadComments}>{language.loadMore}</button> : null}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default ProductPage