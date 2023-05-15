import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import languages from './Languages/ProductPage.json'
import './UserRating.scss'

function UserRating(props) {
    let language = languages.en
    if (navigator.language === 'vi') language = languages.vi
    console.log(props)
    return (
        <div className='user-rating'>
            <div className='title'>{language.ratingThisProduct}</div>
            <div className='stars'>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
            </div>
            <div className='submit'>
                <button>{language.send}</button>
            </div>
        </div>
    )
}

export default UserRating