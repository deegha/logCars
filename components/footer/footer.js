import "./styles.scss"
import Link  from "next/link"
import { FaFacebookSquare } from "react-icons/fa"

export const Footer = () => {
  return (
    <div className="footer">
      <div  className="footer__section">
        <h2>Social Media</h2>
        <ul>
          <li>
            <a href="https://www.facebook.com/thecarlogs" target="new">Follow us on facebook</a>
          </li>
        </ul>
      </div>
      {/* <div  className="footer__section">
        <h2>Blog</h2>
      </div> */}
      <div  className="footer__section">
        <h2>About</h2>
        <ul>
          <li>
            <a href="/terms" target="new">Terms and conditions</a>
          </li>
        </ul>
      </div>
      <div  className="footer__section">
        <h2>Contact us</h2>
        <ul>
          <li>
            <a href="mailto:team.carlogs@gmail.com" target="new">team.carlogs@gmail.com</a>
          </li>
          <li>
            <a href="/faq" target="new">FAQ</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
