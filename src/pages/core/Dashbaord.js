import { React, useEffect, useState } from 'react';
import { Switch, Route, NavLink, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router'
import axios from 'axios';
import DashbaordModulesRouter from './DashboardModulesRouter';
import Loading from './Loading';
import './styles/Dashboard.scss';

const LOGIN_STATE = {
    LOADING: 0,
    AUTHORIZED: 1,
    UNAUTHORIZED: 2
}

const DISCORD_AUTH = process.env.REACT_APP_DISCORD_AUTH;

const ServerItem = (props) => {
    const server = props.server;

    const location = useLocation();
    const active = () => { 
        return matchPath(location.pathname, {
            path: '/dashboard/' + server.id,
            exact: false,
            strict: false
        })
    }

    return (
        <NavLink exact to={"/dashboard/" + server.id} className="server-item" activeClassName="active" isActive={active}>
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
        axios.get(process.env.REACT_APP_API + "/me", {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
            }
        })
        .then( (res) => {
            setDiscordUser(res.data);
            setLoginState(LOGIN_STATE.AUTHORIZED);
        })
        .catch( (error) => {
            console.log(error);
            setLoginState(LOGIN_STATE.UNAUTHORIZED);
        });

        axios.get(process.env.REACT_APP_API + "/servers", {
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
                        <a href={process.env.REACT_APP_INVITE_LINK} className="server-item">
                            <div className="container">
                                <img src="/add-server-icon.png" alt="Ajouter un serveur" className="server-img"></img>
                                <p className="server-name">Ajouter un serveur</p>
                            </div>                         
                        </a>
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