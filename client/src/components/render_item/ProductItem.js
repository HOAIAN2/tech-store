import ProductRating from "../../Page/Products/ProductRating"
import { baseIMG } from "../../utils/api-config"
import { Link, useNavigate } from "react-router-dom"
import './ProductItem.scss'
import { getSoldQuantity } from "../../utils/Product/index"
import { useEffect, useState } from "react"



function ProductItem({ data, type = "home" }) {
    // console.log(data)
    // data.discount = 0.2
    const [countBought, setCountBought] = useState('0')
    const navigate = useNavigate()
    function formatPrice(price) {
        return `${price.toLocaleString('vi')} ₫`
    }
    useEffect(() => {
        getSoldQuantity(data.productID)
            .then((rs) => {
                setCountBought(rs)
            })
    }, [])

    // if (data.length !== 0) {
    if (type === 'home') {
        return (
            <div className="producthome_item">
                <div className="contentitem">
                    <div className="home__produt-item-img" style={{ backgroundImage: `url('${baseIMG}products/${data.images[0]}')` }} ></div>
                    <h4 className="home__produt-item-name">{data.productName}</h4>
                    <div className="home__produt-item-gia">
                        <div className="wrapnewprice" style={{ background: `linear-gradient(to right, #d41138 ${data.discount ? 100 - (100 * data.discount) : 100}%, #ef8573 0%)` }}>
                            <span className="newprice">{formatPrice(data.price * (1 - data.discount))}</span>
                        </div>
                        {data.discount ? <span className="oldprice">{formatPrice(data.price)}</span> : <></>}
                    </div>
                    <div className="home__produt-item-action">
                        <div style={{ height: "18px" }}>
                            <ProductRating rate={2.5} />
                        </div>
                        <Link to={`product/${data.productID}`}>Chi tiết</Link>
                    </div>
                </div>
            </div>
        )
    }
    else if (type === 'search') {
        return (
            <div onClick={() => { navigate(`/product/${data.productID}`) }} className="productsearch_item">
                <div className="contentitemsearch">
                    <div className="search-product-item-img" style={{ backgroundImage: `url('${baseIMG}products/${data.images[0]}')` }}></div>
                    <div className="search__produt-item-name">{data.productName}</div>
                    <div className="search__produt-item-gia">
                        <div className="wrap-price" style={{ background: `linear-gradient(to right, #d41138 ${data.discount ? 100 - (100 * data.discount) : 100}%, #ef8573 0%)` }}>
                            <span className="price">{formatPrice(data.price * (1 - data.discount))}</span>
                        </div>
                        {data.discount ? <span className="oldprice">{formatPrice(data.price)}</span> : <></>}
                    </div>
                    <div className="search__produt-item-action">
                        <div style={{ height: "18px" }}>
                            <ProductRating rate={data.rating} />
                        </div>
                        {/* <Link to={`/product/${data.productID}`}>Chi tiết</Link> */}
                        <div className="count-Buy">{`đã bán ${countBought}`}</div>
                    </div>
                    {/* <div className="discount">
                            <span>Giảm</span>
                        </div> */}
                </div>
            </div>
        )
    }
    // }
}

export default ProductItem