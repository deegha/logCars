
import  "./styles.scss"
import Link from 'next/link'
import LazyLoad from "react-lazyload"
import numeral from "numeral"
import default_car from "../../static/default_car.jpg"

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
};

export const Card = ({item}) => {

  const title = item.title

  return (
    <Link href={`/feed?vehicle=${item.id}`}>
    <a>
    <div className={"card-container"} key={item.createdAt.nanoseconds}  >
      <LazyLoad once={true}>
      <div className={"card-image"} style={{backgroundImage: `url(${item.images.length?item.images[0].url.insert(50, "w_160,h_110,c_fill,f_auto,q_auto/"): default_car})`}} />
      </LazyLoad>
      <div className={"card-details"}>
          <h1>{title}</h1>
          <div className="card-attr card-price-tag">Rs {numeral(item.price).format('0,0')} <div className="card-attr card-price-tag--mil"> {numeral(item.price).format('0.00 a')}</div></div>
          <div className="card-footer">
            <p className="card-footer-attr ">{item.transmission} </p>
            <p className="card-footer-attr ">{item.location && `| ${item.location}`}</p>
            <p className="card-footer-attr ">{item.mileage && item.mileage > 0 && `| ${numeral(item.mileage).format('0,0')} KM`}</p>
          </div>
      </div>
    </div>
    </a>
    </Link>
  )
}


// (
//   <div className={css[outerCls]}>
//   <Link prefetch href={`/feed?slug=${feed.id}`}>
//     <a>
//     <div className={css.container} key={feed.id} >

//       <div className={css[imageCls]} style={{
//         backgroundImage: `url(${feed.images.length?feed.images[0].url.insert(50, "w_160,h_110,c_fill/"): default_car})`
//       }} />
//       <div className={css.detailArea}>
//           <h1>{feed.title}</h1>
//           <p className={css.priceTag}>Rs {numeral(feed.price).format('0,0')}</p>
//         <ul>
//             { wWidth>320 && (
//               <li>
//                 <GiGears size={12} style={{marginRight: '5px'}} />
//                 {feed.transmission}
//               </li>
//             )}

//             <li>
//             <MdLocationOn  size={12} style={{marginRight: '5px'}} />
//             {feed.location}</li>
//             <li>{feed.mileage}km</li>
//           </ul>
//       </div>

//     </div>
//     </a>
//   </Link>
//   </div>
// )
