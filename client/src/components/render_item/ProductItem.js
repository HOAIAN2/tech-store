import ProductRating from "../../Page/Products/ProductRating"
import { baseIMG } from "../../utils/api-config"
import { Link } from "react-router-dom"

function ProductItem({ data }) {
    // console.log(data)
    function formatPrice(price) {
        if (data.discount) {
            let a;
            a = price - (price * data.discount)
            a = `${a.toLocaleString('vi')} ₫`
            return a
        }
        return `${price.toLocaleString('vi')} ₫`
    }


    if (data.length != 0) {
        return (
            <div className="producthome_item">
                <div className="contentitem">
                    <div className="home__produt-item-img" style={{ backgroundImage: `url('${baseIMG}products/${data.images[0]}')` }} ></div>
                    <h4 className="home__produt-item-name">{data.productName}</h4>
                    <div className="home__produt-item-gia">
                        <div className="wrapnewprice" style={{ background: `linear-gradient(to right, #d41138 ${data.discount ? 100 - (100 * data.discount) : 100}%, #ef8573 0%)` }}>
                            <span className="newprice">{formatPrice(data.price)}</span>
                        </div>
                        {data.discount ? <span className="oldprice">{formatPrice(data.price)}</span> : <></>}
                    </div>
                    <div className="home__produt-item-action">
                        <ProductRating rate={2.5} />
                        <Link to={`product/${data.productID}`}>Mua Ngay</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductItem