import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FcSearch} from 'react-icons/fc'
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

class Home extends Component {
  state = {
    shelf: 'All',
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
        {booklist.map(eachbook => {
          const {id, authorname, coverpic, title, readstatus, rating} = eachbook
          return (
            <div>
              <img src={coverpic} alt={title} />
            </div>
          )
        })}
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
            <input
              type="search"
              id="hello"
              placeholder="Search"
              data-testid="searchButton"
              onChange={this.cickingSearch}
            />
            <label htmlFor="hello" className="backgrrrr">
              <FcSearch />
            </label>
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
            <div className="Slickcontainer">{this.gettoptenbooks()}</div>
          </div>

          <div className="Large-Size-Devices">
            <div>
              <input
                type="search"
                id="hello"
                placeholder="Search"
                data-testid="searchButton"
                onChange={this.cickingSearch}
              />
              <label htmlFor="hello" className="backgrrrr">
                <FcSearch />
              </label>
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
            <div className="RightSideContainer">{this.gettoptenbooks()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
