// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, onRemove, toggleLike} = props
  const {id, name, comment, time, isLiked, initialClassName} = commentDetails

  const onClickLikeButton = () => {
    toggleLike(id)
  }

  const onClickDelete = () => {
    onRemove(id)
  }

  const imgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li className="commentItem">
      <div className="upperPart">
        <p className={`nameInitial ${initialClassName}`}>{name[0]}</p>
        <p className="name">{name}</p>
        <p className="timing">{formatDistanceToNow(time)}</p>
      </div>
      <p className="text">{comment}</p>
      <div className="lowerPart">
        <button
          type="button"
          className="likeContainer"
          onClick={onClickLikeButton}
        >
          <img className="likeButton" src={imgUrl} alt="like" />
        </button>
        <p className={isLiked ? 'likeText' : ''}>Like</p>

        <button
          type="button"
          className="deleteContainer"
          onClick={onClickDelete}
          data-testid="delete"
        >
          <img
            className="deleteButton"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
