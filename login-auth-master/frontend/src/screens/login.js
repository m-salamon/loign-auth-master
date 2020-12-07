import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import LoginAlert from '../components/LoginAlert';
import clearStorage from '../utils/clearLocalStorage';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                email: '',
                password: ''
            },
            error: false,
            message: ''
        }
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.message) {
            this.setState({ message: this.props.location.state.message })
        }
    }

    changeHandler = (e) => {
        let login = Object.assign({}, this.state.login);
        login[e.target.name] = e.target.value;
        this.setState({ login });
    }

    submit = async () => {
        let login = await axios.post('/auth/login/login', this.state.login);
        if (login.data.success) {
            clearStorage();
            await localStorage.setItem('returning', 'true');
            await localStorage.setItem(login.data.userIdType, login.data.token);
            this.clear()
            await this.props.authenticate()
            this.props.history.push('/profile');
        } else {
            this.setState({ error: true, message: login.data.message })
        }
    }


    clear = () => {
        this.setState(prevState => ({
            login: {
                ...prevState.signup,
                email: '',
                password: '',
            }
        }));
    }

    render() {
        return (
            <div>
                <Form submit={this.submit}>
                    <LoginAlert message={this.state.message} />
                    <Input value={this.state.login.email} name="email" placeholder='Email' onChange={this.changeHandler} type='email' errorMessage='Email required' required />
                    <Input value={this.state.login.password} name="password" placeholder='password' onChange={this.changeHandler} type='password' errorMessage='Password required' required />
                    <Button buttonName='log in' className='mt-3 btn btn-block float-right btn-success' />
                </Form>
            </div>
        )

    }
}

function mapStateToProps() {
    
}

function mapDispatchToProps(dispatch) {
    return {
        authenticate: (state) => dispatch(actions.authenticate(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);