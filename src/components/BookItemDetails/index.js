import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {
    Bookdetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    id: data.id,
    authorname: data.author_name,
    coverpic: data.cover_pic,
    aboutbook: data.about_book,
    rating: data.rating,
    readstatus: data.read_status,
    title: data.title,
    aboutauthor: data.about_author,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.book_details)

      this.setState({
        Bookdetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="error-view-image"
      />
      <p>Something went wrong. Please try again</p>

      <button
        type="button"
        className="button"
        onClick={() => this.getProductData}
      >
        Try Again
      </button>
    </div>
  )

  renderProductDetailsView = () => {
    const {Bookdetails} = this.state

    return (
      <div className="individualcompanycard12">
        <div className="inner">
          <div className="indi">
            <img
              src={Bookdetails.coverpic}
              alt={Bookdetails.title}
              className="CompanyName"
            />
            <div className="indi1">
              <h1>{Bookdetails.title}</h1>
              <p className="title">{Bookdetails.authorname}</p>
              <p className="rating">
                Avg Rating <BsFillStarFill /> {Bookdetails.rating}
              </p>
              <p>
                <span className="status">Status:</span>
                {Bookdetails.readstatus}
              </p>
            </div>
          </div>
        </div>
        <hr
          style={{
            background: '#b6c5ff',
            color: '#b6c5ff',
            borderColor: '#b6c5ff',
            height: '2px',
            width: '100%',
          }}
        />

        <div>
          <h1>About Author</h1>
          <p>{Bookdetails.aboutauthor}</p>
          <h1>About Book</h1>
          <p>{Bookdetails.aboutbook}</p>
        </div>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="outerdetailed" data-testid="loader">
        <Header />
        {this.renderProductDetails()}
        <div className="ContactUsSection">
          <div>
            <FaGoogle size={30} className="marginRight" />
            <FaTwitter size={30} className="marginRight" />
            <FaInstagram size={30} className="marginRight" />
            <FaYoutube size={30} />
          </div>
          <h3>Contact us</h3>
        </div>
      </div>
    )
  }
}

export default BookItemDetails
