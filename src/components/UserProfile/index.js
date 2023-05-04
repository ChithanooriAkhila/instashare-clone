import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Profile from '../Profile'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class UserProfile extends Component {
  state = {
    userProfileDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const userDetails = fetchedData.user_details
      const updatedData = {
        id: userDetails.id,
        userId: userDetails.user_id,
        userName: userDetails.user_name,
        profilePic: userDetails.profile_pic,
        followersCount: userDetails.followers_count,
        followingCount: userDetails.following_count,
        userBio: userDetails.user_bio,
        posts: userDetails.posts.map(post => ({
          id: post.id,
          image: post.image,
        })),
        postsCount: userDetails.posts_count,
        stories: userDetails.stories.map(story => ({
          id: story.id,
          image: story.image,
        })),
      }

      this.setState({
        userProfileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderUserProfileSuccessView = () => {
    const {userProfileDetails} = this.state

    return <Profile profileDetails={userProfileDetails} profileType="user" />
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserProfileFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dnewm2put/image/upload/v1683176679/alert-triangle_hyou2e.svg"
        alt="failure view"
      />
      <h1>Something went wrong. Please try again</h1>
      <button type="button" onClick={this.getUserProfile()}>
        Try Again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderUserProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default UserProfile
