import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';
import CreatePasswordInput from '../components/CreatePasswordInput';
import clearStorage from '../utils/clearLocalStorage';
import LoginAlert from '../components/LoginAlert';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            signUp: {
                email: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                password: ''
            },
            error: false,
            message: '',
            success: ''
        }
    }

    changeHandler = (e) => {
        let signUp = Object.assign({}, this.state.signUp);
        signUp[e.target.name] = e.target.value;
        this.setState({ signUp });
    }

    submit = async () => {

        let response = await axios.post('/auth/users/addUser', this.state.signUp);
        if (response.data.success) {
            clearStorage();
            this.clear()
            this.setState({ success: response.data.success, message: response.data.message })
        } else {
            this.setState({ success: response.data.success, error: true, message: response.data.message })
        }
    }

    clear = () => {
        this.setState(prevState => ({
            signUp: {
                ...prevState.signup,
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                password: '',
            }
        }));
    }

    render() {
        const inputCreater = (name, placeholder, type, errorMessage, required) => {
            return <Input value={this.state.signUp[name]} name={name} placeholder={placeholder}
                onChange={this.changeHandler} type={type} errorMessage={errorMessage} required={required} />
        }

        return (
            <div>
                <Form submit={this.submit}>
                    <LoginAlert message={this.state.message} />
                    {inputCreater('firstName', 'First Name', 'text', 'First Name required', true)}
                    {inputCreater('lastName', 'Last Name', 'text', 'Last Name required', true)}
                    {inputCreater('phoneNumber', 'Phone Number (optional)', 'text', 'Phone number required', false)}
                    {inputCreater('email', 'Email', 'text', 'Email required', true)}
                    <CreatePasswordInput onChange={this.changeHandler} value={this.state.signUp.password} />
                    <Button buttonName='Sign Up' className='mt-3 btn btn-block float-right btn-success' />
                </Form>
            </div>
        )
    }
}

export default SignUp;
