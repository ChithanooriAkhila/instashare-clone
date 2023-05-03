import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

/* Add css to your project */
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

class UserStoriesList extends Component {
  state = {
    userStories: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({
      isLoading: true,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.users_stories.map(story => ({
        userId: story.user_id,
        userName: story.user_name,
        storyUrl: story.story_url,
      }))
      console.log(updatedData)
      this.setState({
        userStories: updatedData,
        isLoading: false,
      })
    }
  }

  renderSlider = () => {
    const {userStories} = this.state

    return (
      <Slider {...settings}>
        {userStories.map(eachLogo => {
          const {userId, userName, storyUrl} = eachLogo
          return (
            <div className="slick-item" key={userId}>
              <img className="logo-image" src={storyUrl} alt="user story" />
              <p className="user-story-name">{userName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="main-container">
        <div className="slick-container">
          {!isLoading ? (
            this.renderSlider()
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

export default UserStoriesList
