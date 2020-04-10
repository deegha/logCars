import { useState } from "react"
import "./styles.scss"
import LazyLoad from "react-lazyload"

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
};


export const ImageSlider = ({ images }) => {
  const [ activeImage, setActive ] = useState(0)

  return (
    <div className="image-slider">
      <div className="image-slider__image" style={{backgroundImage: `url(${images[activeImage].url.insert(50, "w_550,h_400,c_fill,f_auto,q_auto/")})`}} />
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
