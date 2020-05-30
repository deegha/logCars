
import { useState } from "react"
import { Header, Footer, Card} from "../../components"
import "./styles.scss"
// import Lottie from 'react-lottie'
// import loadinganimation from "../../static/preloader.json"

import { BsFilter } from "react-icons/bs"

const data = [
  {
    title: "How much do I have to pay to advertise my car",
    body: "You don't have to pay anything. creating an advertisement in carlogs.lk is 100% free"
  },
  {
    title: "Does carlogs.lk have a mobile app",
    body: "Not at the moment, but coming very soon"
  },
  {
    title: "Does car logs hold responsible for the cars that are on for sale",
    body: "No!, cars advertise here are not owned by us(carlogs.lk). We dont hold responsible for anyone of the cars adverties in carlogs.lk"
  },
  {
    title: "How many images I can upload",
    body: "You can upload 5 images per one advertistment"
  },
  {
    title: "How many advertisments can I post",
    body: "There is no limit, you can add as many as you can."
  },

]


export const FQAView = () => {


  return (
    <div className="faq">
      <Header />
      <div className="faq__content">
        <h1>FAQ</h1>
        {data.map((item, i) => {
          return (
            <div className="faq__item">
              <h2>{i+1}.{item.title}</h2>
              <p>{item.body}</p>
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
  )

}
