import React from 'react';
import PollsNavLink from "./polls/PollsNavLink"
import SettingsNavLink from "./settings/SettingsNavLink"
import { useParams } from 'react-router';

const ModulesNavLinks = ({server}) => {
    const {server_id} = useParams();

    const base_url = "/dashboard/" + server_id;

    return (
        <>
            {server.settings.map( (setting) => {
                switch (setting.name)
                {
                    case "settings": return <SettingsNavLink key="settings" base_url={base_url}/>;
                    case "polls": return <PollsNavLink key="polls" base_url={base_url}/>;
                    default: return (<></>);
                }
            })}
        </>
    )
};

export default ModulesNavLinks;