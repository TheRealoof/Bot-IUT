import { React, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import axios from 'axios';
import DashbaordHome from './DashbaordHome';

const LOGIN_STATE = {
    LOADING: 0,
    AUTHORIZED: 1,
    UNAUTHORIZED: 2
}

const Dashbaord = () => {
    const [loginState, setLoginState] = useState(LOGIN_STATE.LOADING);
    const [discordUser, setDiscordUser] = useState("");

    useEffect( () => {
        axios.get("https://discord.com/api/users/@me", {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
            }
        })
        .then( (res) => {
            setDiscordUser(res.data);
            setLoginState(LOGIN_STATE.AUTHORIZED);
        })
        .catch( (error) => {
            console.log(error.response.status);
            setLoginState(LOGIN_STATE.UNAUTHORIZED);
        });
    }, []);

    //console.log(discordUser);

    var elements;

    switch (loginState)
    {
        case LOGIN_STATE.LOADING:
            elements = (
                <p>Chargement...</p>
            );
            break;
        
        case LOGIN_STATE.AUTHORIZED:
            elements = (
                <BrowserRouter>
                    <Switch>
                        <Route path="/dashboard" exact component={props => <DashbaordHome discordUser={discordUser}/>}/>
                    </Switch>
                </BrowserRouter>
            );
            break;
        
        case LOGIN_STATE.UNAUTHORIZED:
            window.location.href = "https://discord.com/api/oauth2/authorize?client_id=802584984581439528&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&response_type=token&scope=guilds";
            break;

        default:
            window.location.href = "https://discord.com/api/oauth2/authorize?client_id=802584984581439528&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&response_type=token&scope=guilds";
            break;
    }
    return (
        <>
            {elements}
        </>
    );
};

export default Dashbaord;