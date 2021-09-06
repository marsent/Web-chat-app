import React, { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useHistory } from 'react-router';
import { auth } from '../firebase';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

import PropTypes from 'prop-types';


const Chats = props => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url) => {
        const res = await fetch(url);
        const data = await res.blob();
        return new File([data], 'userPhoto.jpg', { type: 'image/jpg' });
    }

    useEffect(() => {
        if (!user || user === null) {
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me',
            {
                headers: {
                    'project-id': '2da0e6d8-e446-4cd7-9967-022d2d03c869',
                    'user-name': user.email,
                    'user-secret': user.uid
                }
            }).then(() => {
                setLoading(false);
            }).catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then(avatar => {
                        formdata.append('avatar', avatar, avatar.name)

                        axios.post('https://api.chatengine.io/users/',
                            formdata,
                            {
                                headers: {
                                    'private-key': '66361430-6e73-4f20-ba10-8ba91187a7aa'
                                }
                            }).then(() => {
                                setLoading(false);
                            }).catch(e => console.log(e))
                    })

            })


    }, [user, history])
    if (!user || loading) return 'Loading...'
    return (
        <div className='chats-page'>
            <div className="nav-bar">
                <div className="logo-tab">
                    Chat
                </div>
                <div
                    className="logout-tab"
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </div>

            <ChatEngine
                height='calc(100vh-66px)'
                projectID='2da0e6d8-e446-4cd7-9967-022d2d03c869'
                userName={user.email}
                userSecret={user.uid}
            />

        </div>
    );
};

Chats.propTypes = {

};

export default Chats;