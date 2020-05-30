import React, { Suspense, lazy } from 'react';
import BlogView from  '../views/blog-view/Blog-view';

class Blog extends React.Component {


  static async getInitialProps({query}) {
    const { slug } = query

    const blog = await require(`../blogPages/${slug}/${slug}`);
    return blog
  }

  render() {
    return (
      <BlogView blog={this.props.blog} />
    )
  }
}

export default Blog
