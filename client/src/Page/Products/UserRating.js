import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import { postRating } from "../../utils/Rating"
import languages from './Languages/ProductPage.json'
import './UserRating.scss'
import { useState } from "react"

function UserRating({ rating, setRating }) {
    const [rate, setRate] = useState(rating)
    const { id } = useParams()
    let language = languages.en
    if (navigator.language === 'vi') language = languages.vi
    function createArray(rate) {
        const array = []
        for (let index = 0; index < 5; index++) {
            if (index < rate) array.push(true)
            else array.push(false)
        }
        return array
    }
    function handleRateProduct() {
        postRating(parseInt(id), rate)
            .then(() => {
                setRating(rate)
            })
            .catch(error => {
                alert(error)
            })
    }
    return (
        <div className='user-rating'>
            <div className='title'>{language.ratingThisProduct}</div>
            <div className='stars'>
                {createArray(rate).map((item, index) => {
                    return item === true ?
                        <span key={index}
                            onClick={() => { setRate(index + 1) }}
                            className="true"><FontAwesomeIcon icon={faStar} /></span> :
                        <span key={index}
                            onClick={() => { setRate(index + 1) }}
                            className="false"><FontAwesomeIcon icon={faStar} /></span>
                })}
            </div>
            <div className='submit'>
                <button onClick={handleRateProduct}>{language.send}</button>
            </div>
        </div>
    )
}

export default UserRating