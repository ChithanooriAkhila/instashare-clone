import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'

import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  renderSearchInput = () => {
    const {searchInput} = this.props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button type="button" data-testid="searchIcon">
          <FaSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <nav className="nav-header">
        <div className="nav-home-header">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dnewm2put/image/upload/v1683097531/website_logo_bw93rd.png"
              alt="website logo"
            />
          </Link>
          <h1>Insta Share</h1>
        </div>
        <div className="nav-link-header">
          {this.renderSearchInput()}
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/userProfile" className="nav-link">
                Profile
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
