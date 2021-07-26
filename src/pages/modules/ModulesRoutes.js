import React from 'react';
import { Route } from "react-router-dom"
import Polls from './polls/Polls';

const ModulesRoutes = () => {
    return (
        <>
            <Route path="/dashboard/:server_id/polls" component={Polls}/>
        </>
    );
};

export default ModulesRoutes;