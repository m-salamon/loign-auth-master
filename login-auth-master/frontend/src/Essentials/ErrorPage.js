import React from 'react';
import image from '../images/owl.jpg'

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h2>Oops!</h2>
          <p>We Looked and looked but We can't seem to find the page.</p>
          <img src={image} width="100%" height="100%" />
        </div>
      </div>
    )
  }
}

export default ErrorPage