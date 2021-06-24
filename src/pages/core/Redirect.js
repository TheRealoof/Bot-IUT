import React from 'react';
import { Redirect } from 'react-router-dom'

const DiscordRedirect = (props) => {
    const params = new URLSearchParams(props.location.hash);
    const access_token = params.get('access_token');

    if (access_token)
        window.localStorage.setItem('access_token', access_token);
    
    return (
        <Redirect to='/dashboard'/>
    );
};

export default DiscordRedirect;