import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const companyLogosData = [
  {
    id: 'd14af630-5d22-4bfb-85dd-bb507b139b82',
    companylogourl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475819/Company%20Logos%20/netflix-img_keqbbh.png',
  },
  {
    id: '0a932287-8002-4fc8-95d1-8cbed3224e37',
    companylogourl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/facebook-img_fxqbxv.png',
  },
  {
    id: '8211ce0c-d7dc-4d2b-8468-5e48ad9ae985',
    companylogourl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/google-img_cnnaol.png',
  },
  {
    id: 'daa48153-3f16-4797-8469-5d63c9cba938',
    companylogourl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/zomato-img_gb1k9w.png',
  },
  {
    id: '2f4b518e-29b3-45c3-a7a5-80929f7898d9',
    companylogourl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/swiggy-img_jgxg6g.png',
  },
  {
    id: '895b9b4d-a283-4ee1-9fb8-933a3c4b449c',
    companylogourl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/amazon-img_yvggab.png',
  },
  {
    id: 'a8c67fd0-bab9-46ec-95de-cbfa2e3473f6',
    companylogourl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/flipkart-img_cb70ic.png',
  },
]

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 820,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  renderSlider = () => {
    console.log('hello')
    const {booklist} = this.props
    console.log(booklist)
    return (
      <Slider {...settings}>
        {booklist.map(eachBook => {
          const {id, authorname, coverpic, title} = eachBook
          return (
            <Link to={`/books/${id}`} className="linkgone">
              <div className="slick-item" key={id}>
                <img className="logo-image" src={coverpic} alt="Book logo" />
                <div className="text">
                  <h1>{title}</h1>
                  <p className="topmargin">{authorname}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="TopRated">
          <div>
            <h1 className="para">Top Rated Books</h1>
          </div>
          <div>
            <Link to="shelf">
              <button type="button" className="buttonelement">
                Find Books
              </button>
            </Link>
          </div>
        </div>
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default ReactSlick
