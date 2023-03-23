import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductByID } from '../../utils/Product'
import NotFound from '../errors/NotFound'
import { baseIMG } from '../../utils/api-config'
import './ProductPage.scss'
import Header from '../../components/header/Header'

function ProductPage() {
    function formatPrice(price) {
        return `${price.toLocaleString('vi')} VNĐ`
    }
    const [product, setProduct] = useState({})
    const [notFound, setNotFound] = useState(false)
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
                    price: formatPrice(data.price)
                })
                document.title = data.productName
            })
            .catch(error => {
                if (error.message === '404') setNotFound(true)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    console.log(product)
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
                        <div className="product-price">
                            <span className="price">{product.price}</span>
                            {product.discount && <span className="discount">{`- ${product.discount}%`}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductPage