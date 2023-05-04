import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HomePostItem from '../HomePostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class InstaSharePostsListHome extends Component {
  state = {
    homePostsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomePostsList()
  }

  getHomePostsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.props
    console.log(searchInput)

    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.posts.map(post => ({
        postId: post.post_id,
        userId: post.user_id,
        userName: post.user_name,
        profilePic: post.profile_pic,
        postDetails: {
          imageUrl: post.post_details.image_url,
          caption: post.post_details.caption,
        },
        likesCount: post.likes_count,
        comments: post.comments.map(c => ({
          userName: c.user_name,
          userId: c.user_id,
          comment: c.comment,
        })),
        createdAt: post.created_at,
      }))
      console.log(updatedData)
      this.setState({
        homePostsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderPostListSuccessView = () => {
    const {homePostsList} = this.state

    return (
      <div className="main-container">
        <div className="slick-container">
          <ul>
            {homePostsList.map(postItem => (
              <HomePostItem key={postItem.postId} homePostDetails={postItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderPostsListFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dnewm2put/image/upload/v1683176679/alert-triangle_hyou2e.svg"
        alt="error"
      />
      <h1>something went wrong</h1>
      <button type="button" onClick={this.getHomePostsList()}>
        Try Again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPostListSuccessView()
      case apiStatusConstants.failure:
        return this.renderPostsListFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default InstaSharePostsListHome
