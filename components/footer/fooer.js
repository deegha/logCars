import "./styles.scss"
import Link  from "next/link"

export const Footer = () => {
  return (
    <div className={"footer-container"}>
      <div className={"footer-wrapper"}>
        <h2>Social</h2>
        <ul>
          <li>facebook</li>
          <li>
            <a href={"https://twitter.com/Mellowmusic4"} target={"new"}>twitter</a>

                     </li>
        </ul>
      </div>
      <div className={"footer-wrapper"}>
        <h2>Leagal</h2>
        <ul>
          <li>
            <Link href={"/terms"}>
              <a >Terms and conditions</a>
            </Link>
            </li>
        </ul>
      </div>
    </div>
  )
}
