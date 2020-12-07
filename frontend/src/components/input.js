import React, { Component, Fragment } from 'react';
import validateEmail from '../utils/checkEmail';
import { connect } from 'react-redux';
import * as actions from '../actions/actions'

class Input extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false,
            errorMessage: ''
        }
    }

    blurHandler = (e) => {
        this.validateInput();
    }

    changeHandler = (e) => {
        this.props.onChange(e);
        let state = Object.assign(this.state);
        state.hasError = false;
        this.setState(state);
    }
    submit = () => {
        this.validateInput();
        if (!this.state.hasError) {
            this.props.changeShouldSubmit({ name: this.props.name, shouldSubmit: true })
        }
    }
    validateInput = () => {
        let state = Object.assign(this.state);
        state.hasError = false;

        if (this.props.onCustomvalidate) {

            let customBlurValidation = this.props.onCustomvalidate();
            let state = Object.assign(this.state);
            state.hasError = customBlurValidation.hasError;
            state.errorMessage = customBlurValidation.errorMessage;
            this.setState(state);
        }
        let val = this.props.value;

        if (!val && this.props.required) {
            state.hasError = true;
            state.errorMessage = this.props.errorMessage;
        }
        if (val && this.props.name === 'email' && !validateEmail(val)) {
            state.hasError = true;
            state.errorMessage = 'Not valid email';
        }

        this.setState(state);

    }
    checkIfSubmitted = () => {
        if (this.props.formIsSubmited) {
            this.props.FormIsSubmited(false);
            this.submit();
        }
    }

    componentDidUpdate() {
        this.checkIfSubmitted()
    }

    componentWillMount() {
        if (this.props.required) {
            this.props.addShouldSubmit({ name: this.props.name, shouldSubmit: false });
        }
    }

    render() {
        let error = <span><br /></span>
        let className = 'form-control';
        if (this.state.hasError) {
            error = <span>{this.state.errorMessage}<br /></span>
            className = 'error form-control';
        }

        let required;
        if (this.props.required) {
            required = <span>*</span>
        }

        return (
            <div className="form-group">
                {error}
                <input className={className}
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.changeHandler}
                    onFocus={this.blurHandler}
                    onInput={this.blurHandler}
                    disabled={this.props.disabled}
                    value={this.props.value} />
            </div>);

    }
}
function mapStateToProps(state) {
    return {
        errors: state.errors,
        formIsSubmited: state.formIsSubmited
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeErrorSuccess: (state) => dispatch(actions.removeErrorSuccess(state)),
        FormIsSubmited: (state) => dispatch(actions.FormIsSubmited(state)),
        addShouldSubmit: (state) => dispatch(actions.addShouldSubmit(state)),
        changeShouldSubmit: (state) => dispatch(actions.changeShouldSubmit(state))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Input);
