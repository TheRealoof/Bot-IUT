import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Route } from 'react-router-dom';
import DashbaordHome from './DashbaordHome';
import ModulesRoutes from '../modules/ModulesRoutes';

const DashboardModulesRouter = ({discordUser, servers}) => {
    const {server_id} = useParams();
    const [server, setServer] = useState({});

    useEffect( () => {
        const tmp = servers.find(server => server.id === server_id);
        setServer(tmp);
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