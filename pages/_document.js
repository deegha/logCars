/* eslint react/no-danger: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash/object'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  render() {
    // Store initial props from request data that we need to use again on
    // the client. See:
    // https://github.com/zeit/next.js/issues/3043#issuecomment-334521241
    // https://github.com/zeit/next.js/issues/2252#issuecomment-353992669
    // Alternatively, you could use a store, like Redux.
    const { AuthUserInfo } = this.props
    return (
      <Html lang="en-US">
        <Head>

        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link rel="shortcut icon" href="/static/favicon.ico" />

          <script
            id="__MY_AUTH_USER_INFO"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(AuthUserInfo, null, 2),
            }}
          />
          <link href="https://fonts.googleapis.com/css?family=Spartan&display=swap" rel="stylesheet" disabled media="screen"></link>
          <link href="https://fonts.googleapis.com/css?family=Cookie&display=swap" rel="stylesheet" disabled media="screen"></link>

          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap" rel="stylesheet" disabled media="screen"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async ctx => {
  // Get the AuthUserInfo object. This is set if the server-rendered page
  // is wrapped in the `withAuthUser` higher-order component.
  const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null)

  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps, AuthUserInfo }
}

CustomDocument.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }).isRequired,
}

export default CustomDocument
