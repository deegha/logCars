import { useState, useRef } from "react"
import "./styles.scss"
import LazyLoad from "react-lazyload"
import Lottie from 'react-lottie'
import loadinganimation from "../../../../static/image-loading.json"
import default_car from "../../../../static/default_car.jpg"

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadinganimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export const ImageSlider = ({ images }) => {
  const [ activeImage, setActive ] = useState(0)
  const [loading, setLoading] = useState(true)
  const counter = useRef(0);

  const imageLoaded = () => {
    setLoading(false);
  }

  return (
    <div className="image-slider">
      <div className="image-slider__image">
        {/* <div style={{display: loading ? "flex" : "none"}} className="image-slider__image--loading">
          <Lottie
            options={defaultOptions}
            height={100}
            width={200}/>
        </div> */}
       {images.length > 0 ? (
         <img  src={images[activeImage].url.insert(50, "w_550,h_400,c_fill,f_auto,q_auto/")} onLoad={imageLoaded} />
       ) : (
        <img  src={default_car} onLoad={imageLoaded} />
       )}
      </div>
{/*
        {images.map(image => (
           <Carousel>
            <div>
              <img style={{display: !loading ? "block" : "none"}} src={images[activeImage].url.insert(50, "w_550,h_400,c_fill,f_auto,q_auto/")} onLoad={imageLoaded} />
            </div>
           </Carousel>
        ))} */}

      <div  className="image-slider__select-image">
        {images.map((image, i) => {

          const selectedClasss = i === activeImage ? "image-slider__image-small--selected" : ""

          return (
            <LazyLoad once={true} key={i}>
            <div

              onClick={ () => setActive(i)}
              style={{backgroundImage: `url(${image.url.insert(50, "w_160,h_110,c_fill,f_auto,q_auto/")})`}}
              className={`image-slider__image-small ${selectedClasss}`} />
              </LazyLoad>
          )
        })}
      </div>
    </div>
  )
}
