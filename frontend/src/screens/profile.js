import React, { Component, Fragment } from 'react';
import axios from '../utils/axios';
import setHeader from '../utils/setHeader';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            readState: {}
        }
    }

    user = async () => {
        var profile = this.props.profile
        this.setState({readState: profile});
    }
    
    componentWillMount() {
        this.props.getUserProfile()
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.profile){
            this.setState({readState: nextProps.profile})
        }
    }
    
    render() {
        return (
            <div className="container">
                {this.state.readState.firstName}<br />
                {this.state.readState.lastName}<br />
                {this.state.readState.phoneNumber}<br />
                {this.state.readState.email}<br />
                {this.state.readState.password}<br />
                {this.state.readState.isVerified}<br />
            </div>
        )
    }
}

function mapStateToProps({ userProfile }) {
    return { profile: userProfile }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserProfile: (state) => dispatch(actions.getUserProfile(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);