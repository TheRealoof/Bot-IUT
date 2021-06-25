import { React, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom"
import axios from 'axios';
import DashbaordHome from './DashbaordHome';
import './styles/Dashboard.scss';

const LOGIN_STATE = {
    LOADING: 0,
    AUTHORIZED: 1,
    UNAUTHORIZED: 2
}

const ServerItem = ({server}) => {
    return (
        <NavLink exact to={"/dashboard/" + server.id} style={{ textDecoration: 'none' }}>
            <div className="server-item">
                <div className="container">
                    <img src={(server.icon) ? "https://cdn.discordapp.com/icons/"+server.id+"/"+server.icon+".png?size=128" : ""} alt="Serveur" className="server-img"></img>
                    <p className="server-name">{server.name}</p>
                </div>
            </div>                            
        </NavLink>
    )
}

const Dashbaord = () => {
    const [loginState, setLoginState] = useState(LOGIN_STATE.LOADING);
    const [discordUser, setDiscordUser] = useState("");
    const [servers, setServers] = useState([]);

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

        axios.get("https://discord.com/api/users/@me/guilds", {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
            }
        })
        .then( (res) => {
            setServers(res.data)
        })
        .catch( (err) => {console.log(err);} );
    }, []);

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
                <>
                    <div className="servers">
                        {servers.map( (server) => (
                            <ServerItem key={server.id} server={server}/>
                        ))}
                    </div>
                    <div className="dashboard">
                        <BrowserRouter>
                            <Switch>
                                <Route path="/dashboard" exact component={props => <DashbaordHome discordUser={discordUser}/>}/>
                            </Switch>
                        </BrowserRouter>
                    </div>
                </>

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