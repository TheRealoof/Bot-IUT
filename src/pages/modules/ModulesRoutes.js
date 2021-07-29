import React from 'react';
import { Route } from "react-router-dom"
import PollsRouter from './polls/PollsRouter';

const ModulesRoutes = () => {
    return (
        <>
            <Route path="/dashboard/:server_id/polls" component={PollsRouter}/>
        </>
    );
};

export default ModulesRoutes;