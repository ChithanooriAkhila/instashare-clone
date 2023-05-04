import {Component} from 'react'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'

class Profile extends Component {
  render() {
    const {profileDetails} = this.props
    const {
      userId,
      userName,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      posts,
      postsCount,
      stories,
    } = profileDetails

    return (
      <div className="main-container">
        <div className="top-my-profile-container">
          <div>
            <img src={profilePic} alt="my profile" />
          </div>
          <div className="info-container">
            <h1>{userName}</h1>
            <div className="posts-info-container">
              <p>{`${postsCount} posts`}</p>
              <p>{`${followersCount} followers`}</p>
              <p>{`${followingCount} following`}</p>
            </div>
            <p>{userId}</p>
            <p>{userBio}</p>
          </div>
        </div>
        <div>
          <ul className="stories-container">
            {stories.map(story => (
              <li key={story.id}>
                <img src={story.image} alt="my story" className="story-image" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="posts-desc">
            <BsGrid3X3 />
            <h1>Posts</h1>
          </div>
          <div>
            <ul className="posts-container">
              {posts.length > 0 ? (
                posts.map(post => (
                  <li key={post.id} className="post-image">
                    <img src={post.image} alt="my post" />
                  </li>
                ))
              ) : (
                <div>
                  <BiCamera />
                  <h1>No Posts Yet</h1>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
