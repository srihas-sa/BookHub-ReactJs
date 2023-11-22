import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import Header from '../Header'
import ReactSlick from '../ReactSlick'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    category: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    booklist: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(books => ({
        id: books.id,
        authorname: books.author_name,
        coverpic: books.cover_pic,
        title: books.title,
      }))
      console.log(updatedData)

      this.setState({
        booklist: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="error-view-image"
      />
      <p className="product-not-found-heading">
        Something went wrong. Please try again
      </p>
      <p>We are having some trouble</p>
      <button type="button" className="button" onClick={this.getProducts}>
        Try Again
      </button>
    </div>
  )

  rendertopbookview = () => {
    const {booklist} = this.state
    return (
      <div>
        {console.log(booklist)}
        <ReactSlick booklist={booklist} />
      </div>
    )
  }

  gettoptenbooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.rendertopbookview()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {category, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="outerhomecontainer">
        <Header />
        <div className="afterheaderContainer">
          <h1>Find Your Next Favorite Books?</h1>
          <p>You are in the right place.</p>
          <h1>Top Rated Books</h1>
          <div className="Slickcontainer">{this.gettoptenbooks()}</div>
          <div className="ContactUsSection">
            <div>
              <FaGoogle size={30} className="marginRight" />
              <FaTwitter size={30} className="marginRight" />
              <FaInstagram size={30} className="marginRight" />
              <FaYoutube size={30} />
            </div>
            <p>Contact us</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
