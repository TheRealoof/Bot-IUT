import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Route } from 'react-router-dom';
import DashbaordHome from './DashbaordHome';
import Settings from './Settings';
import ModulesRoutes from '../modules/ModulesRoutes';
import ApiRequest from './functions/ApiRequest';

const DashboardModulesRouter = ({discordUser, servers}) => {
    const {server_id} = useParams();
    const [server, setServer] = useState();

    useEffect( () => {
        if (!servers) return;

        let tmp_server = servers.find(server => server.id === server_id);
        if (!tmp_server) return;

        ApiRequest("/server-apps", (res) => {
            tmp_server.settings = res.data;
            setServer(tmp_server);
        }, { server_id: server_id })

    }, [servers, server_id]);

    if (server_id)
    return (
        <>
            <Route path="/dashboard/:server_id" exact component={props => <DashbaordHome discordUser={discordUser} server={server}/>}/>
            <Route path="/dashboard/:server_id/settings" exact component={props => <Settings discordUser={discordUser} server={server}/>}/>
            <ModulesRoutes discordUser={discordUser} server={server}/>
        </>
    );
    else
    return (
        <DashbaordHome discordUser={discordUser} server={server}/>
    )
};

export default DashboardModulesRouter;
