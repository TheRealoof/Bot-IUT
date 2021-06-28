import React from 'react';
import PollsNavLink from "./polls/PollsNavLink"
import { useParams } from 'react-router';

const ModulesNavLinks = () => {
    const {server_id} = useParams();

    const base_url = "/dashboard/" + server_id;

    return (
        <>
            <PollsNavLink base_url={base_url}/>
        </>
    );
};

export default ModulesNavLinks;