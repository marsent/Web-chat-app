import React from 'react'
import PropTypes from 'prop-types'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'

import { auth } from '../firebase'
import firebase from 'firebase/app';

function Login(props) {
    return (
        <div id='login-page'>
            <div id="login-card">
                <h2>Well come to my App</h2>
                <div
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Login with Google
                </div>
                <br /><br />
                <div
                    className="login-button facebook"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}

                >
                    <FacebookOutlined /> Login with Facebook
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {

}

export default Login

