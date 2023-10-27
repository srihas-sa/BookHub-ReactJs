import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
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
    <div className="loader-container" data-testid="loader">
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
      <h1 className="product-not-found-heading">Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" className="button" onClick={this.getProducts}>
        Retry
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
          <div className="Small-SIze-Devices">
            <button type="button" className="button1">
              All
            </button>

            <button type="button" className="button1">
              Read
            </button>
            <button type="button" className="button1">
              Currently Reading
            </button>
            <button type="button" className="button1">
              Want To Read
            </button>
          </div>
          <div className="Slickcontainer">{this.gettoptenbooks()}</div>
        </div>
      </div>
    )
  }
}

export default Home
