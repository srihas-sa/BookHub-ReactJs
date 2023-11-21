import {Link} from 'react-router-dom'

const NotFound = () => (
  <div>
    <img src="vvjh" alt="not found" />
    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button">Go Back to Home</button>
    </Link>
  </div>
)

export default NotFound
