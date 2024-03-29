import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons"
import './ProductRating.scss'

function ProductRating({ rate }) {
    function createArray(number) {
        const arr = []
        for (let i = 0; i < number; i++) {
            arr[i] = i
        }
        return arr
    }
    const rateAsPercent = (rate / 5) * 100
    const array = createArray(5)
    return (
        <div className='product-rating'>
            <div>
                {array.map(item => <FontAwesomeIcon key={item} icon={faStar} />)}
            </div>
            <div style={{ '--rate-percent': `${rateAsPercent}%` }}>
                <div>
                    {array.map(item => <FontAwesomeIcon key={item} icon={faStar} />)}
                </div>
            </div>
        </div>
    )
}

export default ProductRating