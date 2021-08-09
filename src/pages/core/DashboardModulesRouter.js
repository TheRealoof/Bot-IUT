import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Route } from 'react-router-dom';
import axios from 'axios';
import DashbaordHome from './DashbaordHome';
import ModulesRoutes from '../modules/ModulesRoutes';

const DashboardModulesRouter = ({discordUser, servers}) => {
    const {server_id} = useParams();
    const [server, setServer] = useState({});

    useEffect( () => {
        if (!servers) return;

        let tmp_server = servers.find(server => server.id === server_id);
        axios.get(process.env.REACT_APP_API + "/server-settings", {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
            },
            params: {
                server_id: server_id,
            }
        })
        .then( (res) => {
            tmp_server.settings = res;
            setServer(tmp_server);
        })
        .catch( (err) => {console.log(err);} );
    }, [servers, server_id]);

    if (server_id)
    return (
        <>
            <Route path="/dashboard/:server_id" exact component={props => <DashbaordHome discordUser={discordUser} server={server}/>}/>
            <ModulesRoutes discordUser={discordUser} server={server}/>
        </>
    );
    else
    return (
        <DashbaordHome discordUser={discordUser} server={server}/>
    )
};

export default DashboardModulesRouter;