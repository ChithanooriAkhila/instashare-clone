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
class MyProfile extends Component {
  state = {
    myProfileDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const {profile} = fetchedData
      const updatedData = {
        id: profile.id,
        userId: profile.user_id,
        userName: profile.user_name,
        profilePic: profile.profile_pic,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        userBio: profile.user_bio,
        posts: profile.posts.map(post => ({
          id: post.id,
          image: post.image,
        })),
        postsCount: profile.posts_count,
        stories: profile.stories.map(story => ({
          id: story.id,
          image: story.image,
        })),
      }

      console.log(updatedData)
      this.setState({
        myProfileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderMyProfileSuccessView = () => {
    const {myProfileDetails} = this.state

    return <Profile profileDetails={myProfileDetails} />
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderMyProfileFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dnewm2put/image/upload/v1683176679/alert-triangle_hyou2e.svg"
        alt="error"
      />
      <h1>something went wrong</h1>
      <button type="button" onClick={this.getMyProfile()}>
        Try Again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMyProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderMyProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default MyProfile
