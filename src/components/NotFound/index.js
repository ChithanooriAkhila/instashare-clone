import './index.css'

const NotFound = props => {
  const homePage = () => {
    const {history} = props
    history.replace('/')
  }
  console.log(props)

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dnewm2put/image/upload/v1683098064/page_not_found_vkmpl1.png"
        alt="page not found"
        className="not-found-img"
      />
      <h1>Page Not Found</h1>
      <p>
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button type="button" onClick={homePage()}>
        Home Page
      </button>
    </div>
  )
}

export default NotFound
