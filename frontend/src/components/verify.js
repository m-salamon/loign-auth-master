import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Verify extends Component {
    constructor() {
        super();
        this.state = {
            isVerified: false
        }
    }

    async componentDidMount() {
        let token = this.props.match.params.token;
        let result = await axios.get(`/auth/users/verify/${token}`);
        console.log('result', result)
        if (result.data.match) {
            this.setState({ isVerified: true });
        }
    }

    render() {
        let renderThis;
        if (this.state.isVerified) {
            renderThis = <Redirect to={{ pathname: '/login', state: { message: 'You are succesfully verified, please login.'}}} />
        }
        return (
            <div>
                {renderThis}
            </div>
        );
    }
}


