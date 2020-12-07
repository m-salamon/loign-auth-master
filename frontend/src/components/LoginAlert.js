import React, { Component, Fragment } from 'react';

const LoginAlert = ({message}) => {
   return (
      <div className="login-alert-wrapper">
         {message}
      </div>
   )
}

export default LoginAlert