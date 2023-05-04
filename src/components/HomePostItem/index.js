import {Component} from 'react'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import './index.css'

class HomePostItem extends Component {
  state = {liked: false, likes: 0}

  componentDidMount() {
    const {homePostDetails} = this.props
    const {likesCount} = homePostDetails
    this.setState({likes: likesCount})
  }

  likeUnlikePost = async () => {
    const {liked} = this.state
    const {homePostDetails} = this.props
    const {postId} = homePostDetails

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const options = {
      method: 'POST',
      body: JSON.stringify({like_status: !liked}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    console.log(options)
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      this.setState(prev => ({
        liked: !prev.liked,
        likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
      }))
    }
  }

  render() {
    const {homePostDetails} = this.props
    const {
      userId,
      userName,
      profilePic,
      postDetails,
      comments,
      createdAt,
    } = homePostDetails
    const {liked, likes} = this.state
    const {imageUrl, caption} = postDetails
    return (
      <div className="home-post-container">
        <div className="profile-container">
          <img
            src={profilePic}
            alt="post author profile"
            className="profile-pic"
          />
          <Link to={`/users/${userId}`}>
            <p>{userName}</p>
          </Link>
        </div>
        <div>
          <img src={imageUrl} alt="post" className="post-image" />
        </div>
        <div className="bottom-home-post-section">
          <div className="buttons-container">
            <button
              type="button"
              onClick={this.likeUnlikePost}
              data-testid={liked ? 'likeIcon' : 'unLikeIcon'}
              className="like-button"
            >
              {liked ? <FcLike /> : <BsHeart />}
            </button>
            <FaRegComment className="comment-button" />
            <BiShareAlt />
          </div>

          <p>{`${likes} likes`}</p>
          <p>{caption}</p>
          <ul className="comments-list-container">
            {comments.map(c => (
              <li key={c.userId}>{`${c.userName} ${c.comment}`}</li>
            ))}
          </ul>
          <p>{createdAt}</p>
        </div>
      </div>
    )
  }
}

export default HomePostItem
