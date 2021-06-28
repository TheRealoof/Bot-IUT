import { React, useEffect, useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import DashbaordModulesRouter from './DashboardModulesRouter';
import Loading from './Loading';
import './styles/Dashboard.scss';
require('dotenv').config();

const LOGIN_STATE = {
    LOADING: 0,
    AUTHORIZED: 1,
    UNAUTHORIZED: 2
}

const DISCORD_AUTH = process.env.DISCORD_AUTH || "https://discord.com/api/oauth2/authorize?client_id=802584984581439528&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&response_type=token&scope=guilds";

const ServerItem = ({server}) => {
    return (
        <NavLink exact to={"/dashboard/" + server.id} className="server-item" activeClassName="active">
                <div className="container">
                    <img src={(server.icon) ? "https://cdn.discordapp.com/icons/"+server.id+"/"+server.icon+".png?size=128" : "/default-server-icon.png"} alt="Serveur" className="server-img"></img>
                    <p className="server-name">{server.name}</p>
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
                <Loading/>
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
                        <Switch>
                            <Route path="/dashboard" exact component={props => <DashbaordModulesRouter discordUser={discordUser} servers={servers}/>}/>
                            <Route path="/dashboard/:server_id" component={props => <DashbaordModulesRouter discordUser={discordUser} servers={servers}/>}/>
                        </Switch>
                    </div>
                </>

            );
            break;
        
        case LOGIN_STATE.UNAUTHORIZED:
            window.location.href = DISCORD_AUTH;
            break;

        default:
            window.location.href = DISCORD_AUTH;
            break;
    }

    return (
        <>
            {elements}
        </>
    );
};

export default Dashbaord;