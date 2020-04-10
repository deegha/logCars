import React from 'react'
import { auth } from './firebase'

const withAuth = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: "loading"
      }
    }

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {

      if(authUser) {
        this.setState({
          authUser: {
            displayName:  authUser.displayName,
            photoURL: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid
          }
        });
      }else {
        this.setState({
          authUser: false
        });
      }
      });
    }

    render() {
      return (
        <React.Fragment>
          <Component { ...this.props } authUser={this.state.authUser} />
        </React.Fragment>
      );
    }
  };
}
export default withAuth;
