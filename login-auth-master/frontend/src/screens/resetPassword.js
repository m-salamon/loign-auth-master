import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Form from '../components/Form';
import Button from '../components/Button';
import CreatePasswordInput from '../components/CreatePasswordInput';
import LoginAlert from '../components/LoginAlert';


class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            resetPw: {
                password: '',
                email: ''
            },
            error: false,
            isReset: false
        }
    }

    submit = async () => {
        let tempToken = this.props.match.params.tempToken;
        let updatedPW = await axios.post(`/auth/login/resetPassword/${tempToken}`, { newPassword: this.state.resetPw.password });
        console.log(updatedPW.data)
        if (updatedPW.data.success) {
            this.setState({ isReset: true });
        } else {
            this.setState({ error: true })
        }
    }

    changeHandler = (e) => {
        let state = Object.assign({}, this.state);
        state.resetPw[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        if (this.state.isReset) {
            return (
                <div>
                    <Redirect to={{ pathname: '/login', state: { message: 'You have succesfully reset your password, please login.' } }} />
                </div>
            )
        }

        return (
            <div>
                <Form submit={this.submit}>
                    {this.state.error && <LoginAlert message={'Ooops there was an error reseting your password, your link has expired. Please Send a new link to your email.'} />}
                    <div>Please enter a new password</div>
                    <CreatePasswordInput onChange={this.changeHandler} value={this.state.resetPw.password} />
                    <Button buttonName='Reset Password' className='btn btn-success' />
                </Form>
            </div>
        )
    }
}
export default ResetPassword