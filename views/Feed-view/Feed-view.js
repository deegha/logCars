import "./styles.scss"
import numeral from "numeral"
import { Header } from "../../components"
import { useState } from "react"
import { APP_BASE_URL } from "../../config/config"
import { ImageSlider } from "./componenst/image-slider/image-slider"
import moment from "moment"
import default_car from "../../static/default_car.jpg"
import { IoIosArrowRoundBack } from "react-icons/io"
import Link from 'next/link'

export const FeedView = ({vehicle, id}) => {

  const [showNumber, toggleNumber] = useState(false)
  const toggle = () => toggleNumber(!showNumber)
  return (
    <div className="feed-view">
      <Header
      keywords={`${vehicle.make} ${vehicle.model}`}
      title={`carlogs | ${vehicle.title}`}
      ogImage={vehicle.images.length >0?vehicle.images[0].url: default_car}
      url={`${APP_BASE_URL}/feed?vehicle=${id}`}
      description={vehicle.title} />

      <div className="feed-view_wrapper">
        <div className="feed-view__row">
          <div className="feed-view__header-section">
            <Link href="/" >
              <a>
              <IoIosArrowRoundBack size={50} className="feed-view__back-btn" />
              </a>
            </Link>
            <h1>{vehicle.title}</h1>
            <p>{moment.unix(vehicle.createdAt.seconds).fromNow()}</p>
          </div>
          <div className="feed-view__header-section">
            <h2>Rs {numeral(vehicle.price).format('0,0')}</h2>
            <p>{numeral(vehicle.price).format('0.00 a')}</p>
          </div>
        </div>
        <div className="feed-view__row feed-view--details-view feed-view__col">
          <div className="feed-view__left">
            <div className="feed-view__image-slider">
              <ImageSlider images={vehicle.images} />
            </div>
            {vehicle.description !== "" && (
               <div className="feed-view_description">
                <h2>Sellers Description</h2>
                {/* <p>
                  {vehicle.description}
                </p> */}
                <div dangerouslySetInnerHTML={{__html: vehicle.description}} />
              </div>
            )}
          </div>

          <div className="feed-view__right">
          <div className="feed-view__details">
            <div className="feed-view__details-item">
              <h2 className="feed-view__details-item feed-view__details-header">Price</h2>
              <span>Rs {numeral(vehicle.price).format('0,0')}</span>
            </div>
            <div className="feed-view__details-item">
              <div className="feed-view__details-number-toggle" onClick={toggle}>{showNumber?vehicle.phoneNumber :"Show Phone number"}</div>
            </div>
            <div className="feed-view__details-item">
              <h3 className="feed-view__details-item feed-view__details-header">Added by</h3>
              <span>{vehicle.author.displayName}</span>
            </div>
            <div className="feed-view__details-item">
              <h3 className="feed-view__details-item feed-view__details-header">Make</h3>
              <span>{vehicle.make}</span>
            </div>
            <div className="feed-view__details-item">
              <h3 className="feed-view__details-item feed-view__details-header">Model</h3>
              <span>{vehicle.model}</span>
            </div>
            <div className="feed-view__details-item">
              <h3 className="feed-view__details-item feed-view__details-header">Model Year</h3>
              <span>{vehicle.modelYear}</span>
            </div>
            <div className="feed-view__details-item">
              <h3 className="feed-view__details-item feed-view__details-header">Transmission</h3>
              <span>{vehicle.transmission}</span>
            </div>
            <div className="feed-view__details-item">
              <h3 className="feed-view__details-item feed-view__details-header">Mileage</h3>
              <span>{numeral(vehicle.mileage ).format('0,0')} KM</span>
            </div>

            <div className="feed-view__details-item">
              <h3 className="feed-view__details-item feed-view__details-header">Fuel</h3>
              <span>{vehicle.fuelType}</span>
            </div>
            <div className="feed-view__details-item">
              <h3 className="feed-view__details-item feed-view__details-header">Location</h3>
              <span>{vehicle.location}</span>
            </div>
          </div>

          {vehicle.description !== "" && (
               <div className="feed-view_description--bottom">
                <h2>Sellers Description</h2>
                {/* <p>
                  {vehicle.description}
                </p> */}
                <div dangerouslySetInnerHTML={{__html: vehicle.description}} />
              </div>
            )}
          </div>



        </div>
      </div>
    </div>
  )
}
