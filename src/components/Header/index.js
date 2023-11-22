import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FaHotjar, FaSave, FaMoon, FaRegLightbulb} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'

import './index.css'

const Header = props => {
  const onClickedlogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dgonqoet4/image/upload/v1686887647/bookhublogo_upkhlx.png"
              alt="website logo"
            />
          </Link>
          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickedlogout}
          >
            Logout
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dgonqoet4/image/upload/v1686887647/bookhublogo_upkhlx.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/">Home</Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/shelf">Bookshelves</Link>
            </li>

            <li className="nav-menu-item">
              <button type="button" onClick={onClickedlogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/">Home</Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/bookshelves">Bookshelves</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
