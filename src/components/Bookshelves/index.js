import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import {BsFillStarFill, BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ReactSlick from '../ReactSlick'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    shelf: 'ALL',

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
    const {shelf, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${searchInput}`
    console.log(apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(books => ({
        id: books.id,
        authorname: books.author_name,
        coverpic: books.cover_pic,
        title: books.title,
        readstatus: books.read_status,
        rating: books.rating,
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

      <button type="button" className="button" onClick={this.getProducts}>
        Try Again
      </button>
    </div>
  )

  rendertopbookview = () => {
    const {booklist, shelf, searchInput} = this.state
    console.log(shelf)
    const length = booklist.length > 0
    return (
      <div>
        {length && (
          <ul className="outermost">
            {booklist.map(eachbook => {
              const {
                id,
                authorname,
                coverpic,
                title,
                readstatus,
                rating,
              } = eachbook
              return (
                <li className="individual">
                  <img src={coverpic} alt={title} className="individualimage" />
                  <div className="">
                    <h1>{title}</h1>
                    <p className="title">{authorname}</p>
                    <p className="rating">
                      Avg Rating <BsFillStarFill color="yellow" /> {rating}
                    </p>
                    <p>
                      Status:
                      <span className="status">{readstatus}</span>
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        {!length && (
          <div>
            <img
              src="https://res.cloudinary.com/dkcqlgabg/image/upload/v1700656869/Group_7484_bhi3bf.png"
              alt="no books"
            />

            <p>Your search for {searchInput} did not find any matches</p>
          </div>
        )}
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

  cickingSearch = e => {
    this.setState({searchInput: e.target.value})
  }

  onclickedbutton = async shelfs => {
    await this.setState({shelf: shelfs})
    this.getProducts()
  }

  render() {
    const {category, searchInput, shelf} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="outerhomecontainer">
        <Header />
        <div className="afterheaderContainer">
          <div className="Small-SIze-Devices">
            {bookshelvesList.map(eachshelve => {
              console.log('hello')
              return (
                <button
                  type="button"
                  className="button1"
                  onClick={() => this.onclickedbutton(eachshelve.label)}
                >
                  {eachshelve.label}
                </button>
              )
            })}
            <div className="Slickcontainer">{this.gettoptenbooks()}</div>
          </div>

          <div className="Large-Size-Devices">
            <div>
              <h1 className="heading">Bookshelves</h1>
              <ul className="leftsideLargeContainer">
                {bookshelvesList.map(eachshelve => {
                  console.log('hello')
                  return (
                    <button
                      type="button"
                      className="button1"
                      onClick={() => this.onclickedbutton(eachshelve.value)}
                    >
                      {eachshelve.label}
                    </button>
                  )
                })}
              </ul>
            </div>
            <div className="RightSideContainer">
              <div className="sameRow">
                <h1>{shelf} Books</h1>
                <div>
                  <input
                    type="search"
                    id="hello"
                    placeholder="Search"
                    testid="searchButton"
                    onChange={this.cickingSearch}
                  />
                  <label htmlFor="hello" className="backgrrrr">
                    <BsSearch />
                  </label>
                </div>
              </div>
              {this.gettoptenbooks()}
            </div>
          </div>
        </div>
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
    )
  }
}

export default Bookshelves
