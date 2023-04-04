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
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

function ProductPage() {
    function formatPrice(price) {
        return `${price.toLocaleString('vi')} đ`
    }
    const [product, setProduct] = useState({})
    const [notFound, setNotFound] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams()
    useEffect(() => {
        getProductByID(id)
            .then(data => {
                console.log(data)
                setProduct({
                    ...data,
                    images: data.images.map(image => {
                        return `${baseIMG}/products/${image}`
                    }),
                    discount: data.discount * 100 || null,
                    rate: 3.5
                })
                document.title = data.productName
                setQuantity(1)
            })
            .catch(error => {
                if (error.message === '404') setNotFound(true)
            })
        document.querySelector('.App').scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    console.log(product)
    /// Alot of bugs, fix
    function handleSetQuantity(e) {
        if (e.target.className === 'decrease') {
            if (quantity !== 1) setQuantity(quantity - 1)
        }
        else setQuantity(quantity + 1)
    }
    if (notFound) return <NotFound />
    return (
        <>
            <Header />
            <div className='product-page'>
                <div className='product-page-content'>
                    <div className='product-page-images'>
                        {product.images && product.images.map((image, index) => {
                            return <img key={index} src={image} alt={product.productName} />
                        })}
                    </div>
                    <div className='product-page-data'>
                        <div className='product-name'>{product.productName}</div>
                        <ProductRating rate={product.rate} />
                        <div className="product-price">
                            <span className="price">{formatPrice(product.price * (1 - product.discount))}</span>
                            {product.discount && <span className="discount">{formatPrice(product.price)}</span>}
                        </div>
                        <div className='product-action'>
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
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default ProductPage