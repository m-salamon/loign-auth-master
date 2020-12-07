import React, { Component, Fragment } from 'react';
import Input from './Input';

export default class CreatePasswordInput extends Component {

    constructor() {
        super()
        this.state = {
            confirmPw: {
                password: '',
                confirmPassword: '',
            },
            pwNotMatch: false,
            errorMessage: ''

        }
    }

    changeHandler = (e) => {
       if (e.target.name === 'password') {
            this.props.onChange(e);
        }
        let state = Object.assign({}, this.state);
        state.confirmPw[e.target.name] = e.target.value;
        this.setState(state);
    }

    customvalidate = () => {
        let state = Object.assign({}, this.state);
        if (state.confirmPw.password !== state.confirmPw.confirmPassword && state.confirmPw.confirmPassword && state.confirmPw.password) {
            state.pwNotMatch = true
            state.errorMessage = 'Password does not match'
        }else if((state.confirmPw.password.length < 6 || state.confirmPw.confirmPassword.length < 6) && state.confirmPw.password == state.confirmPw.confirmPassword){
            state.pwNotMatch = true
            state.errorMessage = 'Must be 6 or more characters'
        }else{
            state.pwNotMatch = false
            state.errorMessage = ''
        }

        this.setState(state);

        return {
            hasError: state.pwNotMatch,
            errorMessage: state.errorMessage
        }
    }

    render() {
        return (
            <div>
                <Input value={this.props.value} name="password" placeholder='Password' 
                onChange={this.changeHandler} onCustomvalidate={this.customvalidate} type='password' 
                errorMessage='Password required' required />
                
                <Input value={this.state.confirmPw.confirmPassword} name="confirmPassword" placeholder='Confirm Password' 
                onChange={this.changeHandler} onCustomvalidate={this.customvalidate} type='password' 
                errorMessage='Confirm Password required' required />
            </div>);
    }

}