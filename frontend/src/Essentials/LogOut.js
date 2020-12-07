import React, { Component } from 'react'
import { connect } from 'react-redux'
import { UNAUTH_USER } from '../actions/types'

const logOut = () => {
  localStorage.removeItem('userId');

  return {
    type: UNAUTH_USER
  }
}

class LogOut extends Component {
  componentDidMount(){
    this.props.logOut()
    this.props.history.push('/login')
  }
  render() {
    return <div></div>
  }
}

export default connect(null, { logOut })(LogOut)