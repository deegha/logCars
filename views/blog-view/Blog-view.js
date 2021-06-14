import ReactMarkdown from 'react-markdown'
import { Header, Footer } from '../../components'
import { APP_BASE_URL, APP_LOG } from "../../config/config"

import "./styles.scss"

class BlogView extends React.Component{
  render() {
    return (
      <>
      <Header
          rightBtn={true}
          title={`${this.props.blog.title} | carlogs.lk`}
          ogImage={this.props.blog.image?this.props.blog.image:APP_LOG}
          url={`${APP_BASE_URL}/blog?slug=${this.props.blog.slug}`}
          description={`${this.props.blog.title} | A blog by carlogs.lk`} />
      <div className="container">
          <div className="content">
            <h1>{this.props.blog.title}</h1>
            | {this.props.blog.date}
            <img src={this.props.blog.image} className="featureImage" />
            <ReactMarkdown source={this.props.blog.post.default} alt={this.props.blog.title} />
          </div>
      </div>
      <Footer />
      </>
    )
  }
}

export default BlogView
