import React, { Component, Fragment } from 'react';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="">
                <button
                    className={this.props.className}
                    type='submit'
                    onClick={this.props.onClick}
                >
                    {this.props.buttonName}
                </button>
            </div>
        );
    }

}
