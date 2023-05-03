import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HomePostItem from '../HomePostItem'

/* Add css to your project */
import './index.css'

class InstaSharePostsListHome extends Component {
  state = {
    homePostsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getHomePostsList()
  }

  getHomePostsList = async () => {
    this.setState({
      isLoading: true,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
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
        isLoading: false,
      })
    }
  }

  render() {
    const {isLoading, homePostsList} = this.state
    // console.log(homePostsList)
    return (
      <div className="main-container">
        <div className="slick-container">
          {!isLoading ? (
            <ul>
              {homePostsList.map(postItem => (
                <HomePostItem key={postItem.postId} />
              ))}
            </ul>
          ) : (
            <div className="loader-container" data-testid="loader">
              <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default InstaSharePostsListHome
