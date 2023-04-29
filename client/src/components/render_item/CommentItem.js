import { baseIMG } from '../../utils/api-config'
import './CommentItem.scss'
import ProductRating from '../../Page/Products/ProductRating'

function CommentItem({ data }) {
    const renderData = {
        ...data,
        avatar: `${baseIMG}avatar/${data.avatar}`,
        fullName: `${data.userLastName} ${data.userFirstName}`,
        commentDate: new Date(data.commentDate).toLocaleDateString()
    }
    return (
        <div className="comment-item">
            <div className='content-left'>
                <div className='avatar'>
                    <img src={renderData.avatar} alt="" />
                </div>
            </div>
            <div className='content-right'>
                <div className='content-title'>
                    <span className="name">{renderData.fullName}</span>
                    <ProductRating rate={renderData.rate} />
                    <span className="date">{renderData.commentDate}</span>
                </div>
                <div className='content-data'>
                    <p>{renderData.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default CommentItem