import React, { Component, Fragment } from 'react';
import { connect, MapStateToPropsParam } from 'react-redux';
import * as actions from '../actions/actions';

class Form extends Component {

    submitHandler = (e) => {
        e.preventDefault();
        this.props.FormIsSubmited(true);
    }

    checkIdShouldSubmit = () => {
        if ((this.props.shouldSubmit.every((e) => { return e.shouldSubmit })) && this.props.formIsSubmited) {
            this.props.submit();
            this.props.FormIsSubmited(false);
        }
    }

    componentWillUpdate() {
        this.checkIdShouldSubmit();
    }
    componentWillUnmount() {
        this.props.clearShouldSubmit();
        this.props.FormIsSubmited(false);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4" >
                        <h3>{this.props.title}</h3>
                        <div className="form-horizontal">
                            <form onSubmit={this.submitHandler} >
                                {this.props.children}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        formIsSubmited: state.formIsSubmited,
        shouldSubmit: state.shouldSubmit
    }
}

function mapDispatchToProps(dispatch) {
    return {
        FormIsSubmited: (state) => dispatch(actions.FormIsSubmited(state)),
        clearShouldSubmit: () => dispatch(actions.clearShouldSubmit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);