import { baseIMG } from '../../utils/api-config'
import './CommentItem.scss'
import ProductRating from '../../Page/Products/ProductRating'

function CommentItem({ data }) {
    console.log(data)
    const renderData = {
        ...data,
        avatar: `${baseIMG}avatar/${data.avatar}`,
        fullName: `${data.userLastName} ${data.userFirstName}`,
        commentDate: new Date(data.commentDate).toLocaleDateString(),
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    return (
        <div className="comment-item">
            <div className='content-left'>
                <img src={renderData.avatar} alt="" />
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