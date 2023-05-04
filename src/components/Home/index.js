import {Component} from 'react'
import Header from '../Header'
import UserStoriesList from '../UserStoriesList'
import InstaSharePostsListHome from '../InstaSharePostsListHome'

class Home extends Component {
  state = {
    searchInput: '',
  }

  changeInSearchInput = searchValue => {
    console.log(searchValue)
    this.setState({searchInput: searchValue})
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header
          changeSearchInput={this.changeInSearchInput}
          searchInput={searchInput}
        />
        <UserStoriesList />
        <InstaSharePostsListHome searchInput={searchInput} />
      </>
    )
  }
}
export default Home
