import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {name: '', comment: '', commentList: []}

  onNameChange = event => this.setState({name: event.target.value})

  onCommentChange = event => this.setState({comment: event.target.value})

  onSubmitForm = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColorClassName = `${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      time: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      name: '',
      comment: '',
    }))
  }

  onDelete = id => {
    const {commentList} = this.state
    const filteredList = commentList.filter(each => each.id !== id)
    this.setState({
      commentList: filteredList,
    })
  }

  toggleIsLiked = id => {
    // const {commentList} = this.state
    this.setState(prevState => ({
      commentList: prevState.commentList.map(each => {
        if (id === each.id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  render() {
    const {commentList, name, comment} = this.state
    const totalComment = commentList.length

    return (
      <div className="bgContainer">
        <h1 className="mainHeading">Comments</h1>
        <div className="topSection">
          <form className="formControl" onSubmit={this.onSubmitForm}>
            <p className="para">Say something about 4.0 Technologies</p>
            <input
              value={name}
              type="text"
              className="inputElement"
              placeholder="Your Name"
              onChange={this.onNameChange}
            />
            <textarea
              value={comment}
              type="text"
              rows="15"
              cols="50"
              placeholder="Your Comment"
              onChange={this.onCommentChange}
            />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
          <img
            className="heroImage"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <div className="bottomSection">
          <p>
            <span className="number">{totalComment}</span>Comments
          </p>
          <ul className="commentsContainer">
            {commentList.map(each => (
              <CommentItem
                key={each.id}
                commentDetails={each}
                toggleLike={this.toggleIsLiked}
                onRemove={this.onDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
