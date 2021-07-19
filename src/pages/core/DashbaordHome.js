import { React, useEffect, useState } from 'react';
import ModulesNavLinks from '../modules/ModulesNavLinks';
import CenteredMessage from './CenteredMessage';
import './styles/DashboardHome.scss';

const DashbaordHome = ({discordUser, server}) => {
    const [username, setUsername] = useState("");
    const [discriminator, setDiscriminator] = useState("");
    const [avatar, setAvatar] = useState("");

    const [serverName, setServerName] = useState("");
    
    useEffect (() => {
        if (discordUser)
        {
            setUsername(discordUser.username);
            setDiscriminator("#" + discordUser.discriminator);
            setAvatar("https://cdn.discordapp.com/avatars/" + discordUser.id + "/" + discordUser.avatar + ".png?size=128");
            setServerName((server) ? server.name : "");
        }
    }, [discordUser, server]);

    const profile = (
        <div className="profile">
            <img src={avatar} alt="Avatar" className="avatar"></img>
            <div className="tag">
                <p>{username}</p>
                <p>{discriminator}</p>
            </div>
        </div>
    );

    if (server)
    return (
        <>
            {profile}
            <div className="title">
                <h1>{serverName}</h1>
            </div>
            <div className="body">
                <div className="tiles">
                    <ModulesNavLinks/>
                </div>
            </div>
        </>
    );
    else
    return (
        <>
            {profile}
            <div className="body">
                <CenteredMessage message={"Aucun serveur sélectionné"}/>
            </div>
        </>
    );
};

export default DashbaordHome;